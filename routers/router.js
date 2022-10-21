const e = require('express');
const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const user = require('../models').registers;
const sendmail = require('../nodemailer/sendmail');
const hash = require('../hash/hash');
router.use(express.json());

router.get('/',(req,res)=>{
    user.findAll().then(user=>res.json(user));
    res.status(200);
});
router.post('/',(req,res) => {
    req.body.status = false;
    req.body.password = hash(req.body.password);
    user.create(req.body).catch(e=>{console.log(e)});
    sendmail(req.body.email,req.body.id);
    res.status(200).json(req.body);
});
router.put('/',(req,res) => {
    user.updata(req.body,{where:{id:req.body.id}}).where(user=>res.json(user)).catch(e=>console.log(e));
});
router.get('/:hash/:id',(req,res)=>{
    if(req.params.hash !== hash(req.params.id)){
        res.status(404).send("sayfa bulunamadı");
    }
    let users = {
        id:req.params.id,
        status:true
    }
    user.update(users,{where:{id:users.id}});
    res.status(200).send('hesap doğrulandı');
});

module.exports = router;