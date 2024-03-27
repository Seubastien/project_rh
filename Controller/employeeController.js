const employeeModel = require('../models/employeeModel')
const enterpriseModel = require('../models/enterpriseModel')
const session = require('express-session')
const fs = require('fs')//permet de supprimer des fichiers avec

exports.displayAddEmployee = async (req, res) => {
    try {

        res.render('employee/index.html.twig',
            {
                enterprise: await enterpriseModel.findById(req.session.enterprise._id)
            })

    } catch (error) {
        res.send(error)
    }

}
exports.addEmployee = async (req, res) => {
    try {
        const employee = new employeeModel(req.body)
        if (req.file) {
            if (req.multerError) {
                throw { errorUpload: "le fichier n'est pas valide" }
            }
            req.body.picture = req.file.filename
            employee.picture = req.file.filename
        }
        employee._enterprise = req.session.enterprise
        employee.blame = 0
        employee.validateSync()
        await employee.save()
        res.redirect("/dashBoard")

    } catch (error) {
        res.render('employee/index.html.twig',
            {
                enterprise: await enterpriseModel.findById(req.session.enterprise._id),
                error: error
            })
    }
}
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await employeeModel.findById({ _id: req.params.employeeid })
        await employeeModel.deleteOne({ _id: req.params.employeeid })

        fs.unlink('assets/images/uploads/' + employee.picture, (err) => {
            if (err) throw err;

        });
        res.redirect("/dashBoard")

    } catch (error) {
        res.render('dashBoard/dashBoard.html.twig'), {
            errorDelete: "un probleme est survenue pendant la suppression",
            enterprise: await enterpriseModel.findById(req.session.enterprise._id).populate("employeeCollection"),

        }
    }
}
exports.findToUpdate = async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.employeeid)
        res.render('employee/index.html.twig',
            {
                enterprise: await enterpriseModel.findById(req.session.enterprise._id),
                employee: employee
            })

    } catch (error) {
        res.render('dashBoard/dashBoard.html.twig',
            {
                errorMessage: "Le livre que vous souhaitez modifier n'existe pas",
                enterprise: await enterpriseModel.findById(req.session.enterprise._id)
            })

    }
}
exports.updatedEmployee = async (req, res) => {
    try {

        if (req.file) {
            if (req.multerError) {
                throw { errorUpload: "le fichier n'est pas valide" }
            }
            req.body.picture = req.file.filename
        }
        await employeeModel.updateOne({ _id: req.params.employeeid }, req.body)

        res.redirect("/dashBoard")

    } catch (error) {
        res.render('dashBoard/dashBoard.html.twig',
            {
                errorDelete: "probleme survenue",
                enterprise: await enterpriseModel.findById(req.session.enterprise._id)
            })
    }
}
exports.blameEmployee = async (req, res) => {
    try {

        const employee = await employeeModel.findById(req.params.employeeid)
        const blame = employee.blame + 1
        if (blame < 3) {
            await employeeModel.updateOne(
                { _id: req.params.employeeid },
                { blame: blame }//permet d'aller modifier ma vue.
            )

        }
        else {
            await employeeModel.deleteOne({ _id: req.params.employeeid })
        }
        res.redirect("/dashBoard")

    } catch (error) {
        res.send(error)
    }
}
