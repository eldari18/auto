import Vertice from "./Vertice.js"
import Arista from "./Arista.js"
import _ from 'lodash'

class Grafo {

    constructor() {
        this.listaVertices = []
        this.listaAristas = []
        this.visitadosCp = []
        this.visitadosCa = []
        this.adyacencias = {}
        this.visitadosCKruskal = []
        this.repetidos = 0
        this.obstruidos = []
        this.aristasAmplitud = []
        this.estadosAuxiliar = []
    }

    getListaVertices() {
        return this.listaVertices
    }

    getListaAristas() {
        return this.listaAristas
    }

    ingresarVertices(dato) {
        if (!this.verificarExisteVertice(dato, this.listaVertices)) {
            this.listaVertices.push(new Vertice(dato, [], false, 0, 0))
        }
    }

    verificarExisteVertice(dato, lista) {
        for (let i = 0;i < lista.length;i++) {
            if (dato === lista[i].dato) {
                return true
            }
        }
        return false
    }

    mostrarVertices() {
        for (let i = 0;i < this.listaVertices.length;i++) {
            console.log(`>>> Vertice: ${this.listaVertices[i].dato}`)
            console.log("Adyacentes: ")
            for (let j = 0;j < this.listaVertices[i].ListaAdyacentes.length;j++) {
                console.log(this.listaVertices[i].ListaAdyacentes[j].dato)
            }
            console.log("---------------------------------")
            if (this.listaVertices[i].ListaAdyacentes.length === 0) {
                console.log("No hay")
            }
        }
    }

    // // método que me recorrerá las aristas y me retornará true si un vértice solo tiene una adyacencia
    // ConvertirAutomataACompleto(g) {
    //     let contadorEstadosIncompletos = 0
    //     let listaEstadosIncompletos = []

    //     for (let i = 0;i < g.listaVertices.length;i++) {
    //         if (g.listaVertices[i].ListaAdyacentes.length == 1 || g.listaVertices[i].ListaAdyacentes.length == 0) {
    //             console.log("Estado incompleto: " + g.listaVertices[i].dato)
    //             listaEstadosIncompletos.push(g.listaVertices[i].dato)
    //             contadorEstadosIncompletos++
    //         }
    //     }

    //     console.log("Estados incompletos: " + contadorEstadosIncompletos)

    //     if (contadorEstadosIncompletos > 0) {
    //         // crear el sumidero
    //         g.IngresarVertices("Sumidero")
    //         g.IngresarArista("Sumidero", "Sumidero", "0")
    //         g.IngresarArista("Sumidero", "Sumidero", "1")
    //     }
    // }

    reiniciarGrafo() {
        this.listaVertices = []
        this.listaAristas = []
        this.visitadosCp = []
        this.visitadosCa = []
        this.adyacencias = {}
        this.visitadosCKruskal = []
        this.repetidos = 0
        this.obstruidos = []
        this.aristasAmplitud = []
    }

    getAristas() {
        return this.listaAristas
    }

    // obtener aristas de un vertice
    getAristasDeVertice(vertice) {
        const aristas = []
        for (let i = 0;i < this.listaAristas.length;i++) {
            if (this.listaAristas[i].Origen.dato === vertice) {
                aristas.push(this.listaAristas[i])
            }
        }
        return aristas
    }

    mostrarAristas() {
        for (let i = 0;i < this.listaAristas.length;i++) {
            console.log(`Origen: ${this.listaAristas[i].Origen.GetDato()} Destino: ${this.listaAristas[i].Destino.GetDato()} Peso: ${this.listaAristas[i].Peso}`)
        }
    }

    GetNombreVertices() {
        const vertices = []
        for (let i = 0;i < this.listaVertices.length;i++) {
            vertices.push(this.listaVertices[i].dato)
        }
        return vertices
    }

