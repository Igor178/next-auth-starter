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

Validator.registerAsync('exists', async (value, attributes, req, passes) => {
  const user = await User.findOne({ email: value })

  if (user) {
    passes()
  } else {
    passes(false, "We couldn't find a user with this email.")
  }
})

Validator.register(
  'hobbiesLength',
  (value) => {
    if (value.length > 5) {
      return false
    }
  },
  'You can only add 5 hobbies.'
)

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
    current_password: 'required|string',
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

export const changePassword = (req, res, next) => {
  const validationRule = {
    current_password: 'required|string',
    password: 'required|string|min:8|max:20|confirmed|strict',
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation Failed',
        data: err,
      })
    } else {
      next()
    }
  })
}

export const updateProfile = (req, res, next) => {
  const validationRule = {
    name: 'string|required',
    gender: 'string',
    bio: 'string|between:0,250',
    location: 'string',
    socials: {
      instagram: 'url',
      facebook: 'url',
      youtube: 'url',
      twitter: 'url',
      website: 'url',
    },
    hobbies: 'array|hobbiesLength',
  }

  validator(
    req.body,
    validationRule,
    { url: 'Please provide valid link format for' },
    (err, status) => {
      if (!status) {
        res.status(400).send({
          success: false,
          message: 'Validation Failed',
          data: err,
        })
      } else {
        next()
      }
    }
  )
}
