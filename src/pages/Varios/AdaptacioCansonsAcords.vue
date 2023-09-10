<!-- 
  Adaptacio de la estructura dels cançoners amb acords (Blau i Vermell) a una estructura
  nova de cançoner únic
 -->

<template>
  <q-page class="">


    <div class="row">
      <div class="col">
        <q-card>
          <q-card-section>
              <div class="text-center">Cançoner BLAU i VERMELL amb acords</div>
              <div class="row justify-around">
                <div class="text">
                  Adaptacio de la estructura dels cançoners amb acords (Blau i Vermell) a una estructura
                  nova de cançoner únic. ( {{ resultat.length }} cançons )
                </div>
              </div>
          </q-card-section>
          <q-separator/>
          <q-card-section>

            <pre>{{ resultat }}</pre>
              



          </q-card-section>
        </q-card>
      </div>

    </div>


  </q-page>
</template>






<script>
import { defineComponent, ref, computed } from 'vue';
import { useCansoStore } from '../../stores/example-store'
import { useQuasar } from 'quasar'
// import cansonerBVjs from '../../assets/cansoner'
import cansonerBeaBlau from '../../assets/Blau'
import cansonerBeaVermell from '../../assets/Vermell'
import bnCansons2Idiomes from '../../assets/BNCansons2idiomes'


export default defineComponent({
  name: 'PageIndex',

  setup() {
    const store = useCansoStore()
    const $q = useQuasar()



    const resultat = computed( () => {
      const arr = []
      const objCanso = {}
      
      // AFEGIM TOTES LES CANÇONS 'TRANSFORMADES' DEL CANÇONER BLAU
      // SI N'HI HA ALGUNA QUE ESTA RELACIONADA AMB CANÇO DEL CANÇONER VERMELL, TAMBÉ.

      
      cansonerBeaBlau.forEach( (el, index ) => {
        // console.log(el)
        
        objCanso.id = index

        // Propietat IDIOMES
        objCanso.idiomes = {}

        // Afegim l'idioma ES i informem les dades segons nova estructura
        let idiomaCanso = Object.keys(el.idioma)[0]
        objCanso.idiomes[idiomaCanso] = {}
        objCanso.idiomes[idiomaCanso].titol = el.idioma[idiomaCanso].titol
        if (el.idioma[idiomaCanso].audio) {
          objCanso.idiomes[idiomaCanso].audio = el.idioma[idiomaCanso].audio
        } else {
          objCanso.idiomes[idiomaCanso].audio = null
        }
        objCanso.idiomes[idiomaCanso].cansoners = [
          {
            nom: "Blau",
            numero: el.numero,
            estat: null
          }
        ]
        objCanso.idiomes[idiomaCanso].lletra = el.idioma[idiomaCanso].lletra


        // mirem si el numero de la canço del BeaBlau existeix a bnCansons2Idiomes.
        // Si existeix, omplim les dades de l'idioma corresponent del BeaVermell
        const objCansonerTrobat = bnCansons2Idiomes.find( obj => {
          return obj.cansoners.some( obj2 => {
            return obj2.cansoner === "blau" && obj2.numero === el.numero
          } )
        })

        if ( objCansonerTrobat !== undefined ) {
          // console.log("objCansonerTrobat", objCansonerTrobat)

          // canso a buscar al cansoner BeaVermell
          const objCansoABuscar = objCansonerTrobat.cansoners.find( obj3 => {
            return obj3.cansoner !== "blau"
          })
          // console.log("objCansoABuscar", objCansoABuscar)

          const objCansoneBeaVermell = cansonerBeaVermell.find( obj4 => {
            return obj4.numero === objCansoABuscar.numero 
          })
          // console.log("objCansoneBeaVermell", objCansoneBeaVermell)

          // Afegim l'altra idioma i informem les dades segons nova estructura
          idiomaCanso = objCansoABuscar.idioma
          objCanso.idiomes[idiomaCanso] = {}
          objCanso.idiomes[idiomaCanso].titol = objCansoneBeaVermell.idioma[idiomaCanso].titol
          // if (objCansoneBeaVermell.idioma[idiomaCanso].audio) objCanso.idiomes[idiomaCanso].audio = objCansoneBeaVermell.idioma[idiomaCanso].audio
          if (objCansoneBeaVermell.idioma[idiomaCanso].audio) {
            objCanso.idiomes[idiomaCanso].audio = objCansoneBeaVermell.idioma[idiomaCanso].audio
          } else {
            objCanso.idiomes[idiomaCanso].audio = null
          }

          objCanso.idiomes[idiomaCanso].cansoners = [
            {
              nom: "Blau",
              numero: objCansoneBeaVermell.numero,
              estat: null
            }
          ]
          objCanso.idiomes[idiomaCanso].lletra = objCansoneBeaVermell.idioma[idiomaCanso].lletra



        }




        arr.push(JSON.parse(JSON.stringify(objCanso)))
      })





      // AFEGIM TOTES LES CANÇONS 'TRANSFORMADES' DEL CANÇONER VERMELL MENYS AQUELLES
      // QUE ESTIGUIN RELACIONADES AMB EL CANÇONER BLAU.

      // array de numeros de cançons que no s'han de tenir en compte (pq ja estan relacionades
      // al cançoner blau)
      const arrDescartar = bnCansons2Idiomes.reduce( (arrAcumulator, currentObj) => {
        currentObj.cansoners.forEach( obj => {
          if ( obj.cansoner === "vermell")
            arrAcumulator.push( obj.numero)
        })
        return arrAcumulator
      },[])

      // console.log( "arrDescartar" , arrDescartar)


      const idAnterior = cansonerBeaBlau.length
      cansonerBeaVermell.forEach( (el, index ) => {
        // Propietat IDIOMES
        objCanso.idiomes = {}
        objCanso.id = idAnterior + index
        
        // console.log( el.numero + " includes?", arrDescartar.includes( el.numero ))
        if (! arrDescartar.includes( el.numero )) {

          // iterem pels idiomes que tingui la canço
          const idiomesCanso = Object.keys( el.idioma )
          idiomesCanso.forEach( idiomaCanso => {

            objCanso.idiomes[idiomaCanso] = {}
            objCanso.idiomes[idiomaCanso].titol = el.idioma[idiomaCanso].titol
            // if (el.idioma[idiomaCanso].audio) objCanso.idiomes[idiomaCanso].audio = el.idioma[idiomaCanso].audio
            if (el.idioma[idiomaCanso].audio) {
              objCanso.idiomes[idiomaCanso].audio = el.idioma[idiomaCanso].audio
            } else {
              objCanso.idiomes[idiomaCanso].audio = null
            }

            objCanso.idiomes[idiomaCanso].cansoners = [
              {
                nom: "Vermell",
                numero: el.numero,
                estat: null
              }
            ]
            objCanso.idiomes[idiomaCanso].lletra = el.idioma[idiomaCanso].lletra
           
          })

        }

        arr.push(JSON.parse(JSON.stringify(objCanso)))

      })
     

      return arr
    })


    return {
      store,
      resultat,

    }
  }
})
</script>


