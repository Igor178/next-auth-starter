import moment from 'moment'

const Footer = () => {
  return (
    <div className='container p-3'>
      <small>&copy; NextStack {moment().format('YYYY')}</small>
    </div>
  )
}

export default Footer
