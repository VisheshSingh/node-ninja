const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const blogs = [
    {
      title: "Yoshi's egg hunt",
      description: 'lorem ipsum random text wysiwyg',
    },
    {
      title: 'Mario finds stars',
      description: 'lorem ipsum random text wysiwyg',
    },
    {
      title: 'How to defeat bowser',
      description: 'lorem ipsum random text wysiwyg',
    },
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(3000, () => console.log('Server running on port 3000...'));
