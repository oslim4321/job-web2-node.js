const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// UserSchema.methods.createJWT = function (_id) {
//   return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
// }

UserSchema.statics.loginInUser = async function ( email, password) {
    const user = await this.findOne({email})
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password)
      if (checkPassword) {
        return user;
      }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
   
}

// UserSchema.methods.comparePassword = async function (canditatePassword) {
//   const isMatch = await bcrypt.compare(canditatePassword, this.password)
//   return isMatch
// }

const User = mongoose.model('User', UserSchema)
module.exports = User

