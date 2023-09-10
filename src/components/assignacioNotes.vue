  <template>
    <div class="column">
      <!-- <div class="col q-mb-sm">
        <div class="row">
          <q-btn-toggle
            v-model="majuscules"
            spread
            class="col-auto my-custom-toggle"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              {label: 'Major', value: true},
              {label: 'Menor', value: false}
            ]"
          />
        </div>
      </div> -->


      <!-- ******  NOTES 1 ****** -->
      <div class="col q-mb-md">
        <div class="row q-mb-sm" style="cursor: default">
          <div
            v-for="(obj, index) in notes1"
            :key="'nota1'+index"
            class="col-auto clNotes q-pa-sm"
            :class="{'verd': obj.activat, 'gris': /b|#|mim|rem|lam|sim|fam/.test(obj.nom), 'q-ml-md': [2,6,9,12,15,19].includes(index) }"
            @click="activarDesactivar(obj)"
          >
            <!-- {{ (majuscules) ?  obj.nom.toUpperCase().replace("B", "b") : obj.nom.toLowerCase() }} -->
            {{ obj.nom }}
          </div>
        </div>

        <!-- ******  NOTES 2 ****** -->
        <div class="row q-mb-sm" style="cursor: default">
          <div
            v-for="(obj, index) in notes2"
            :key="'nota2'+index"
            class="col-auto clNotes q-pa-sm"
            :class="{'verd': obj.activat, 'gris': /b|#/.test(obj.nom), 'q-ml-md': [2,5,7,9,12,15].includes(index) }"
            @click="activarDesactivar(obj)"
          >
            <!-- {{ (majuscules) ?  obj.nom.toUpperCase().replace("B", "b") : obj.nom.toLowerCase() }} -->
            {{ obj.nom }}
          </div>
        </div>

        <!-- ******  NOTES 3 ****** -->
        <div class="row q-mb-sm" style="cursor: default">
          <div
            v-for="(obj, index) in notes3"
            :key="'nota3'+index"
            class="col-auto clNotes q-pa-sm"
            :class="{'verd': obj.activat, 'gris': /b|#/.test(obj.nom)}"
            @click="activarDesactivar(obj)"
          >
            <!-- {{ (majuscules) ?  obj.nom.toUpperCase().replace("B", "b") : obj.nom.toLowerCase() }} -->
            {{ obj.nom }}
          </div>
        </div>

        <!-- ******  NOTES 4 ****** -->
        <div class="row q-mb-sm" style="cursor: default">
          <div
            v-for="(obj, index) in notes4"
            :key="'nota4'+index"
            class="col-auto clNotes q-pa-sm"
            :class="{'verd': obj.activat, 'gris': /b|#/.test(obj.nom)}"
            @click="activarDesactivar(obj)"
          >
            <!-- {{ (majuscules) ?  obj.nom.toUpperCase().replace("B", "b") : obj.nom.toLowerCase() }} -->
            {{ obj.nom }}
          </div>
          
        </div>

      </div>




      <!-- ACORDS PER SOBRE LA LINIA DE TEXT DE LA LLETRA -->
      <div class="col q-mb-xs">
        <div class="row justify-start">
          <div
            v-for="(caracter, index) in txtAcordsASobre"
            :key="'espai'+index"
            class="colxx lletra"
            @click="assignarNota(index, 'sobre')"
            @dblclick="eliminarNota(index, 'sobre')"            
          >
            {{  caracter.replace(" ", "&nbsp;") }}
          </div>
        </div>
      </div>

      <!-- TEXT DE LA LINIA DE LA LLETRA -->
      <div class="col q-mb-xs">
        <div class="row justify-start">
          <div class="colxx lletra" v-for="(caracter, index) in linia.text" :key="'text'+index">
            {{ caracter }}
          </div>
        </div>
      </div>

      <!-- ACORDS PER SOTA DE LA LINIA DE TEXT DE LA LLETRA -->
      <div class="col">
        <div class="row justify-start">
          <div
            v-for="(caracter, index) in txtAcordsASota"
            :key="'espai'+index"
            class="colxx lletra"
            @click="assignarNota(index, 'sota')"
            @dblclick="eliminarNota(index, 'sota')"            
          >
            {{  caracter.replace(" ", "&nbsp;") }}
          </div>
        </div>
      </div>



    </div>
  </template>




  <script>
  import { defineComponent, computed, ref, watch } from 'vue'
  import { useCansoStore } from '../stores/example-store'


  export default defineComponent({
    props:{
      idxLinia:{
      type: Number,
      required: true
      },
      idxEstrofa:{
        type: Number,
        required: true
      },
      linia:{
        type: Object,
        required: true
      }
    },


    setup(props){
      const store = useCansoStore()

      // const majuscules = ref(true)

      // const notes = ref([
      //   { nom: "Do", activat: false},
      //   { nom: "Do#", activat: false},
      //   { nom: "Re", activat: false},
      //   { nom: "Re#", activat: false},
      //   { nom: "Reb", activat: false},
      //   { nom: "Mi", activat: false},
      //   { nom: "Mib", activat: false},
      //   { nom: "Fa", activat: false},
      //   { nom: "Fa#", activat: false},
      //   { nom: "Sol", activat: false},
      //   { nom: "Sol#", activat: false},
      //   { nom: "Solb", activat: false},
      //   { nom: "La", activat: false},
      //   { nom: "La#", activat: false},
      //   { nom: "Lab", activat: false},
      //   { nom: "Si", activat: false},
      //   { nom: "Sib", activat: false},
      //   { nom: "-", activat: false},
      //   { nom: "7", activat: false},
      //   { nom: "(", activat: false},
      //   { nom: ")", activat: false}
      // ])

      const notes1 = ref([
        { nom: "do", activat: false},
        { nom: "do#", activat: false},
        { nom: "re", activat: false},
        { nom: "re#", activat: false},
        { nom: "rem", activat: false},
        { nom: "reb", activat: false},
        { nom: "mi", activat: false},
        { nom: "mib", activat: false},
        { nom: "mim", activat: false},
        { nom: "fa", activat: false},
        { nom: "fa#", activat: false},
        { nom: "fam", activat: false},
        { nom: "sol", activat: false},
        { nom: "sol#", activat: false},
        { nom: "solb", activat: false},
        { nom: "la", activat: false},
        { nom: "la#", activat: false},
        { nom: "lam", activat: false},
        { nom: "lab", activat: false},
        { nom: "si", activat: false},
        { nom: "sib", activat: false},
        { nom: "si#", activat: false},
        { nom: "sim", activat: false}
      ])

      const notes2 = ref([
        { nom: "DO", activat: false},
        { nom: "DO#", activat: false},
        { nom: "RE", activat: false},
        { nom: "RE#", activat: false},
        { nom: "REb", activat: false},
        { nom: "MI", activat: false},
        { nom: "MIb", activat: false},
        { nom: "FA", activat: false},
        { nom: "FA#", activat: false},
        { nom: "SOL", activat: false},
        { nom: "SOL#", activat: false},
        { nom: "SOLb", activat: false},
        { nom: "LA", activat: false},
        { nom: "LA#", activat: false},
        { nom: "LAb", activat: false},
        { nom: "SI", activat: false},
        { nom: "SIb", activat: false},
      ])

      const notes3 = ref([
        { nom: "Do", activat: false},
        { nom: "Re", activat: false},
        { nom: "Mim", activat: false},
        { nom: "Sim", activat: false}
      ])

      const notes4 = ref([
        { nom: "-", activat: false},
        { nom: "+", activat: false},
        { nom: "x", activat: false},
        { nom: "/", activat: false},
        { nom: "m", activat: false},
        { nom: "sus", activat: false},
        { nom: "dism", activat: false},
        { nom: "G", activat: false},
        { nom: "M", activat: false},
        { nom: "Ø", activat: false},
        { nom: "2", activat: false},
        { nom: "3", activat: false},
        { nom: "4", activat: false},
        { nom: "6", activat: false},
        { nom: "7", activat: false},
        { nom: "9", activat: false},
        { nom: "(", activat: false},
        { nom: ")", activat: false}
      ])


      const notes = ref(notes1.value.concat(notes2.value.concat(notes3.value.concat(notes4.value))))


      const linia = ref( props.linia )
      // let text = linia.value.text

      console.log("linia", linia)
      const notesAssignadesASobre = ref( linia.value.acordsASobre || [])
      const notesAssignadesASota = ref( linia.value.acordsASota || [])

      // console.log("notesAssignades:", notesAssignades.value)


      const txtAcordsASobre = computed ( () => {
        return transformacioArrAcordsAText ( notesAssignadesASobre.value )
      })

      const txtAcordsASota = computed ( () => {
        return transformacioArrAcordsAText ( notesAssignadesASota.value )
      })



      /*
      * Descripcio: transforma el array de les notes a text
      */
      const transformacioArrAcordsAText = ( arrAcords) => {
        console.log("--- transformacioArrAcordsAText ---")
        let txtAcords = " ".repeat(linia.value.text.length + 20)

        arrAcords.forEach( (obj, idx, matriu ) => {
          const arr = txtAcords.split("")
          // console.log("arr", arr)


          // console.log("obj.pos", obj.pos)
          // console.log("obj.nota.length", obj.nota.length)
          const arr2 = arr.splice(obj.pos, obj.nota.length, ...obj.nota.split(""))
          // console.log("arr", arr)

          const arr3 = arr.toString()
          // console.log("arr3", arr3)

          txtAcords = arr.reduce( (ac, elem) => ac + elem , "")
          // console.log("txtAcords", "[" + txtAcords + "]")
        })


        console.log( 'txtAcords', txtAcords )
        return txtAcords
      }




      const activarDesactivar = (obj) => {
        obj.activat = !obj.activat
        notes.value.forEach( (obj2) => {
          if (obj2.nom !== obj.nom) obj2.activat = false
        })
        // console.log( 'activat', obj.activat)
      }


      /*
      * Descripcio: assignacio de notes segons al posicio del text.
      *             Construccio de l'array dels acords
      */
      const assignarNota = (idx, sobreSota) => {
        // seleccionem la nota que esta activa
        const notaActiva = notes.value.find( objNota => objNota.activat === true)
        const notesAssignades = (sobreSota === "sobre") ? notesAssignadesASobre : notesAssignadesASota

        if (notaActiva){
          //assignació de la nota. Entrada
          notesAssignades.value.push({
            // nota: (majuscules.value) ? notaActiva.nom.toUpperCase().replace("B", "b") : notaActiva.nom.toLowerCase(),
            nota: notaActiva.nom,
            pos: idx
          })

          // notaActiva.activat = false

        }
        // console.log( 'notesAssignades', notesAssignades.value)

      }

      
      const eliminarNota = ( idx, sobreSota) => {
        const notesAssignades = (sobreSota === "sobre") ? notesAssignadesASobre : notesAssignadesASota

        if ( notesAssignades.value.some( (obj) => obj.pos == idx)) {
          // si existeix una nota a la posició clicada, la treiem.
          // console.log("nota a treure de la llista:", notesAssignades.value.find( obj => obj.pos == idx))
          notesAssignades.value = notesAssignades.value.filter( obj => obj.pos != idx)
        }
      }


      watch( notesAssignadesASobre, (newNA, oldNA) => {
        console.log("--- WATCH notesAssignadesASobre---")
        // console.log(notesAssignades.value)
        const obj = {}
        obj.text = linia.value.text
        if (notesAssignadesASobre.value.length !== 0) obj.acordsASobre = JSON.parse(JSON.stringify(notesAssignadesASobre.value))
        if (notesAssignadesASota.value.length !== 0) obj.acordsASota = JSON.parse(JSON.stringify(notesAssignadesASota.value))

        store.modificarLletraAcordsEditat( JSON.parse(JSON.stringify(obj)) )
      }, { deep: true })


      watch( notesAssignadesASota, (newNA, oldNA) => {
        console.log("--- WATCH notesAssignadesASota---")
        // console.log(notesAssignades.value)
        const obj = {}
        obj.text = linia.value.text
        if (notesAssignadesASobre.value.length !== 0) obj.acordsASobre = JSON.parse(JSON.stringify(notesAssignadesASobre.value))
        if (notesAssignadesASota.value.length !== 0) obj.acordsASota = JSON.parse(JSON.stringify(notesAssignadesASota.value))

        store.modificarLletraAcordsEditat( JSON.parse(JSON.stringify(obj)) )
      }, { deep: true })


      // watch( linia, (newNA, oldNA) => {
      //   console.log("--- WATCH linia ---")
      //   text = linia.value.text
      //   console.log("text", text)

      // }, { deep: true })



      return { notes1, notes2, notes3, notes4, linia, activarDesactivar, txtAcordsASobre, txtAcordsASota, assignarNota, eliminarNota }
    }


  })


  </script>


  <style>
    .lletra{
      font-family: 'Courier New', Courier, monospace;
      font-size: large;
      border: 1px solid rgb(207, 207, 207);
      width: 20px;
      text-align: center;
      cursor: default;
    }
    .clNotes{
      font-family: 'Courier New', Courier, monospace;
      border: 1px solid grey
    }



    .gris {
      background-color: rgb(214, 214, 214);
    }
    .verd {
      background-color: rgb(128, 255, 0);
    }

  </style>
