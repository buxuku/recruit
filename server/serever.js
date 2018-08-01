const express = require('express');
const mongoose = require('mongoose');
const app = express();
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log('mongod success');
});
const User = mongoose.model('user', new mongoose.Schema({
    user:{type: String,required: true},
    age:{type:Number,required: true}
}))
User.create({
    user: 'imooc',
    age: 18
},function(err,doc){
    if(!err){
        console.log(doc);
    }else{
        console.log(err);
    }
})
app.get('/',function(req,res){
    res.send('<h1>hello world</h1>');
})
app.get('/data',function(req,res){
    res.json({name: 'oks'})
})
app.listen(9003,function(){
    console.log('start on port 9003');
})