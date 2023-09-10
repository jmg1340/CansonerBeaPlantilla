<template>
  <q-page class="">


    <div class="row">
      <div class="col">
        <q-card>
          <q-card-section>
              <div class="text-center">Cançoner BN</div>
              <div class="row justify-around">
                <div class="text">
                  {{ llistaBN.length }} 
                  Cansons del cansoner de la BN que estan als 2 cançoners (Blau i Vermell)</div>
              </div>
          </q-card-section>
          <q-card-section class="row justify-center">

            <q-markup-table dense class="col-4">
              <thead>
                <tr>
                  <th class="text-center">ID</th>
                  <th class="text-center">Cançoners</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(obj, idx) in llistaBN" :key="'BN'+idx">
                  <td class="text-center">{{obj.id}}</td>
                  <td class="text-center">
                    <div class="row" v-for="(obj2, idx) in obj.cansoners" :key="idx">
                      <div class="col">IDIOMA: {{ obj2.idioma }}</div>
                      <div class="col">CANSONER: {{ obj2.cansoner }}</div>
                      <div class="col">NUMERO: {{ obj2.numero }}</div>
                    </div>
                  </td>
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
// import cansonerBeaBlau from '../../assets/Blau'
// import cansonerBeaVermell from '../../assets/Vermell'


export default defineComponent({
  name: 'PageIndex',

  setup() {
    const store = useCansoStore()
    const $q = useQuasar()



    const llistaBN = computed( () => {
      let arr1 = []

      // console.log( "cansonerBVjs", cansonerBVjs )

      for (let idCanso in cansonerBVjs) {
        // per cada canço busquem el nº d'idiomes que te:
        const numIdiomes = Object.keys(cansonerBVjs[idCanso]).length
      
        // si només te un idioma no ens interessa. En cas contrari, trobar el cansoner i numero de canço de cada idioma
        if (numIdiomes > 1) {
          const arr2 = []
          Object.keys(cansonerBVjs[idCanso]).forEach( function(idioma, index, array) {
            arr2.push(
              {
                idioma: idioma,
                cansoner : cansonerBVjs[idCanso][idioma].cansoner.nom,
                numero : cansonerBVjs[idCanso][idioma].cansoner.numero
              }
            ) 
          })
          
          arr1.push({
            id: idCanso,
            cansoners: arr2
          })

        }

      }

      console.log( "llistaBN ", arr1)
      return arr1
    })


    return {
      store,
      llistaBN,

    }
  }
})
</script>


