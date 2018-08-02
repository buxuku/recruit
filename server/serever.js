const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./userRouter');

const app = express();
app.use('/user', UserRouter);
app.listen(9003,function(){
    console.log('start on port 9003');
})