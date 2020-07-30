import '../src/styles/index.css'
import { AuthContextProvider } from '../src/context/auth/AuthContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
