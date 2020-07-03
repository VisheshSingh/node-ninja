const Blog = require('../models/Blog');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render('index', { title: 'Home', blogs: result }))
    .catch((err) => console.log('Error fetching blogs', err));
});

router.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  try {
    await blog.save();
    res.redirect('/blogs');
  } catch (error) {
    console.log(error);
  }
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render('details', { title: 'Blog Details', blog: result })
    )
    .catch((err) => console.log(err));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
