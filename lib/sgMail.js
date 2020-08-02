import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

export const sendPasswordResetEmail = async (to, token) => {
  const url = `${process.env.WEBSITE_URL}/reset-password/recover/${token}`

  const msg = {
    to,
    from: process.env.SEND_GRID_EMAIL,
    subject: 'Password Reset on NextStack website',
    text: 'You made a request to reset your password on NextStack website.',
    html: `
        <div>
            <h1>Reset your password</h1>
            <p>Click the link below to reset your password.</p>
            <a href=${url} target="_blank">${url}</a>
        </div>
    `,
  }

  return await sgMail.send(msg)
}
