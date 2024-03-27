const enterpriseModel = require('../models/enterpriseModel')


exports.displaySubscribe = (req, res) => {
    try {
        res.render('./subscribe/index.html.twig', {

        })
    } catch (error) {
        res.send(error)
    }
}
exports.createEnterprise = async (req, res) => {
    const confirmpassword = req.body.password
    try {
        if (confirmpassword === req.body.confirmPassword) {
            const enterprise = new enterpriseModel(req.body)
            enterprise.validateSync()
            await enterprise.save()
            res.redirect('/login')
        } else throw { confirmPassword: "Les mots de passe ne correspondent pas" }
    } catch (error) {
        console.log(error);
        res.render('subscribe/index.html.twig', {
            error: error

        })

    }
}