import { Formik, Field, Form } from 'formik'
import Layout from '../src/components/layout/index'
import WithAuth from '../src/components/hoc/withAuth'
import DeleteProfile from '../src/components/deleteProfile/index'

const Profile = () => {
  return (
    <Layout title='Profile'>
      <div className='container p-3'>
        <h1>Profile Page</h1>
        <p className='lead'>Your account details.</p>
        <DeleteProfile />
      </div>
    </Layout>
  )
}

export default WithAuth(Profile)
