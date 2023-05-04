<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          noCaps
        >
          <q-tab name="01" label="1er. pas (Identificació cançó)" />
          <q-tab name="02" label="2on pas (introducció lletra)" />
          <q-tab name="03" label="3er pas (introducció acords)" />
          <q-tab name="04" label="4t pas (copiar per enviar)" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="01">
            <cmp_pas01 />
          </q-tab-panel>

          <q-tab-panel name="02">
            <cmp_pas02 />
          </q-tab-panel>

          <q-tab-panel name="03">
            <cmp_pas03 />
          </q-tab-panel>

          <q-tab-panel name="04">
            <cmp_pas04 />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
import cmp_pas01 from './Pas01.vue'
import cmp_pas02 from './Pas02.vue'
import cmp_pas03 from './Pas03.vue'
import cmp_pas04 from './Pas04.vue'

export default defineComponent({
  components: { cmp_pas01, cmp_pas02, cmp_pas03, cmp_pas04 },

  setup(){
    const tab = ref("01")

    return { tab }
  }
})

</script>

