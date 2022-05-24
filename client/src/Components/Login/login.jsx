import React,{useState}from "react";
import {useDispatch} from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { postRegister,postLogin } from "../../Redux/Actions";
import './login.css'

function Login(){
    const history=useHistory()
    const dispatch=useDispatch();

    const [login,setLogin]=useState({
        email:"",
        password:""
    })

    const [register,setRegister]=useState({
        name:"",
        email:"",
        password:""        
    })
    const [status,setStatus]=useState("login")

    function cambio(arg){
        setStatus(arg)     
        setLogin({email:"",password:""})
        setRegister({name:"",email:"",password:""})
    }

    async function sendRegister(e){
        console.log("entradno")
        e.preventDefault()
        const respuesta = await dispatch(postRegister(register))
        if(respuesta){
            history.push('/')
        }
    }
    async function sendLogin(e){
        console.log("login")
        e.preventDefault()
        const respuesta = await dispatch(postLogin(login))
        if(respuesta){
            history.push('/')
        }
    }


    return(
        <div>
            {status!=='login'?(
            <form className="registerForm"  onSubmit={e=>sendRegister(e)} >
                <input placeholder="User name" type="text" value={register.name} required onChange={e=>setRegister({...register,name:e.target.value})}></input>
                <input placeholder="Email" type="email" value={register.email} required onChange={e=>setRegister({...register,email:e.target.value})}></input>
                <input placeholder="Password" type="password" value={register.password} required onChange={e=>setRegister({...register,password:e.target.value})}></input>
                <p style={{cursor:"pointer", width:100+"px"}} onClick={e=>cambio('login')}>Already have an account?</p>
                <button>Register!</button>
            </form> )
            :
            (
            <form className="loginForm" onSubmit={e=>sendLogin(e)} >
                <input placeholder="Email" type="email" value={login.email} required onChange={e=>setLogin({...login,email:e.target.value})}></input>
                <input placeholder="Password" type="password" value={login.password} required onChange={e=>setLogin({...login,password:e.target.value})}></input>
                <p style={{cursor:"pointer", width:95+"px"}} onClick={e=>cambio('register')}>Don't have an account yet?</p>
                <button>Login!</button>
            </form>)}
            <button><NavLink to="/">Home</NavLink></button>            
        </div>
    )
}

export default Login