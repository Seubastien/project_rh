const loginRouter = require('express').Router()
const loginController = require('../Controller/loginController')
const authguard = require('../services/authguard')


loginRouter.get('/login', loginController.displayLogin )
loginRouter.post('/login', loginController.confirmLogin )
loginRouter.get('/dashBoard', authguard, loginController.displayDashboard)
loginRouter.get('/logout', loginController.logOut)

module.exports = loginRouter