var express = require('express'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    path = require('path');

var app = express(),
    port = process.env.PORT || 3000,
    router = express.Router(),
    ticketRouter= express.Router();

var models = require('./app/models');




app.use(expressSession({
    secret : "trace application",
    resave : true,
    saveUninitialized : false
}));
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

router.get('/', function(req, res, next){
    console.log("index page");
    res.sendFile(__dirname + '/public/index.html');
});
app.use('/', router);
app.use('/view',express.static(path.join(__dirname, 'public/views')));
require('./app/routes/login')(router, models.user);
app.use(function(req, res, next){
        var isConnected = req.session.user  || false;
        if(isConnected){
            next();
        }
});
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/ticket', ticketRouter);
require('./app/routes/ticket')(router, models.ticket, models.comment);

/*

app.get('/', function(req, res){
    models.user.find({}, function(err, docs){
        if(err)
            res.send(err);
        else{
            console.log(docs);
            res.json(docs);
        }
    });
});

router.get('/add', function(req, res){
    var user = new models.user();
    user.username = "Ramneek";
    user.age = 23;
    user.save(function(err){
        console.log(err)
    });
    res.send("Ok");
});

router.get('/ticket', function(req, res){
    /*models.ticket.find({}, function(err, docs){
        if(err)
            res.send(err);
        else{
            docs.forEach(doc){
              console.log(doc.populate())  
            };
        }
    });
    
    models.ticket.findOne({ description: "Bura" }).populate('user').exec(function (err, story) {
        if(err)
            res.send(err);
        else
            res.json(story.user);
    });
});

router.get('/ticket/add', function(req, res){
    var tcket = new models.ticket();
    tcket.description = "Bura";
    tcket.priority = "jlkl";
    tcket.creationDate = new Date();
    tcket.user =  "57716a2c35c6318433d4c296";
    tcket.save(function(err){
        console.log(err)
    });
    res.send("Ok");
});

*/
app.listen(port);