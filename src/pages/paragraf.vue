<template>
  <q-card class="q-my-md q-pa-md bg-grey-3">
      <q-select v-model="tipus" class="bg-white" :options="opcionsParagraf" dense/>
      <q-input v-model="paragraf" type="textarea" autogrow class="bg-white" :class="{'bg-red-2': tipus.value ==='tornada'}" dense />
    </q-card>
</template>





<script>
import {ref, toRefs, watch } from 'vue'

export default {

  props: {
    obj: Object,
    idx: Number
  },


  setup(props, context) {

    const { obj, idx } = toRefs(props)
    console.log("obj (de props)", obj)
    
    // let tipus = ref(obj.value.tipus)
    let tipus = ref({label: "ESTROFA", value: "estrofa"})
    let paragraf = ref(obj.value.paragraf)
    const index = ref(idx.value)
    
    const opcionsParagraf = ref ([
      {label: "ESTROFA", value: "estrofa"},
      {label: "TORNADA", value: "tornada"}
    ])



    watch( tipus, (newVal, oldVal) => {
      context.emit("eventNouTipus", {tipus: newVal.value, index: index._value})
    })

    watch( paragraf, (newVal, oldVal) => {
      context.emit("eventNouParagraf", {paragraf: newVal, index: index._value})
    })




    return {
      opcionsParagraf,
      tipus,
      paragraf
    }
  }
}
</script>

<style>

</style>