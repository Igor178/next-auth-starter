import { useState } from 'react'
import Layout from '../src/components/layout/index'
import WithoutAuth from '../src/components/hoc/withoutAuth'
import { Formik, Form, Field } from 'formik'
import { post } from 'axios'
import { useAuth } from '../src/context/auth/AuthContext'

const Login = () => {
  const { setAuthenticated } = useAuth()
  const [passwordToggle, togglePassword] = useState(true)

  const PasswordIcon = () => {
    return (
      <span
        role='button'
        className='input-group-text'
        id='show-password'
        onClick={() => togglePassword(!passwordToggle)}
      >
        {passwordToggle ? (
          <svg
            width='1em'
            height='1em'
            viewBox='0 0 16 16'
            class='bi bi-eye-fill'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
            <path
              fill-rule='evenodd'
              d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z'
            />
          </svg>
        ) : (
          <svg
            width='1em'
            height='1em'
            viewBox='0 0 16 16'
            class='bi bi-eye-slash-fill'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z' />
            <path d='M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z' />
            <path
              fill-rule='evenodd'
              d='M13.646 14.354l-12-12 .708-.708 12 12-.708.708z'
            />
          </svg>
        )}
      </span>
    )
  }

  return (
    <Layout title='Login'>
      <div className='container p-3'>
        <h1>Login Page</h1>
        <p className='lead'>Please log in to continue.</p>
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
              {errors?.msg && (
                <div className='alert alert-danger' role='alert'>
                  {errors?.msg}
                </div>
              )}
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
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <div className='mb-3 input-group'>
                <Field
                  autoComplete='password'
                  type={passwordToggle && 'password'}
                  id='password'
                  name='password'
                  placeholder='Password'
                  className={`form-control ${errors?.msg && 'border-danger'}`}
                />
                <PasswordIcon />
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
