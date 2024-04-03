import go from 'gojs'
import Grafo from './Grafo'
import { forEach, forIn } from 'lodash'


let g = new Grafo()

let $ = go.GraphObject.make
let diagram = null
let counter = 0

document.addEventListener("DOMContentLoaded", () => {

    diagram = $(go.Diagram, "diagram")

    document.querySelector("#a1").addEventListener("click", () => {
        g.reiniciarGrafo()
        g.ingresarVertices("A")
        g.ingresarVertices("B")
        g.ingresarVertices("C")
        g.getVertice("C").SetEstadoFinal(true)

        g.ingresarArista("A", "A", 1)
        g.ingresarArista("A", "A", 0)
        g.ingresarArista("A", "B", 0)
        g.ingresarArista("B", "C", 0)
        mostrar()
    })

    document.querySelector("#a2").addEventListener("click", () => {
        g.reiniciarGrafo()
        g.ingresarVertices("A")
        g.ingresarVertices("B")
        g.ingresarVertices("C")
        g.ingresarVertices("D")
        g.ingresarVertices("E")
        g.ingresarVertices("F")
        g.ingresarVertices("G")
        g.ingresarVertices("H")
        g.ingresarVertices("I")
        g.ingresarVertices("J")
        g.getVertice("J").SetEstadoFinal(true)

        g.ingresarArista("A", "B", 0)
        g.ingresarArista("B", "C", "")
        g.ingresarArista("C", "D", "")
        g.ingresarArista("C", "D", 0)
        g.ingresarArista("D", "E", "")
        g.ingresarArista("E", "F", "")
        g.ingresarArista("E", "H", "")
        g.ingresarArista("F", "G", 0)
        g.ingresarArista("H", "I", 1)
        g.ingresarArista("G", "J", "")
        g.ingresarArista("I", "J", "")

        mostrar()
    })

    document.querySelector("#convertir").addEventListener("click", () => {
        const { estados, transiciones } = g.AFNDaAFD2DinamicoLambda()

        //* AHORA EL NUEVO GRAFO ES EL AUTÓMATA FINITO DETERMINISTA
        g.reiniciarGrafo()
        estados.forEach(estado => {
            g.ingresarVertices(estado.name)
            if (estado.esEstadoFinal) {
                g.getVertice(estado.name).SetEstadoFinal(true)
            }
        })
        transiciones.forEach(transicion => {
            g.ingresarArista(transicion.from, transicion.to, transicion.text)
        })


        diagram.nodeTemplate = $(go.Node, "Auto",
            $(go.Shape, "Circle", { fill: "#00FFB5", strokeWidth: 2, stroke: "black" }),
            $(go.TextBlock, { margin: 8, font: "bold 12 px sans-serif" }, new go.Binding("text", "name"))
        )
        diagram.linkTemplate =
            go.GraphObject.make(go.Link,
                {
                    curve: go.Link.Bezier,
                    routing: go.Link.AvoidsNodes,
                },
                go.GraphObject.make(go.Shape, { stroke: "white" }),
                go.GraphObject.make(go.Shape, { toArrow: "OpenTriangle", stroke: "white", fill: "white" }),
                go.GraphObject.make(go.TextBlock, { stroke: "white", font: "bold 12px sans-serif" }, new go.Binding("text", "text"))
            );

        diagram.model = $(go.GraphLinksModel, {
            nodeDataArray: estados,
            linkDataArray: transiciones
        })

        const estadosFinales = []
        estados.forEach(estado => {
            if (estado.esEstadoFinal) {
                estadosFinales.push(estado.name)
            }
        })
        let text = ""
        estadosFinales.forEach(estado => {
            text += `${estado} `
        })
        const texto = document.querySelector("#estadosFinales")
        texto.innerHTML = `<span class="fw-bold">Estados finales del autómata:</span> ${text}`

    })

    function separarCadenaEnLista (cadena) {
        // Dividimos la cadena utilizando el patrón ")"
        const elementos = cadena.split(")");
    
        // Agregamos el paréntesis ")" al final de cada elemento
        const lista = elementos.map((elemento) => elemento + ")");
        return lista;
    }

    document.querySelector("#probarExp").addEventListener("click", () => {

        //* verificamos que la cadena no tenga caracteres que no estén en el alfabeto
        const cadena = document.querySelector("#expText").value
        console.log(cadena);
        if(cadena ==''){
            alert("No se ha ingresado ninguna expresion")
        } else if (!(cadena.match(/^(?!.*\+\+)(?!.*\*\*)[01*()?+]+$/))) {
            alert("La cadena tiene caracteres que no están en el alfabeto {0,1} o hay {*,+} seguidos") 
        }
        else {
            counter = 0
             let exp = cadena.split(")")
            console.log(exp.length);
            g.reiniciarGrafo()
            g.ingresarVertices("q" + counter)
            do {
                let item = exp[counter]
                item = item.replaceAll("(", "")
                console.log(item);
                if (item.startsWith("*")) {
                    g.ingresarArista("q" + (counter), "q"  + (counter), exp[counter - 1].replaceAll("(", ""))
                }
                if (item.length == 1 && item != "*" && item != "+") {
                    g.ingresarVertices("q" + (counter + 1))
                    g.ingresarArista("q" + (counter), "q"  + (counter + 1), item)
                }
                if (item.length > 1) {
                    let items = item.split("+")
                    for (let i = 0; i < items.length; i++) {
                        g.ingresarVertices("q" + (counter + i + 1))
                        console.log(items[i]); 
                        g.ingresarArista("q" + (counter), "q" + (counter + i + 1), items[i])                       
                    }
                }
                counter += 1
                
            } while (counter < exp.length) 
            mostrar()
        }
        }

    )
})

