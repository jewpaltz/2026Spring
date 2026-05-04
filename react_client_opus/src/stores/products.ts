/* B"H
 */

import { create } from 'zustand'
import type { DataEnvelope, DataListEnvelope, Product } from '../../../server/types'
import { useSessionStore } from './session'
import type { PagingRequest } from '../../../server/types/dataEnvelopes'

type ProductsState = {
  products: Product[]
  totalCount: number | null

  loadProducts: (pagination?: PagingRequest) => Promise<void>
  getProduct: (id: number) => Promise<DataEnvelope<Product>>
  createProduct: (product: Omit<Product, 'id'>) => Promise<DataEnvelope<Product>>
  updateProduct: (id: number, product: Omit<Product, 'id'>) => Promise<DataEnvelope<Product>>
  deleteProduct: (id: number) => Promise<DataEnvelope<Product>>
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  totalCount: null,

  async loadProducts(pagination?: PagingRequest) {
    const { api } = useSessionStore.getState()
    const url = pagination
      ? `products?${new URLSearchParams(pagination as Record<string, string>)}`
      : 'products'
    const data = await api<DataListEnvelope<Product>>(url)
    set({ products: data.data, totalCount: data.total })
  },

  // Gets the complete product details for a given product ID. The product in the list may be incomplete (e.g. missing description), so this is used to get the full details when needed.
  async getProduct(id: number) {
    const { api } = useSessionStore.getState()
    return api<DataEnvelope<Product>>(`products/${id}`)
  },

  async createProduct(product: Omit<Product, 'id'>) {
    const { api } = useSessionStore.getState()
    const data = await api<DataEnvelope<Product>>('products', product)
    set((state) => ({ products: [...state.products, data.data] }))
    return data
  },

  async updateProduct(id: number, product: Omit<Product, 'id'>) {
    const { api } = useSessionStore.getState()
    const data = await api<DataEnvelope<Product>>(`products/${id}`, product, {
      method: 'PATCH',
    })
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? data.data : p)),
    }))
    return data
  },

  async deleteProduct(id: number) {
    const { api } = useSessionStore.getState()
    const data = await api<DataEnvelope<Product>>(`products/${id}`, null, {
      method: 'DELETE',
    })
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }))
    return data
  },
}))
