import Vertice from "./Vertice.js"
import Arista from "./Arista.js"
import _ from 'lodash'

class Grafo {

<<<<<<< HEAD
    constructor() {
        this.listaVertices = []
        this.listaAristas = []
        this.visitadosCp = []
        this.visitadosCa = []
        this.adyacencias = {}
        this.repetidos = 0
        this.obstruidos = []
        this.estadosFinales=[]
        this.estadoInicial= 0
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
        this.repetidos = 0
        this.obstruidos = []
        this.estadosFinales=[]
        this.estadoInicial=0
        this.aristasAmplitud = []
        this.estadosAuxiliar = []
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
        console.log(estadoActual.GetDato() + " " + posicionActual + " " + cadenaArr.length)
        if (posicionActual == cadenaArr.length) {
            if (estadoActual.estadoFinal) {
                console.log('cadena válida')
                alert('cadena válida')
            } else {
                console.log('cadena inválida')
                alert('cadena inválida')
            }
            return
        } else {
            //* si el estado actual no tiene aristas
            if (estadoActual.ListaAdyacentes.length == 0) {
                console.log('cadena inválida')
                alert('cadena inválida')
                return
            }
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

    //* Hasta donde llega UN SOLO estado con un peso *//
    //* por ejemplo: hasta donde llega el estado A con el peso 1 *//
    //* por ejemplo: hasta donde llega el estado A con el peso '' <-- LAMBDA *//
    buscarHastaDondeLlegaL(estado, peso, pesoGastado = false) {
        //* Tomo el estado
        let estadoInicial = this.getVertice(estado)

        //* tomo las aristas que salen del estado con el peso
        let aristasEstado = []
        this.listaAristas.forEach(arista => {
            if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === peso) {
                aristasEstado.push(arista)
            }
        })

        //* condiciones

        //* SI EL ESTADO NO TIENE ARISTAS CON ESE PESO *//
        if(aristasEstado.length === 0){
            //* TOMO LAS ARISTAS QUE SALEN DEL ESTADO CON LAMBDA *//
            aristasEstado = []
            this.listaAristas.forEach(arista => {
                if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === '') {
                    aristasEstado.push(arista)
                }
            })
            
            //* SI EL ESTADO NO TIENE ARISTAS CON LAMBDA *//
            if(aristasEstado.length === 0){

                //* SI YA GASTÓ EL PESO *//
                if(pesoGastado) {
                    this.estadosAuxiliar.push(estadoInicial.dato)
                } 

            //* SI EL ESTADO SI TIENE ARISTAS CON LAMBDA *//
            } else {
                //* RECORRO LAS ARISTAS CON LAMBDA *//
                aristasEstado.forEach(arista => {
                    //* TOMO EL ESTADO DESTINO
                    let nuevoestado = arista.Destino.GetDato()
                    
                    //* BUSCO ARISTAS QUE SALGAN DEL ESTADO DESTINO CON OTRO PESO QUE NO SEA LAMBDA *//
                    let aristasNuevoEstado = []
                    this.listaAristas.forEach(arista => {
                        if (arista.Origen.GetDato() == nuevoestado && arista.GetPeso() !== peso && arista.GetPeso() !== '') {
                            aristasNuevoEstado.push(arista)
                        }
                    })
                    //* SI EL ESTADO DESTINO NO TIENE ARISTAS CON OTRO PESO QUE NO SEA LAMBDA *//
                    if(aristasNuevoEstado.length !== 0){
                        //* LO AGREGO*//
                        this.estadosAuxiliar.push(nuevoestado)
                    }
                    this.buscarHastaDondeLlegaL(nuevoestado, peso, pesoGastado)
                })
            }
            
        } else {
            //* SI EL ESTADO SI TIENE ARISTAS CON ESE PESO *//
            aristasEstado.forEach(arista => {
                //* SI EL PESO NO ESTÁ GASTADO *//
                if(!pesoGastado) {
                    let nuevoestado = arista.Destino.GetDato()
                
                    this.buscarHastaDondeLlegaL(nuevoestado, peso, true)
                } else {
                    //* SI EL PESO ESTÁ GASTADO LO AGREGO*//
                    this.estadosAuxiliar.push(estadoInicial.dato)
    
                    //* BUSCO SI HAY ARISTAS CON LAMBDA *//
                    aristasEstado = []
                    this.listaAristas.forEach(arista => {
                        if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === '') {
                            aristasEstado.push(arista)
                        }
                    })
                    
                    //* SI EL ESTADO TIENE ARISTAS CON LAMBDA *//
                    if(aristasEstado.length !== 0){
                        //* RECORRO LAS ARISTAS CON LAMBDA *//
                        aristasEstado.forEach(arista => {
                            let nuevoEstado = arista.Destino.GetDato()
                            this.buscarHastaDondeLlegaL(nuevoEstado, peso, true)
                        })
                    }
                }
            })
        }
        //* RETORNO LOS ESTADOS QUE LLEGAN CON ESE PESO *//
        return this.estadosAuxiliar
    }

    //* metodo que me dice si el automata es afnd o no
    esAFND() {
        let esAFND = false
        this.listaAristas.forEach(arista => {
            if(arista.GetPeso() === '') {
                esAFND = true
            }
        })

        //* si hay dos aristas con el mismo peso y el mismo origen es afnd
        this.listaAristas.forEach(arista => {
            let peso = arista.GetPeso()
            let origen = arista.Origen.GetDato()
            let aristas = []
            this.listaAristas.forEach(arista => {
                if(arista.GetPeso() === peso && arista.Origen.GetDato() === origen) {
                    aristas.push(arista)
                }
            })
            if(aristas.length > 1) {
                esAFND = true
            }
        })

        return esAFND
    }

    //* varios estados hasta donde llegan con lambda por ejemplo [A, B, C] con el peso 1
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

    //* metodo que me dice si hay elementos repetidos en un arreglo de arreglos de vertices usando lodash
    hayRepetidos(arreglo) {
        arreglo = _.flatten(arreglo)
        let repetidos = _.uniq(arreglo)
        return arreglo.length !== repetidos.length
    }

    //* metodo que me verifica si hay repetidos y si los hay devuelve un arreglo sin repetidos y si no hay repetidos devuelve el mismo arreglo
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

    //* metodo que forma el AFD que tiene lambda originalmente
    AFNDaAFD2DinamicoLambda() {
        let estadosPila = []
        let aristas = []

        //* Agreggo el estado inicial a la pila de estados 
        let estadoInicial = this.listaVertices[0]
        estadosPila.push([estadoInicial])

        //* tomo la pila de estados y voy a ir agregando estados hasta que no haya mas estados para agregar
        let i = 0
        while (i < estadosPila.length) {

            //* busco hasta donde el estado actual llega con 0 y 1
            let con0 = this.buscarHastaDondeLlegaTodos(estadosPila[i], 0)
            let con1 = this.buscarHastaDondeLlegaTodos(estadosPila[i], 1)

            //* elimino repetidos por ejemplo: [['J'], ['J']] -> [['J']]
            con0 = this.eliminarRepetidos(con0)
            con1 = this.eliminarRepetidos(con1)

            //* recorro los estados a los que llega con 0 y 1 y los agrego a la pila de estados

            con0.forEach(estado => {

                //* verifico que retorne mas de 1 estado
                if(estado.length > 0) {
                    //* si no esta en la pila de estados lo agrego
                    if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                        estadosPila.push(estado)
                    }
                    //* creo la arista
                    aristas.push({
                        Origen: estadosPila[i],
                        Destino: estado,
                        Peso: 0
                    })
                }
            })

            con1.forEach(estado => {

                //* verifico que retorne mas de 1 estado
                if( estado.length > 0) {
                    //* si no esta en la pila de estados lo agrego
                    if (!this.yaEstaEnLaLista(estado, estadosPila)) {
                        estadosPila.push(estado)
                    }
                    //* creo la arista
                    aristas.push({
                        Origen: estadosPila[i],
                        Destino: estado,
                        Peso: 1
                    })
                }
            })

            //* aumento el contador
            i++
        }

        //* ahora tengo que crear los estados y las transiciones para pasarle a la interfaz gráfica

        //* obtengo los estados finales del automata original
        let estadosFinalesOriginal = this.getListaVertices().filter(estado => estado.GetEstadoFinal())
        let estadosFinalesNombres = estadosFinalesOriginal.map(estado => estado.GetDato())

        //* creo los estados nuevos y si es final se lo asigno
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

        //* creo las transiciones nuevas y las agrego
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
        console.log(estadosNuevos)

        //* retorno los estados y las transiciones
        return {
            estados: estadosNuevos,
            transiciones: transicionesNuevas
        }
    }
    
    //* le paso lista y un estado y me dice si el estado esta en la lista usando lodash
    yaEstaEnLaLista(estado, lista) {
        for (let i = 0;i < lista.length;i++) {
            if (_.isEqual(estado, lista[i])) {
                return true
            }
        }
        return false
    }

     // //* me dice hasta donde llega un estado con un peso
    // buscarHastaDondeLlega(estado, peso) {
    //     if (estado.length === 1) {
    //         let aristasEstado = []
    //         this.listaAristas.forEach(arista => {
    //             if ((arista.Origen.GetDato() === estado[0].GetDato()) && arista.GetPeso() === peso) {
    //                 aristasEstado.push(arista)
    //             }
    //         })
    
    //         let estados = []
    //         aristasEstado.forEach(arista => {
    //             estados.push(arista.Destino)
    //         })
    //         return [estados]
    //     } else {
    //         let aristasEstado = []
    //         this.listaAristas.forEach(arista => {
    //             estado.forEach(estado => {
    //                 if ((arista.Origen.GetDato() === estado.GetDato()) && arista.GetPeso() === peso) {
    //                     aristasEstado.push(arista)
    //                 }
    //             })
    //         })
    
    //         let estados = []
    //         aristasEstado.forEach(arista => {
    //             estados.push(arista.Destino)
    //         })
            
    //         return [estados]
    //     }
    // }

    //* metodo que forma el AFD que no tiene lambda originalmente
    // AFNDaAFDDinamico() {
    //     let estadosPila = []
    //     let aristas = []

    //     let estadoInicial = this.listaVertices[0]
    //     estadosPila.push([estadoInicial])

    //     let i = 0
    //     while (i < estadosPila.length) {
    //         let con0 = this.buscarHastaDondeLlega(estadosPila[i], 0, false)
    //         let con1 = this.buscarHastaDondeLlega(estadosPila[i], 1, false)

    //         con0.forEach(estado => {
    //             if (!this.yaEstaEnLaLista(estado, estadosPila)) {
    //                 estadosPila.push(estado)
    //             }
    //             aristas.push({
    //                 Origen: estadosPila[i],
    //                 Destino: estado,
    //                 Peso: 0
    //             })
    //         })

    //         con1.forEach(estado => {
    //             if (!this.yaEstaEnLaLista(estado, estadosPila)) {
    //                 estadosPila.push(estado)
    //             }
    //             aristas.push({
    //                 Origen: estadosPila[i],
    //                 Destino: estado,
    //                 Peso: 1
    //             })
    //         })

    //         i++
    //     }

    //     let estadosFinalesOriginal = this.getListaVertices().filter(estado => estado.GetEstadoFinal())
    //     let estadosFinalesNombres = estadosFinalesOriginal.map(estado => estado.GetDato())

    //     let estadosNuevos = []
    //     estadosPila.forEach(estado => {

    //         let esFinal = false
    //         estado.forEach(e => {
    //             if (estadosFinalesNombres.includes(e.dato)) {
    //                 esFinal = true
    //             }
    //         })

    //         let nombre = ""
    //         estado.forEach(e => {
    //             nombre += e.dato
    //         })
    //         estadosNuevos.push({
    //             key: nombre,
    //             name: nombre,
    //             esEstadoFinal: esFinal
    //         })

    //     })

    //     let transicionesNuevas = []

    //     aristas.forEach(transicion => {
    //         let origen = ""
    //         let destino = ""
    //         transicion.Origen.forEach(e => {
    //             origen += e.dato
    //         })
    //         transicion.Destino.forEach(e => {
    //             destino += e.dato
    //         })
    //         transicionesNuevas.push({ from: origen, to: destino, text: `${transicion.Peso}` })
    //     })

    //     return {
    //         estados: estadosNuevos,
    //         transiciones: transicionesNuevas
    //     }
    // }
