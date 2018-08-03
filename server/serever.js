const express = require('express');
const UserRouter = require('./userRouter');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', UserRouter);
app.listen(9003,function(){
    console.log('start on port 9003');
})