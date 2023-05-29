import { defineStore } from 'pinia';

export const useCansoStore = defineStore('canso', {
  state: () => ({
    // counter: 0,
    cansoner: "",
    numeroCanso: "",
    idioma: "",
    titol: "",
    audio: null,
    textLletra: "",
    lletra: [],
    objLletraAcordsEditat: {},

    cansonerBV: null,
    numeroBV: null,

    acords: null
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
    getterLletra: (state) => state.lletra
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },


    guardaCansoner(text) { this.cansoner = text },
    guardaNumeroCanso(text) { this.numeroCanso = text },
    guardaIdioma(text) { this.idioma = text },
    guardaTitol(text) { this.titol = text },
    guardaAudio(text) { (text == null || text == "") ? null : this.audio = text },

    guardaCansonerBV( text ) { this.cansonerBV = text },
    guardaNumeroBV ( num ) { this.numeroBV = num },

    guardaAcords ( acordsCopiats ) { this.acords = acordsCopiats },
    eliminaAcords ( idxEstrofa, idxLinia, acordsASobreASota ) { delete this.lletra[idxEstrofa].paragraf[idxLinia][acordsASobreASota] },

    guardaTextLletra(text) { this.textLletra = text },
    guardaArrLletra(arr) { this.lletra = arr },
    modificarLletraAcordsEditat (obj) { this.objLletraAcordsEditat = obj },
    guardarLletraAcords(idxEstrofa, idxLinia) {
      console.log("Estic a guardarLletraAcords del STORE")
      console.log( "idxEstrofa", idxEstrofa)
      console.log( "idxLinia", idxLinia )
      console.log( "this.objLletraAcordsEditat", this.objLletraAcordsEditat)
      console.log( "this.lletra[idxEstrofa]", this.lletra[idxEstrofa])
      // Fem la substitució.
      this.lletra[idxEstrofa].paragraf.splice(idxLinia, 1, this.objLletraAcordsEditat)

      console.log( "this.lletra[idxEstrofa].paragraf[idxLinia]", this.lletra[idxEstrofa].paragraf[idxLinia])
    }

  },
});
