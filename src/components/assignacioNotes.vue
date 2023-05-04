  <template>
    <div class="column">
      <div class="col q-mb-sm">
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
      </div>


      <div class="col q-mb-md">
        <div class="row">
          <div
            v-for="(obj, index) in notes"
            :key="'nota'+index"
            class="col-auto clNotes q-pa-sm"
            :class="{'verd': obj.activat, 'gris': /b|#/.test(obj.nom) }"
            @click="activarDesactivar(obj)"
          >
            {{ (majuscules) ?  obj.nom.toUpperCase().replace("B", "b") : obj.nom.toLowerCase() }}
          </div>
        </div>


      </div>
      <div class="col">
        <div class="row justify-start">
          <div
            v-for="(caracter, index) in acords"
            :key="'espai'+index"
            class="colxx lletra"
            @click="assignarNota(index)"
          >
            {{  caracter.replace(" ", "&nbsp;") }}
          </div>
        </div>

      </div>
      <div class="col">
        <div class="row justify-start">
          <div class="colxx lletra" v-for="(caracter, index) in text" :key="'text'+index">
            {{ caracter }}
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

      const majuscules = ref(true)

      const notes = ref([
        { nom: "Do", activat: false},
        { nom: "Do#", activat: false},
        { nom: "Re", activat: false},
        { nom: "Re#", activat: false},
        { nom: "Reb", activat: false},
        { nom: "Mi", activat: false},
        { nom: "Mib", activat: false},
        { nom: "Fa", activat: false},
        { nom: "Fa#", activat: false},
        { nom: "Sol", activat: false},
        { nom: "Sol#", activat: false},
        { nom: "Solb", activat: false},
        { nom: "La", activat: false},
        { nom: "La#", activat: false},
        { nom: "Lab", activat: false},
        { nom: "Si", activat: false},
        { nom: "Sib", activat: false},
        { nom: "-", activat: false},
        { nom: "7", activat: false},
        { nom: "(", activat: false},
        { nom: ")", activat: false}
      ])



      const linia = props.linia
      const text = linia.text

      console.log("linia", linia)
      const notesAssignades = ref( linia.acords || [])
      console.log("notesAssignades:", notesAssignades.value)


      /*
      * Descripcio: transforma el array de les notes a text
      */
      const acords = computed( () => {
        console.log("--- ACORDS COMPUTED ---")
        let txtAcords = " ".repeat(text.length + 8)

        notesAssignades.value.forEach( (obj, idx, matriu ) => {
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
      })




      const activarDesactivar = (obj) => {
        obj.activat = !obj.activat
        notes.value.forEach( (obj2) => {
          if (obj2.nom !== obj.nom) obj2.activat = false
        })
        // console.log( 'activat', obj.activat)
      }


      /*
      * Descripcio: assignacio de notes segons al posicio del text.
      *             Construccio de l'array de les notes
      */
      const assignarNota = (idx) => {
        // seleccionem la nota que esta activa
        const notaActiva = notes.value.find( objNota => objNota.activat === true)


        if (notaActiva){
          //assignació de la nota. Entrada
          notesAssignades.value.push({
            nota: (majuscules.value) ? notaActiva.nom.toUpperCase().replace("B", "b") : notaActiva.nom.toLowerCase(),
            pos: idx
          })

          notaActiva.activat = false

        } else if ( notesAssignades.value.some( (obj) => obj.pos == idx)) {
          // si existeix una nota a la posició clicada, la treiem.
          // console.log("nota a treure de la llista:", notesAssignades.value.find( obj => obj.pos == idx))
          notesAssignades.value = notesAssignades.value.filter( obj => obj.pos != idx)
        }
        // console.log( 'notesAssignades', notesAssignades.value)

      }



      watch( notesAssignades, (newNA, oldNA) => {
        console.log("--- WATCH newNA---")
        console.log(notesAssignades.value)
        store.modificarLletraAcordsEditat({
          text: linia.text,
          acords: notesAssignades.value
        })
      }, { deep: true })



      return { notes, text, activarDesactivar, acords, assignarNota, majuscules }
    }


  })


  </script>


  <style>
    .lletra{
      font-family: 'Courier New', Courier, monospace;
      border: 1px solid rgb(207, 207, 207);
      width: 15px;
      text-align: center;
    }
    .clNotes{
      font-family: 'Courier New', Courier, monospace;
      border: 1px solid grey
    }



    .gris {
      background-color: darkgrey;
    }
    .verd {
      background-color: rgb(128, 255, 0);
    }

  </style>
