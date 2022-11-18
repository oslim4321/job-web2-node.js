require('dotenv').config();
require('express-async-errors');
const express = require('express');
const  AuthRoute = require('./routes/auth')
const  JobRoute = require('./routes/jobs')
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const cookieParser = require('cookie-parser');
const {VarifyUser} = require('./middleware/authentication')

app.use(cookieParser())
app.use(express.json());
app.use(express.static('./public'));
// extra packages
// routes
app.use('/api/v1/auth',AuthRoute)
app.use('/api/v1/job',VarifyUser, JobRoute)

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3005;
console.log('listenning')

app.get('/getUser', VarifyUser,(req, res) => {
  res.json(req.user)
})
const start = async () => {
  try {
    await connectDB(process.env.MANGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

// app.get('*', VarifyUser)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



