const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'normal',
    enum:['admin', 'normal']
  },
  favourites: {
    type: Array,
    default: []
  }
});

let User = mongoose.model('User', UserSchema);

//https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/ + https://www.npmjs.com/package/bcrypt
const saltRounds = 10;
//Initialize two users, 1 admin type and 1 regular type
bcrypt.genSalt(saltRounds, (err , salt) => {
  if(err) throw err;

  User.findOne({email: 'admin@gmail.com'}, (err , docs) => {
    if(err) throw err;

    if(!docs){
        //Salt and hash password, store it in collection
        bcrypt.hash('admin' , salt , (err , hash) => {
          if(err) throw err;
          //Create an admin account 
          const adminUser = new User({
            name: 'admin',
            email: 'admin@gmail.com',
            password: hash,
            role: 'admin'
          });
          adminUser.save();
          console.log("Stored!");
        })

    }
  })
})


module.exports = User;
