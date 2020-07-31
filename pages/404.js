import Link from 'next/link'
import Layout from '../src/components/layout/index'

const Custom404 = () => {
  return (
    <Layout title="You're Lost!">
      <div className='container p-3'>
        <div className='row'>
          <div className='col text-center'>
            <h1 className='display-1 font-weight-bold'>404</h1>
            <p className='lead'>Page not found 😭</p>
            <p>We can't seem to find the page you're looking for.</p>
            <Link href='/'>
              <a className='btn btn-primary' role='button'>
                Take Me Home 🏠
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Custom404
