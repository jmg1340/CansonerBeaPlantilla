<template>
  <div class="q-mb-xl">
    <!-- <div class="text-h5">Pas 01</div> -->
    <!-- <div class="column q-gutter-md"> -->
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
</template>



<script>
import { defineComponent, ref } from 'vue';
import { useCansoStore } from '../stores/example-store'

export default defineComponent({

  setup(){
    const store = useCansoStore()

    const cansoner = ref(store.cansoner)
    const numeroCanso = ref(store.numeroCanso)
    const idioma = ref(store.idioma)
    const titol = ref(store.titol)
    const audio = ref(store.audio)


    return {cansoner, numeroCanso, titol, audio, idioma, store}
  }


})


</script>
