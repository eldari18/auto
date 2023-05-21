import go from 'gojs'
import Grafo from './Grafo'


let g = new Grafo()

let $ = go.GraphObject.make
let diagram = null

document.addEventListener("DOMContentLoaded", function () {

    diagram = $(go.Diagram, "diagram")

    document.querySelector("#a1").addEventListener("click", function () {
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

    document.querySelector("#a2").addEventListener("click", function () {
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


    document.querySelector("#convertir").addEventListener("click", function () {
        const { estados, transiciones } = g.AFNDaAFD2DinamicoLambda()
       
        diagram.nodeTemplate = $(go.Node, "Auto",
        $(go.Shape, "Circle", { fill: "#00FFB5", strokeWidth: 2, stroke: "black" }),
        $(go.TextBlock, { margin: 8, font: "bold 12 px sans-serif" }, new go.Binding("text", "name"))
        )
        // Configurar el enlace template
        diagram.linkTemplate =
        go.GraphObject.make(go.Link,
        {
            curve: go.Link.Bezier, // Establecer la curva del enlace como Bezier
            // ... otras propiedades y configuraciones del enlace ...
            routing: go.Link.AvoidsNodes, // enrutamiento de enlace evita nodos
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
        const texto = document.querySelector("#estadosFinales")
        texto.innerHTML = `<span class="fw-bold">Estados finales:</span> ${estadosFinales}`

    })
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
        direction: 0,  // dirección en la que se ubican las capas (0 = hacia arriba, 90 = hacia la derecha, etc.)
        layerSpacing: 50,  // distancia vertical entre capas de nodos
        columnSpacing: 50  // distancia horizontal entre nodos en diferentes capas
    })


    diagram.nodeTemplate = $(go.Node, "Auto",
        $(go.Shape, "Circle", { fill: "#00FFB5", strokeWidth: 2, stroke: "black" }),
        $(go.TextBlock, { margin: 8, font: "bold 12 px sans-serif" }, new go.Binding("text", "name"))
    )
    // Configurar el enlace template
    diagram.linkTemplate =
    go.GraphObject.make(go.Link,
      {
        curve: go.Link.Bezier, // Establecer la curva del enlace como Bezier
        // ... otras propiedades y configuraciones del enlace ...
        routing: go.Link.AvoidsNodes, // enrutamiento de enlace evita nodos
      },
      go.GraphObject.make(go.Shape, { stroke: "white" }),
      go.GraphObject.make(go.Shape, { toArrow: "OpenTriangle", stroke: "white", fill: "white" }),
      go.GraphObject.make(go.TextBlock, { stroke: "white", font: "bold 12px sans-serif" }, new go.Binding("text", "text"))
    );
  
    const estadosFinales = g.getEstadosFinales()
    const texto = document.querySelector("#estadosFinales")
    texto.innerHTML = `<span class="fw-bold">Estados finales:</span> ${estadosFinales}`
}





