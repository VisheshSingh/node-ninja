const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader('Content-Type', 'text/html');

  res.write('<head><link rel="stylesheet" href="#"/></head>');
  res.write('<h1>hello, ninjas!</h1>');
  res.write('<p>hey gang</p>');

  res.end();
});

server.listen(3000, 'localhost', () => {
  console.log('Listening to requests on port 3000');
});
