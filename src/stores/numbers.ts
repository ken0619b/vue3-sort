import { defineStore } from 'pinia'
import type { ArrayElement } from '@/types/ArrayElement'
import type { ProcedureElement } from '@/types/ProcedureElement'

export interface State {
  numberCount: number
  numbers: Array<ArrayElement>
  procedures: Array<ProcedureElement>
  speed: number
}

export const useNumbersStore = defineStore({
  id: 'numbers',
  state: () =>
    ({
      numberCount: 0,
      numbers: [],
      procedures: [],
      speed: 0
    }) as State,
  getters: {},
  actions: {
    reset() {
      this.numberCount = 0
      this.numbers = []
      this.procedures = []
      this.speed = 0
    },
    sort() {
      this.bubbleSort()
    },
    setSpeed() {
      let speed = 0
      if (this.numberCount <= 16) {
        speed = 64
      } else if (this.numberCount <= 32) {
        speed = 32
      } else if (this.numberCount <= 64) {
        speed = 16
      } else {
        speed = 8
      }
      this.speed = speed
    },
    updateNumberCount(count: number) {
      this.numberCount = count
    },
    setRandomNumbers() {
      let data: Array<ArrayElement> = []
      for (let i = 0; i < this.numberCount; i++) {
        let value = Math.max(Math.floor(Math.random() * Math.floor(128)), 1)
        data.push({
          id: i,
          value: value,
          status: ''
        })
      }
      this.numbers = data
    },

    updateNumbers(new_numbers: Array<ArrayElement>) {
      this.numbers = new_numbers
    },
    bubbleSort() {
      this.procedures = []

      let arr: Array<ArrayElement> = Object.assign([], this.numbers)
      let len = arr.length
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
          if (arr[j].value > arr[j + 1].value) {
            // 比較した要素情報を格納
            this.procedures.push({
              action: 'comparison',
              id1: arr[j].id,
              id2: arr[j + 1].id
            })

            let tmp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = tmp

            // スワップする要素情報を格納
            this.procedures.push({
              action: 'swapping',
              id1: arr[j + 1].id,
              id2: arr[j].id
            })
          }
        }
      }
    }
  }
})
