const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
