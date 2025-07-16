const passport = require('passport')
const validator = require('validator')
const User = require('../model/User')


exports.getCurrentUser = (req, res) => {
  console.log('Session object:', req.session);
    console.log('User object:', req.user);

    if(!req.user){
        return res.status(401).json({msg: 'Not logged in.'})
    }
    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email,
        phone: req.user.phone
    })
    
}

exports.postLogin = async (req, res, next) => {
  try {
    const {email, password} = req.body
    console.log('are logged in')

    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ msg: 'Please enter a valid email address.' });
    }
    if (validator.isEmpty(req.body.password)) {
      validationErrors.push({ msg: 'Password cannot be blank.' });
    }
    if (validationErrors.length) {
      return res.status(400).json({ errors: validationErrors });
    }
    const normalizedEmail = validator.normalizeEmail(email, { gmail_remove_dots: false });

    // Passport authenticate wrapped in a Promise
    const user = await new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) reject(err);
        else if (!user) reject(info);
        else resolve(user);
      })(req, res, next);
    });

    // Log the user in (req.logIn ist callback-basiert, wir machen daraus Promise)
    await new Promise((resolve, reject) => {
      req.logIn(user, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log("User nach Login:", req.user);

    req.session.save((err)=>{
      if(err){
        console.error('Session save error:', err)
        return next(err)
      }
    })    
    console.log("Session saved:", req.sessionID);
    

    res.status(200).json({
      msg: 'Success! You are logged in.',
      User: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone
      },
    });
  } catch (error) {
    // Falls user nicht gefunden wurde (reject(info)), sende 400 mit Fehlerinfo
    if (error && error.msg) {
      return res.status(400).json({ errors: [error] });
    }
    // Sonstige Fehler an next() weiterreichen (Express Error Middleware)
    return next(error);
  }
}

exports.postSignup = async (req, res, next) => {
  try {
    console.log("Signup Route reached");

    const { name, surname, birthday, email, confirmEmail, password, confirmPassword, phone } = req.body;
    console.log(req.body)
    const validationErrors = [];
    const regex = /[A-Za-z]/

    if (!validator.isEmail(email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
    if (!validator.isLength(password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
    if (password !== confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });
    if (email !== confirmEmail) validationErrors.push({msg: 'Emails do not match'})
    if (regex.test(birthday)) validationErrors.push({msg: 'Please enter a valid date dd.mm.yyyy'})

    if (validationErrors.length) {
      return res.status(400).json({ errors: validationErrors });
    }

    const normalizedEmail = validator.normalizeEmail(email, { gmail_remove_dots: false });

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ msg: 'Account with that email address already exists.' });
    }

    const user = new User({
      name,
      surname,
      birthday,
      email: normalizedEmail,
      password,
      phone
    });

    await user.save();

    // Log the user in - prüfe, ob Passport Session Middleware läuft
    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.status(201).json({
        msg: 'Signup successful! You are now logged in',
        user: {
          id: user._id,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          email: user.email,
          phone: user.phone
        }
      });
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
exports.logout = (req, res) => {
  req.logout((err) => {
    if(err){
      return res.status(500).json({msg: 'Logout failed' , error: err}) 
  }
  req.session.destroy((err) => {
      if(err){
        console.log('Error: failed to destroy the session during logout', err)
        return res.status(500).json({msg: 'Failed to destroy session'})
      }
  res.clearCookie('connect.sid')
  return res.status(200).json({msg: 'Successfully logged out'})
  })
  })
}
