const homePageRouter = require('express').Router()

const homePageController = require('../Controller/homePageController')

homePageRouter.get('/home', homePageController.displayHomePage )

module.exports = homePageRouter