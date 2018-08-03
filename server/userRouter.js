const util = require('utility');
const express = require('express');
const Router =  express.Router();
const model = require('./modal');
const User = model.getModel('user');
const _filter = {pwd:0,__v:0};

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
        const userModal = new User({user,pwd:md5Pwd(pwd),type});
        userModal.save(function(e,d){
            if(e){
                return res.json({code:1, msg:'error'})
            }
            const {userid,type,_id} = d;
            res.cookie('userid',_id);
            return res.json({code: 0, data: {userid,type,_id}});
        });
    })
})
Router.post('/login',function(req,res){
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter, function(err,doc){
        if(!doc){
            return res.json({code: 1, msg: '用户名或者密码错误'})
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc});
    })
})
Router.get('/info',function(req,res){
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code: 1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code: 1,msg: '查询出错'})
        }
        return res.json({code: 0,data:doc})
    })
})
function md5Pwd(pwd) {
    const salt = "ILovyd#didfds(343!!3439sdf";
    return util.md5(util.md5(pwd+salt));
}
module.exports = Router;