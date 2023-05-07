<template>
  <q-page class="">

    <div class="row q-ma-sm q-gutter-md">
      <!-- <div class="col"> -->
        <!-- <q-bar class="row items-between bg-grey-2"> -->
          <!-- <div class="col text-right"> -->
            <q-btn class="col-auto q-mx-sm" color="orange-10" :class="{'text-negative': modeCopiarJordi}" label="Copiar" noCaps @click="copiar"/>
            <q-card class="col q-pa-md" @dblclick="modeCopiarJordi = !modeCopiarJordi" :class="{'text-negative': modeCopiarJordi}">Anar enganxant el que es va copiant en un fitxer creat amb el Bloc de Notas. Quan estigui llest (quan us canseu, vaja...) l'envieu per email al Jordi (jordi.miserachs@gmail.com)</q-card>
          <!-- </div> -->
        <!-- </q-bar> -->
      <!-- </div> -->
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
      audio: store.audio,
      lletra: store.lletra
    }

    const modeCopiarJordi = ref(false)


    const copiar = () => {
      let strPRE = document.querySelector('pre').innerHTML
      strPRE = strPRE.replace(/&amp;/g, "&")

      if ( modeCopiarJordi.value ){
        const idxPrimerCorxet = strPRE.indexOf("{")
        const idxUltimCorxet = strPRE.lastIndexOf("}")

        strPRE = strPRE.substring(idxPrimerCorxet + 2, idxUltimCorxet)
      }

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
      store,
      modeCopiarJordi
    }
  }
})
</script>


