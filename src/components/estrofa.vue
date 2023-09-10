<template>
  <!-- <pre>{{ estrofa }}</pre> -->
  <div class="row items-center" :class="{'text-red': estrofa.tipus === 'tornada'}">
    <div class="col-auto q-pr-lg">
      <div class="column">
        <q-radio class="col" :disable="estrofa.tipus === 'anotacio'" dense v-model="estrofa.visibleAlsMusics" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Visible" />
        <q-radio class="col" :disable="estrofa.tipus === 'anotacio'" dense v-model="estrofa.visibleAlsMusics" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="1" label="Visible 1ª linia" />
        <q-radio class="col" :disable="estrofa.tipus === 'anotacio'" dense v-model="estrofa.visibleAlsMusics" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="NO visible" />

      </div>
      <!-- <q-checkbox v-model="estrofa.visibleAlsMusics" color="black" label="visible als músics" class="text-black"/> -->
    </div>
    <div class="col">
      <div class="col" v-for="(objLinia, index) in estrofa.paragraf" :key="index">
          <cmp_linia :linia="objLinia" :idxEstrofa="idxEstrofa" :idxLinia="index" :tipus="estrofa.tipus"
          v-if="estrofa.visibleAlsMusics === 1 && index === 0 || estrofa.visibleAlsMusics === true"
          />
      </div>
    </div>
    <div class="col-1 text-center q-ml-md" v-if="estrofa.tipus !== 'anotacio'">
      
      <q-input v-model="estrofa.vegades" dense type="number" label="Vegades:" @update:model-value="canviarANumeric(value)"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import cmp_linia from "../components/liniaTextAcords.vue"

export default defineComponent({
  components: { cmp_linia },
  props:{
    idxEstrofa:{
      type: Number,
      required: true
    },
    estrofa: {
      type: Object,
      required: true
    },
  },

  setup( props ){
    const estrofa = props.estrofa
    const idxEstrofa = props.idxEstrofa

    const canviarANumeric = (value) => {
      estrofa.vegades = parseInt(estrofa.vegades)
    }
    // {
    //   tipus: "estrofa",
    //   paragraf: [
    //     {
    //       acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //       text: "paragraf 1 text de la linia numero 1"
    //     },
    //     {
    //       acords: [ { nota: "Mi", pos: 8},{ nota: "Fa", pos: 18}],
    //       text: "paragraf 1 text de la linia numero 2"
    //     },
    //     {
    //       text: "paragraf 1 text de la linia numero 3"
    //     },
    //     {
    //       text: "paragraf 1 text de la linia numero 4"
    //     }
    //   ]
    // }


    return {estrofa, idxEstrofa, canviarANumeric}

  }


})



</script>
