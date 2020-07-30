import WithAuthRedirect from './withAuthRedirect'

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */

const WithAuth = (WrappedComponent, location = '/login') => {
  return WithAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true,
  })
}

export default WithAuth