    IngresarArista(Origen, Destino, Peso) {
        // for (let i = 0;i < this.listaAristas.length;i++) {
        //     // verificar si ya existe una arista con ese peso
        //     if (this.listaAristas[i].Origen.dato == Origen && this.listaAristas[i].Peso == Peso) {
        //         console.log("Ya existe una arista con ese peso")
        //         return
        //     }
        // }

        this.listaAristas.push(new Arista(this.getVertice(Origen), this.getVertice(Destino), Peso))

        this.getVertice(this.getVertice(Origen).GetDato()).ListaAdyacentes.push(this.getVertice(Destino))
    }

    getAristasDeVertice(vertice) {
        let aristas = []

        for (let i = 0;i < this.listaAristas.length;i++) {
            if (this.listaAristas[i].Origen.dato == vertice) {
                aristas.push(this.listaAristas[i])
            }
        }

        return aristas
    }

    mostrarAristas() {
        for (let i = 0;i < this.listaAristas.length;i++) {
            console.log(`Origen: ${this.listaAristas[i].Origen.GetDato()} Destino: ${this.listaAristas[i].Destino.GetDato()} Peso: ${this.listaAristas[i].Peso}`)
        }
    }

    getNombreVertices() {
        let vertices = []

        for (let i = 0;i < this.listaVertices.length;i++) {
            vertices.push(this.listaVertices[i].dato)
        }

        return vertices
    }

    ingresarArista(Origen, Destino, Peso) {
        //* no se verifica por que es un AFND
        // for (var i = 0;i < this.listaAristas.length;i++) {
        //     // verificar si ya existe una arista con ese peso
        //     if (this.listaAristas[i].Origen.dato === Origen && this.listaAristas[i].Peso === Peso) {
        //         console.log("Ya existe una arista con ese peso")
        //         return
        //     }
        // }

        this.listaAristas.push(new Arista(this.getVertice(Origen), this.getVertice(Destino), Peso))

        this.getVertice(this.getVertice(Origen).GetDato()).ListaAdyacentes.push(this.getVertice(Destino))
    }

    getVertice(dato) {
        for (let i = 0;i < this.listaVertices.length;i++) {
            if (dato === this.listaVertices[i].dato) {
                return this.listaVertices[i]
            }
        }
        return null
    }

    //* MÉTODO QUE ME RECORRE EL AUTÓMATA (GRAFO) VIENDO SI LA CADENA CUMPLE O NO *//
    recorrerAutomata(cadena) {
        console.log("Recorriendo el autómata con la cadena: " + cadena)

        //* PASAMOS LA CADENA A UN ARREGLO DE CARACTERES *//
        let cadenaArr = cadena.split('')

        //* OBTENEMOS EL ESTADO INICIAL (EL PRIMER VERTICE)*//
        let estadoInicial = this.listaVertices[0]

        //* LLAMAMOS AL MÉTODO RECURSIVO ENCARGADO DE VERIFICAR SI LA CADENA CUMPLE O NO *//
        //* PASAMOS EL ESTADO ACTUAL, LA POSICIÓN ACTUAL DE LA CADENA, EL ARREGLO DE CARACTERES *//
        //* Y LA VENTANA PARA MOSTRAR EL RESULTADO *//
        this.cambiarEstado(estadoInicial, 0, cadenaArr)
    }

    //* MÉTODO RECURSIVO ENCARGADO DE VERIFICAR SI LA CADENA CUMPLE O NO *//
    cambiarEstado(estadoActual, posicionActual, cadenaArr,) {
        //* VERIFICAMOS SI HEMOS LLEGADO AL FINAL DE LA CADENA *//
        if (posicionActual == cadenaArr.length) {
            if (estadoActual.estadoFinal) {
                console.log('cadena válida')
            } else {
                console.log('cadena inválida')
            }
            return
        }

        //* OBTENEMOS EL SIGUIENTE ESTADO A TRAVÉS DE LA TRANSICIÓN CORRESPONDIENTE *//
        let siguienteEstado = null
        this.listaAristas.forEach(arista => {
            if (arista.Origen.GetDato() == estadoActual.GetDato() && arista.Peso == cadenaArr[posicionActual]) {
                siguienteEstado = arista.Destino
                //* LLAMAMOS RECURSIVAMENTE AL MÉTODO CON EL SIGUIENTE ESTADO Y LA SIGUIENTE POSICIÓN DE LA CADENA *//
                this.cambiarEstado(siguienteEstado, posicionActual + 1, cadenaArr)
            }
        })
    }

