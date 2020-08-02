const ShowSuccess = ({ status }) => {
  return (
    <>
      {status && (
        <div className='alert alert-success' role='alert'>
          <ul className='mb-0'>
            <li className='mb-0' style={{ padding: '4px 0' }}>
              {status}
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default ShowSuccess
