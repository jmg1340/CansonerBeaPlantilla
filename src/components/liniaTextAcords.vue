<template>
  <div class="column" style="cursor: default">
    <!-- <pre>{{ linia.acords }}</pre> -->


    <!-- QUAN LA LINIA DE LA LLETRA, APART DEL TEXT, TE ACORDS PER SOBRE I PER SOTA (D'AQUESTA LINIA)-->

    <div v-if="linia.acordsASobre && linia.acordsASota" class="col lletraAmpladaFixe" >
      <!-- ACORDS PER SOBRE-->
      <div class="row no-wrap">
        <q-btn color="yellow-3" text-color="black" label="copia" class="col-1" dense size="xs" @click="store.guardaAcords(linia.acords)"/>
        <div v-html="acordsTextASobre" class="col-auto q-ml-md text-blue text-bold" @dblclick="eliminarAcords('acordsASobre')"/>
      </div>

      <!-- LLETRA -->
      <div class="row no-wrap">
        <div class="col-2"></div>
        <div class="col-auto text-bold q-ml-md" v-html="textAmbEspais" @click="activarRegistreAcords = true"/>
      </div>

      <!-- ACORDS PER SOTA-->
      <div class="row no-wrap">
        <div class="col-2"/>
        <div v-html="acordsTextASota" class="col-auto q-ml-md text-blue text-bold" @dblclick="eliminarAcords('acordsASota')"/>
      </div>

    </div>



   <!-- QUAN LA LINIA DE LA LLETRA NOMES TE ACORDS PER SOBRE (D'AQUESTA LINIA)-->

   <div v-else-if="linia.acordsASobre" class="col lletraAmpladaFixe" >
      <!-- ACORDS PER SOBRE-->
      <div class="row no-wrap">
        <q-btn color="yellow-3" text-color="black" label="copia" class="col-1" dense size="xs" @click="store.guardaAcords(linia.acordsASobre)"/>
        <div v-html="acordsTextASobre" class="col-auto q-ml-md text-blue text-bold" @dblclick="eliminarAcords('acordsASobre')"/>
      </div>

      <!-- LLETRA  -->
      <div class="row no-wrap">
        <div class="col-2">&nbsp;</div>
        <div class="col-auto text-bold q-ml-md" v-html="textAmbEspais" @click="activarRegistreAcords = true"/>
      </div>

    </div>


   <!-- QUAN LA LINIA DE LA LLETRA NOMES TE ACORDS PER SOTA (D'AQUESTA LINIA)-->

   <div v-else-if="linia.acordsASota" class="col lletraAmpladaFixe" >
      <!-- LLETRA  -->
      <div class="row no-wrap">
        <div class="col-2">&nbsp;</div>
        <div class="col-auto text-bold q-ml-md" v-html="textAmbEspais" @click="activarRegistreAcords = true"/>
      </div>

      <!-- ACORDS PER SOTA-->
      <div class="row no-wrap">
        <div class="col-2"/>
        <!-- <q-btn color="yellow-3" text-color="black" label="copia" class="col-2" dense size="xs" @click="store.guardaAcords(linia.acords)"/> -->
        <div v-html="acordsTextASota" class="col-auto q-ml-md text-blue text-bold" @dblclick="eliminarAcords('acordsASota')"/>
      </div>


    </div>


    <div v-else class="col">

      <!-- LLETRA SENSE ACORDS -->
      <div class="row no-wrap">
        <q-btn color="light-green-11" text-color="black" label="pega" class="col-1" dense size="xs" @click="linia.acordsASobre=store.acords" :disable="store.acords == null || tipus === 'anotacio'"/>
        <div class="col-auto q-ml-md" :class="{'text-grey-6': tipus === 'anotacio'}" @click="activarRegistreAcords = (tipus !== 'anotacio')">{{ linia.text}}</div>
      </div>

    </div>

    <q-separator />
  </div>



  <q-dialog v-model="activarRegistreAcords" persistent transition-show="flip-down" full-width>
    <q-card>
      <q-card-section>
        <cmp_assignacioNotes :linia="linia" :idxEstrofa="idxEstrofa" :idxLinia="idxLinia"  />
      </q-card-section>

      <q-card-actions align="between">
        <q-btn flat label="Editar lletra" color="teal" @click="prompt=true" />
        <div>
          <q-btn flat label="Guardar" color="primary" @click="mGuardarLletraAcords" v-close-popup/>
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>



  <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 100%">
        <q-card-section>
          <div class="text-h6">Edicio lletra de la línia</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="linia.text" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Ok" v-close-popup />
          <!-- <q-btn flat label="Add address" v-close-popup /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import cmp_assignacioNotes from './assignacioNotes.vue'
import { useCansoStore } from '../stores/example-store'
import { useQuasar } from 'quasar'

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
    tipus: {
      type: String,
      required: true
    },
  },

  setup( props ){
    const $q = useQuasar()
    const store = useCansoStore()

    // const linia = {
    //   acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //   text: "paragraf 1.            text de la linia numero 1"
    // }

    const prompt = ref( false )

    const activarRegistreAcords = ref(false)

    const linia = ref(props.linia)
    const idxEstrofa = props.idxEstrofa
    const idxLinia = props.idxLinia
    const tipus = props.tipus

    const textAmbEspais = computed ( () => linia.value.text.replaceAll(" ", "&nbsp;"))



    const acordsTextASobre = computed ( () => {
      return transformarArrayAcordsAText( linia.value.acordsASobre )
    })
    const acordsTextASota = computed ( () => {
      return transformarArrayAcordsAText( linia.value.acordsASota )
    })

    const transformarArrayAcordsAText = (arrAcords) => {

      if (arrAcords !== undefined) {
        const textLength = linia.value.text.length
        // console.log(textLength)

        let textAcords = " ".repeat(textLength + 20)
        // console.log("textAcords", "[" + textAcords + "]")

        arrAcords.forEach( (obj, idx, matriu ) => {
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
        console.log("textAcords.length", textAcords.length)
        return textAcords.replaceAll(" ", "&nbsp;")

      } else {
        return null
      }
    }

		watch( linia, (newT, oldT) => {
			console.log("--- WATCH linia.text---")

			console.log('newT.text', newT.text)

			const obj = {}
			obj.text = newT.text
			if (linia.value.acordsASobre) obj.acordsASobre = linia.value.acordsASobre
			if (linia.value.acordsASota) obj.acordsASota = linia.value.acordsASota

			store.modificarLletraAcordsEditat( JSON.parse(JSON.stringify(obj)) )
		}, { deep: true })


    const mGuardarLletraAcords = () => {
      console.log("---- LINIA TEXT ACORDS - mGuardarLletraAcords ----")
      store.guardarLletraAcords(idxEstrofa, idxLinia)
      console.log("store.objLletraAcordsEditat", store.objLletraAcordsEditat)
      linia.value = store.objLletraAcordsEditat
    }



    const eliminarAcords = (acordsASobreASota) => {
      console.log( "estic a eliminar Acords")
      console.log( idxEstrofa, idxLinia, acordsASobreASota )
      store.eliminaAcords ( idxEstrofa, idxLinia, acordsASobreASota )
    }

    return {
      tipus,
      linia,
      textAmbEspais,
      acordsTextASobre,
      acordsTextASota,
      activarRegistreAcords,
      idxEstrofa,
      idxLinia,
      store,
      mGuardarLletraAcords,
      eliminarAcords,
      prompt
    }

  }

})
</script>


<style>
  .lletraAmpladaFixe{
    font-family: 'Courier New', Courier, monospace;
  }
</style>
