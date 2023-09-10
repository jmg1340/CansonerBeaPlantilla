<template>
  <q-page class="">




    <div class="row q-ma-sm q-gutter-md">
      <div class="col-6 " >
        <div class="column">



          <div class="row justify-between">
            <div class="col text-h6">Lletra</div>
            <div class="text-red-10">** Tips **
              <q-tooltip style="font-size: 15px">
                <ul>
                  <li><span class="text-bold">Intro:</span> nova linia</li>
                  <li><span class="text-bold">Linia en blanc:</span> propera linia no en blanc -> nova estrofa</li>
                  <li><span class="text-bold">Linia amb només una "t":</span> la estrofa serà una tornada (estribill)</li>
                  <li><span class="text-bold">Linia amb només una "a":</span> la estrofa serà una anotacio (que nomes serà visible quan estiguin activats els acords al cançoner)</li>
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
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'PageIndex',
  components: { cmpParagraf },

  setup() {
    const store = useCansoStore()
    const $q = useQuasar()


    let canso = ref({
      lletra: [
        // {
        //   tipus: "estrofa" / "tornada",
        //   paragraf: []
        // }
      ]
    })











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

      const assignarTipus = ( lletra ) => {
        switch ( lletra ){
          case "a":
            return "anotacio"; break
          case "t":
            return "tornada"; break
          default:
            return "estrofa"; break
        }
      }

      const arrLletra = arrParagrafs.map( arrParagraf => {
        let arrP = []
        if (arrParagraf.length !== 0   &&   ( arrParagraf[0].text.toLowerCase() === "t" || arrParagraf[0].text.toLowerCase() === "a")){
          arrP = arrParagraf.slice(1)   // el paragraf serà array a partir de la segona linia
        } else {
          arrP = arrParagraf
        }

        return {
          // tipus: (arrParagraf.length !== 0   &&   arrParagraf[0].text.toLowerCase() === "t") ? "tornada" : "estrofa" ,
          tipus: ( arrParagraf.length !== 0 ) ?  assignarTipus(arrParagraf[0].text.toLowerCase()) : "estrofa",
          visibleAlsMusics: true,
          vegades: 0,    // vegades que es canta la estrofa / tornada
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

    }
  }
})
</script>


