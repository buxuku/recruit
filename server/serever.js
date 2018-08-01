const express = require('express');

const app = express();

app.get('/',function(req,res){
    res.send('<h1>hello world</h1>');
})
app.get('/data',function(req,res){
    res.json({name: 'ok'})
})
app.listen(9003,function(){
    console.log('start on port 9003');
})