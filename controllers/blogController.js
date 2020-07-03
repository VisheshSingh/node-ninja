const Blog = require('../models/Blog');

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render('blogs/index', { title: 'Home', blogs: result })
    )
    .catch((err) => console.log('Error fetching blogs', err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render('blogs/details', { title: 'Blog Details', blog: result })
    )
    .catch((err) => res.status(404).render('404', { title: '404 Error' }));
};

const blog_create_post = async (req, res) => {
  const blog = new Blog(req.body);
  try {
    await blog.save();
    res.redirect('/blogs');
  } catch (error) {
    console.log(error);
  }
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create' });
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_delete,
  blog_create_get,
  blog_details,
};
