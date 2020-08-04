import Link from 'next/link'
import { useRouter } from 'next/router'

const ProfileNavigation = () => {
  const { route } = useRouter()

  return (
    <nav className='nav nav-pills'>
      <Link href='/profile'>
        <a className={`nav-link ${route === '/profile' && 'active'}`}>
          Edit Profile
        </a>
      </Link>
      <Link href='/profile/billing'>
        <a className={`nav-link ${route === '/profile/billing' && 'active'}`}>
          Billing
        </a>
      </Link>
      <Link href='/profile/change-password'>
        <a
          className={`nav-link ${
            route === '/profile/change-password' && 'active'
          }`}
        >
          Change Password
        </a>
      </Link>
    </nav>
  )
}

export default ProfileNavigation
