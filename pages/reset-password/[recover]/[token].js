import { Formik, Field, Form } from 'formik'
import { useState } from 'react'
import { post } from 'axios'
import { useRouter } from 'next/router'
import Layout from '../../../src/components/layout/index'
import WithoutAuth from '../../../src/components/hoc/withoutAuth'
import ShowErrors from '../../../src/components/showErrors/index'
import ShowPassword from '../../../src/components/showPassword/index'
import { useAuth } from '../../../src/context/auth/AuthContext'

const PasswordRecovery = () => {
  const {
    query: { token },
  } = useRouter()
  const { setAuthenticated } = useAuth()

  const [passwordToggle, togglePassword] = useState(false)
  return (
    <Layout title='Password Recovery'>
      <div className='container p-3'>
        <h1>Reset Your Password</h1>
        <Formik
          initialValues={{
            password: '',
            password_confirmation: '',
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            try {
              const response = await post(`/api/reset-password/${token}`, {
                password: values.password,
                password_confirmation: values.password_confirmation,
              })
              setAuthenticated(true)
            } catch (err) {
              setSubmitting(false)
              setErrors(err.response.data.data.errors)
            }
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form>
              <ShowErrors errors={errors} />
              <label htmlFor='password' className='form-label'>
                New Password
              </label>
              <div className=' input-group'>
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
              </div>
              <div id='passwordHelp' className='form-text mb-3'>
                Password must contain at least one uppercase letter, one
                lowercase letter and one number.
              </div>
              <div className='mb-3 '>
                <label htmlFor='password_confirmation' className='form-label'>
                  Confirm Password
                </label>
                <Field
                  autoComplete='off'
                  type='password'
                  id='password_confirmation'
                  name='password_confirmation'
                  placeholder='Confirm your password'
                  className='form-control'
                  className={`form-control ${
                    errors?.password && 'border-danger'
                  }`}
                />
                <div id='passwordConfirmHelp' className='form-text mb-3'>
                  Both passwords must match.
                </div>
              </div>
              <button
                className='btn btn-primary'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span
                    className='spinner-border spinner-border-sm mr-2'
                    role='status'
                    aria-hidden='true'
                  ></span>
                )}
                Change Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default WithoutAuth(PasswordRecovery)
