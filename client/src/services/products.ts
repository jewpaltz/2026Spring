/* B"H
 */

import useSessionStore from '../stores/session'
import type { DataListEnvelope, Product } from '../../../server/types'

export function getProducts() {
  const session = useSessionStore()
  return session.api<DataListEnvelope<Product>>('products')
}

export function getProduct(id: number) {
  const session = useSessionStore()
  return session.api<Product>(`products/${id}`)
}
