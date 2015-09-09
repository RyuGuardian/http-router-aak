'use_strict';

var http = require('http');

var server = http.createServer(function(req, res) {
  if(req.url === '/' || req.url === '/time') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.write(Date().toString());
  }
  else if(/\greet\/[A-Za-z]+/.test(req.url)) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.write('Hello, ' + req.url.slice(7));    
  }
  else if(/\greet\/[^A-Za-z]/.test(req.url)) {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });

    res.write('Not a valid name. Nice try.');
  }
  else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });

    res.write('Error 404\nPage not found.')
  }

  res.end();
});

server.listen(3000);
