<template>
  <q-page class="">

    <div class="row q-ma-sm q-gutter-md">
      <div class="col ">
        <!-- <q-bar class="row items-between bg-grey-2"> -->
          <!-- <div class="col text-right"> -->
            <q-btn class="q-mx-sm" color="orange-10" label="Copiar." noCaps @click="copiar"/>
          <!-- </div> -->
        <!-- </q-bar> -->
      </div>
    </div>




      <!-- INFORMACIO DEL ARRAY RESULTANT -->
      <div class="col ">
        <pre>
CANÇONER:  {{ store.cansoner }}    -    Numero cançó: {{ store.numeroCanso }}
----------------------------------------------------------------

{{ objCanso }}
        </pre>
      </div>




  </q-page>
</template>






<script>
import { defineComponent, ref, computed } from 'vue';
import cmpParagraf from './paragraf.vue'
import { useCansoStore } from '../stores/example-store'
import { copyToClipboard } from 'quasar'


export default defineComponent({
  name: 'PageIndex',
  components: { cmpParagraf },

  setup() {
    const store = useCansoStore()


    const objCanso = ref({})
    objCanso.value[store.idioma] = {
      titol: store.titol,
      lletra: store.lletra
    }


    const copiar = () => {
      let strPRE = document.querySelector('pre').innerHTML
      strPRE = strPRE.replace(/&amp;/g, "&")

      copyToClipboard(strPRE)
      .then(() => {
        // success!
      })
      .catch((error) => {
        console.log("error al copiar", error)
      })    }







    return {
      objCanso,
      copiar,
      store
    }
  }
})
</script>


