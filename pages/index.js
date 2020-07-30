import Layout from '../src/components/layout/index'
import WithoutAuth from '../src/components/hoc/withoutAuth'

const Home = () => {
  return (
    <Layout title='Home'>
      <div className='container p-3'>
        <h1>Home Page</h1>
        <p className='lead'>
          Welcome to this starter for your{' '}
          <span className='font-weight-bold'>Next.js</span> project!
        </p>
        <ul>
          <li>Json Web Token 🟡</li>
          <li>Cookies 🍪</li>
          <li>Bootstrap v5 🚀</li>
          <li>Optimized Images 📷</li>
          <li>Passport.js 🕵️‍♂️</li>
          <li>Mongoose 🏦</li>
          <li>SWR 🎣</li>
          <li>Next Connect 🤙</li>
          <li>Moment.js 🕰</li>
          <li>Validator.js ✅</li>
          <li>Formik 📝</li>
        </ul>
      </div>
    </Layout>
  )
}

export default WithoutAuth(Home)
