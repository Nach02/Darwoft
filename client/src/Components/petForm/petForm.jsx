import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory} from "react-router-dom";
import { addPets } from "../../Redux/Actions";

function PetForm(){
    const history= useHistory()
    const dispatch=useDispatch()
    const state=useSelector((state)=>state)
    const [register,setRegister]=useState({
        user:state.user.email,
        name:"",
        type:"",
        breed:"",
        age:"",
        weight:"",
        height:""
    })
    useEffect(() => {
        if(!state.loged) return history.push('/')
    }, []);

    async function sendInfo(e){
        e.preventDefault()
        const respuesta= await dispatch(addPets(register))
        if(respuesta)return history.push('/user')
    }

    return(
        <div>
            <form className="loginForm"  onSubmit={e=>sendInfo(e)} >
                <div style={{display: "flex",flexDirection: "column"}}>
                <label>Pets name: </label><input placeholder="Pets name" type="text" value={register.name} required onChange={e=>setRegister({...register,name:e.target.value})}></input>
                <label>Type: </label><input placeholder="Dog,Cat,Turtle,ect..." type="text" value={register.type} required onChange={e=>setRegister({...register,type:e.target.value})}></input>
                <label>Breed:</label><input placeholder="Breed" type="text" value={register.breed} required onChange={e=>setRegister({...register,breed:e.target.value})}></input>
                <label>Age: </label><input placeholder="how old its your pet?" type="text" value={register.age} required onChange={e=>setRegister({...register,age:e.target.value})}></input>
                <label>Weight: </label><input placeholder="Pets weight" type="text" value={register.weight} required onChange={e=>setRegister({...register,weight:e.target.value})}></input>
                <label>Height: </label><input placeholder="Pets height" type="text" value={register.height} required onChange={e=>setRegister({...register,height:e.target.value})}></input>
                </div>
                <button>Register!</button>
                <button style={{marginLeft:"20px"}}><NavLink to="/">Back Home</NavLink></button> 
            </form>
        </div>
    )
}

export default PetForm