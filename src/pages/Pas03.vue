<template>
  <!-- <pre>{{ estrofa }}</pre> -->

  <!-- <div class="column items-center" style="border: 2px solid red">

      <div class="col-auto">
        <div class="row no-wrap"  style="border: 4px solid green">
          <div class="col-2" style="border: 4px solid blue">copia</div>
          <div class="col-auto" style="border: 4px solid blue">text frase de la lletra11112222222</div>
        </div>
        <div class="row"  style="border: 4px solid green">
          <div class="col-2" style="border: 4px solid blue"></div>
          <div class="col-auto" style="border: 4px solid blue">text frase de la lletra1111</div>
        </div>
        <div class="row"  style="border: 4px solid green">
          <div class="col-2" style="border: 4px solid blue">pe</div>
          <div class="col-auto" style="border: 4px solid blue">text frase de la lletra1111</div>
        </div>
      </div>

  </div> -->



  <div class="column ">
    <div class="col">
      <q-card v-for="(objEstrofa, index) in lletra" :key="index" class="q-pa-md q-mb-md">
        <cmp_Estrofa :estrofa="objEstrofa" :idxEstrofa="index" />
      </q-card>

    </div>
  </div>

</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import cmp_Estrofa from "../components/estrofa.vue"
import { useCansoStore } from '../stores/example-store'

export default defineComponent({
  components: { cmp_Estrofa },

  setup(){
    const store = useCansoStore()

    const lletra = ref( store.getterLletra
      // [
      //   {
      //     tipus: "estrofa",
      //     paragraf: [
      //       {
      //         text: "paragraf 1 text de la linia numero 1"
      //       },
      //       {
      //         text: "paragraf 1 text de la linia numero 2"
      //       },
      //       {
      //         text: "paragraf 1 text de la linia numero 3"
      //       },
      //       {
      //         text: "paragraf 1 text de la linia numero 4"
      //       }
      //     ]
      //   },
      //   {
      //     tipus: "estrofa",
      //     paragraf: [
      //       {
      //         text: "paragraf 2 text de la linia numero 1"
      //       },
      //       {
      //         text: "paragraf 2 text de la linia numero 2"
      //       },
      //       {
      //         text: "paragraf 2 text de la linia numero 3"
      //       },
      //       {
      //         text: "paragraf 2 text de la linia numero 4"
      //       },
      //     ]
      //   },
      // ]
    )
    console.log('store.getterLletra', store.getterLletra)


    return { lletra }
  }



})

</script>
