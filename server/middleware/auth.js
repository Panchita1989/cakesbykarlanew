module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }else{
            if(!req.query.guestId && !req.cookies.guestId){
                req.guestId = generateGuestId(
                    res.cookie('guestId:', req.guestId, {
                        httpOnly: true,
                        maxAge: 365 * 24 * 60 * 60 * 1000
                    })
                )
            }else{
                req.guestId = req.query.guestId || req.cookies.guestId
            }
           return next()
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
function generateGuestId(){
    return 'guest-' + Math.random().toString(36).subst(2,9)
}
    