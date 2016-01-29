'use strict';

var dateFormat = require('dateformat');
var express = require('express');
var passport = require('passport');
var session = require('express-session');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);



//app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//routes(app, passport);

var port = process.env.PORT || 8080;


function parseDate(date) {
    
    var natTimeReg=/(January|February|March|April|May|June|July|August|September|October|November|December)[ ]+(1[0-2]|0[1-9])[,]*[ ]+(19|20)\d{2}/i;
    var linuxTimeReg=/[0-9]+/;
    
    var res=null;
    
    if(natTimeReg.test(date)) {
        var millis=Date.parse(date);
        res=new Date(millis);
    }
    else if(linuxTimeReg.test(date)) {
        res=new Date(date);
    }
    return res;
    
    

    
}

 app.get('/:param', function(req, res){
     
      var par = req.params.param;
     
     console.log(par); 
     
     var dat=parseDate(par);
     var resp={unix:"",natural:""};
     
     if(dat==null) {
             resp.unix="null";
             resp.natural="null";
     }
     else {
         resp.unix=dat.getTime();
         resp.natural=dateFormat(Date.parse(dat),"mmmm dd, yyyy");
     }
     
     res.json(resp);
     
     
      });
   


app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});