    getArista(Origen, Destino, Peso) {
        for (let i = 0;i < g.listaAristas.length;i++) {
            if (Origen == g.listaAristas[i].Origen.GetDato() && Destino == g.listaAristas[i].Destino.GetDato() && Peso == g.listaAristas[i].Peso) {
                return g.listaAristas[i]
            }
        }
        return null
    }

    verificarExisteArista(arista) {
        for (let i = 0;i < g.listaAristas.length;i++) {
            if (arista.Origen.GetDato() == g.listaAristas[i].Origen.GetDato() && arista.Destino.GetDato() == g.listaAristas[i].Destino.GetDato()) {
                // console.log("Ya existe la arista");
                // console.log("Origen: " + arista.Origen.GetDato() + " Destino: " + arista.Destino.GetDato());
                return true
            }
        }
        return false
    }

    getEstadosFinales() {
        let estadosFinales = []

        this.listaVertices.forEach(vertice => {
            if (vertice.GetEstadoFinal()) {
                estadosFinales.push(vertice.GetDato())
            }
        })

        return estadosFinales
    }

    //usar el metodo buscarHastaDondeLlegaL teniendo en cuenta que le puedo pasar un arreglo de estados
    //y que me devuelva un arreglo de estados

    //* gpt
    buscarHastaDondeLlegaL(estado, peso, pesoGastado = false) {
        //tomo el estado inicial
        let estadoInicial = this.getVertice(estado)
        // console.log(estadoInicial, estadoInicial.dato, pesoGastado)

        //tomo las aristas que salen del estado inicial con el peso
        let aristasEstado = []
        this.listaAristas.forEach(arista => {
            if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === peso) {
                aristasEstado.push(arista)
            }
        })

        //* si no hay aristas con ese peso buscamos un lambda
        if(aristasEstado.length === 0){
            aristasEstado = []
            this.listaAristas.forEach(arista => {
                if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === '') {
                    aristasEstado.push(arista)
                }
            })
            
            // console.log('tiene lambda')
            // console.log(aristasEstado)

