import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { post } from 'axios'
import Layout from '../../src/components/layout/index'
import WithAuth from '../../src/components/hoc/withAuth'
import DeleteProfile from '../../src/components/deleteProfile/index'
import ProfileNavigation from '../../src/components/profileNavigation/index'
import ShowErrors from '../../src/components/showErrors/index'
import ShowSuccess from '../../src/components/showSuccess/index'
import ShowPassword from '../../src/components/showPassword/index'

const ChangePassword = () => {
  const [passwordToggle, togglePassword] = useState(false)

  return (
    <Layout title='Change Password'>
      <div className='container p-3'>
        <div className='mb-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <h1>Change Your Password</h1>
            <DeleteProfile />
          </div>
          <p className='lead'>Change your password below.</p>
          <ProfileNavigation />
        </div>
        <Formik
          initialValues={{
            current_password: '',
            password: '',
            password_confirmation: '',
          }}
          onSubmit={async (
            values,
            { setSubmitting, setErrors, setStatus, resetForm }
          ) => {
            setSubmitting(true)
            try {
              const response = await post(
                '/api/change-password',
                {
                  current_password: values.current_password,
                  password: values.password,
                  password_confirmation: values.password_confirmation,
                },
                { withAuthorization: true }
              )

              resetForm()
              setStatus(response.data.msg)
            } catch (err) {
              setStatus(undefined)
              setSubmitting(false)
              setErrors(err.response.data.data.errors)
            }
          }}
        >
          {({ errors, status }) => {
            return (
              <Form>
                <ShowErrors errors={errors} />
                <ShowSuccess status={status} />
                <div className='row mb-3'>
                  <label
                    htmlFor='current password'
                    className='col-sm-2 col-form-label'
                  >
                    Current Password <span className='text-danger'>*</span>
                  </label>
                  <div className='col-sm-10'>
                    <Field
                      autoComplete='off'
                      type='password'
                      id='current_password'
                      name='current_password'
                      placeholder='Your current password'
                      className={`form-control ${
                        (errors?.password && 'border-danger') ||
                        (errors?.msg && 'border-danger')
                      }`}
                    />
                  </div>
                </div>
                <div className='row'>
                  <label htmlFor='password' className='col-sm-2 col-form-label'>
                    New Password <span className='text-danger'>*</span>
                  </label>
                  <div className='col-sm-10'>
                    <div className='input-group'>
                      <Field
                        autoComplete='off'
                        type={passwordToggle ? undefined : 'password'}
                        id='password'
                        name='password'
                        placeholder='Your new password'
                        className={`form-control ${
                          errors?.password && 'border-danger'
                        }`}
                      />
                      <ShowPassword
                        passwordToggle={passwordToggle}
                        togglePassword={togglePassword}
                      />
                      <div
                        id='passwordHelp'
                        className='form-text mb-3 col-sm-12'
                      >
                        Your new password must contain at least one uppercase
                        letter, one lowercase letter and one number.
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label
                    htmlFor='password_confirm'
                    className='col-sm-2 col-form-label'
                  >
                    Confirm Password <span className='text-danger'>*</span>
                  </label>
                  <div className='col-sm-10'>
                    <Field
                      autoComplete='off'
                      type='password'
                      id='password_confirmation'
                      name='password_confirmation'
                      placeholder='Confirm your password'
                      className={`form-control ${
                        errors?.password && 'border-danger'
                      }`}
                    />
                    <div id='passwordConfirmHelp' className='form-text mb-3'>
                      Both passwords must match.
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-10 offset-sm-2'>
                    <button className='btn btn-primary' type='submit'>
                      Save Password
                    </button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Layout>
  )
}

export default WithAuth(ChangePassword)
