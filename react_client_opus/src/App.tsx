import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import MessageList from './components/MessageList'
import DialogBoxes from './components/DialogBoxes'
import { useSessionStore } from './stores/session'
import { useCartStore } from './stores/cart'
import { useEffect } from 'react'

export default function App() {
  const isLoading = useSessionStore((s) => s.loadingCount > 0)
  const user = useSessionStore((s) => s.user)
  const loadCart = useCartStore((s) => s.loadCart)

  // Load cart when user logs in, equivalent to Vue's watch on session.user
  useEffect(() => {
    if (user) {
      loadCart()
    }
  }, [user])

  return (
    <>
      <NavBar />
      <div className="container">
        {isLoading && <progress className="progress is-primary"></progress>}
        <MessageList />
        <Outlet />
      </div>
      <DialogBoxes />
    </>
  )
}
