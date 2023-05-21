class Vertice {
    constructor(dato) {
        this.dato = dato
        this.ListaAdyacentes = []
        this.estadoFinal = false
    }

    GetEstadoFinal() {
        return this.estadoFinal
    }

    SetEstadoFinal(estadoFinal) {
        this.estadoFinal = estadoFinal
    }

    GetDato() {
        return this.dato
    }

    SetDato(dato) {
        this.dato = dato
    }

    GetAdyacentes() {
        return this.ListaAdyacentes
    }

    SetAdyacentes(adyacentes) {
        this.ListaAdyacentes = adyacentes
    }

}

export default Vertice