const express = require('express');
const UserRouter = require('./userRouter');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection',function(socket){
    socket.on('sendmsg', function(data){
        io.emit('recvmsg', data);
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', UserRouter);
server.listen(9003,function(){
    console.log('start on port 9003');
})