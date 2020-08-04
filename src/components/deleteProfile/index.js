import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth/AuthContext'

const DeleteProfile = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthenticated } = useAuth()

  const deleteAccount = async () => {
    setLoading(true)

    try {
      const response = await axios.delete('/api/profile', {
        withCredentials: true,
      })
      setAuthenticated(false)
    } catch (err) {
      console.log(err, 'Error when deleting account')
    }
  }

  return (
    <div>
      <button
        className='btn btn-danger'
        type='submit'
        disabled={loading}
        onClick={deleteAccount}
      >
        {loading && (
          <span
            className='spinner-border spinner-border-sm mr-2'
            role='status'
            aria-hidden='true'
          ></span>
        )}
        Delete Profile
      </button>
    </div>
  )
}

export default DeleteProfile
