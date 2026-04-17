/* B"H
 */

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { DataEnvelope, DataListEnvelope, Product } from '../../../server/types'
import { useProductsStore } from './products'
import useSessionStore from './session'

export type CartItem = {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isCartSidebarOpen = ref(false)

  const productsStore = useProductsStore()
  const sessionStore = useSessionStore()

  function loadCart() {
    sessionStore
      .api<DataListEnvelope<CartItem>>(`cart/${sessionStore.user?.id ?? 1}`)
      .then((response) => {
        items.value = response.data
      })
  }
  loadCart()

  function addItem(productId: number) {
    updateItem(productId, 1)
  }

  function updateItem(productId: number, quantity: number = 1) {
    saveChangesToCartItem(productId, quantity)

    const item = items.value.find((item) => item.product.id === productId)
    if (item) {
      item.quantity += quantity
      return
    }

    const product = productsStore.products.find((p) => p.id === productId)
    if (product) {
      items.value.push({ product, quantity })
    }
  }

  function saveChangesToCartItem(productId: number, quantity: number) {
    sessionStore
      .api<DataEnvelope<CartItem>>(`cart/${sessionStore.user?.id ?? 1}`, { productId, quantity })
      .then((response) => {
        if (response.message) {
          sessionStore.addMessage(response.message, response.isSuccess ? 'info' : 'danger')
        }
      })
  }

  watch(
    () => items.value.map((item) => ({ ...item })),
    (newItems, oldItems) => {
      for (const newItem of newItems) {
        const oldItem = oldItems.find((item) => item.product.id === newItem.product.id)
        // Only update if we are NOT adding or deleting items and only if the quantity has changed
        if (oldItem && oldItem.quantity !== newItem.quantity) {
          saveChangesToCartItem(newItem.product.id, newItem.quantity - (oldItem.quantity ?? 0))
        }
      }
    },
    { deep: true },
  )

  function removeItem(productId: number) {
    items.value = items.value.filter((item) => item.product.id !== productId)
    saveChangesToCartItem(productId, 0)
  }

  function clearCart() {
    items.value = []
  }

  const count = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.product.price * item.quantity, 0),
  )

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    isCartSidebarOpen,
    count,
    totalPrice,
  }
})
