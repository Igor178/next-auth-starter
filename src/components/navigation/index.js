import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/auth/AuthContext'
import { get } from 'axios'

const Navigation = () => {
  const { route } = useRouter()
  const [toggle, toggleNavbar] = useState(false)
  const { isAuthenticated, setAuthenticated } = useAuth()

  const logout = async () => {
    try {
      const response = await get('/api/logout')

      setAuthenticated(false)
    } catch (err) {
      console.log(err, 'Logout error')
    }
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <Link href={!isAuthenticated ? '/' : '/dashboard'}>
          <a className='navbar-brand'>NextJS 9.5 💯</a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => toggleNavbar(!toggle)}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${
            toggle && 'show'
          }`}
          id='navbarNavAltMarkup'
        >
          <div className='navbar-nav'>
            {isAuthenticated && (
              <Link href='/profile'>
                <a className={`nav-link ${route === '/profile' && 'active'}`}>
                  Profile
                </a>
              </Link>
            )}
            {!isAuthenticated && (
              <Link href='/login'>
                <a className={`nav-link ${route === '/login' && 'active'}`}>
                  Login
                </a>
              </Link>
            )}
            {!isAuthenticated && (
              <Link href='/register'>
                <a className={`nav-link ${route === '/register' && 'active'}`}>
                  Register
                </a>
              </Link>
            )}
            {isAuthenticated && (
              <button
                className='btn btn-danger ml-2'
                role='button'
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
