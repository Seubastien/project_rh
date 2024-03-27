const mongoose = require('mongoose')
const enterpriseModel = require('../models/enterpriseModel')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "le nom est requis"]
    },
    _enterprise:{
        type: mongoose.Schema.Types.ObjectId//creer une relation dans les deux sens pour les hookde presave
        
    },
    function: {
        type: String,
        required: [true, "la fonction est requise"]
    },
    blame: {
        type: Number

    },

    picture: {
        type: String,
        default: ""
    }


})

employeeSchema.pre("save", async function (next) {

    await enterpriseModel.updateOne(
        { _id: this._enterprise },
        { $addToSet: { employeeCollection: this._id } }
        
    );
   
    next();
})
employeeSchema.post("deleteOne", async function(doc,next){// ne pas oublier doc, meme si non utilisé.
    const deletedEmployeeId = this.getQuery()._id;
    await enterpriseModel.updateOne({employeeCollection: {$in:[deletedEmployeeId]}}, {$pull: {employeeCollection: deletedEmployeeId}});
    next();
})

const employeeModel = mongoose.model('employees', employeeSchema)
module.exports = employeeModel