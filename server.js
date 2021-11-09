const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')

const app = express();

//config dot env .env file
dotenv.config({ path: '.env' })
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

//set view engine use views folder as default
app.set('view engine', 'ejs')
// use other folder as view 
// app.set('views', path.resolve(__dirname, 'views/ejs'))

//load assets => /css/(file)
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

//load routers
app.use('/', require('./server/routes/router'))

app.listen(3000, () => {
    console.log(`server is http://localhost:${PORT}`)
})