function createArrayOfNodesGrafo() {
    const nodes = g.getNombreVertices()
    const nodeDataArray = []
    nodes.forEach(node => {
        nodeDataArray.push({ key: node, name: node })
    })

    return nodeDataArray
}

function createArrayOfLinksGrafo() {
    const links = g.getAristas()
    const linkDataArray = []
    links.forEach(link => {
        linkDataArray.push({ from: link.Origen.dato, to: link.Destino.dato, text: `${link.GetPeso()}` })
    })
    return linkDataArray
}

function mostrar() {

    diagram.model = $(go.GraphLinksModel, {
        nodeDataArray: createArrayOfNodesGrafo(),
        linkDataArray: createArrayOfLinksGrafo()
    })

    diagram.layout = $(go.LayeredDigraphLayout, {
        direction: 0,
        layerSpacing: 50,
        columnSpacing: 50
    })


    diagram.nodeTemplate = $(go.Node, "Auto",
        $(go.Shape, "Circle", { fill: "#FFFF00", strokeWidth: 2, stroke: "black" }),
        $(go.TextBlock, { margin: 8, font: "bold 12 px sans-serif" }, new go.Binding("text", "name"))
    )
    diagram.linkTemplate =
        go.GraphObject.make(go.Link,
            {
                curve: go.Link.Bezier,
                routing: go.Link.AvoidsNodes,
            },
            go.GraphObject.make(go.Shape, { stroke: "white" }),
            go.GraphObject.make(go.Shape, { toArrow: "OpenTriangle", stroke: "white", fill: "white" }),
            go.GraphObject.make(go.TextBlock, { stroke: "white", font: "bold 12px sans-serif" }, new go.Binding("text", "text"))
        );

    const estadosFinales = g.getEstadosFinales()
    let text = ""
    estadosFinales.forEach(estado => {
        text += `${estado} `
    })
    const texto = document.querySelector("#estadosFinales")
    texto.innerHTML = `<span class="fw-bold">Estados finales del autómata:</span> ${text}`
}




