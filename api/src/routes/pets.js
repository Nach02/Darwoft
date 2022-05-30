var express = require('express');
var router = express.Router();
module.exports=router
const { Users,Pets } = require('../db.js')

router.get('/:email', async (req,res)=>{ 
    const {email}=req.params
    const user= await Users.findOne({
        where:{email},
        include: [
            {
                model: Pets,
            },
        ],
        attributes: ["name"]
    })
    if(!user) return res.json({status:false,message:'no se encontro ningun usuario con ese email'})
    res.json({status:true,data:user})

})

router.post('/',async (req,res)=>{ 
    const {user,name,type,breed,age,weight,height}=req.body
    if(!user || !name || !type || !breed || !age || !weight || !height) return res.json({status:false,message:'no se pudo agregar nueva mascota por falta informacion'})
    
    const find= await Users.findOne({
        where:{email:user}
    })
    const newPet= await Pets.create({
        name,type,breed,age,weight,height,userId:find.id
    })
    res.json({status:true,message:'la mascota se creo correctamente'})
})

router.put('/',async (req,res)=>{
    try{
        const {id,age,weight,height}=req.body
        if(!id || !age || !weight || !height) throw new Error('no se pudo actuaizar la informacion mascota por falta informacion')

        const find= await Pets.findOne({
            where:{id}
        })
        find.age=age;
        find.weight=weight;
        find.height=height;

        await find.save()
        res.json({status:true,message:'la informacion de la mascota se actualizo correctamente'})
    }catch(err){
        res.json({status:false,message:err.message})

    }
})

router.delete('/',async (req,res)=>{
    const {id}=req.body
    try{
        if(!id) throw new Error('no se pudo eliminar a la mascota por falta informacion')
        
        const pet= await Pets.findOne({
            where:{id}
        })
        if(!pet) throw new Error('la mascota no pertenece al usuario, no se puede eliminar')
        
        await pet.destroy()
        res.json({status:true,message:"la mascota se borro correctamente"})
    }
    catch(error){
        res.json({status:false,message:error.message})
    }

})