import { Formik, Field, Form, FieldArray } from 'formik'
import { post } from 'axios'
import useSWR, { mutate } from 'swr'
import { JSONfetcher } from '../lib/fetcher'
import Layout from '../src/components/layout/index'
import WithAuth from '../src/components/hoc/withAuth'
import DeleteProfile from '../src/components/deleteProfile/index'
import ProfileNavigation from '../src/components/profileNavigation/index'
import ShowSuccess from '../src/components/showSuccess/index'
import ShowErrors from '../src/components/showErrors/index'

const Profile = () => {
  const { data, error } = useSWR('/api/profile', JSONfetcher)

  return (
    <Layout title='Edit Profile'>
      <div className='container p-3'>
        <div className='mb-3'>
          <div className='d-flex align-items-center justify-content-between'>
            <h1>Edit Profile</h1>
            <DeleteProfile />
          </div>
          <p className='lead'>Edit your profile general information.</p>
          <ProfileNavigation />
        </div>
        {data?.data ? (
          <Formik
            initialValues={{
              hobbie: '',
              name: data.data.name,
              gender: data.data.gender,
              bio: data.data.bio,
              location: data.data.location,
              socials: {
                instagram: data.data.socials?.instagram,
                facebook: data.data.socials?.facebook,
                twitter: data.data.socials?.twitter,
                website: data.data.socials?.website,
                youtube: data.data.socials?.youtube,
              },
              hobbies: data.data.hobbies,
            }}
            onSubmit={async (
              values,
              { setSubmitting, setStatus, setErrors }
            ) => {
              setSubmitting(true)
              try {
                const response = await post(
                  '/api/profile',
                  {
                    name: values.name,
                    gender: values.gender,
                    bio: values.bio,
                    location: values.location,
                    socials: { ...values.socials },
                    hobbies: values.hobbies,
                  },
                  { withAuthorization: true }
                )

                setStatus(response.data.msg)
                mutate('/api/profile')
              } catch (err) {
                setStatus(undefined)
                setSubmitting(false)
                setErrors(err.response.data.data.errors)
              }
            }}
          >
            {({ values, errors, status, setFieldValue }) => {
              return (
                <Form>
                  <ShowSuccess status={status} />
                  <ShowErrors errors={errors} />
                  <div className='row mb-3'>
                    <label htmlFor='name' className='col-sm-2 col-form-label'>
                      Name <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-10'>
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
                  </div>
                  <fieldset>
                    <div className='row mb-3'>
                      <legend className='col-form-label col-sm-2 pt-0'>
                        Gender
                      </legend>
                      <div className='col-sm-10'>
                        {['male', 'female', 'other'].map((option) => {
                          return (
                            <div className='form-check' key={option}>
                              <Field
                                className='form-check-input'
                                type='radio'
                                name='gender'
                                value={option}
                                id='flexCheckDefault'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='flexCheckDefault'
                              >
                                {option[0].toUpperCase() + option.slice(1)}
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </fieldset>
                  <div className='row mb-3'>
                    <label
                      htmlFor='location'
                      className='col-sm-2 col-form-label'
                    >
                      Location
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        type='text'
                        id='location'
                        name='location'
                        placeholder='Your current location'
                        className={`form-control ${
                          errors?.location && 'border-danger'
                        }`}
                      />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label
                      htmlFor='hobbies'
                      className='col-sm-2 col-form-label'
                    >
                      Your Hobbies
                    </label>
                    <div className='col-sm-10'>
                      <FieldArray name='hobbies'>
                        {({ remove, push }) => (
                          <div>
                            {values.hobbies.length > 0 ? (
                              <div className='d-flex align-items-center flex-wrap'>
                                {values.hobbies.map((hobbie) => {
                                  return (
                                    <div key={hobbie} className='mb-3'>
                                      <div
                                        className='btn-group mr-2'
                                        role='group'
                                        aria-label='hobbie'
                                      >
                                        <span
                                          className='rounded-left text-dark bg-light border border-warning'
                                          style={{ padding: '6px 12px' }}
                                        >
                                          {hobbie}
                                        </span>
                                        <button
                                          type='button'
                                          className='btn btn-warning font-weight-bold'
                                          onClick={() => remove(hobbie)}
                                        >
                                          X
                                        </button>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (
                              <div
                                className='mb-3 text-muted'
                                style={{ padding: '6px 0' }}
                              >
                                <span>You have no hobbies yet...</span>
                              </div>
                            )}
                            <div className='input-group'>
                              <Field
                                placeholder='Add your hobby'
                                type='text'
                                className={`form-control ${
                                  errors?.hobbies && 'border-danger'
                                }`}
                                name='hobbie'
                              />
                              <button
                                className='btn btn-primary'
                                type='button'
                                disabled={!values.hobbie}
                                onClick={() => {
                                  if (!values.hobbies.includes(values.hobbie)) {
                                    push(values.hobbie)
                                  }
                                  setFieldValue('hobbie', '', false)
                                }}
                              >
                                Add Hobby
                              </button>
                            </div>
                            <div id='hobbiesHelp' className='form-text'>
                              You can provide maximum of 5 hobbies.{' '}
                              <span
                                className={`${
                                  values.hobbies.length > 5 && 'text-danger'
                                }`}
                              >
                                {values.hobbies.length} / 5
                              </span>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <div className='row mb-3 '>
                    <label htmlFor='bio' className='col-sm-2 col-form-label'>
                      Your Bio
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        rows='5'
                        component='textarea'
                        autoComplete='off'
                        type='text'
                        id='bio'
                        name='bio'
                        placeholder='Tell us something about you 🤗'
                        className={`form-control ${
                          errors?.bio && 'border-danger'
                        }`}
                      />
                      <div id='bioHelp' className='form-text mb-3'>
                        Bio should not be longer then 250 characters.{' '}
                        <span
                          className={`${
                            values.bio?.length > 250 && 'text-danger'
                          }`}
                        >
                          {values.bio?.length} / 250
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label
                      htmlFor='instagram'
                      className='col-sm-2 col-form-label'
                    >
                      Instagram
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        autoComplete='off'
                        type='text'
                        id='instagram'
                        name='socials.instagram'
                        placeholder='Your Instagram profile'
                        className={`form-control ${
                          errors?.['socials.instagram'] && 'border-danger'
                        }`}
                      />
                      <div id='instagramHelp' className='form-text mb-3'>
                        Please provide link in valid format.
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label
                      htmlFor='youtube'
                      className='col-sm-2 col-form-label'
                    >
                      Youtube
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        autoComplete='off'
                        type='text'
                        id='youtube'
                        name='socials.youtube'
                        placeholder='Your Youtube profile'
                        className={`form-control ${
                          errors?.['socials.youtube'] && 'border-danger'
                        }`}
                      />
                      <div id='youtubeHelp' className='form-text mb-3'>
                        Please provide link in valid format.
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label
                      htmlFor='facebook'
                      className='col-sm-2 col-form-label'
                    >
                      Facebook
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        autoComplete='off'
                        type='text'
                        id='facebook'
                        name='socials.facebook'
                        placeholder='Your Facebook profile'
                        className={`form-control ${
                          errors?.['socials.facebook'] && 'border-danger'
                        }`}
                      />
                      <div id='facebookHelp' className='form-text mb-3'>
                        Please provide link in valid format.
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label
                      htmlFor='twitter'
                      className='col-sm-2 col-form-label'
                    >
                      Twitter
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        autoComplete='off'
                        type='text'
                        id='twitter'
                        name='socials.twitter'
                        placeholder='Your Twitter profile'
                        className={`form-control ${
                          errors?.['socials.twitter'] && 'border-danger'
                        }`}
                      />
                      <div id='twitterHelp' className='form-text mb-3'>
                        Please provide link in valid format.
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label
                      htmlFor='website'
                      className='col-sm-2 col-form-label'
                    >
                      Website
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        autoComplete='off'
                        type='text'
                        id='website'
                        name='socials.website'
                        placeholder='Your Website'
                        className={`form-control ${
                          errors?.['socials.website'] && 'border-danger'
                        }`}
                      />
                      <div id='websiteHelp' className='form-text mb-3'>
                        Please provide link in valid format.
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-10 offset-sm-2'>
                      <button className='btn btn-primary' type='submit'>
                        Save Profile
                      </button>
                    </div>
                  </div>
                </Form>
              )
            }}
          </Formik>
        ) : (
          <div className='d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default WithAuth(Profile)
