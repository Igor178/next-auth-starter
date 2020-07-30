import Layout from '../src/components/layout/index'
import WithAuth from '../src/components/hoc/withAuth'

const Dashboard = () => {
  return (
    <Layout title='Dashboard'>
      <div className='container p-3'>
        <h1>Dashboard Page</h1>
        <p className='lead'>
          This is users dashboard and should be only available if user is logged
          in.
        </p>
      </div>
    </Layout>
  )
}

export default WithAuth(Dashboard)
