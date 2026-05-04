import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '@/stores/cart'
import { useSessionStore } from '@/stores/session'
import logo from '@/assets/logo.svg'

export default function NavBar() {
  const [isActive, setIsActive] = useState(false)
  const location = useLocation()

  const count = useCartStore((s) => s.items.reduce((total, item) => total + item.quantity, 0))
  const isCartSidebarOpen = useCartStore((s) => s.isCartSidebarOpen)
  const setCartSidebarOpen = useCartStore((s) => s.setCartSidebarOpen)

  const user = useSessionStore((s) => s.user)
  const login = useSessionStore((s) => s.login)
  const logout = useSessionStore((s) => s.logout)

  function toggleCart() {
    console.log('Toggling cart sidebar')
    setCartSidebarOpen(!isCartSidebarOpen)
  }

  function isActiveClass(path: string) {
    return location.pathname === path ? 'is-active' : ''
  }

  return (
    <nav className="navbar is-info" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img alt="Logo" width="30" height="30" src={logo} />
          </a>

          <a
            role="button"
            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setIsActive(!isActive)}
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/" className={`navbar-item ${isActiveClass('/')}`}>
              Home
            </Link>

            <Link to="/products" className={`navbar-item ${isActiveClass('/products')}`}>
              Products
            </Link>

            <Link to="/calendar" className={`navbar-item ${isActiveClass('/calendar')}`}>
              Calendar
            </Link>

            <Link to="/about" className={`navbar-item ${isActiveClass('/about')}`}>
              About
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Admin</a>

              <div className="navbar-dropdown">
                <Link to="/admin/products" className={`navbar-item ${isActiveClass('/admin/products')}`}>
                  Products
                </Link>
                <Link to="/admin/users" className={`navbar-item ${isActiveClass('/admin/users')}`}>
                  Users
                </Link>
                <hr className="navbar-divider" />
                <Link to="/report-issue" className={`navbar-item ${isActiveClass('/report-issue')}`}>
                  Placeholder
                </Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <a onClick={toggleCart} style={{ position: 'relative' }}>
                {count > 0 && (
                  <span className="tag is-danger is-small is-rounded" style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-7px',
                    fontSize: '0.75rem',
                    transition: 'all 0.3s ease-in-out',
                  }}>
                    {count}
                  </span>
                )}
                <span className="icon">
                  <i className="fas fa-shopping-cart"></i>
                </span>
              </a>
            </div>

            {user ? (
              <div className="navbar-item">
                <img src={user.image} alt="Profile Picture" className="is-rounded" width="30" height="30" />
                <div style={{ lineHeight: '1em' }}>
                  {user.firstName} {user.lastName} <br />
                  <small>{user.email}</small>
                </div>
                <div>
                  (<a onClick={logout}>Not You?</a>)
                </div>
              </div>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/sign-up" className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <button onClick={login} className="button is-light">
                    Log in
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
