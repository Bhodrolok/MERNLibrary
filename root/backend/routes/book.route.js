let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Book Model
let Book = require('./Models/Book');

//NB: URL's scheme and host can fluctuate depending on where the backend is being deployed!

//@route:  GET http://localhost:4000/books/
//@desc:   Get list of all available books in library collection 
//@access: PUBLIC
router.route('/').get((req, res) => {
  Book.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//@route:  POST http://localhost:4000/book/create-book
//@desc:   As an admin, create a new book entry and add it to library collection
//@access: PRIVATE
router.route('/create-book').post((req, res, next) => {
  Book.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//@route:  GET http://localhost:4000/book/edit-book/:id
//@desc:   As an admin, get the details of a existing book
//@access: PRIVATE
router.route('/get-book/:id').get((req, res) => {
  Book.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//@route:  PUT http://localhost:4000/book/update-book/:id
//@desc:   As an admin, edit the details of a existing book and update it's collection document
//@access: PRIVATE
router.route('/update-book/:id').put((req, res, next) => {
  Book.findByIdAndUpdate(
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
        console.log('Book updated successfully !')
      }
    },
  )
})

//@route:  DELETE http://localhost:4000/book/delete-book/:id
//@desc:   As an admin, delete an existing book from library collection
//@access: PRIVATE
router.route('/delete-book/:id').delete((req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

//@route:  POST http://localhost:4000/book/add-comment
//@desc:   As an authenticated registered user(admin or member), add a comment in a book's page (stored in book's document)
//@access: PRIVATE
router.route('/add-comment').post((req, res, next) => {
  console.log(req.body)
  Book.updateOne(
    {_id:req.body.id},
    {$push: {comments: {email:req.body.email , comment: req.body.comment}}},
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
