var express = require('express');
var session=require('express-session');
var app = express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
//var cors=require('cors');
var mainRouter = require('./routers/main-router');

io.sockets.on('connection',client=>{
    console.log('Client connected...'+client.conn.id);
    client.on('join',data=>{
        console.log(data);        
    })
    client.on('messages',data=>{
        client.emit('broad',data);
        client.broadcast.emit('broad',data);
    })
});

server.listen(3002);

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))
//app.use(cors({origin:'http://192.168.1.28:3002'}));
app.use(session({secret:'aquickbrownfoxjumpsoverthelazydog'}));
app.use((req, res, next) => {
    console.log("A new request received at " + Date.now() + " ....");
    next();
});
app.use('/', mainRouter);



app.listen(3001);


