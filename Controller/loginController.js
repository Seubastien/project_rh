const enterpriseModel = require('../models/enterpriseModel')
const bcrypt = require('bcrypt')
const session = require('express-session')


exports.displayLogin = (req, res) => {
    try {

        res.render("./login/index.html.twig", {

        })
    } catch (error) {
        res.send(error)
    }
}
exports.confirmLogin = async (req, res) => {
    try {
        let enterprise = await enterpriseModel.findOne({ mail: req.body.mail })//1er mail objet du modele et 2eme mail c'est le name dans form login
        if (enterprise) {
            if (await bcrypt.compare(req.body.password, enterprise.password)) {
                req.session.enterprise = enterprise._id
                res.redirect("/dashBoard")
            } else {
                throw { password: "Mauvais mot de passe" }
            }
        } else {
            throw { mail: "Cet utilisateur n'est pas enregistré" }
        }
    }
    catch (error) {
        console.log(error)
        res.render('login/index.html.twig', {
            error: error
        })
    }
}
exports.displayDashboard = async (req, res) => {
    try {
        if (req.query.search) {
            const employeeQuery = { name: { $regex: new RegExp(req.query.search, 'i') } }
            res.render("./dashBoard/dashBoard.html.twig", {
                enterprise: await enterpriseModel.findById(req.session.enterprise).populate({ path: "employeeCollection", match: employeeQuery })
            })
        } else {
            res.render("./dashBoard/dashBoard.html.twig", {
                enterprise: await enterpriseModel.findById(req.session.enterprise).populate("employeeCollection")
            })

        }


    } catch (error) {

        res.send(error.message)
    }
}
exports.logOut = (req, res) => {
    try {
        delete req.session.enterprise

        res.redirect("/home")

    } catch (error) {

        res.send(error.message)
    }
}



