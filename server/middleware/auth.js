module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }else{
            res.status(401).json({msg: 'Not authorized'})
        }
    },
    ensureGuest: function(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }else{
            return res.status(200).json({msg: 'Already logged in'})
        }
    }
}
    