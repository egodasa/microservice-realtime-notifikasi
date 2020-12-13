var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

var sc
var cors = require('cors')

app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/emit', (req, res) => {
  var channel = req.query.channel || "default";
  var message = req.query.message || "default";
  io.emit(channel, message);
  console.log("Nama channel: " + channel);
  console.log("Nama message: " + message);
  res.send("ok");
})

// server membuat koneksi socket
io.on('connection', (socket) => {
    // sc = socket

    // sc.on('channel_1', function(msg){

    //   console.log(sc.tambahan)
    //   // setelah listem server akan emit ke klien lagi dengan kode dibawah
    //   io.emit('channel_1', msg);

    //   // room agar notifikasi bisa disebar ke user tertentu saja
    //   socket.join('channel_1:' + socket.handshake.query.nama_room);
    // });
  
    // sc.on('channel_2', function(msg){
    //   console.log(sc.tambahan)
    //   // setelah listem server akan emit ke klien lagi dengan kode dibawah
    //   io.emit('channel_2', msg);
    // });

});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
