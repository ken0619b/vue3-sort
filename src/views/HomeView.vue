<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useNumbersStore } from '@/stores/numbers'

import type { ArrayElement } from '../types/ArrayElement'

import Menu from '@/components/Menu.vue'
import Visualization from '@/components/Visualization.vue'

const numbersStore = useNumbersStore()

let sorting = ref(false)
let interval: number

const numberCount = computed((): number => {
  return numbersStore.numberCount
})

const numbers = computed((): Array<ArrayElement> => {
  return numbersStore.numbers
})

const updateNumbers = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    numbersStore.updateNumberCount(event.target.valueAsNumber)
    numbersStore.setRandomNumbers()
    numbersStore.setSpeed()
  }
}

const clear = (): void => {
  numbersStore.reset()
}

onBeforeUnmount((): void => {
  clearInterval(interval)
})

const doSort = (): void => {
  numbersStore.sort()
  if (numbersStore.procedures.length == 0) {
    return
  }

  sorting.value = true

  interval = setInterval(() => {
    let process = numbersStore.procedures[0]
    switch (process.action) {
      case 'comparison': {
        let comparing_ids = [process.id1, process.id2]
        for (let i = 0; i < numbersStore.numbers.length; i++) {
          if (
            numbersStore.numbers[i].id == comparing_ids[0] ||
            numbersStore.numbers[i].id == comparing_ids[1]
          ) {
            numbersStore.numbers[i].status = 'compared'
          }
        }
        break
      }
      case 'swapping': {
        let from_i = -1
        let to_i = -1
        for (let i = 0; i < numbersStore.numbers.length; i++) {
          if (numbersStore.numbers[i].id == process.id1) {
            numbersStore.numbers[i].status = 'swapped'
            from_i = i
          }
          if (numbersStore.numbers[i].id == process.id2) {
            numbersStore.numbers[i].status = 'swapped'
            to_i = i
          }
        }

        let swap_from = numbersStore.numbers[from_i]
        let swap_to = numbersStore.numbers[to_i]
        numbersStore.numbers[to_i] = swap_from
        numbersStore.numbers[from_i] = swap_to
        break
      }
    }

    // 全てのステップを再現できたら終了する
    numbersStore.procedures.splice(0, 1)
    if (numbersStore.procedures.length == 0) {
      clearInterval(interval)
      sorting.value = false
      for (let i = 0; i < numbersStore.numbers.length; i++) {
        numbersStore.numbers[i].status = 'sorted'
      }
    }
  }, numbersStore.speed)
}
</script>

<template>
  <div className="flex flex-col">
    <div>
      <label for="range" class="block mb-2 text-sm font-medium text-gray-600"
        >要素数:{{ numberCount }}</label
      >
    </div>
    <input
      id="range"
      type="range"
      max="128"
      value="numbersStore.numberCount"
      class="w-full h-1 rounded-sm appearance-none cursor-pointer dark:bg-gray-600"
      v-on:input="updateNumbers"
    />
    <div>sort-type: bubble</div>
  </div>
  <div class="flex flex-row">
    <div>
      <div className="flex flex-wrap h-96">
        <Visualization v-bind:numbers="numbers" />
      </div>
    </div>
  </div>
  <Menu v-on:clear="clear" v-on:runSort="doSort" v-bind:sorting="sorting" />
</template>