            if(aristasEstado.length === 0){

                if(pesoGastado) {
                    // console.log('no hay lambda y ya gaste todos los pesos')
                    this.estadosAuxiliar.push(estadoInicial.dato)
                    // console.log("estados auxiliar", this.estadosAuxiliar)
                } else {
                    // console.log('no hay lambda y no puedo gastar mas pesos')
                    // this.buscarHastaDondeLlegaL(estadoInicial.dato, peso, peso)
                }

            } else {
                // console.log('tiene lambda', estadoInicial.dato, pesoGastado)
                aristasEstado.forEach(arista => {
                    let nuevoestado = arista.Destino.GetDato()
                    this.buscarHastaDondeLlegaL(nuevoestado, peso, pesoGastado)
                })
            }

            
            
        } else {
            //* si hay aristas con ese peso
            aristasEstado.forEach(arista => {
                if(!pesoGastado) {
                    let nuevoestado = arista.Destino.GetDato()
                
                    this.buscarHastaDondeLlegaL(nuevoestado, peso, true)
                } else {
                    // console.log('ya no puedo gastar mas pesos')
                    this.estadosAuxiliar.push(estadoInicial.dato)
                    // console.log("estados auxiliar", this.estadosAuxiliar)
    
                    //* busco si hay un lambda
                    aristasEstado = []
                    this.listaAristas.forEach(arista => {
                        if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === '') {
                            aristasEstado.push(arista)
                        }
                    })
    
                    if(aristasEstado.length === 0){
                        // console.log('no hay lambda')
                    } else {
                        // console.log('tiene lambda')
                        aristasEstado.forEach(arista => {
                            let nuevoEstado = arista.Destino.GetDato()
                            // console.log(nuevoEstado)
                            this.buscarHastaDondeLlegaL(nuevoEstado, peso, true)
                        })
                    }
    
                    
                }
            })
        }

        return this.estadosAuxiliar

    }

     
    buscarHastaDondeLlegaTodos(estados, peso) {
        this.estadosAuxiliar = [] 
        let estadosAuxiliar = []
        
        estados.forEach(estado => {

            let datoEstado = estado.dato
            estadosAuxiliar.push( this.buscarHastaDondeLlegaL(datoEstado, peso, false) )

        })

        let estadosRetornar = [[]]
        if(estadosAuxiliar.length > 0) {
            estadosAuxiliar[0].forEach(estado => {
                estadosRetornar[0].push(this.getVertice(estado))
            })
        }

        return estadosRetornar
    }

    //metodo que me dice si hay elementos repetidos en un arreglo de arreglos de vertices usando lodash
    hayRepetidos(arreglo) {
        arreglo = _.flatten(arreglo)
        let repetidos = _.uniq(arreglo)
        return arreglo.length !== repetidos.length
    }

    // metodo que me verifica si hay repetidos y si los hay devuelve un arreglo sin repetidos y si no hay repetidos devuelve el mismo arreglo
    eliminarRepetidos(arreglo) {
        if(this.hayRepetidos(arreglo)) {
            //flat
            arreglo = _.flatten(arreglo)
            //uniq
            arreglo = _.uniq(arreglo)
            return [arreglo]
        } else {
            return arreglo
        }
    }

    
    AFNDaAFD2DinamicoLambda() {
        let estadosPila = []
        let aristas = []

        let estadoInicial = this.listaVertices[0]
        estadosPila.push([estadoInicial])

        let i = 0
        while (i < estadosPila.length) {

            let con0 = this.buscarHastaDondeLlegaTodos(estadosPila[i], 0)
            let con1 = this.buscarHastaDondeLlegaTodos(estadosPila[i], 1)

            // console.log("hay repetidos", this.hayRepetidos(con0), this.hayRepetidos(con1))

            con0 = this.eliminarRepetidos(con0)
            con1 = this.eliminarRepetidos(con1)

            con0.forEach(estado => {

                if(estado.length > 0) {
                    if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                        estadosPila.push(estado)
                    }
                    aristas.push({
                        Origen: estadosPila[i],
                        Destino: estado,
                        Peso: 0
                    })
                }
            })

            con1.forEach(estado => {
                if( estado.length > 0) {
                    if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                        estadosPila.push(estado)
                    }
                    aristas.push({
                        Origen: estadosPila[i],
                        Destino: estado,
                        Peso: 1
                    })
                }
            })

            i++
        }

        // console.log({
        //     estadosPila,
        //     aristas
        // })

        let estadosFinalesOriginal = this.getListaVertices().filter(estado => estado.GetEstadoFinal())
        let estadosFinalesNombres = estadosFinalesOriginal.map(estado => estado.GetDato())

        let estadosNuevos = []
        estadosPila.forEach(estado => {

            let esFinal = false
            estado.forEach(e => {
                if (estadosFinalesNombres.includes(e.dato)) {
                    esFinal = true
                }
            })

            let nombre = ""
            estado.forEach(e => {
                nombre += e.dato
            })
            estadosNuevos.push({
                key: nombre,
                name: nombre,
                esEstadoFinal: esFinal
            })

        })

        console.log(estadosNuevos)

        let transicionesNuevas = []

        aristas.forEach(transicion => {
            let origen = ""
            let destino = ""
            transicion.Origen.forEach(e => {
                origen += e.dato
            })
            transicion.Destino.forEach(e => {
                destino += e.dato
            })
            transicionesNuevas.push({ from: origen, to: destino, text: `${transicion.Peso}` })
        })

        console.log(transicionesNuevas)

        return {
            estados: estadosNuevos,
            transiciones: transicionesNuevas
        }
    }

    buscarHastaDondeLlega(estado, peso) {
        if (estado.length === 1) {
            let aristasEstado = []
            this.listaAristas.forEach(arista => {
                if ((arista.Origen.GetDato() === estado[0].GetDato()) && arista.GetPeso() === peso) {
                    aristasEstado.push(arista)
                }
            })
    
            let estados = []
            aristasEstado.forEach(arista => {
                estados.push(arista.Destino)
            })
            return [estados]
        } else {
            let aristasEstado = []
            this.listaAristas.forEach(arista => {
                estado.forEach(estado => {
                    if ((arista.Origen.GetDato() === estado.GetDato()) && arista.GetPeso() === peso) {
                        aristasEstado.push(arista)
                    }
                })
            })
    
            let estados = []
            aristasEstado.forEach(arista => {
                estados.push(arista.Destino)
            })
            
            return [estados]
        }
    }
    

    yaEstaEnLaLista(estado, lista) {
        for (let i = 0;i < lista.length;i++) {
            if (_.isEqual(estado, lista[i])) {
                return true
            }
        }
        return false
    }

    //sin lambda
    AFNDaAFD() {

        let estadosPila = []
        let aristas = []

        let estadoInicial = this.listaVertices[0]
        estadosPila.push([estadoInicial])

        let con0 = this.buscarHastaDondeLlega(estadosPila[0], 0)
        let con1 = this.buscarHastaDondeLlega(estadosPila[0], 1)

        console.log(estadosPila.length)

        console.log(0, con0)
        console.log(1, con1)


        con0.forEach(estado => {
            if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                estadosPila.push(estado)
            }
            aristas.push({
                Origen: [estadoInicial],
                Destino: estado,
                Peso: 0
            })
        })

        con1.forEach(estado => {
            if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                estadosPila.push(estado)
            }
            aristas.push({
                Origen: [estadoInicial],
                Destino: estado,
                Peso: 1
            })
        })

        console.log(estadosPila.length)

        con0 = this.buscarHastaDondeLlega(estadosPila[1], 0)
        con1 = this.buscarHastaDondeLlega(estadosPila[1], 1)

        console.log(0, con0)
        console.log(1, con1)

        con0.forEach(estado => {
            if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                estadosPila.push(estado)
            }
            aristas.push({
                Origen: estadosPila[1],
                Destino: estado,
                Peso: 0
            })
        })

        con1.forEach(estado => {
            if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                estadosPila.push(estado)
            }
            aristas.push({
                Origen: estadosPila[1],
                Destino: estado,
                Peso: 1
            })
        })

        console.log(estadosPila.length)

        con0 = this.buscarHastaDondeLlega(estadosPila[2], 0)
        con1 = this.buscarHastaDondeLlega(estadosPila[2], 1)

        console.log(0, con0)
        console.log(1, con1)

        con0.forEach(estado => {
            if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                estadosPila.push(estado)
            }
            aristas.push({
                Origen: estadosPila[2],
                Destino: estado,
                Peso: 0
            })
        })

        con1.forEach(estado => {
            if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                estadosPila.push(estado)
            }
            aristas.push({
                Origen: estadosPila[2],
                Destino: estado,
                Peso: 1
            })
        })

        console.log(estadosPila.length)
        console.log(estadosPila)
        console.log(aristas)

    }

    AFNDaAFDDinamico() {
        let estadosPila = []
        let aristas = []

        let estadoInicial = this.listaVertices[0]
        estadosPila.push([estadoInicial])

        let i = 0
        while (i < estadosPila.length) {
            let con0 = this.buscarHastaDondeLlega(estadosPila[i], 0, false)
            let con1 = this.buscarHastaDondeLlega(estadosPila[i], 1, false)

            console.log("con0",con0)
            console.log("con1",con1)

            con0.forEach(estado => {
                if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                    estadosPila.push(estado)
                }
                aristas.push({
                    Origen: estadosPila[i],
                    Destino: estado,
                    Peso: 0
                })
            })

            con1.forEach(estado => {
                if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                    estadosPila.push(estado)
                }
                aristas.push({
                    Origen: estadosPila[i],
                    Destino: estado,
                    Peso: 1
                })
            })

            i++
        }

        let estadosFinalesOriginal = this.getListaVertices().filter(estado => estado.GetEstadoFinal())
        let estadosFinalesNombres = estadosFinalesOriginal.map(estado => estado.GetDato())

        let estadosNuevos = []
        estadosPila.forEach(estado => {

            let esFinal = false
            estado.forEach(e => {
                if (estadosFinalesNombres.includes(e.dato)) {
                    esFinal = true
                }
            })

            let nombre = ""
            estado.forEach(e => {
                nombre += e.dato
            })
            estadosNuevos.push({
                key: nombre,
                name: nombre,
                esEstadoFinal: esFinal
            })

        })

        let transicionesNuevas = []

        aristas.forEach(transicion => {
            let origen = ""
            let destino = ""
            transicion.Origen.forEach(e => {
                origen += e.dato
            })
            transicion.Destino.forEach(e => {
                destino += e.dato
            })
            transicionesNuevas.push({ from: origen, to: destino, text: `${transicion.Peso}` })
        })

        return {
            estados: estadosNuevos,
            transiciones: transicionesNuevas
        }
    }

    


    // AFNDaAFDDinamicoLAMBDA() {
    //     let estadosPila = [];
    //     let aristas = [];
      
    //     let estadoInicial = this.listaVertices[0];
    //     estadosPila.push([estadoInicial]);
      
    //     let i = 0;
    //     while (i < estadosPila.length) {
    //       let con0 = this.buscarHastaDondeLlega(estadosPila[i], 0, false);
    //       let con1 = this.buscarHastaDondeLlega(estadosPila[i], 1, false);
      
    //       let cerradura0 = this.cerrarConLambda(con0);
    //       let cerradura1 = this.cerrarConLambda(con1);
      
    //       cerradura0.forEach(estado => {
    //         if (!this.yaEstaEnLaLista(estado, estadosPila)) {
    //           estadosPila.push(estado);
    //         }
    //         aristas.push({
    //           Origen: estadosPila[i],
    //           Destino: estado,
    //           Peso: 0
    //         });
    //       });
      
    //       cerradura1.forEach(estado => {
    //         if (!this.yaEstaEnLaLista(estado, estadosPila)) {
    //           estadosPila.push(estado);
    //         }
    //         aristas.push({
    //           Origen: estadosPila[i],
    //           Destino: estado,
    //           Peso: 1
    //         });
    //       });
      
    //       i++;
    //     }
      
    //     let estadosFinalesOriginal = this.getListaVertices().filter(estado => estado.GetEstadoFinal());
    //     let estadosFinalesNombres = estadosFinalesOriginal.map(estado => estado.GetDato());
      
    //     let estadosNuevos = [];
    //     estadosPila.forEach(estado => {
    //       let esFinal = false;
    //       estado.forEach(e => {
    //         if (estadosFinalesNombres.includes(e.dato)) {
    //           esFinal = true;
    //         }
    //       });
      
    //       let nombre = "";
    //       estado.forEach(e => {
    //         nombre += e.dato;
    //       });
    //       estadosNuevos.push({
    //         key: nombre,
    //         name: nombre,
    //         esEstadoFinal: esFinal
    //       });
    //     });
      
    //     let transicionesNuevas = [];
    //     aristas.forEach(transicion => {
    //       let origen = "";
    //       let destino = "";
    //       transicion.Origen.forEach(e => {
    //         origen += e.dato;
    //       });
    //       transicion.Destino.forEach(e => {
    //         destino += e.dato;
    //       });
    //       if (transicion.Peso !== "") {
    //         transicionesNuevas.push({ from: origen, to: destino, text: `${transicion.Peso}` });
    //       }
    //     });
      
    //     return {
    //       estados: estadosNuevos,
    //       transiciones: transicionesNuevas
    //     };
    //   }
      
    //   cerrarConLambda(estado) {
    //     let pila = [...estado];
    //     let cerradura = [...estado];
      
    //     while (pila.length > 0) {
    //       let actual = pila.pop();
    //       let transicionesLambda = this.buscarHastaDondeLlega(actual, "", true);
      
    //       for (let estadoLambda of transicionesLambda) {
    //         if (!cerradura.includes(estadoLambda)) {
    //           cerradura.push(estadoLambda);
    //           pila.push(estadoLambda);
    //         }
    //       }
    //     }
      
    //     return cerradura;
    //   }
      





}

export default Grafo