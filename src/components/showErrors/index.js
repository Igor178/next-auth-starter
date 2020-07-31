const ShowErrors = ({ errors }) => {
  const { name, email, password, terms, msg } = errors

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
