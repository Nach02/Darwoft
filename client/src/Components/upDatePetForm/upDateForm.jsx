import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory} from "react-router-dom";
import { upDatePets } from "../../Redux/Actions";

function UpDateForm(props){
    const history= useHistory()
    const dispatch=useDispatch()
    const state=useSelector((state)=>state)
    const id=props.match.params.id

    const [register,setRegister]=useState({
        id:"",
        name:"",
        type:"",
        breed:"",
        age:"",
        weight:"",
        height:""
    })
    useEffect(() => {
        if(!state.loged) return history.push('/')
        const [info]=state.pets.filter(p=>p.id.toString()===id)
        setRegister({...register,
        id:info.id,
        name:info.name,
        type:info.type,
        breed:info.breed,
        age:info.age,
        weight:info.weight,
        height:info.height})
    }, []);

    async function sendInfo(e){
        e.preventDefault()
        const respuesta= await dispatch(upDatePets(register))
        if(respuesta)return history.push('/user')
    }

    return(
        <div>
            <form className="loginForm"  onSubmit={e=>sendInfo(e)} >
                <div style={{display: "flex",flexDirection: "column"}}>
                <label>Pets name: </label><input placeholder="Pets name" type="text" value={register.name} required  disabled onChange={e=>setRegister({...register,name:e.target.value})}></input>
                <label>Type: </label><input placeholder="Dog,Cat,Turtle,ect..." type="text" value={register.type} required disabled onChange={e=>setRegister({...register,type:e.target.value})}></input>
                <label>Breed:</label><input placeholder="Breed" type="text" value={register.breed} required disabled onChange={e=>setRegister({...register,breed:e.target.value})}></input>
                <label>Age: </label><input placeholder="how old its your pet?" type="text" value={register.age} required onChange={e=>setRegister({...register,age:e.target.value})}></input>
                <label>Weight: </label><input placeholder="Pets weight" type="text" value={register.weight} required onChange={e=>setRegister({...register,weight:e.target.value})}></input>
                <label>Height: </label><input placeholder="Pets height" type="text" value={register.height} required onChange={e=>setRegister({...register,height:e.target.value})}></input>
                </div>
                <button>upDate info!</button>
                <button style={{marginLeft:"20px"}}><NavLink to="/">Back Home</NavLink></button> 
            </form>
        </div>
    )
}

export default UpDateForm