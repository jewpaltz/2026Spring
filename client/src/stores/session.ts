/*  B"H
 */

import { defineStore } from 'pinia'
import type { User } from '../../../server/types'
import { computed, ref } from 'vue'

import { api as myApi } from '../services/myFetch'

export type FeedbackMessage = {
  type: 'success' | 'danger' | 'info'
  text: string
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)

  const messages = ref<FeedbackMessage[]>([])
  function addMessage(text: string, type: FeedbackMessage['type'] = 'info') {
    messages.value.push({ type, text })
  }
  function handleError(error: Error | string) {
    const message = typeof error === 'string' ? error : error.message
    addMessage(message, 'danger')
    console.error(error)
  }

  const loadingCount = ref(0)
  const isLoading = computed(() => loadingCount.value > 0)

  function api<T>(endpoint: string, data?: unknown, options: RequestInit = {}) {
    loadingCount.value++

    return myApi<T>(endpoint, data, options)
      .catch((error) => {
        handleError(error)
        throw error
      })
      .finally(() => {
        loadingCount.value--
      })
  }

  return {
    user,
    messages,
    addMessage,
    handleError,
    isLoading,
    api,
  }
})

export default useSessionStore
