import { Formik, Field, Form } from 'formik'
import { post } from 'axios'
import Layout from '../src/components/layout/index'
import WithoutAuth from '../src/components/hoc/withoutAuth'
import ShowErrors from '../src/components/showErrors/index'
import ShowSuccess from '../src/components/showSuccess/index'

const ResetPassword = () => {
  return (
    <Layout title='Forgot Password?'>
      <div className='container p-3'>
        <h1>Forgot Password?</h1>
        <p className='lead'>
          Enter the email address you used when you joined and we’ll send you
          instructions to reset your password.
        </p>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={async (
            values,
            { setSubmitting, setErrors, setStatus, setFieldValue }
          ) => {
            setSubmitting(true)
            try {
              const response = await post('/api/reset-password', {
                email: values.email,
              })

              setStatus(response.data.msg)
              setFieldValue('email', '', false)
            } catch (err) {
              setStatus(undefined)
              setSubmitting(false)
              setErrors(err.response.data.data.errors)
            }
          }}
        >
          {({ errors, isSubmitting, status }) => (
            <Form>
              <ShowErrors errors={errors} />
              <ShowSuccess status={status} />
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <Field
                  autoComplete='email'
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Your email'
                  className={`form-control ${errors?.msg && 'border-danger'}`}
                />
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
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default WithoutAuth(ResetPassword)
