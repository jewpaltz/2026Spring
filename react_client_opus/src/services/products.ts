/* B"H
 */

import { useSessionStore } from '../stores/session'
import type { DataListEnvelope, Product } from '../../../server/types'

export function getProducts() {
  const { api } = useSessionStore.getState()
  return api<DataListEnvelope<Product>>('products')
}

export function getProduct(id: number) {
  const { api } = useSessionStore.getState()
  return api<Product>(`products/${id}`)
}
