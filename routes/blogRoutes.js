const express = require('express');


const router = express.Router();

const Blog = require('../models/blog');


router.get('/blogs', (req, res) => {
    // the .sort is basically supposed to sort them by thier created at by (-1) which is descending
  Blog.find().sort({createdAt: -1})
  .then((result) => {
    res.render('index', {title: 'All blogs', blogs: result})
  })
  .catch((err) => {

  })
})

router.post('/blogs', function (req, res) {
  const blog = new Blog(req.body);

  blog.save()
  .then((result) => {
      res.redirect('/blogs');
  })
  .catch((err) =>{
      console.log(err);
  })
})

router.get('/blogs/create', (req, res) => {
  res.render('create',{ title: 'Create a new blog' });
})

router.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
  .then((result) => {
        res.render('details', {blog: result, title: 'blog Details'})
  })
  .catch((err) => {
      console.log(err);
  });
});


module.exports = router;
