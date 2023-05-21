class Arista {
    constructor(Origen, Destino, Peso) {
      this.Origen = Origen;
      this.Destino = Destino;
      this.Peso = Peso;
    }
  
    GetOrigen() {
      return this.Origen;
    }
  
    GetDestino() {
      return this.Destino;
    }
  
    GetPeso() {
      return this.Peso;
    }
  }
  
  export default Arista