/* B"H
 */

import { defineStore } from 'pinia'
import type { Product } from '../../../server/types'
import { ref } from 'vue'
import { api } from '../services/myFetch'

export const useProductsStore = defineStore('products', () => {
  api('users').then((data) => {
    console.log(data)
  })

  const products = ref<Product[]>([])

  return { products }
})
