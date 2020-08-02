import Validator from 'validatorjs'
import User from '../database/models/user'

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages)
  validation.passes(() => callback(null, true))
  validation.fails(() => callback(validation.errors, false))
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/

Validator.register(
  'strict',
  (value) => {
    return passwordRegex.test(value)
  },
  'Password must contain at least one uppercase letter, one lowercase letter and one number.'
)

Validator.registerAsync('duplicate', async (value, attributes, req, passes) => {
  const user = await User.findOne({ email: value })

  if (user) {
    passes(false, 'This user is already registered.')
  } else {
    passes()
  }
})

export const register = (req, res, next) => {
  const validatonRule = {
    name: 'required|string',
    email: 'required|email|duplicate',
    password: 'required|string|min:8|max:20|confirmed|strict',
    terms: 'accepted',
  }

  validator(req.body, validatonRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err,
      })
    } else {
      next()
    }
  })
}

export const login = (req, res, next) => {
  const validatonRule = {
    email: 'required',
    password: 'required',
  }

  validator(req.body, validatonRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        msg: 'Please provide email and password.',
      })
    } else {
      next()
    }
  })
}

Validator.registerAsync('exists', async (value, attributes, req, passes) => {
  const user = await User.findOne({ email: value })

  if (user) {
    passes()
  } else {
    passes(false, "We couldn't find a user with this email.")
  }
})

export const resetPassword = (req, res, next) => {
  const validatonRule = {
    email: 'required|email|exists',
  }

  validator(req.body, validatonRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err,
      })
    } else {
      next()
    }
  })
}

export const resetPasswordRecover = (req, res, next) => {
  const validatonRule = {
    password: 'required|string|min:8|max:20|confirmed|strict',
  }

  validator(req.body, validatonRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err,
      })
    } else {
      next()
    }
  })
}
