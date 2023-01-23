let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const createError = require('http-errors');


//Express Routes
const UserRoute = require('./routes/user.route');
const BookRoute = require('./routes/book.route');
//Inspiration: https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
const LocalMongoURI = 'mongodb://127.0.0.1:27017/mydatabase';
const AtlasURI      = 'mongodb+srv://adminAll:FyJwRDDykhRfxcse@librarycluster.vgreoc9.mongodb.net/testLibraryDBv5';
//Both databases are the same

// Connecting mongoDB Database (https://mongoosejs.com/docs/connections.html)
/*
mongoose
  .connect(LocalMongoURI)
  .then((x) => {
    console.log(`Connected to local Mongo database. Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => { 
    console.error('Error connecting to mongo', err.reason)
  })
*/
 
mongoose.connect(AtlasURI,  { useNewUrlParser: true, useUnifiedTopology: true }).then((x) => {
  //NOTE: database will be created if one with the name is not found!
    console.log(`Connected to Mongo Atlas cluster! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to atlas cluster!', err.reason)
  })


//ROUTING THROUGH EXPRESS FRAMEWORK!
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());
//Route for handling requests for path /user
app.use('/user', UserRoute);
//Route for handling requests for path /book
app.use('/book', BookRoute);

//TODO: ENV file 
const port =  process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Backend is now live at port: ' + port)
})

//404 Error handling
app.use((req, res, next) => {
  //404 not found!
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
