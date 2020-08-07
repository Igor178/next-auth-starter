const ShowErrors = ({ errors }) => {
  const {
    name,
    email,
    password,
    terms,
    msg,
    bio,
    hobbies,
    ['socials.instagram']: instagram,
    ['socials.facebook']: facebook,
    ['socials.twitter']: twitter,
    ['socials.youtube']: youtube,
    ['socials.website']: website,
  } = errors

  const socials = [
    { social: instagram, name: ' Instagram field.' },
    { social: facebook, name: ' Facebook field.' },
    { social: twitter, name: ' Twitter field.' },
    { social: youtube, name: ' YouTube field.' },
    { social: website, name: ' Website field.' },
  ]

  const Error = ({ error }) => {
    return (
      <li className='mb-0' style={{ padding: '4px 0' }}>
        {error}
      </li>
    )
  }

  return (
    <>
      {Object.keys(errors).length !== 0 && (
        <div className='alert alert-danger' role='alert'>
          <ul className='mb-0'>
            {name?.map((err) => (
              <Error error={err} key={err} />
            ))}
            {bio?.map((err) => (
              <Error error={err} key={err} />
            ))}
            {hobbies?.map((err) => (
              <Error error={err} key={err} />
            ))}
            {socials.map(({ social, name }) => {
              return social && <Error error={social[0] + name} key={name} />
            })}
            {email?.map((err) => (
              <Error error={err} key={err} />
            ))}
            {password?.map((err) => (
              <Error error={err} key={err} />
            ))}
            {terms && <Error error={terms[0]} />}
            {msg && <Error error={msg} />}
          </ul>
        </div>
      )}
    </>
  )
}

export default ShowErrors
