const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log('mongod success');
});

const models = {
    user: {
        'user': {'type':String, 'require':true},
        'pwd': {'type':String, 'require':true},
        'type': {'type':String, 'require':true},
        'avatar': {'type':String},
        'desc': {'type':String},
        'title': {'type':String},
        'company': {'type':String},
        'money': {'type':String},
    },
    chat: {
        'chatid':{'type':String,'required':true},
        'read':{'type': Boolean,'default': false},
        'from':{'type':String,'required':true},
        'to':{'type':String,'required':true},
        'create_time':{'type':Number,'required':true,default: new Date().getTime()},
        'content':{'type':String,'required':true,default: ''},
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(m) {
        return mongoose.model(m);
    }
}
// const User = mongoose.model('user', new mongoose.Schema({
//     user:{type: String,required: true},
//     age:{type:Number,required: true}
// }))
// app.get('/',function(req,res){
//     res.send('<h1>hello world</h1>');
// })
// app.get('/data',function(req,res){
//     res.json({name: 'oks'})
// })
// app.get('/user',function(req,res){
//     User.find({},function(err,doc){
//         res.json(doc);
//     })
// })
// app.get('/add',function(req,res){
//     User.create({
//         user: 'imooc',
//         age: 18
//     },function(err,doc){
//         if(!err){
//             console.log(doc);
//         }else{
//             console.log(err);
//         }
//     })
// })
// app.get('/update',function(req,res){
//     User.update({user:'imooc'},{'$set':{age:33}},function(err,doc){
//         res.json(doc);
//     })
// })
// app.get('/delete',function(req,res){
//     User.remove({age:18},function(err,doc){
//         res.json(doc);
//     })
// })