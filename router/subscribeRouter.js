const subscribeRouter = require('express').Router()

const subscribeController = require('../Controller/subscribeController')

subscribeRouter.get('/subscribe', subscribeController.displaySubscribe )
subscribeRouter.post('/subscribe', subscribeController.createEnterprise)




module.exports = subscribeRouter