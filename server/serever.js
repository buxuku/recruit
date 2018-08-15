const express = require('express');
const UserRouter = require('./userRouter');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const model = require('./modal');
const Chat = model.getModel('chat');

io.on('connection',function(socket){
    socket.on('sendmsg', function(data){
        console.log(data);
        const {from, to , content} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({from,to,content,chatid},function(err,doc){
            console.log(err,doc);
            io.emit('recvmsg', Object.assign({},doc._doc));
        })
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', UserRouter);
server.listen(9003,function(){
    console.log('start on port 9003');
})