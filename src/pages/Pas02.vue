<template>
  <q-page class="">




    <div class="row q-ma-sm q-gutter-md">
      <div class="col-6 " >
        <div class="column">


          <q-card class="q-mb-md">
            <q-card-section>
              <div>Importar lletra cançoner blau - vermell</div>
              <div class="column q-gutter-sm">
                <q-select class="col" dense outlined v-model="cansoner" :options="[{'label': 'BLAU', 'value': 'blau'},{'label': 'VERMELL', 'value': 'vermell'}]" label="Cansoner BLAU - VERMELL" @update:model-value="store.guardaCansonerBV(cansoner)"/>
                <q-input class="col" dense type="number" filled v-model="numero" label="numero de la cançó:" @update:model-value="store.guardaNumeroBV(numero)"/>

                <q-btn class="col" label="Importar" dense color="green" noCaps @click="importarCanso()"/>
              </div>


            </q-card-section>
          </q-card>


          <div class="row justify-between">
            <div class="col text-h6">Lletra</div>
            <div class="text-red-10">** Tips **
              <q-tooltip style="font-size: 15px">
                <ul>
                  <li><span class="text-bold">Intro:</span> nova linia</li>
                  <li><span class="text-bold">Linia en blanc:</span> propera linia no en blanc -> nova estrofa</li>
                  <li><span class="text-bold">Linia amb només una "t":</span> la estrofa serà una tornada (estribill)</li>
                </ul>
              </q-tooltip>
            </div>
          </div>






          <!-- lletra de la cançó -->

					<q-card>
						<q-input dense  v-model="txtAreaLletra" filled type="textarea" autogrow @update:model-value="store.guardaTextLletra(txtAreaLletra)"/>
					</q-card>
        </div>


      </div>

      <!-- INFORMACIO DEL ARRAY RESULTANT -->
      <div class="col ">
        <q-chip color="yellow-3">Guardar això de sota per utilitzar-lo al 3er pas.</q-chip>
        <q-btn class="q-mx-sm" color="orange-10" label="Guardar" dense noCaps @click="store.guardaArrLletra(lletraCanso)"/>
        <pre>{{ lletraCanso }}</pre>
      </div>

    </div>


  </q-page>
</template>






