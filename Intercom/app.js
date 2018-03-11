const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//set up express
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/intercom');
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());
// use static fronten inside views
app.use(express.static('views'));
// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// port running app
// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('listen on port 3000');
});
