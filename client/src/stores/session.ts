/*  B"H
 */

import { defineStore } from 'pinia'
import { type DataEnvelope, type User } from '../../../server/types'
import { computed, ref } from 'vue'

import { api as myApi } from '../services/myFetch'

export type FeedbackMessage = {
  type: 'success' | 'danger' | 'info'
  text: string
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  async function login(email: string, password: string) {
    const response = await myApi<DataEnvelope<{ user: User; token: string }>>(
      'users/login',
      { email, password },
      { method: 'POST' },
    )
    if (!response.isSuccess) {
      addMessage(response.message || 'Login failed', 'danger')
      return
    }
    const { user: loggedInUser, token: authToken } = response.data
    user.value = loggedInUser
    token.value = authToken
  }

  function logout() {
    user.value = null
    token.value = null
  }

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

    options.headers = {
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
      ...options.headers,
    }

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
    token,
    login,
    logout,
    messages,
    addMessage,
    handleError,
    isLoading,
    api,
  }
})

export default useSessionStore
