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
const databaseName = 'libraryDB';
const AtlasURI      = `mongodb+srv://adminAll:FyJwRDDykhRfxcse@librarycluster.vgreoc9.mongodb.net/${databaseName}`;
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
    console.log(`Connected to Mongo Atlas cluster. Database name is: ${x.connections[0].name}`)
  })
  .catch((err) => {
    console.error('Error connecting to Atlas cluster.', err.reason)
  })

//ROUTING THROUGH EXPRESS FRAMEWORK!
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

//Route for handling requests for path /user
app.use('/users', UserRoute);
//Route for handling requests for path /book
app.use('/books', BookRoute);

const port =  process.env.PORT || 4000;
//server will run on all interfaces available (0.0.0.0)
const server = app.listen(port, () => {
  console.log('Backend is now live at port: ' + port)
})

app.get("/", (req, res) => res.type('html').send(htmlBack));

const htmlBack = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BACK-END</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
	<h1>Hello, world!</h1>
  <h3>If you are seeing this, then the backend is up and running! </h3>
  </body>
</html>
`;

//Basic error handling through middleware functions
//404 Error handling
app.use((req, res, next) => {
  next(createError(404));
});

//Any other type of error
app.use(function (err, req, res, next) {
  console.error(err.message);
  //if error status code not defined, make it 500
  if (!err.statusCode) err.statusCode = 500;
  //send error message + status code --> client
  res.status(err.statusCode).send(err.message);
});