<script>
import { defineComponent, ref, computed } from 'vue';
import cmpParagraf from './paragraf.vue'
import { useCansoStore } from '../stores/example-store'
import cansonerBVjs from '../assets/cansoner'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'PageIndex',
  components: { cmpParagraf },

  setup() {
    const store = useCansoStore()
    const $q = useQuasar()


    const cansoner = ref(store.cansonerBV)
    const numero = ref(store.numeroBV)

    let canso = ref({
      lletra: [
        // {
        //   tipus: "estrofa" / "tornada",
        //   paragraf: []
        // }
      ]
    })




    /**
      Retorna {} on cada propietat es el numero de la canso del state.llibre i cada valor
      es un altre {} amb el ID de la canso i l'idioma
    */
    const cansonerBVDadesAdaptades = () => {
      let obj = {}

      // console.log( "cansonerBVjs", cansonerBVjs )

      for (let idCanso in cansonerBVjs) {
        Object.keys(cansonerBVjs[idCanso]).forEach( function(idioma, index, array) {
          // console.log( idCanso, idioma, cansoner.nom, cansoner.value)
          if ( cansonerBVjs[idCanso][idioma].cansoner.nom == cansoner.value.value ) {

            // Al haver cançons que tenen mateix mateix numero i mateix cansoner, la següent expressio
            // ja no em serveix, ja que no poden haver propietats duplicades. Nomes agafaria una de les 2 cançons (la última)

            // obj[cansonerBVjs[idCanso][idioma].cansoner.numero] = {idCanso, idioma}

            let propietat = cansonerBVjs[idCanso][idioma].cansoner.numero + "_" + idioma
            obj[propietat] = {idCanso, idioma}


          }
        })
      }

      console.log( "cansonerBVDadesAdaptades ", obj)
      return obj

    }



    const importarCanso = () => {
      const objDades = cansonerBVDadesAdaptades()

      const arrNum_Idioma = Object.keys( objDades ).map( elem => {
        const arr = elem.split("_")
        return [ parseInt(arr[0]), arr[1]]
      })
      console.log( "arrNumIdioma", arrNum_Idioma)


      // busquem per numero
      let arrTrobat = arrNum_Idioma.filter( arr => arr[0] == numero.value  )
      console.log( "arrTrobat", arrTrobat, "arrTrobat.length", arrTrobat.length)

      let arrLletra = []


      let idCansoIdioma = {}

      if (arrTrobat.length === 2){
        // Els 2 idiomes tenen assignat el mateix numero de canço. Preguntar importar la canço de quin idioma

        $q
          .dialog({
            title:
              "La següent cançó te mateix cançoner i número de cançó per cada idioma. Quin idioma vols veure ?",
            //message: 'Tria idioma:',
            options: {
              type: "radio",
              model: null,
              // inline: true,
              items: [
                { label: "Català", value: "CAT", color: "secondary" },
                { label: "Castellà", value: "ES" }
              ]
            },
            cancel: false,
            stackButtons: true,
            persistent: true
          })
          .onOk(data => {
            let idioma2 = data;
            arrTrobat = arrTrobat.filter( arr => arr[1] === idioma2)

            idCansoIdioma = objDades[arrTrobat[0][0] + "_" + arrTrobat[0][1]]
            console.log( "idCansoIdioma", idCansoIdioma)
            arrLletra = cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].lletra
            console.log( "arrLletra", arrLletra)

            construccioTxtArea (arrLletra)

          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });

      } else {

        idCansoIdioma = objDades[arrTrobat[0][0] + "_" + arrTrobat[0][1]]
        console.log( "idCansoIdioma", idCansoIdioma)

        store.guardaCansoner(cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].cansoner.nom)
        store.guardaNumeroCanso(cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].cansoner.numero)
        store.guardaIdioma( (() => {
          switch ( idCansoIdioma.idioma ){
            case "CAT":
              return "catala"; break;
            case "ES":
              return "castella"; break;
            default:
              return ""
          }
        })())
        store.guardaTitol(cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].titol)
        store.guardaAudio ( cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].audio )

        arrLletra = cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].lletra
        console.log( "arrLletra", arrLletra)

        construccioTxtArea (arrLletra)

      }

    }


    // ---- cosntruccio del txt que anirà al txtAreaLletra ----
    const construccioTxtArea = (arrLletra) => {
      let txt = ""

      arrLletra.forEach( estrofa => {
        if ( estrofa.tipus === "tornada") txt += "\nt\n"

        estrofa.paragraf.forEach( linia => {
          txt += linia + "\n"
        })
        txt += "\n"

      })

      txtAreaLletra.value = txt.trim()
      store.guardaTextLletra(txt.trim())
    }





    let txtAreaLletra = ref(store.textLletra)

    const lletraCanso = computed ( () => {

      let arrTxtArea = txtAreaLletra.value.split("\n")

      let arrParagraf = []
      let arrParagrafs = arrTxtArea.reduce ( (acc, linia, index, arr) =>{

        linia = linia.replace(/[\t]+/g, '')  // treiem les \t si en te
        linia = linia.trimEnd()
        // console.log("==========================")
        // console.log("LINIA: ", "'"+linia+"'")


        if (index === arr.length - 1  ) {  // si és ultima linia
          // console.log("estic al ULTIM  element de arr i arrParagraf.length no és zero")
          if (linia.length !== 0) arrParagraf.push({text: linia})
          // console.log("index:", index, "arrParagraf:", arrParagraf )
          acc.push(arrParagraf)
          return acc

        } else if (linia.length !== 0) {
          arrParagraf.push({text: linia})
          // console.log("linia.length !== 0")
          // console.log("index:", index, "arrParagraf:", arrParagraf )
          return acc

        } else {
          // console.log("ELSE")
          // console.log("index:", index, "arrParagraf:", arrParagraf )
          if (arrParagraf.length !== 0) acc.push(arrParagraf)
          arrParagraf = []
          // console.log("index:", index, "arrParagraf:", arrParagraf )
          return acc
        }



      }, [])



      /* Per cada paragraf creem un objecte
          {
            tipus: "estrofa" / "tornada"
            paragraf: [paragraf]
          }
      */

      console.log("arrParagrafs", arrParagrafs)


      const arrLletra = arrParagrafs.map( arrParagraf => {
        let arrP = []
        if (arrParagraf.length !== 0   &&   arrParagraf[0].text.toLowerCase() === "t" ){
          arrP = arrParagraf.slice(1)   // el paragraf serà array a partir de la segona linia
        } else {
          arrP = arrParagraf
        }

        return {
          tipus: (arrParagraf.length !== 0   &&   arrParagraf[0].text.toLowerCase() === "t") ? "tornada" : "estrofa" ,
          visibleAlsMusics: true,
          paragraf: arrP
        }
      })


      return arrLletra
    })





    return {
      canso,
      lletraCanso,
			txtAreaLletra,
      // opcioEtiqPRE,
      store,

      numero,
      cansoner,
      importarCanso
    }
  }
})
</script>


