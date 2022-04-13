const { render } = require('ejs');
const express = require('express');
const { result } = require('lodash');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require('dotenv/config');

const app = express();

//dbconn
//create .env file and set dbURI = your mongo atlas connection string

const dbURI = process.env.dbURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));





app.set('view engine', 'ejs');

//middleware and static files

//0 middleware for showing some nerd stats in console
app.use(morgan('dev'));



//1 middleware for designating a public folder for css
app.use(express.static('public'));

//middleware for converting form input to readable form

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about',{ title: 'About' });
})

//blog routes

app.use(blogRoutes);



app.use( (req, res) => {
    res.status(404).render('404',{ title: '404' });
})


/*app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet:'this is a snippet',
        body:'this is a body'
    });
  
    blog.save()
      .then((result) => {
          res.send(result)
      })
      .catch((err) => {
          console.log(err);
      });
  })
  
  app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
  })*/