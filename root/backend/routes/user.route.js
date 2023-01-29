express = require('express');
router = express.Router();
const bcrypt = require('bcryptjs');

// Student Model
let User = require('./Models/User');

//NB: URL's scheme and host can fluctuate depending on where the backend is being deployed!

//@route:  GET http://localhost:4000/users/allNorm
//@desc:   Get list of all regular members with records in collection (registered)
//@access: PUBLIC
router.route('/allNorm').get((req , res , next) => {
  User.find({role: 'normal'} , (err , others) => {
      if(err) throw err;
      res.status(200).json({others})
  });
});

//@route:  POST http://localhost:4000/users/register
//@desc:   As an authenticated user, register self in library records to get account to sign in, get input from form in frontend, salt and hash password when storing
//@access: PUBLIC
router.route('/register').post((req , res , next) => {
    User.findOne({email: req.body.email} , (err , docs) => {
      if(err) throw err;
      if(docs){
        return res.status(400).json({email: 'Email already exists'});
      }

      let userInfo = {...req.body};
      bcrypt.genSalt(10 , (err , salt) => {
        if(err) throw err;
        bcrypt.hash(userInfo.password , salt , (err , hash) => {
          if (err) throw err;
          userInfo.password = hash;
          User.create(userInfo, (error, data) => {
              if (error) {
                return next(error)
              } else {
                console.log(data)
                res.json(data)
              }
            })
        })
      })
    })
});

//@route: POST http://localhost:4000/users/signin
//@desc:   Login as a registered user, receive input data from form in frontend, notify if either email doesn't exist in collection or password doesn't match
//@access: PUBLIC
router.route('/signin').post((req , res , next) => {
    User.findOne({email: req.body.email} , (err , data) => {
        if(err) throw err;
        if(!data){
            return res.status(404).json({email: "Email not found"});
        }
        bcrypt.compare(req.body.password , data.password , (err , isMatch) => {
          if(err) throw err;
          if(!isMatch){
            return res.status(400).json({password: 'Password is not match'});
          }
          console.log(data);
          return res.status(200).json({user:data});
        })
    });
});

//@route:  PUT http://localhost:4000/users/edit-profile
//@desc:   As an user, edit their own existing user profile (update document in Users collection)
//@access: PRIVATE
router.route('/edit-profile').put((req , res , next) => {
    User.findOneAndUpdate({email: req.body.email} , {$set: req.body} , (err , data) => {
        if(err) throw err;
        return res.status(200).json(data);
    });
});


//@route:  PUT http://localhost:4000/users/update-user/:id
//@desc:   As an admin, update an existing user from library records (update document in Users collection)
//@access: PRIVATE
router.route('/update-user/:id').put((req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
      }
    },
  )
})

//@route:  DELETE http://localhost:4000/users/delete-user/:id
//@desc:   As an admin, delete an existing user from library records (remove document from Users collection)
//@access: PRIVATE 
router.route('/delete-user/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

//@route: POST http://localhost:4000/users/add-fav
//@desc:  Add an existing book (in library collection) to User's favorite list/array (in their collection)
//@access: PRIVATE
router.route('/add-fav').post((req, res, next) => {
  console.log(req.body)
  User.updateOne(
    {email:req.body.email},
    {$push: {favourites: req.body.id}},
    (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

//@route: POST http://localhost:4000/users/delete-fav
//@desc:  Remove an user's favorite book item from record
//@access: PRIVATE
router.route('/delete-fav').post((req, res, next) => {
  console.log(req.body)
  User.updateOne(
    {email:req.body.email},
    {$pull: {favourites: req.body.id}},
    (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
