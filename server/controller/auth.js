const passport = require('passport')
const validator = require('validator')
const User = require('../model/User')

exports.getCurrentUser = (req, res) => {
    if(!req.user){
        return res.status(401).json({msg: 'Not logged in.'})
    }
    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email
    })
}

exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if(!validator.isEmail(req.body.email)){
        validationErrors.push({msg: 'Please enter a valid email address.'})
    }
    if(validator.isEmpty(req.body.password)){
        validationErrors.push({msg: 'Password cannot be blank.'})
    }
    if(validationErrors.length){
        return res.status(400).json({errors: validationErrors})
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false, 
    })

    passport.authenticate('local', (err, user, info) => {
        if(err){
            return next(err)
        }
        if(!user){
            return res.status(400).json({errors: info})
        }
        req.logIn(user, (err) => {
            if(err){
                return next(err)
            }
            return res.status(200).json({
                msg: 'Success! You are logged in.',
                User:{
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email
                }
            })
        })
    })(req, res, next)
}

exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if(!validator.isEmail(req.body.email))
        validationErrors.push({msg: 'Please enter a valid email adress.'})
    if(!validator.isLength(req.body.password, {min: 8}))
        validationErrors.push({msg: 'Password must be at least 8 characters long'})
    if(req.body.password !== req.body.confirmPassword)
        validationErrors.push({msg: 'Passwords do not match'})
    if(validationErrors.length){
        return res.status(400).json({errors: validationErrors})
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false
    })
    const user = new User({
        id: req.body._id,
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        email: req.body.email,
        password: req.body.password
    })

    User.findOne(
        {email: req.body.email},
        (err, existingUser) => {
            if(err){
                return next(err)
            }
            if(existingUser){
                return res.status(400).json({msg: 'Account with that email address already exists.'})
            }
            user.save((err)=>{
                if(err){
                    return next(err)
                }
                req.logIn(user, (err)=> {
                    if(err){
                        return next(err)
                    }
                    return res.status(200).json({
                        msg: 'SignUp successful! You are now logged in',
                        user:{
                            id: user._id,
                            name: user.name,
                            surname: user.surname,
                            birthday: user.birthday,
                            email: user.email
                        }
                    })
                })
            })
        }
    )
}
   
  
