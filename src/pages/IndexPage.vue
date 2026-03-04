<template>
  <q-page class="row items-center justify-evenly">
    <q-table
    :columns="tableColumns"
    :rows="tableRows"
    >
    <template v-slot:body-cell="props">
      <q-td key="calories" :props="props">
            {{ props.value }}
            <q-popup-edit v-model.number="props.row[props.col.field]" :title="props.col.label" buttons v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
    </template>
    <template v-slot:bottom-row="props">
      <q-tr >
      <q-th v-for="(col,index) of props.cols" :key="col.name">{{ footerValue[index as number] }}</q-th>
      </q-tr>
    </template>
    </q-table>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { QTable, type QTableColumn } from 'quasar';

const tableColumns = ref<QTableColumn[]>([
  {
    label: 'Stunden I',
    name: 'col1',
    field: 'stunden1'
  },
  {
    label: 'Stunden II',
    name: 'col2',
    field: 'stunden2'
  }
])
const tableRows = ref<{ stunden1: number, stunden2: number }[]>([
  { stunden1: 1, stunden2: 0},
  {stunden1: 0, stunden2: 1}
])

interface IStunden {
  [key: string]: number;

}
const footerValue = computed(():number[] => {
  const values:number[] = [] 
  for(const col of tableColumns.value){
    console.log(col)
    values.push(tableRows.value.reduce((p: number, row:{ stunden1: number, stunden2: number } ) => {
      const key = col.field as string
      const v = (row as IStunden)[key] || 0
      return p + v
    }, 0))
  }
  return values
})
const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
</script>
