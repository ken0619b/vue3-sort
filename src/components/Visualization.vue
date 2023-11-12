<script setup lang="ts">
import type { ArrayElement } from '../types/ArrayElement.ts'

interface Props {
  numbers: Array<ArrayElement>
}

defineProps<Props>()
</script>

<template>
  <div
    v-for="(number, i) in numbers"
    :key="`${number.value} - ${i}`"
    v-bind:style="{ width: 512 / numbers.length + 'px', height: number.value * 3 + 'px' }"
    v-bind:class="[
      'mx-1',
      'text-xs',
      'text-center',
      number.status === 'compared'
        ? 'bg-red-400'
        : number.status === 'sorted'
        ? 'bg-green-400'
        : 'bg-slate-400'
    ]"
  >
    {{ number.value }}
  </div>
</template>
