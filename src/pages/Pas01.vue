<template>
  <div class="q-mb-xl">
    <!-- <div class="text-h5">Pas 01</div> -->
    <!-- <div class="column q-gutter-md"> -->
      <div class="row justify-center">
				<div class="col"></div>
				<div class="col text-right">
					<q-btn label="importar" @click="activarImportar = true"/>
				</div>
      </div>
			<div class="row justify-center">			
        <div class="col-6 q-mt-xl">
          <div class="column q-gutter-md">
            <q-select dense outlined v-model="idioma" :options="['ES', 'CAT', 'ANG', 'FRA', 'ITA']" label="Idioma" @update:model-value="store.guardaIdioma(idioma)"/>
            <q-input class="col" filled v-model="cansoner" label="Cançoner:" @update:model-value="store.guardaCansoner(cansoner)"/>

            <q-input class="col" filled v-model="numeroCanso" label="Número de la cançó (si no es una nova cançó):" type="number" @update:model-value="store.guardaNumeroCanso(numeroCanso)"/>

            <!-- <q-input class="col" filled v-model="idioma" label="Idioma de la cançó:" @update:model-value="store.guardaIdioma(idioma)"/> -->

            <q-input class="col q-mb-md" filled v-model="titol" label="Titol de la cançó:" @update:model-value="store.guardaTitol(titol)"/>

            <q-input class="col q-mb-md" filled v-model="audio" label="Audio:" @update:model-value="store.guardaAudio(audio)"/>

          </div>

        </div>
			</div>	

    <!-- </div> -->
  </div>






	<q-dialog v-model="activarImportar">
		<q-card class="q-mb-md">
			<q-card-section>
				<div>Tria cançoner:</div>
				<div class="column q-gutter-sm">
					<q-select class="col" dense outlined v-model="cansonerBV" :options="[{'label': 'BLAU', 'value': 'Blau'},{'label': 'VERMELL', 'value': 'Vermell'}]" label="Cansoner BLAU - VERMELL" @update:model-value="store.guardaCansonerBV(cansonerBV)"/>
					<q-input class="col" dense type="number" filled v-model="numeroBV" label="numero de la cançó:" @update:model-value="store.guardaNumeroBV(numeroBV)"/>

					<q-btn class="col" label="Importar" dense color="green" noCaps @click="importarCanso()"/>
				</div>


			</q-card-section>
		</q-card>

	</q-dialog>






</template>



<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'
import { useCansoStore } from '../stores/example-store'
import cansonerBVjs from '../assets/cansoner'

