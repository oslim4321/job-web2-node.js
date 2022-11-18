const jwt = require('jsonwebtoken')
const User = require('../models/User')

// const VarifyUser = async(req, res, next) => {
//     const token = req.cookies.JOB_WEB;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
//             if (err.message) {
//                 console.log('This user is not online cant varify')
//             } else {
//                 console.log('decodeddToken', decodedToken)
//                 let user = await User.findById(decodedToken.id)
//                 res.locals.user = user;
//                 console.log(user)
//                 res.json(user)
//                 req.user = user
//                 next()
//                 8
                
//                 next()
//             }
//         });
//     }
//     console.log('This user is not online ')
// }

const VarifyUser = async(req,res,next) => {
    const token =  req.cookies.JOBWEB;
    // console.log(token)
  
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(payload)
            const user = await User.findById(payload.id).select('-password')
            req.user = user
            // console.log(user)
            next()
          } catch (error) {
            console.log(error)
            next()
          }
}

module.exports = {VarifyUser}