const enterpriseModel = require('../models/enterpriseModel')

const authguard = async (req, res, next) => {
    try {
       
        if (req.session.enterprise) {
            let enterprise = await enterpriseModel.findOne({ _id: req.session.enterprise })
          
            if (enterprise) {
               
                return next()
            }
        }
        throw new Error("Utilisateur non connecté")
    } catch (error) {
        res.redirect('/login')
        
    }
}
module.exports = authguard