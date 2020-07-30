import Router from 'next/router'
import { useAuth } from '../../context/auth/AuthContext'
import AuthLoading from './authLoading'

/**
 * Support client-side conditional redirecting based on the user's
 * authenticated state.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param location The location to redirect to.
 */

const WithAuthRedirect = ({
  WrappedComponent,
  LoadingComponent = AuthLoading,
  expectedAuth,
  location,
}) => {
  const WithAuthRedirectWrapper = (props) => {
    const { isLoading, isAuthenticated } = useAuth()

    if (isLoading) {
      return <LoadingComponent />
    }

    if (typeof window !== 'undefined' && expectedAuth !== isAuthenticated) {
      Router.push(location)
      return <></>
    }

    return <WrappedComponent {...props} />
  }

  return WithAuthRedirectWrapper
}

export default WithAuthRedirect
