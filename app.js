// Project Name:Sauburg Solution
// Developer Name:Md Tajal Islam
// Start Date:24/04/2021
// End Date:24/04/2021


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~project setup~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const env = require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// database connection
const connectDB = require('./config/db.connection')
connectDB()


// customize routers
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')


// end-point roots
app.use('/', indexRouter)
app.use('/api', userRouter)
app.use('/api', postRouter)
app.use('/api', commentRouter)


// port
app.listen(process.env.PORT || 3005)