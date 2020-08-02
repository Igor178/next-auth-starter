import { Schema, models, model } from 'mongoose'
import { hash } from 'bcryptjs'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
      trim: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
)

UserSchema.pre('save', async function (next) {
  let user = this

  if (user.isModified('password')) {
    user.password = await hash(user.password, 8)
  }

  next()
})

export default models.User || model('User', UserSchema)
