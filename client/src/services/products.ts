/* B"H
 */

import { api } from './myFetch'
import type { DataListEnvelope, Product } from '../../../server/types'

export function getProducts() {
  return api<DataListEnvelope<Product>>('products')
}

export function getProduct(id: number) {
  return api<Product>(`products/${id}`)
}
