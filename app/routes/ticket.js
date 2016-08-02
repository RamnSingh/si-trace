module.exports = function(router, ticketModel, commentModel){
  
    router.post('/ticket/newStatus', function(req, res, next){
        ticketModel.find({status : 'New'}).populate('user').exec( function(err, tickets){
    		if(err)
    			res.json(false)
    		else{
    			res.json(tickets);
    		}
    	});

        
    });

    router.post('/ticket/one', function(req, res, next){

    	ticketModel.findOne({_id : req.body.ticketId}).populate([
    			{path : 'user', model : 'user'},
    			{path : 'owner', model : 'user'},
    			{path : 'comments'}
    		]).exec( function(err, ticket){
    		if(err)
    			res.json(false)
    		else{
    			res.json(ticket);
    		}
    	});

    });

    router.post('/ticket/all', function(req, res, next){

    	ticketModel.find({}).populate('user').exec( function(err, tickets){
    		if(err)
    			res.json(false)
    		else{
    			res.json(tickets);
    		}
    	});

    });


    router.post('/ticket/add', function(req, res, next){

    	var ticket = new ticketModel(req.body.ticket);

    	ticket.user = req.body.userId;

    	var hasErrors = false;
    	ticket.save(function(err){
    		hasErrors = true;
    	});
	    res.json(!hasErrors);

    });

    router.post('/ticket/changeStatus', function(req, res, next){

    	var hasErrors = false;

    	ticketModel.findOne({_id : req.body.ticketId}).populate('user').exec( function(err, ticket){
    		if(err)
    			res.json(false)
    		else{
    			var newStatus = ticket.status === "New" ? "In progress" : "Done";
    			ticketModel.update({_id : req.body.ticketId},
		    		{$set : {owner : req.body.ownerId, status : newStatus}},
		    		{multi : false}, function(err){

		    			if(err){
		    				hasErrors = true;
		    			}
		    	});
    		}
    	});
    	res.json(!hasErrors);

    });
    
    router.post('/ticket/addComment', function(req, res, next){
    	var hasErrors = false;

    	var comment = new commentModel(req.body.comment);
    	comment.ticket = req.body.ticketId;
    	comment.user = req.body.userId;
    	comment.save(function(err){
    		hasErrors = true;
    	});
    	
    	if(!hasErrors){
    		ticketModel.findByIdAndUpdate(
		     req.body.ticketId,
		     { $push: {comments: comment}},
		     {  safe: true, upsert: true},
		       function(err, model) {
		         if(err){
		        	hasErrors = true;
		         }
		      });
    	}
	 	

    

    	res.json(!hasErrors);

    });
    
};