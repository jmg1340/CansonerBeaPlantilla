<template>
  <!-- <pre>{{ estrofa }}</pre> -->
  <div  :class="{'text-red': estrofa.tipus === 'tornada'}">
    <div v-for="(objLinia, index) in estrofa.paragraf" :key="index">
      <cmp_linia :linia="objLinia" :idxEstrofa="idxEstrofa" :idxLinia="index" />
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


    return {estrofa, idxEstrofa}

  }


})



</script>
