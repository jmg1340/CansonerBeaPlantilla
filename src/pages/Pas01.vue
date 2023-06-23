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
            <q-input class="col" filled v-model="cansoner" label="Cançoner:" @update:model-value="store.guardaCansoner(cansoner)"/>

            <q-input class="col" filled v-model="numeroCanso" label="Número de la cançó (si no es una nova cançó):" @update:model-value="store.guardaNumeroCanso(numeroCanso)"/>

            <!-- <q-input class="col" filled v-model="idioma" label="Idioma de la cançó:" @update:model-value="store.guardaIdioma(idioma)"/> -->
            <q-select dense outlined v-model="idioma" :options="['castella', 'catala', 'angles', 'frances']" label="Idioma" @update:model-value="store.guardaIdioma(idioma)"/>

            <q-input class="col q-mb-md" filled v-model="titol" label="Titol de la cançó:" @update:model-value="store.guardaTitol(titol)"/>

            <!-- <q-input class="col q-mb-md" filled v-model="audio" label="Audio:" @update:model-value="store.guardaAudio(audio)"/> -->

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
					<q-select class="col" dense outlined v-model="cansonerBV" :options="[{'label': 'BLAU', 'value': 'blau'},{'label': 'VERMELL', 'value': 'vermell'}]" label="Cansoner BLAU - VERMELL" @update:model-value="store.guardaCansonerBV(cansoner)"/>
					<q-input class="col" dense type="number" filled v-model="numero" label="numero de la cançó:" @update:model-value="store.guardaNumeroBV(numero)"/>

					<q-btn class="col" label="Importar" dense color="green" noCaps @click="importarCanso()"/>
				</div>


			</q-card-section>
		</q-card>

	</q-dialog>






</template>



<script>
import { defineComponent, ref } from 'vue';
import { useCansoStore } from '../stores/example-store'
import cansonerBVjs from '../assets/cansoner'

export default defineComponent({

  setup(){
    const store = useCansoStore()

    const cansonerBV = ref(store.cansonerBV)
    const numero = ref(store.numeroBV)		
		
		const activarImportar = ref(false)

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

            store.guardaCansoner(cansonerBVjs[idCansoIdioma.idCanso][idioma2].cansoner.nom)
            store.guardaNumeroCanso(cansonerBVjs[idCansoIdioma.idCanso][idioma2].cansoner.numero)
            store.guardaIdioma( (() => {
              switch ( idioma2 ){
                case "CAT":
                  return "catala"; break;
                case "ES":
                  return "castella"; break;
                default:
                  return ""
              }
            })() )
            store.guardaTitol( cansonerBVjs[idCansoIdioma.idCanso][idioma2].titol)
            store.guardaAudio ( cansonerBVjs[idCansoIdioma.idCanso][idioma2].audio )

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
        store.guardaTitol( cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].titol)
        store.guardaAudio ( cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].audio )

        arrLletra = cansonerBVjs[idCansoIdioma.idCanso][idCansoIdioma.idioma].lletra
        console.log( "arrLletra", arrLletra)

        construccioTxtArea (arrLletra)

      }

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








    const cansoner = ref(store.cansoner)
    const numeroCanso = ref(store.numeroCanso)
    const idioma = ref(store.idioma)
    const titol = ref(store.titol)
    const audio = ref(store.audio)


    return {cansoner, numeroCanso, titol, audio, idioma, store, importarCanso, activarImportar, cansonerBV, numero}
  }


})


</script>
