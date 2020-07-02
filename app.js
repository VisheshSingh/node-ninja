const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const app = express();

// mongoDB connection
const mongoURI =
  'mongodb+srv://test123:test123@cluster0-t0uam.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) =>
    app.listen(3000, () => console.log('Server running on port 3000...'))
  )
  .catch((err) => console.log('Error connecting to MongoDB'));

// logger middleware
app.use(morgan('dev'));
// send form data by parsing request body
app.use(express.urlencoded({ extended: true }));
// static middleware
app.use(express.static('public'));

// register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

/* app.get('/all-blogs', async (req, res) => {
  const blog = new Blog({
    title: 'How to defeat Bowser',
    snippet: 'Bowser defeat',
    body: 'lorem ipsum random text',
  });

  try {
    const result = await blog.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}); */

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render('index', { title: 'Home', blogs: result }))
    .catch((err) => console.log('Error fetching blogs', err));
});

app.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  try {
    await blog.save();
    res.redirect('/blogs');
  } catch (error) {
    console.log(error);
  }
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) =>
    res
      .render('details', { title: 'Blog Details', blog: result })
      .catch((err) => console.log(err))
  );
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
