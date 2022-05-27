var express = require('express');
var router = express.Router();
module.exports = router;
const { Users } = require('../db.js')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer= require('nodemailer');
const common = require('mocha/lib/interfaces/common');

function verifyToken(req,res,next){
    const Header=req.headers['authorization']
    if(typeof Header === 'undefined') return res.json({status:false,message:'No token'}) 
    
    req.token=Header
    next()
}

router.get('/user', verifyToken,(req,res)=>{ 
    jwt.verify(req.token,'secret',(error,data)=>{
        if(error) return res.json({status:false,message:'usuario NO identificado'})
        
        const user=data.user
        res.json({status:true,message:'usuario identificado',user:{name:user.name,email:user.email}})       
    })
})

router.post('/mail',async (req,res)=>{
    const {email}=req.body

    const user= await Users.findOne({
        where:{email:email}
    })
    if(!user) return res.json({status:false,message:'el mail proporcionado no se encuentra registrado como usuario'})

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure:true,
        auth: {
            user: 'martinezignacio985@gmail.com',
            pass: 'tkvagtfjglwovkrl'
        }
    });

    let mail={
        from:'"Reestablecer contraseña" <martinezignacio985@gmail.com>',
        to:email,
        subject:"Reestablecer su contraseña de VetApp",
        text:`Por favor siga el siguiente link para restabecer su contraseña:
            http://localhost:3000/pass/${user.password}

            Le recordamos su Nickname: ${user.name}
        `
    }
    transporter.sendMail(mail,(error,info)=>{
        if(error) return  res.json({status:false,message:'no se pudo enviar el email', error})
        res.json({status:true,message:'el email se envio correctamente'})
    })

})

router.post('/login',async function(req,res){//localhost:3001/auth/
    const{email,password}=req.body;
    if(!email || !password) return res.json({status:false,message:'falta informacion'})
    
    const find=await Users.findOne({ 
        where:{email:email}
    })
    if(!find) return res.json({status:false,message:'no user found with the email provided'})
      
    if(!bcrypt.compareSync(password+find.hash,find.password)) return res.json({status:false,message:'Wrong password'})
    
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
        const date= Date.now().toString()
        const key=password+date
        const hashpassword=await bcrypt.hash(key,10)
        const newUser=await Users.create({
            name,
            email,
            password:hashpassword,
            hash:date
        })
        jwt.sign({user:{name:newUser.name,email:newUser.email}},'secret',(err,token)=>{
            res.json({token,status:true,message:`user ${newUser.name} has been created`,user:{name:newUser.name,email:newUser.email}})
        })
})

router.put('/register',async(req,res)=>{
    const {id,name,newId}=req.body;

    if(!name||!id||!newId) return res.json({status:false,message:'falta informacion'})

    const user= await Users.findOne({
        where:{password:id}
    })
    if(user.name!== name) return res.json({status:false,message:'verifique su Nickname'})

    user.password= await bcrypt.hash(newId+user.hash,10)
    await user.save()
    res.json({status:true,message:'Password reestablecida con exito'})
})

