const employeeRouter = require('express').Router()
const employeeController = require ('../Controller/employeeController')
const authguard = require('../services/authguard')
const multer = require('../services/multer-config')

employeeRouter.get('/addemployee', authguard, employeeController.displayAddEmployee)
employeeRouter.post('/addemployee', multer.single('image'),authguard, employeeController.addEmployee)
employeeRouter.post('/employeeUpdate/:employeeid', multer.single('image'),authguard, employeeController.updatedEmployee)
employeeRouter.get('/employeedelete/:employeeid',authguard, employeeController.deleteEmployee)
employeeRouter.get('/employeeUpdate/:employeeid',authguard, employeeController.findToUpdate)
employeeRouter.get('/blame/:employeeid',authguard, employeeController.blameEmployee)


module.exports = employeeRouter