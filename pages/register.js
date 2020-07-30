import Layout from '../src/components/layout/index'
import WithoutAuth from '../src/components/hoc/withoutAuth'

// Missing Form

const Register = () => {
  return (
    <Layout title='Register'>
      <div className='container p-3'>
        <h1>Register Page</h1>
        <p className='lead'>
          Please register below to get access to the dashboard.
        </p>
      </div>
    </Layout>
  )
}

export default WithoutAuth(Register)
