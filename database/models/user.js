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
    gender: {
      type: String,
      lowercase: true,
      enum: ['male', 'female', 'other'],
    },
    bio: {
      type: String,
      maxlength: 250,
      trim: true,
    },
    hobbies: {
      type: [String],
      validate: (value) => {
        return value.length <= 5 // Limit array to 5
      },
    },
    socials: {
      youtube: {
        type: String,
      },
      instagram: {
        type: String,
      },
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      website: {
        type: String,
      },
    },
    location: {
      type: String, // => Medelin, Colombia
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
      trim: true,
    },
    reset_password_token: {
      type: String,
    },
    reset_password_expires: {
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
