/* B"H
 */
const API_BASE_URL = 'http://localhost:3000/api/v1/'

export default function rest<T>(url: string): Promise<T> {
  return fetch(url).then((res) => {
    if (!res.ok) {
      if (res.headers.get('Content-Type')?.includes('application/json')) {
        return res.json().then((data) => {
          throw new Error(data.message || 'An error occurred')
        })
      }
      return res.text().then((text) => {
        throw new Error(text)
      })
    }
    return res.json() as Promise<T>
  })
}

export function api<T>(endpoint: string) {
  return rest<T>(`${API_BASE_URL}${endpoint}`)
}
