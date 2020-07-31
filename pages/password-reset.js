import Layout from '../src/components/layout/index'

const PasswordReset = () => {
  return (
    <Layout title='Forgot Password?'>
      <div className='container p-3'>
        <h1>Forgot Password?</h1>
        <p className='lead'>
          Enter the email address you used when you joined and we’ll send you
          instructions to reset your password.
        </p>
        // Form here
      </div>
    </Layout>
  )
}

export default PasswordReset
