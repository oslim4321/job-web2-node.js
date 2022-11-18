const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60 
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: maxAge})
}


module.exports.register = async (req, res) => {
    const {name,email, password} = req.body
     try {
        const user = await User.create({name,email, password})
        const token = createToken(user._id)
        res.cookie('JOBWEB', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(StatusCodes.CREATED).json({ user: user, token: token })
       
    } catch (error) {
        console.log(error)   
    }
}

module.exports.login = async (req, res) => {
    const {email, password} = req.body
    try {
        // const user = await User.findOne({ email })
        const user = await User.loginInUser(email, password)
        const token = createToken(user._id)
        res.cookie('JOBWEB', token, {httpOnly: true, maxAge: maxAge * 1000})
        // console.log(req.user)
        res.status(200).json({user: user._id})
    } catch (error) {
        console.log(error)
        res.status(404).json({error})
    }
}