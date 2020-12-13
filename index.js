// PENGATURAN APLIKASI
var config = {
  private_key_jwt: "pakakeh",
  allowed_host: "*",
  allowed_methods: ["GET", "POST"],
  jwt_algorithm: ['HS256']
}

var jwt = require('express-jwt');
var app = require('express')();
var http = require('http').createServer(app);
var bodyParser = require('body-parser')

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// KONFIGURASI CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader('Content-Type', 'application/json');
  next();
});

// KONFIGURASI SOCKET
var io = require('socket.io')(http, {
  cors: {
    origin: config.allowed_host, 
    methods: config.allowed_methods
  }
});



// ROUTE UNTUK EMIT EVENT KE CLIENT
app.post('/emit', jwt({
  secret: config.private_key_jwt,
  algorithms: config.jwt_algorithm
}), (req, res) => {
  if (!req.user) {
    res.status(401).json({
      status: false,
      code: 401,
      message: "Token tidak valid"
    });
  }
  
  var err = {
    channel: "",
    message: ""
  }

  if(!req.body.channel)
  {
    err.channel = "Nama channel tidak boleh kosong"
  }

  if(!req.body.message)
  {
    err.message = "Pesan tidak boleh kosong"
  }

  if(!req.body.message || !req.body.channel)
  {
    res.status(422).json({
      status: false,
      code: 422,
      message: "Data tidak valid",
      data: err
    });
  }

  var channel = req.body.channel;
  var message = req.body.message;

  // EMIT EVENT KE CLIENT
  io.emit(channel, message);

  console.log("Nama channel: " + channel);
  console.log("Nama message: " + message);

  res.json({
    status: true,
    code: 200,
    message: "OK"
  });
})

// KONFIGURASI RESPON JWT ERROR 
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(401).send(JSON.stringify({
        status: false,
        code: 401,
        message: "Token tidak valid"
      }));
  }
});

// server membuat koneksi socket
io.on('connection', (socket) => {

});


// HANDLE 404 NOT FOUND
app.use(function(req,res){
  res.status(404).json({
    status: false,
    message: "Not found",
    code: 404
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
