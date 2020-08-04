import { Formik, Form, Field } from 'formik'
import { post } from 'axios'
import Layout from '../../src/components/layout/index'
import WithAuth from '../../src/components/hoc/withAuth'
import DeleteProfile from '../../src/components/deleteProfile/index'
import ProfileNavigation from '../../src/components/profileNavigation/index'

const ChangePassword = () => {
  return (
    <Layout title='Profile - Change Password'>
      <div className='container p-3'>
        <div className='mb-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <h1>Change Your Password</h1>
            <DeleteProfile />
          </div>
          <p className='lead'>Change your password below.</p>
          <ProfileNavigation />
        </div>
      </div>
    </Layout>
  )
}

export default WithAuth(ChangePassword)
