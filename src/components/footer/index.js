import moment from 'moment'

const Footer = () => {
  return (
    <div className='container'>
      <p>&copy; NextStack {moment().format('YYYY')}</p>
    </div>
  )
}

export default Footer
