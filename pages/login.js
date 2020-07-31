import { useState } from 'react'
import Link from 'next/link'
import { post } from 'axios'
import { Formik, Form, Field } from 'formik'
import Layout from '../src/components/layout/index'
import ShowPassword from '../src/components/showPassword/index'
import ShowErrors from '../src/components/showErrors/index'
import WithoutAuth from '../src/components/hoc/withoutAuth'
import { useAuth } from '../src/context/auth/AuthContext'

const Login = () => {
  const { setAuthenticated } = useAuth()
  const [passwordToggle, togglePassword] = useState(false)

  return (
    <Layout title='Login'>
      <div className='container p-3'>
        <h1>Login Page</h1>
        <p className='lead'>
          Please log in to continue or{' '}
          <Link href='/register'>
            <a className='text-decoration-none'>Register here</a>
          </Link>
          .
        </p>
        <Formik
          initialValues={{
            email: '',
            password: '',
            sessionCookie: false,
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            try {
              const response = await post('/api/login', {
                email: values.email,
                password: values.password,
                sessionCookie: values.sessionCookie,
              })
              setAuthenticated(true)
            } catch (err) {
              setSubmitting(false)
              setErrors(err.response.data)
            }
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form>
              <ShowErrors errors={errors} />

              <div className='mb-3 '>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <Field
                  autoComplete='email'
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Email'
                  className={`form-control ${errors?.msg && 'border-danger'}`}
                />
              </div>
              <label
                htmlFor='password'
                className='form-label d-flex justify-content-between'
              >
                Password
                <Link href='/password-reset'>
                  <a className='text-decoration-none'>Forgot password?</a>
                </Link>
              </label>
              <div className='mb-3 input-group'>
                <Field
                  autoComplete='password'
                  type={passwordToggle ? undefined : 'password'}
                  id='password'
                  name='password'
                  placeholder='Password'
                  className={`form-control ${errors?.msg && 'border-danger'}`}
                />
                <ShowPassword
                  passwordToggle={passwordToggle}
                  togglePassword={togglePassword}
                />
              </div>
              <div className='mb-3 form-check'>
                <Field
                  type='checkbox'
                  className='form-check-input'
                  id='sessionCookie'
                  name='sessionCookie'
                />
                <label className='form-check-label' htmlFor='sessionCookie'>
                  Remember me 👍
                </label>
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
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default WithoutAuth(Login)
