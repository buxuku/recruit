const express = require('express');
const Router =  express.Router();
const model = require('./modal');
const User = model.getModel('user');


Router.get('/list',function(req,res){
    User.find({}, function(err,doc){
        return res.json(doc);
    })
})
Router.post('/register',function(req,res){
    const {user,pwd,type} = req.body;
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code: 1, msg: '用户已经存在'})
        }
        User.create({user,pwd,type},function(err,doc){
            if(err){
                return res.json({code:1, msg:'error'})
            }
            return res.json({code: 0});
        })
    })
})
Router.get('/info',function(req,res){
    return res.json({code: 1})
})

module.exports = Router;