module.exports = function(router, userModel){
  
    router.get('/loggeduser', function(req, res, next){
        res.json(req.session.user);
    });
    
    router.post('/login', function(req, res, next){
        userModel.findOne({ 
            username: req.body.username, 
            password: req.body.password }).exec(function (err, user) {
            console.log(user);
            if(user != null){
                req.session.user = user;
                res.json(user);
            }else{
                res.json(false);
            }
        });
    });
    
    router.post('/logout', function(req, res, next){
        console.log("Destroying");
        var destroyed = false;
        req.session.destroy(function(err){
           destroyed = true;
        });
        
        res.json(destroyed);
    });
    
    
};