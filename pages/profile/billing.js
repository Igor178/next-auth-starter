import Layout from '../../src/components/layout/index'
import WithAuth from '../../src/components/hoc/withAuth'
import DeleteProfile from '../../src/components/deleteProfile/index'
import ProfileNavigation from '../../src/components/profileNavigation/index'

const Billing = () => {
  return (
    <Layout title='Billing'>
      <div className='container p-3'>
        <div className='mb-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <h1>Billing Settings</h1>
            <DeleteProfile />
          </div>
          <p className='lead'>Edit your billing settings.</p>
          <ProfileNavigation />
        </div>
      </div>
    </Layout>
  )
}

export default WithAuth(Billing)
