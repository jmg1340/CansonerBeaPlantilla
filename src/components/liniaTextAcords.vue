<template>
  <div style="cursor: default">
    <!-- <pre>{{ linia.acords }}</pre> -->
    <div v-if="linia.acords" class="lletraAmpladaFixe" >
      <!-- ACORDS -->
      <div class="row no-wrap">
        <q-btn color="yellow-3" text-color="black" label="copia" class="col-1" dense size="xs" @click="store.guardaAcords(linia.acords)"/>
        <div v-html="acordsText" class="col-auto q-ml-md text-blue text-bold" @dblclick="eliminarAcords"/>
      </div>

      <!-- LLETRA ACORDS -->
      <div class="row no-wrap">
        <div class="col-1">&nbsp;</div>
        <div class="col-auto q-ml-md" v-html="textAmbEspais" @click="activarRegistreAcords = true"/>
      </div>

    </div>
    <div v-else>

      <!-- LLETRA SENSE ACORDS -->
      <div class="row no-wrap">
        <q-btn color="light-green-11" text-color="black" label="pega" class="col-1" dense size="xs" @click="linia.acords=store.acords" :disable="store.acords == null"/>
        <div class="col-auto q-ml-md" @click="activarRegistreAcords = true">{{ linia.text}}</div>
      </div>

    </div>

    <q-separator />
  </div>



  <q-dialog v-model="activarRegistreAcords" persistent transition-show="flip-down" full-width>
      <q-card>
        <q-card-section>
          <cmp_assignacioNotes :linia="linia" :idxEstrofa="idxEstrofa" :idxLinia="idxLinia"  />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Guardar" color="primary" @click="mGuardarLletraAcords" v-close-popup/>
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>



</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import cmp_assignacioNotes from './assignacioNotes.vue'
import { useCansoStore } from '../stores/example-store'


export default defineComponent({
  name: 'liniaTextAcords',
  components: { cmp_assignacioNotes},
  props: {
    idxLinia:{
      type: Number,
      required: true
    },
    idxEstrofa:{
      type: Number,
      required: true
    },
    linia: {
      type: Object,
      required: true
    },
  },

  setup( props ){
    const store = useCansoStore()

    // const linia = {
    //   acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //   text: "paragraf 1.            text de la linia numero 1"
    // }
    const activarRegistreAcords = ref(false)

    const linia = ref(props.linia)
    const idxEstrofa = props.idxEstrofa
    const idxLinia = props.idxLinia

    const textAmbEspais = computed ( () => linia.value.text.replaceAll(" ", "&nbsp;"))

    const acordsText = computed ( () => {

      if (linia.value.acords !== undefined) {
        const textLength = linia.value.text.length
        // console.log(textLength)

        let textAcords = " ".repeat(textLength + 8)
        // console.log("textAcords", "[" + textAcords + "]")

        linia.value.acords.forEach( (obj, idx, matriu ) => {
          const arr = textAcords.split("")
          // console.log("arr", arr)


          // console.log("obj.pos", obj.pos)
          // console.log("obj.nota.length", obj.nota.length)
          const arr2 = arr.splice(obj.pos, obj.nota.length, ...obj.nota.split(""))
          // console.log("arr", arr)

          const arr3 = arr.toString()
          // console.log("arr3", arr3)

          textAcords = arr.reduce( (ac, elem) => ac + elem , "")
          // console.log("textAcords", "[" + textAcords + "]")
        })

        // console.log("textAcords", "[" + textAcords + "]")
        // console.log("textAcords.length", textAcords.length)
        return textAcords.replaceAll(" ", "&nbsp;")

      } else {
        return null
      }
    })


    const mGuardarLletraAcords = () => {
      console.log("---- LINIA TEXT ACORDS - mGuardarLletraAcords ----")
      store.guardarLletraAcords(idxEstrofa, idxLinia)
      console.log("store.objLletraAcordsEditat", store.objLletraAcordsEditat)
      linia.value = store.objLletraAcordsEditat
    }



    const eliminarAcords = () => {
      store.eliminaAcords ( idxEstrofa, idxLinia )
    }

    return {
      linia,
      textAmbEspais,
      acordsText,
      activarRegistreAcords,
      idxEstrofa,
      idxLinia,
      store,
      mGuardarLletraAcords,
      eliminarAcords
    }

  }

})
</script>


<style>
  .lletraAmpladaFixe{
    font-family: 'Courier New', Courier, monospace;
  }
</style>
