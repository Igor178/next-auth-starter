import { useState } from 'react'
import { post } from 'axios'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import Layout from '../src/components/layout/index'
import WithoutAuth from '../src/components/hoc/withoutAuth'
import ShowPassword from '../src/components/showPassword/index'
import ShowErrors from '../src/components/showErrors/index'
import { useAuth } from '../src/context/auth/AuthContext'

const Register = () => {
  const { setAuthenticated } = useAuth()
  const [passwordToggle, togglePassword] = useState(false)

  return (
    <Layout title='Register'>
      <div className='container p-3'>
        <h1>Register Page</h1>
        <p className='lead'>
          Please register below to get access to the dashboard or{' '}
          <Link href='/login'>
            <a className='text-decoration-none'>Login here.</a>
          </Link>
        </p>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: false,
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            setSubmitting(true)
            try {
              const response = await post('/api/register', {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation,
                terms: values.terms,
              })

              setAuthenticated(true)
            } catch (err) {
              setErrors(err.response.data.data.errors)
              setSubmitting(false)
            }
          }}
        >
          {({ values, errors, isSubmitting }) => {
            return (
              <Form>
                <ShowErrors errors={errors} />
                <div className='mb-3 '>
                  <label htmlFor='name' className='form-label'>
                    Name <span className='text-danger'>*</span>
                  </label>
                  <Field
                    autoComplete='off'
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Your name'
                    className={`form-control ${
                      errors?.name && 'border-danger'
                    }`}
                  />
                </div>
                <div className='mb-3 '>
                  <label htmlFor='email' className='form-label'>
                    Email <span className='text-danger'>*</span>
                  </label>
                  <Field
                    autoComplete='off'
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                    className={`form-control ${
                      errors?.email && 'border-danger'
                    }`}
                  />
                </div>
                <label htmlFor='password' className='form-label'>
                  Password <span className='text-danger'>*</span>
                </label>
                <div className=' input-group'>
                  <Field
                    autoComplete='off'
                    type={passwordToggle ? undefined : 'password'}
                    id='password'
                    name='password'
                    placeholder='Your password'
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
                  <label htmlFor='password_confirm' className='form-label'>
                    Confirm Password <span className='text-danger'>*</span>
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
                <div className='mb-3 form-check'>
                  <Field
                    type='checkbox'
                    className={`form-check-input ${
                      errors?.terms && 'border-danger'
                    }`}
                    id='terms'
                    name='terms'
                  />
                  <label className='form-check-label' htmlFor='terms'>
                    Agree to our{' '}
                    <Link href='/terms'>
                      <a className='text-decoration-none'>
                        Terms of Service 📜
                      </a>
                    </Link>
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
                  Register
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Layout>
  )
}

export default WithoutAuth(Register)
