// required modules
var http = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(http)

// required module for sending code trough pins and via RF Module
var rpi433 = require('rpi-433'),
  rfSniffer = rpi433.sniffer({
    pin: 2,                     //Snif on GPIO 2 (or Physical PIN 13)
    debounceDelay: 500          //Wait 500ms before reading another code
  }),
  rfEmitter = rpi433.emitter({
    pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
    pulseLength: 350            //Send the code with a 350 pulse length
  });

http.listen(8080);  // Server listens to port 8080

// Handles request from client, sends index.html
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

// object containing on and off codes from it's receivers
// the codes were sniffed with the rfSniffer module at the top by pressing the buttons on the remote
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

// Astablishes a socket connection with client
io.sockets.on('connection', function (socket) {

  var switcher = false;

  // B receiver -----------------------------------------------------
  socket.on('b_switcher', function (data) {

    switcher = data;

    if (switcher) {

      // if true, turn on (send 3 times for safety)
      rfEmitter.sendCode(steckdosen.b.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      /*
      rfEmitter.sendCode(steckdosen.b.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      rfEmitter.sendCode(steckdosen.b.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });*/

    } else {

      // if false, turn off (send 3 times for safety)
      rfEmitter.sendCode(steckdosen.b.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      /*
      rfEmitter.sendCode(steckdosen.b.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      rfEmitter.sendCode(steckdosen.b.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });*/

    }
  });


  // C receiver -----------------------------------------------------
  socket.on('c_switcher', function (data) {

    switcher = data;

    if (switcher) {

      // if true, turn on (send 3 times for safety)
      rfEmitter.sendCode(steckdosen.c.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      /*
      rfEmitter.sendCode(steckdosen.c.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      rfEmitter.sendCode(steckdosen.c.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });*/

    } else {

      // if false, turn off (send 3 times for safety)
      rfEmitter.sendCode(steckdosen.c.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      /*
      rfEmitter.sendCode(steckdosen.c.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      rfEmitter.sendCode(steckdosen.c.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });*/

    }
  });

  // D receiver -----------------------------------------------------
  socket.on('d_switcher', function (data) {

    switcher = data;

    if (switcher) {

      // if true, turn on (send 3 times for safety)
      rfEmitter.sendCode(steckdosen.d.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      /*
      rfEmitter.sendCode(steckdosen.d.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      rfEmitter.sendCode(steckdosen.d.on, function (error, stdout) {
        if (!error) console.log(stdout);
      });*/

    } else {

      // if false, turn off (send 3 times for safety)
      rfEmitter.sendCode(steckdosen.d.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      /*
      rfEmitter.sendCode(steckdosen.d.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });

      rfEmitter.sendCode(steckdosen.d.off, function (error, stdout) {
        if (!error) console.log(stdout);
      });*/

    }
  });
});