export default defineComponent({

  setup(){
    const store = useCansoStore()
    const $q = useQuasar()

    const cansonerBV = ref(store.cansonerBV)
    const numeroBV = ref(store.numeroBV)	

    const cansoner = ref(store.cansoner)
    const numeroCanso = ref(store.numeroCanso)
    const idioma = ref(store.idioma)
    const titol = ref(store.titol)
    const audio = ref(store.audio)		
		const activarImportar = ref(false)

    const importarCanso = () => {

      console.log( "cansonerBV", cansonerBV.value.value)
      console.log( "numeroBV", numeroBV.value )
      
      
      const arr = store.arrDadesBasiquesCansons.filter( (c) => c.cansonerNom === cansonerBV.value.value && c.numero == numeroBV.value )
      console.log( "arr", arr)


      let arrLletra = null
      switch ( arr.length ) {
        case 0:
          $q.notify(`No existeix la cançó numero ${numeroBV.value} en el cançoner '${cansonerBV.value.value}'`)
          break
        case 1:
          // s'ha trobat un resultat (un unic idioma)

          store.guardaCansoner(arr[0].cansonerNom)
          cansoner.value = store.cansoner
          store.guardaNumeroCanso(arr[0].numero)
          numeroCanso.value = store.numeroCanso
          store.guardaIdioma( arr[0].idioma)
          idioma.value = store.idioma

          store.guardaTitol( arr[0].titol)
          titol.value = store.titol

          const cansoCansonerUnic = store.cansonerUnic.find( obj => obj.id == arr[0].id ).idiomes[idioma.value]
          console.log( "cansoCansonerUnic", cansoCansonerUnic )

// https://docs.google.com/uc?export=&id=1CL2N99JYkF-ii8KOjBynXf6cJ43w5Kzj          

          if ( arr[0].audio){
            store.guardaAudio ( cansoCansonerUnic.audio[0].src.substring(38,72) )
            audio.value = store.audio
          } else {
            store.guardaAudio ( null )
            audio.value = store.audio
          }
          arrLletra = cansoCansonerUnic.lletra
          console.log( "arrLletra", arrLletra)
          store.guardaArrLletra(arrLletra)

          construccioTxtArea (arrLletra)





          break
        default:
          // s'ha trobat més d'un resultat ( 2 idiomes tenen mateix cansoner i numero )

          const arrIdiomesaTriar = arr.map( o => ( { label: o.idioma, value: o.idioma } ) )

          $q.dialog({
            title:
              "La següent cançó te mateix cançoner i número de cançó per cada idioma. Quin idioma vols veure ?",
            //message: 'Tria idioma:',
            options: {
              type: "radio",
              model: null,
              // inline: true,
              items: arrIdiomesaTriar
            },
            cancel: true,
            stackButtons: true,
            persistent: true
          })
          .onOk( data =>   {
            const idioma2 = data;
            const arr2 = arr.filter( o => o.idioma === idioma2 )
            console.log( "idioma", idioma)

            store.guardaCansoner(arr2[0].cansonerNom)
            cansoner.value = store.cansoner
            console.log( "cansoner", cansoner.value)
            
            store.guardaNumeroCanso(arr2[0].numero)
            numeroCanso.value = store.numeroCanso
            console.log( "numeroCanso", numeroCanso.value)
            
            console.log( "idioma", idioma2)
            store.guardaIdioma(idioma2)
            console.log("store.idioma", store.idioma )
            idioma.value = store.idioma

            store.guardaTitol( arr2[0].titol)
            titol.value = store.titol

            const cansoCansonerUnic = store.cansonerUnic.find( obj => obj.id == arr2[0].id ).idiomes[idioma.value]
            console.log( "cansoCansonerUnic", cansoCansonerUnic )

          

            if ( arr2[0].audio ){
              store.guardaAudio ( cansoCansonerUnic.audio[0].src.substring(38,72) )
              audio.value = store.audio
            } else {
              store.guardaAudio ( null )
              audio.value = store.audio
            }
            arrLletra = cansoCansonerUnic.lletra
            console.log( "arrLletra", arrLletra)
            store.guardaArrLletra(arrLletra)

            construccioTxtArea (arrLletra)


            // activarImportar.value = false









            // const obj = arr.find( o => o.idioma === idioma )
            // router.push({ name: "canso", query: {  id: obj.id, idioma: obj.idioma, cansonerNom: obj.cansonerNom, cansonerNumero: obj.numero  } });
          })
      }





      activarImportar.value = false
    }


    /**
      Retorna {} on cada propietat es el numero de la canso del state.llibre i cada valor
      es un altre {} amb el ID de la canso i l'idioma
    */
    const cansonerBVDadesAdaptades = () => {
      let obj = {}

      // console.log( "cansonerBVjs", cansonerBVjs )

      for (let idCanso in cansonerBVjs) {
        Object.keys(cansonerBVjs[idCanso]).forEach( function(idioma, index, array) {
          // console.log( idCanso, idioma, cansoner.value)
          console.log( cansonerBVjs[idCanso][idioma].cansoner.nom, cansonerBV.value.value)
          if ( cansonerBVjs[idCanso][idioma].cansoner.nom == cansonerBV.value.value ) {

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


    // ---- cosntruccio del txt que anirà al txtAreaLletra ----
    const construccioTxtArea = (arrLletra) => {
      let txt = ""

      arrLletra.forEach( estrofa => {
        if ( estrofa.tipus === "tornada") txt += "\nt\n"

        estrofa.paragraf.forEach( linia => {
          txt += linia.text + "\n"
        })
        txt += "\n"

      })

      // txtAreaLletra.value = txt.trim()
      store.guardaTextLletra(txt.trim())
    }










    return {cansoner, numeroCanso, titol, audio, idioma, store, importarCanso, activarImportar, cansonerBV, numeroBV}
  }


})


</script>
