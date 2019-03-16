var http = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(http)

var rpi433 = require('rpi-433'),
  rfSniffer = rpi433.sniffer({
    pin: 2,                     //Snif on GPIO 2 (or Physical PIN 13)
    debounceDelay: 500          //Wait 500ms before reading another code
  }),
  rfEmitter = rpi433.emitter({
    pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
    pulseLength: 350            //Send the code with a 350 pulse length
  });

http.listen(8080);

var steckdosen = {
  a: {
    on: '5506385',
    off: '5506388'
  },
  b: {
    on: '5509457',
    off: '5509460'
  },
  c: {
    on: '5510225',
    off: '5510228'
  },
  d: {
    on: '5510417',
    off: '5510420'
  }
};

function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {
  var switcher = false;

  // B receiver
  socket.on('b_switcher', function (data) {
    switcher = data;
    if (switcher) {
      rfEmitter.sendCode(steckdosen.b.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });
    } else {
      rfEmitter.sendCode(steckdosen.b.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });
    }
  });

  // C receiver
  socket.on('c_switcher', function (data) {
    switcher = data;
    if (switcher) {
      rfEmitter.sendCode(steckdosen.c.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });
    } else {
      rfEmitter.sendCode(steckdosen.c.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });
    }
  });

  // D receiver
  socket.on('d_switcher', function (data) {
    switcher = data;
    if (switcher) {
      rfEmitter.sendCode(steckdosen.d.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });
    } else {
      rfEmitter.sendCode(steckdosen.d.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });
    }
  });
});