const express = require('express');
const AuthRoute = express.Router()
const auth = require('../controllers/auth')

AuthRoute.post('/register', auth.register)
AuthRoute.post('/login', auth.login)



module.exports = AuthRoute