/* B"H
 */

import { create } from 'zustand'
import type { DataEnvelope, DataListEnvelope, Product } from '../../../server/types'
import { useProductsStore } from './products'
import { useSessionStore } from './session'

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
  isCartSidebarOpen: boolean

  loadCart: () => void
  addItem: (productId: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
  setCartSidebarOpen: (isOpen: boolean) => void
  updateItemQuantity: (productId: number, quantity: number) => void
}

function saveChangesToCartItem(productId: number, quantity: number) {
  const { api, addMessage } = useSessionStore.getState()
  api<DataEnvelope<CartItem>>(`cart`, { productId, quantity }).then((response) => {
    if (response.message) {
      addMessage(response.message, response.isSuccess ? 'info' : 'danger')
    }
  })
}

function updateItem(productId: number, quantity: number = 1) {
  saveChangesToCartItem(productId, quantity)

  const { items } = useCartStore.getState()
  const item = items.find((item) => item.product.id === productId)
  if (item) {
    useCartStore.setState({
      items: items.map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity + quantity } : i,
      ),
    })
    return
  }

  const { products } = useProductsStore.getState()
  const product = products.find((p) => p.id === productId)
  if (product) {
    useCartStore.setState({ items: [...items, { product, quantity }] })
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartSidebarOpen: false,

  loadCart() {
    const { api } = useSessionStore.getState()
    api<DataListEnvelope<CartItem>>(`cart`).then((response) => {
      set({ items: response.data })
    })
  },

  addItem(productId: number) {
    updateItem(productId, 1)
  },

  removeItem(productId: number) {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }))
    saveChangesToCartItem(productId, 0)
  },

  clearCart() {
    set({ items: [] })
  },

  setCartSidebarOpen(isOpen: boolean) {
    set({ isCartSidebarOpen: isOpen })
  },

  updateItemQuantity(productId: number, newQuantity: number) {
    const { items } = get()
    const item = items.find((i) => i.product.id === productId)
    if (!item) return

    const delta = newQuantity - item.quantity
    saveChangesToCartItem(productId, delta)

    set({
      items: items.map((i) =>
        i.product.id === productId ? { ...i, quantity: newQuantity } : i,
      ),
    })
  },
}))
