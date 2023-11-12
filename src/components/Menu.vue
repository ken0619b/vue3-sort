<script setup lang="ts">
interface Props {
  sorting: boolean
}

interface Emits {
  (event: 'clear'): void
  (event: 'runSort'): void
}

const emit = defineEmits<Emits>()
defineProps<Props>()

const onClickClear = (): void => {
  emit('clear')
}

const onClickSort = (): void => {
  emit('runSort')
}
</script>

<template>
  <div className="w-2/5 grid grid-rows-1 grid-flow-col gap-4 mx-auto">
    <button
      :disabled="sorting"
      className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded"
      v-on:click="onClickClear"
    >
      clear
    </button>
    <button
      :disabled="sorting"
      className="cursor-pointer bg-teal-100 hover:bg-teal-200 disabled:bg-slate-300 text-black font-bold py-2 px-4 rounded"
      v-on:click="onClickSort"
    >
      run sort
    </button>
  </div>
</template>
