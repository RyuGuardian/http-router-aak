'use_strict';

var http = require('http');

var server = http.createServer(function(req, res) {
  if(req.url === '/' || req.url === '/time') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.write(Date().toString());
  }
  else if(/\/[A-Za-z]+/.test(req.url)) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.write('Hello, ' + req.url.slice(1));    
  }
  else if(/\/[^A-Za-z]/.test(req.url)) {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });

    res.write('Not a valid name. Nice try.');
  }

  res.end();
});

server.listen(3000);
