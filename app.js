const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`<p>home page</p>`);
});

app.listen(3000, () => console.log('Server running on port 3000...'));
