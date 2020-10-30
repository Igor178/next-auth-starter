import Image from 'next/image'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Layout from '../src/components/layout/index'
import WithoutAuth from '../src/components/hoc/withoutAuth'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    div {
      width: 100% !important;
    }
  }
`

const Home = () => {
  return (
    <Layout title='Home'>
      <div className='container p-3'>
        <h1>Home Page</h1>
        <p className='lead'>
          Welcome to this starter for your{' '}
          <span className='font-weight-bold'>Next.js</span> project!
        </p>
        <Container>
          <div>
            <ul>
              <li>Json Web Token 🟡</li>
              <li>Cookies 🍪</li>
              <li>Bootstrap v5 🚀</li>
              <li>Optimized Images 📷</li>
              <li>Passport.js 🕵️‍♂️</li>
              <li>Mongoose 🏦</li>
              <li>SWR / Axios 🎣</li>
              <li>Next Connect 🤙</li>
              <li>Moment.js 🕰</li>
              <li>Validator.js ✅</li>
              <li>Formik 📝</li>
              <li>SendGrid For Forgot Password✉️</li>
              <li>Next.js Image Component</li>
              <li>React Framer Motion</li>
            </ul>
          </div>
          <motion.div
            className='text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image
              src='/image.jpg'
              alt='Super nature'
              width={600}
              height={400}
              quality='50'
              priority='true'
            />
            <p className='mt-3'>No Layout Shift with Image Component</p>
          </motion.div>
        </Container>
      </div>
    </Layout>
  )
}

export default WithoutAuth(Home)
