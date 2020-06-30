const express = require('express');

const app = express();

app.get('/', (req, res) => {
  //   res.send(`<p>home page</p>`);
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  //   res.send(`<p>home page</p>`);
  res.sendFile('./views/about.html', { root: __dirname });
});

app.listen(3000, () => console.log('Server running on port 3000...'));
