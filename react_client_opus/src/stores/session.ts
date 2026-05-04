/* eslint-disable @typescript-eslint/no-explicit-any */
/*  B"H
 */

import { create } from 'zustand'
import { type DataEnvelope, type User } from '../../../server/types'

import { loadScript, api as myApi } from '../services/myFetch'

export type FeedbackMessage = {
  type: 'success' | 'danger' | 'info'
  text: string
}

type SessionState = {
  user: User | null
  token: string | null
  googleToken: string | null
  messages: FeedbackMessage[]
  loadingCount: number
  isLoading: boolean

  login: () => Promise<void>
  logout: () => void
  addMessage: (text: string, type?: FeedbackMessage['type']) => void
  removeMessage: (index: number) => void
  handleError: (error: Error | string) => void
  api: <T>(endpoint: string, data?: unknown, options?: RequestInit) => Promise<T>
}

export const useSessionStore = create<SessionState>((set, get) => ({
  user: null,
  token: null,
  googleToken: null,
  messages: [],
  loadingCount: 0,
  get isLoading() {
    return get().loadingCount > 0
  },

  async login() {
    await loadScript('https://accounts.google.com/gsi/client', 'google-signin')

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: 'email profile https://www.googleapis.com/auth/calendar.events.readonly',
      callback: async (response: any) => {
        if (response.error) {
          throw new Error(response.error)
        }
        console.log({ response })
        set({ googleToken: response.access_token })
        await exchangeForOurToken(response.access_token)
      },
    })
    tokenClient.requestAccessToken()

    async function exchangeForOurToken(googleToken: string) {
      const response = await myApi<DataEnvelope<{ user: User; token: string }>>(
        'users/login',
        { googleToken },
        { method: 'POST' },
      )
      if (!response.isSuccess) {
        get().addMessage(response.message || 'Login failed', 'danger')
        return
      }
      const { user: loggedInUser, token: authToken } = response.data
      set({ user: loggedInUser, token: authToken })
    }
  },

  logout() {
    set({ user: null, token: null })
  },

  addMessage(text: string, type: FeedbackMessage['type'] = 'info') {
    set((state) => ({ messages: [...state.messages, { type, text }] }))
  },

  removeMessage(index: number) {
    set((state) => ({ messages: state.messages.filter((_, i) => i !== index) }))
  },

  handleError(error: Error | string) {
    const message = typeof error === 'string' ? error : error.message
    get().addMessage(message, 'danger')
    console.error(error)
  },

  api<T>(endpoint: string, data?: unknown, options: RequestInit = {}) {
    set((state) => ({ loadingCount: state.loadingCount + 1 }))

    const { token } = get()
    options.headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    return myApi<T>(endpoint, data, options)
      .catch((error) => {
        get().handleError(error)
        throw error
      })
      .finally(() => {
        set((state) => ({ loadingCount: state.loadingCount - 1 }))
      })
  },
}))

export default useSessionStore
