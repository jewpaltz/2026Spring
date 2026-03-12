/* B"H
 */

import data from '../data/products.json'
import { defineStore } from 'pinia'
import type { Product } from '../types'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(data.products)

  return { products }
})
