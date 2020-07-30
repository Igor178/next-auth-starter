const AuthLoading = () => {
  return (
    <>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <div
          className='spinner-grow'
          style={{ width: '3rem', height: '3rem' }}
          role='status'
        >
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    </>
  )
}

export default AuthLoading
