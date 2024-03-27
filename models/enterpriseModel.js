const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const enterpriseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "le nom de l'entreprise est requis"]

    },
    siret: {
        type: Number,
        required: [true, "le numéro siret est requis"]
    },
    mail: {
        type: String,
        required: [true, "le mail est requis"],
        unique: true,
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(v)
            },
            message:"Entrez un mail valide"
        }
    },
    directorName: {
        type: String,
        required: [true, "le nom du directeur est requis"]
    },
    password: {
        type: String,
        required: [true, "le mot de passe est requis"]
    },

    employeeCollection: [{

    type: mongoose.Schema.Types.ObjectId,
    ref:'employees'
    }]
})

enterpriseSchema.pre("validate",async function (next){
    try {
        const existingEnterprise =await this.constructor.findOne({mail:this.mail})
        if(existingEnterprise){
            this.invalidate("mail", "Cet email est déjà enregistré")
        }
        next()
    } catch (error) {
        next(error)
    }
})
enterpriseSchema.pre("save", function (next){
    if(!this.isModified("password")){
        return next()

    }
    bcrypt.hash(this.password , 10, (error,hash) =>{
        if(error){
            return next(error)
        }
        this.password = hash
        next()
    })
})


const enterpriseModel = mongoose.model('Enterprises', enterpriseSchema)
module.exports = enterpriseModel