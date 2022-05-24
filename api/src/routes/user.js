var express = require('express');
var router = express.Router();
module.exports = router;
const { Users } = require('../db.js')
const jwt=require('jsonwebtoken')

function verifyToken(req,res,next){
    const Header=req.headers['authorization']
    if(typeof Header === 'undefined') return res.json({status:false,message:'No token'}) 

    const token= Header.split(" ")[1]    
    req.token=token 
    next()
}

router.get('/user', verifyToken,(req,res)=>{ 
    jwt.verify(req.token,'secret',(error,data)=>{
        if(error) return res.json({status:false,message:'usuario NO identificado'})
        
        const user=data.user
        res.json({status:true,message:'usuario identificado',user:{name:user.name,email:user.email}})       
    })
})

router.post('/login',async function(req,res){//localhost:3001/auth/
    const{email,password}=req.body;
    if(email || password) return res.json({status:false,message:'falta informacion'})
    
    const find=await Users.findOne({ 
        where:{email:email}
    })
    if(!find) return res.json({status:false,message:'no user found with the email provided'})
    
    if(find.password!==password) return res.json({status:false,message:'Wrong password'})

    //"creando nuevo token"
    jwt.sign({user:{name:find.name,email:find.email}},'secret',(err,token)=>{
        res.json({token,status:true,message:'usuario identificado',user:{name:find.name,email:find.email}})
    })                  
})

router.post('/register',async(req,res)=>{
    const{name,email,password}=req.body;
    
    if(!name||!email||!password) return res.json({status:false,message:'falta informacion'})

        const find=await Users.findOne({
            where:{email:email},
        })
        if(find)return  res.json({status:false,message:'the email belong to a register user, please use another one'})
        
        const newUser=await Users.create({
            name,
            email,
            password
        })
        jwt.sign({user:{name:newUser.name,email:newUser.email}},'secret',(err,token)=>{
            res.json({token,status:true,message:`user ${newUser.name} has been created`,user:{name:newUser.name,email:newUser.email}})
        })
})

