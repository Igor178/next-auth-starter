import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

export const sendRegisterWelcomeEmail = async (to, name) => {
  const msg = {
    to,
    from: process.env.SEND_GRID_EMAIL,
    subject: `Welcome ${name} on NextStack website`,
    text: `Hey, we are very glad we have you here ${name}.`,
    html: `
        <div>
            <h1>Welcome to NextStack family ${name}!</h1>
            <p>This is a welcome email.👋</p>
        </div>
    `,
  }

  return await sgMail.send(msg)
}

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

export const sendAccountDeletedEmail = async (to) => {
  const url = `${process.env.WEBSITE_URL}/register`

  const msg = {
    to,
    from: process.env.SEND_GRID_EMAIL,
    subject: 'Your account was deleted on NextStack website',
    text: 'You have successfully deleted your account on NextStack website.',
    html: `
        <div>
            <h1>Your account was deleted.</h1>
            <p>If you wan't to register again, please click the link below.</p>
            <a href=${url} target="_blank">${url}</a>
        </div>
    `,
  }

  return await sgMail.send(msg)
}
