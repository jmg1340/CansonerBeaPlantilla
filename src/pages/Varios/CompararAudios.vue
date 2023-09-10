<template>
  <q-page class="">


    <div class="row">
      <div class="col">
        <q-card>
          <q-card-section>
              <div class="text-center">Cançoner BN</div>
              <div class="row justify-around">
                <q-radio v-model="cansonerBN" val="blau" label="BLAU" @update:model-value="mostrallistaBN"/>
                <q-radio v-model="cansonerBN" val="vermell" label="VERMELL" @update:model-value="mostrallistaBN"/>
              </div>
          </q-card-section>
          <q-card-section>

            <q-markup-table dense>
              <thead>
                <tr>
                  <th class="text-left">Numero</th>
                  <th class="text-right">Idioma</th>
                  <th class="text-right">Audio</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(obj, idx) in llistaBN" :key="'BN'+idx">
                  <td class="text-center">{{obj.numero}}</td>
                  <td class="text-center">{{obj.idioma}}</td>
                  <td class="text-center">{{obj.audio}}</td>
                </tr>
              </tbody>
            </q-markup-table>
              



          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <q-card-section>
              <div class="text-center">Cançoner Bea</div>
              <div class="row justify-around">
                <q-radio v-model="cansonerBea" val="blau" label="BLAU" @update:model-value="seleccioDelCansonerBEA()" />
                <q-radio v-model="cansonerBea" val="vermell" label="VERMELL" @update:model-value="seleccioDelCansonerBEA()" />
              </div>
          </q-card-section>
          <q-card-section>

<q-markup-table dense>
  <thead>
    <tr>
      <th class="text-left">Numero</th>
      <th class="text-right">Idioma</th>
      <th class="text-right">Audio</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(obj, index) in llistaBEA" :key="'BEA'+index">
      <td class="text-center">{{obj.numero}}</td>
      <td class="text-center">{{obj.idioma}}</td>
      <td class="text-center">{{obj.audio}}</td>
    </tr>
  </tbody>
</q-markup-table>
  



</q-card-section>
</q-card>
      </div>
    </div>


  </q-page>
</template>






<script>
import { defineComponent, ref, computed } from 'vue';
import { useCansoStore } from '../../stores/example-store'
import { useQuasar } from 'quasar'
import cansonerBVjs from '../../assets/cansoner'
import cansonerBeaBlau from '../../assets/Blau'
import cansonerBeaVermell from '../../assets/Vermell'


export default defineComponent({
  name: 'PageIndex',

  setup() {
    const store = useCansoStore()
    const $q = useQuasar()




     // ------------ Declaracions i funcions del CANÇONER BEA  --------------   
    const cansonerBea = ref(null)
    const cansonerBeaSeleccionat = ref(null)

    const seleccioDelCansonerBEA = () => {
      cansonerBeaSeleccionat.value = (cansonerBea.value == "blau") ? cansonerBeaBlau : cansonerBeaVermell
      console.log("llistaBEA:", llistaBEA)
    }

    const llistaBEA = computed( () => {
      // console.log("cansonerBeaSeleccionat: ", cansonerBeaSeleccionat.value)
      if ( cansonerBeaSeleccionat.value === null ){ 
        return []
      } else {
        return cansonerBeaSeleccionat.value.map( obj => {
          for (const idioma in obj.idioma) {
            // console.log( "C. Bea - numero: ", obj.numero )
            return {
              numero: obj.numero,
              idioma: idioma,
              audio: (obj.idioma[idioma].audio) ?  obj.idioma[idioma].audio[0].src.substring(38,71) : ""
            }
          }
        })

      }
    })




    // ------------ Declaracions i funcions del CANÇONER BONA NOVA  --------------

    const cansonerBN = ref(null)


    const cansonerBNDadesAdaptades = () => {
      let obj = {}

      // console.log( "cansonerBVjs", cansonerBVjs )

      for (let idCanso in cansonerBVjs) {
        Object.keys(cansonerBVjs[idCanso]).forEach( function(idioma, index, array) {
          // console.log( idCanso, idioma, cansoner.nom, cansoner.value)
          if ( cansonerBVjs[idCanso][idioma].cansoner.nom == cansonerBN.value ) {

            // Al haver cançons que tenen mateix mateix numero i mateix cansoner, la següent expressio
            // ja no em serveix, ja que no poden haver propietats duplicades. Nomes agafaria una de les 2 cançons (la última)

            // obj[cansonerBVjs[idCanso][idioma].cansoner.numero] = {idCanso, idioma}

            let propietat = cansonerBVjs[idCanso][idioma].cansoner.numero + "_" + idioma
            obj[propietat] = {idCanso, idioma}


          }
        })
      }

      // console.log( "cansonerBNDadesAdaptades ", obj)
      return obj

    }

    const arrBN_numCanso_idioma = () => {
       return Object.keys(cansonerBNDadesAdaptades()).map(el => {
        const arrValors = el.split("_")
        return {
          numero: arrValors[0],
          idioma: arrValors[1],
          idCanso: cansonerBNDadesAdaptades()[el].idCanso
        }
      }).sort( (a,b) => a.numero - b.numero )
    }

// [ { "src": "https://docs.google.com/uc?export=&id=1CL2N99JYkF-ii8KOjBynXf6cJ43w5Kzj", "type": "audio/mp3" } ]

    const llistaBN = computed( () => {
      return arrBN_numCanso_idioma().map( e => {
        const vAudio = cansonerBVjs[e.idCanso][e.idioma].audio
        console.log("numero: ", e.numero, "AUDIO: ", vAudio)
        return {
          numero: e.numero,
          idioma: e.idioma,
          audio: (vAudio === null) ? null : vAudio[0].src.substring(38,71),
          audio2: vAudio
        }
      })
    })

    const mostrallistaBN = () => {
      console.log(arrBN_numCanso_idioma())
    }

    return {
      cansonerBN,
      cansonerBea,
      store,

      mostrallistaBN,
      llistaBN,

      seleccioDelCansonerBEA,
      llistaBEA
    }
  }
})
</script>


