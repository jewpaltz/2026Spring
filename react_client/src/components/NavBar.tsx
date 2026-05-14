
//import { useCartStore } from '@/stores/cart';
import useSessionStore from '../stores/session';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import reactImg from '../assets/vite.svg';
//import { RouterLink } from 'vue-router';

export default function NavBar() {

    const [isActive, setIsActive] = useState(false);

    //const cartStore = useCartStore();
    const sessionStore = useSessionStore();

    function login() {
        sessionStore.login();
    }
    function logout() {
        sessionStore.logout();
    }

    function toggleCart() {
        console.log('Toggling cart sidebar');

        //cartStore.isCartSidebarOpen = !cartStore.isCartSidebarOpen;
    }

return (
    <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img alt="React logo" width="30" height="30" src={reactImg} />

                </a>

                <a role="button" 
                className={`navbar-burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false"
                   onClick={() => setIsActive(!isActive)} data-target="navbarBasicExample">

                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                
                <div className="navbar-start">
                    <RouterLink to="/" active-className="is-active" className="navbar-item">
                        Home
                    </RouterLink>

                    <RouterLink to="/products" active-className="is-active" className="navbar-item">
                        Products
                    </RouterLink>

                    <RouterLink to="/calendar" active-className="is-active" className="navbar-item">
                        Calendar
                    </RouterLink>

                    <RouterLink to="/about" active-className="is-active" className="navbar-item">
                        About
                    </RouterLink>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Admin
                        </a>

                        <div className="navbar-dropdown">
                            <RouterLink to="/admin/products" active-className="is-active" className="navbar-item">
                                Products
                            </RouterLink>
                            <RouterLink to="/admin/users" active-className="is-active" className="navbar-item">
                                Users
                            </RouterLink>
                            <hr className="navbar-divider" />
                            <RouterLink to="/report-issue" active-className="is-active" className="navbar-item">
                                Placeholder
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <a onClick={toggleCart}>
                            <span className="tag is-danger is-small is-rounded count" v-if="cartStore.count">
                                
                            </span>
                            <span className="icon">
                                <i className="fas fa-shopping-cart"></i>
                            </span>
                        </a>

                    </div>
                    {sessionStore.user ? (
                    <div className="navbar-item">
                        <img src={sessionStore.user.image} alt="Profile Picture" className="is-rounded" width="30"
                             height="30" />
                        <div style={{ lineHeight: '1em' }}>
                            {sessionStore.user.firstName} {sessionStore.user.lastName} <br />
                            <small>{sessionStore.user.email}</small>
                        </div>
                        <div>
                            (<a onClick={logout}>
                                Not You?
                            </a>)
                        </div>
                    </div>
                    ) : (
                    <div className="navbar-item">

                        <div className="buttons">
                            <RouterLink to="/sign-up" active-className="is-active" className="button is-primary">
                                <strong>Sign up</strong>
                            </RouterLink>
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