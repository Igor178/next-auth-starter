import Head from 'next/head'
import Navigation from '../navigation/index'
import Footer from '../footer/index'

const Layout = ({ children, title = 'NextStack' }) => {
  return (
    <>
      <Head>
        <title>{`NextStack - ${title}`}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
