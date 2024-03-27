const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
require ('dotenv').config()



const homePageRouter = require('./router/homePageRouter')
const subscribeRouter = require('./router/subscribeRouter')
const cors = require('cors')
const loginRouter = require('./router/loginRouter')
const employeeRouter = require('./router/employeeRouter')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./assets"))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}))

app.use(employeeRouter)
app.use(homePageRouter)
app.use(subscribeRouter)
app.use(loginRouter)

app.listen(process.env.PORT, (err) => {

    console.log(err ? err : "La connexion au serveur est établie");

})
mongoose.connect("mongodb://localhost:27017/projet_rh")