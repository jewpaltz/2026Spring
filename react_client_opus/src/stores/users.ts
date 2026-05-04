/* B"H
 */

import { create } from 'zustand'
import type { DataEnvelope, DataListEnvelope, User } from '../../../server/types'
import { useSessionStore } from './session'
import { type PagingRequest } from '../../../server/types/dataEnvelopes'

type UsersState = {
  users: User[]
  totalCount: number | null

  loadUsers: (pagingParams?: PagingRequest) => Promise<void>
  getUser: (id: number) => Promise<DataEnvelope<User>>
  createUser: (user: Omit<User, 'id'>) => Promise<DataEnvelope<User>>
  updateUser: (id: number, user: Omit<User, 'id'>) => Promise<DataEnvelope<User>>
  deleteUser: (id: number) => Promise<DataEnvelope<User>>
}

export const useUsersStore = create<UsersState>((set, _get) => ({
  users: [],
  totalCount: null,

  async loadUsers(pagingParams?: PagingRequest) {
    const { api } = useSessionStore.getState()
    const url = pagingParams
      ? `users?${new URLSearchParams(pagingParams as Record<string, string>)}`
      : 'users'
    const data = await api<DataListEnvelope<User>>(url)
    set({ users: data.data, totalCount: data.total })
  },

  // Gets the complete user details for a given user ID. The user in the list may be incomplete (e.g. missing description), so this is used to get the full details when needed.
  async getUser(id: number) {
    const { api } = useSessionStore.getState()
    return api<DataEnvelope<User>>(`users/${id}`)
  },

  async createUser(user: Omit<User, 'id'>) {
    const { api } = useSessionStore.getState()
    const data = await api<DataEnvelope<User>>('users', user)
    set((state) => ({ users: [...state.users, data.data] }))
    return data
  },

  async updateUser(id: number, user: Omit<User, 'id'>) {
    const { api } = useSessionStore.getState()
    const data = await api<DataEnvelope<User>>(`users/${id}`, user, {
      method: 'PATCH',
    })
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? data.data : u)),
    }))
    return data
  },

  async deleteUser(id: number) {
    const { api } = useSessionStore.getState()
    const data = await api<DataEnvelope<User>>(`users/${id}`, null, {
      method: 'DELETE',
    })
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }))
    return data
  },
}))
