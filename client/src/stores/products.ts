/* B"H
 */

import { defineStore } from 'pinia'
import type { DataListEnvelope, Product, User } from '../../../server/types'
import { ref } from 'vue'
import { getProducts } from '@/services/products'

export const useProductsStore = defineStore('products', () => {
  getProducts().then((data) => {
    products.value = data.data
  })

  const products = ref<Product[]>([])

  return { products }
})
