'use_strict';

var http = require('http');
var fs = require('fs');
var Router = require(__dirname + '/router');

var router = new Router();

var OK = 200;
var plainText = { 'Content-Type': 'text/plain' };

router.get('/', function(req, res) {
  res.writeHead(OK, plainText);

  res.write(Date().toString());
  res.end();
});

router.get('/time', function(req, res) {
  res.writeHead(OK, plainText);

  res.write(Date().toString());
  res.end();
});

router.get('/greet', function(req, res) {
  res.writeHead(OK, plainText);

  res.write('Hello, ' + req.url.slice(7));
  res.end();
});

router.post('/body', function(req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    if(!fs.existsSync(__dirname + '/../data')) {
      fs.mkdirSync(__dirname + '/../data');
    }

    var filesArr = fs.readdirSync(__dirname + '/../data');
    fs.writeFileSync(__dirname + '/../data/request' + filesArr.length + '.json', body);
  });

  res.end();
});

var server = http.createServer(router.route);
server.listen(3000, function () {
  console.log('It serves!');
});
