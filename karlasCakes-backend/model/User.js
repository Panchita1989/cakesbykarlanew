const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    birthday: String,
    phone: String,
    email:{type: String, unique: true},
    password: String
})

UserSchema.pre('save', function save(next){
    const user = this

    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) =>{
            if(err){
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)