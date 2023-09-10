import { defineStore } from 'pinia';
import cansonerunic from "../assets/cansonerUnic"

export const useCansoStore = defineStore('canso', {
  state: () => ({
    // counter: 0,
    cansoner: "",
    numeroCanso: "",
    idioma: "",
    titol: "",
    audio: "",
    textLletra: "",
    lletra: [],
    objLletraAcordsEditat: {},

    cansonerBV: null,
    numeroBV: null,

    acords: null,


    cansonerUnic: cansonerunic,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
    getterLletra: (state) => state.lletra,
    calculValorAudio ( state ) {
      console.log("estic dins funcio audio")
      if (state.audio === null) return null
      if (state.audio.length === 0) {
        return null
      } else {
        return [
            {
              src: "https://docs.google.com/uc?export=&id="+state.audio,
              type: "audio/mp3"
            }
          ]
      }
    },

    arrDadesBasiquesCansons: (state) => {
      // [ id, idioma, cansonerNom, cansonerNumero ]
      return state.cansonerUnic.reduce( (ac, c) => {
        let arr = []

        const arrIdiomes = Object.keys( c.idiomes )
        arrIdiomes.forEach ( i => {
          
          const arrCansoners = Object.values( c.idiomes[i].cansoners )
          arrCansoners.forEach ( cn => {
            
            const obj = {}
            obj.id = c.id
            obj.idioma = i
            obj.titol = c.idiomes[i].titol

            obj.cansonerNom = cn.nom
            obj.numero = cn.numero
            obj.estat = cn.estat

            obj.audio = c.idiomes[i].hasOwnProperty('audio') && c.idiomes[i].audio !== null 
            obj.acords = c.idiomes[i].lletra.some( estrofa => {
              return estrofa.paragraf.some( ( linia ) => linia.hasOwnProperty('acordsASobre') ) 
            })
    

            arr.push(obj)
            
          })

        })

        return [ ...ac, ...arr ]

      }, [])
    },


  },
  actions: {
    // increment() {
    //   this.counter++;
    // },


    guardaCansoner(text) { this.cansoner = text },
    guardaNumeroCanso(text) { this.numeroCanso = parseInt(text) },
    guardaIdioma(text) { this.idioma = text },
    guardaTitol(text) { this.titol = text },
    guardaAudio(text) {  this.audio = text },


    guardaCansonerBV( text ) { this.cansonerBV = text },
    guardaNumeroBV ( num ) { this.numeroBV = num },

    guardaAcords ( acordsCopiats ) { this.acords = JSON.parse(JSON.stringify(acordsCopiats)) },
    eliminaAcords ( idxEstrofa, idxLinia, acordsASobreASota ) { delete this.lletra[idxEstrofa].paragraf[idxLinia][acordsASobreASota] },

    guardaTextLletra(text) { this.textLletra = text },
    guardaArrLletra(arr) { this.lletra = arr },
    modificarLletraAcordsEditat (obj) { 
			console.log("estic a MODIFICAR_LLETRA_ACORDS_EDITAT")
			console.log( "obj", obj)
			this.objLletraAcordsEditat = JSON.parse(JSON.stringify( obj )) 
		},
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