=======
	constructor() {
		this.listaVertices = []
		this.listaAristas = []
		this.visitadosCp = []
		this.visitadosCa = []
		this.adyacencias = {}
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
		this.repetidos = 0
		this.obstruidos = []
		this.aristasAmplitud = []
		this.estadosAuxiliar = []
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
		console.log(estadoActual.GetDato() + " " + posicionActual + " " + cadenaArr.length)
		if (posicionActual == cadenaArr.length) {
			if (estadoActual.estadoFinal) {
				console.log('cadena válida')
				alert('cadena válida')
			} else {
				console.log('cadena inválida')
				alert('cadena inválida')
			}
			return
		} else {
			//* si el estado actual no tiene aristas
			if (estadoActual.ListaAdyacentes.length == 0) {
				console.log('cadena inválida')
				alert('cadena inválida')
				return
			}
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

	//* Hasta donde llega UN SOLO estado con un peso *//
	//* por ejemplo: hasta donde llega el estado A con el peso 1 *//
	//* por ejemplo: hasta donde llega el estado A con el peso '' <-- LAMBDA *//
	buscarHastaDondeLlegaL(estado, peso, pesoGastado = false) {
		//* Tomo el estado
		let estadoInicial = this.getVertice(estado)

		//* tomo las aristas que salen del estado con el peso
		let aristasEstado = []
		this.listaAristas.forEach(arista => {
			if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === peso) {
				aristasEstado.push(arista)
			}
		})

		//* condiciones

		//* SI EL ESTADO NO TIENE ARISTAS CON ESE PESO *//
		if(aristasEstado.length === 0){
			//* TOMO LAS ARISTAS QUE SALEN DEL ESTADO CON LAMBDA *//
			aristasEstado = []
			this.listaAristas.forEach(arista => {
				if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === '') {
					aristasEstado.push(arista)
				}
			})
			
			//* SI EL ESTADO NO TIENE ARISTAS CON LAMBDA *//
			if(aristasEstado.length === 0){

				//* SI YA GASTÓ EL PESO *//
				if(pesoGastado) {
					this.estadosAuxiliar.push(estadoInicial.dato)
				} 

			//* SI EL ESTADO SI TIENE ARISTAS CON LAMBDA *//
			} else {
				//* RECORRO LAS ARISTAS CON LAMBDA *//
				aristasEstado.forEach(arista => {
					//* TOMO EL ESTADO DESTINO
					let nuevoestado = arista.Destino.GetDato()
					
					//* BUSCO ARISTAS QUE SALGAN DEL ESTADO DESTINO CON OTRO PESO QUE NO SEA LAMBDA *//
					let aristasNuevoEstado = []
					this.listaAristas.forEach(arista => {
						if (arista.Origen.GetDato() == nuevoestado && arista.GetPeso() !== peso && arista.GetPeso() !== '') {
							aristasNuevoEstado.push(arista)
						}
					})
					//* SI EL ESTADO DESTINO NO TIENE ARISTAS CON OTRO PESO QUE NO SEA LAMBDA *//
					if(aristasNuevoEstado.length !== 0){
						//* LO AGREGO*//
						this.estadosAuxiliar.push(nuevoestado)
					}
					this.buscarHastaDondeLlegaL(nuevoestado, peso, pesoGastado)
				})
			}
			
		} else {
			//* SI EL ESTADO SI TIENE ARISTAS CON ESE PESO *//
			aristasEstado.forEach(arista => {
				//* SI EL PESO NO ESTÁ GASTADO *//
				if(!pesoGastado) {
					let nuevoestado = arista.Destino.GetDato()
				
					this.buscarHastaDondeLlegaL(nuevoestado, peso, true)
				} else {
					//* SI EL PESO ESTÁ GASTADO LO AGREGO*//
					this.estadosAuxiliar.push(estadoInicial.dato)
	
					//* BUSCO SI HAY ARISTAS CON LAMBDA *//
					aristasEstado = []
					this.listaAristas.forEach(arista => {
						if (arista.Origen.GetDato() == estadoInicial.dato && arista.GetPeso() === '') {
							aristasEstado.push(arista)
						}
					})
					
					//* SI EL ESTADO TIENE ARISTAS CON LAMBDA *//
					if(aristasEstado.length !== 0){
						//* RECORRO LAS ARISTAS CON LAMBDA *//
						aristasEstado.forEach(arista => {
							let nuevoEstado = arista.Destino.GetDato()
							this.buscarHastaDondeLlegaL(nuevoEstado, peso, true)
						})
					}
				}
			})
		}
		//* RETORNO LOS ESTADOS QUE LLEGAN CON ESE PESO *//
		return this.estadosAuxiliar
	}

	//* metodo que me dice si el automata es afnd o no
	esAFND() {
		let esAFND = false
		this.listaAristas.forEach(arista => {
			if(arista.GetPeso() === '') {
				esAFND = true
			}
		})

		//* si hay dos aristas con el mismo peso y el mismo origen es afnd
		this.listaAristas.forEach(arista => {
			let peso = arista.GetPeso()
			let origen = arista.Origen.GetDato()
			let aristas = []
			this.listaAristas.forEach(arista => {
				if(arista.GetPeso() === peso && arista.Origen.GetDato() === origen) {
					aristas.push(arista)
				}
			})
			if(aristas.length > 1) {
				esAFND = true
			}
		})

		return esAFND
	}

	//* varios estados hasta donde llegan con lambda por ejemplo [A, B, C] con el peso 1
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

	//* metodo que me dice si hay elementos repetidos en un arreglo de arreglos de vertices usando lodash
	hayRepetidos(arreglo) {
		arreglo = _.flatten(arreglo)
		let repetidos = _.uniq(arreglo)
		return arreglo.length !== repetidos.length
	}

	//* metodo que me verifica si hay repetidos y si los hay devuelve un arreglo sin repetidos y si no hay repetidos devuelve el mismo arreglo
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

	//* metodo que forma el AFD que tiene lambda originalmente
	AFNDaAFD2DinamicoLambda() {
		let estadosPila = []
		let aristas = []

		//* Agreggo el estado inicial a la pila de estados 
		let estadoInicial = this.listaVertices[0]
		estadosPila.push([estadoInicial])

		//* tomo la pila de estados y voy a ir agregando estados hasta que no haya mas estados para agregar
		let i = 0
		while (i < estadosPila.length) {

			//* busco hasta donde el estado actual llega con 0 y 1
			let con0 = this.buscarHastaDondeLlegaTodos(estadosPila[i], 0)
			let con1 = this.buscarHastaDondeLlegaTodos(estadosPila[i], 1)

			//* elimino repetidos por ejemplo: [['J'], ['J']] -> [['J']]
			con0 = this.eliminarRepetidos(con0)
			con1 = this.eliminarRepetidos(con1)

			//* recorro los estados a los que llega con 0 y 1 y los agrego a la pila de estados

			con0.forEach(estado => {

				//* verifico que retorne mas de 1 estado
				if(estado.length > 0) {
					//* si no esta en la pila de estados lo agrego
					if (!this.yaEstaEnLaLista(estado, estadosPila)) {
						estadosPila.push(estado)
					}
					//* creo la arista
					aristas.push({
						Origen: estadosPila[i],
						Destino: estado,
						Peso: 0
					})
				}
			})

			con1.forEach(estado => {

				//* verifico que retorne mas de 1 estado
				if( estado.length > 0) {
					//* si no esta en la pila de estados lo agrego
					if (!this.yaEstaEnLaLista(estado, estadosPila)) {
						estadosPila.push(estado)
					}
					//* creo la arista
					aristas.push({
						Origen: estadosPila[i],
						Destino: estado,
						Peso: 1
					})
				}
			})

			//* aumento el contador
			i++
		}

		//* ahora tengo que crear los estados y las transiciones para pasarle a la interfaz gráfica

		//* obtengo los estados finales del automata original
		let estadosFinalesOriginal = this.getListaVertices().filter(estado => estado.GetEstadoFinal())
		let estadosFinalesNombres = estadosFinalesOriginal.map(estado => estado.GetDato())

		//* creo los estados nuevos y si es final se lo asigno
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

		//* creo las transiciones nuevas y las agrego
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
		console.log(estadosNuevos)

		//* retorno los estados y las transiciones
		return {
			estados: estadosNuevos,
			transiciones: transicionesNuevas
		}
	}
	
	//* le paso lista y un estado y me dice si el estado esta en la lista usando lodash
	yaEstaEnLaLista(estado, lista) {
		for (let i = 0;i < lista.length;i++) {
			if (_.isEqual(estado, lista[i])) {
				return true
			}
		}
		return false
	}

	 // //* me dice hasta donde llega un estado con un peso
	// buscarHastaDondeLlega(estado, peso) {
	//     if (estado.length === 1) {
	//         let aristasEstado = []
	//         this.listaAristas.forEach(arista => {
	//             if ((arista.Origen.GetDato() === estado[0].GetDato()) && arista.GetPeso() === peso) {
	//                 aristasEstado.push(arista)
	//             }
	//         })
	
	//         let estados = []
	//         aristasEstado.forEach(arista => {
	//             estados.push(arista.Destino)
	//         })
	//         return [estados]
	//     } else {
	//         let aristasEstado = []
	//         this.listaAristas.forEach(arista => {
	//             estado.forEach(estado => {
	//                 if ((arista.Origen.GetDato() === estado.GetDato()) && arista.GetPeso() === peso) {
	//                     aristasEstado.push(arista)
	//                 }
	//             })
	//         })
	
	//         let estados = []
	//         aristasEstado.forEach(arista => {
	//             estados.push(arista.Destino)
	//         })
			
	//         return [estados]
	//     }
	// }

	//* metodo que forma el AFD que no tiene lambda originalmente
	// AFNDaAFDDinamico() {
	//     let estadosPila = []
	//     let aristas = []

	//     let estadoInicial = this.listaVertices[0]
	//     estadosPila.push([estadoInicial])

	//     let i = 0
	//     while (i < estadosPila.length) {
	//         let con0 = this.buscarHastaDondeLlega(estadosPila[i], 0, false)
	//         let con1 = this.buscarHastaDondeLlega(estadosPila[i], 1, false)

	//         con0.forEach(estado => {
	//             if (!this.yaEstaEnLaLista(estado, estadosPila)) {
	//                 estadosPila.push(estado)
	//             }
	//             aristas.push({
	//                 Origen: estadosPila[i],
	//                 Destino: estado,
	//                 Peso: 0
	//             })
	//         })

	//         con1.forEach(estado => {
	//             if (!this.yaEstaEnLaLista(estado, estadosPila)) {
	//                 estadosPila.push(estado)
	//             }
	//             aristas.push({
	//                 Origen: estadosPila[i],
	//                 Destino: estado,
	//                 Peso: 1
	//             })
	//         })

	//         i++
	//     }

	//     let estadosFinalesOriginal = this.getListaVertices().filter(estado => estado.GetEstadoFinal())
	//     let estadosFinalesNombres = estadosFinalesOriginal.map(estado => estado.GetDato())

	//     let estadosNuevos = []
	//     estadosPila.forEach(estado => {

	//         let esFinal = false
	//         estado.forEach(e => {
	//             if (estadosFinalesNombres.includes(e.dato)) {
	//                 esFinal = true
	//             }
	//         })

	//         let nombre = ""
	//         estado.forEach(e => {
	//             nombre += e.dato
	//         })
	//         estadosNuevos.push({
	//             key: nombre,
	//             name: nombre,
	//             esEstadoFinal: esFinal
	//         })

	//     })

	//     let transicionesNuevas = []

	//     aristas.forEach(transicion => {
	//         let origen = ""
	//         let destino = ""
	//         transicion.Origen.forEach(e => {
	//             origen += e.dato
	//         })
	//         transicion.Destino.forEach(e => {
	//             destino += e.dato
	//         })
	//         transicionesNuevas.push({ from: origen, to: destino, text: `${transicion.Peso}` })
	//     })

	//     return {
	//         estados: estadosNuevos,
	//         transiciones: transicionesNuevas
	//     }
	// }
>>>>>>> 642a323 (changes)

}

export default Grafo