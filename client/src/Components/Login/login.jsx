import React,{useState}from "react";
import {useDispatch} from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { postRegister,postLogin,postPassword } from "../../Redux/Actions";
import './login.css'

function Login(){
    const history=useHistory()
    const dispatch=useDispatch();

    // const [login,setLogin]=useState({
    //     email:"",
    //     password:""
    // })
    // const [mail,setMail]=useState("")

    const [register,setRegister]=useState({
        name:"",
        email:"",
        password:""        
    })
    const [status,setStatus]=useState("login")

    function cambio(arg){
        setStatus(arg)     
        // setLogin({email:"",password:""})
        setRegister({name:"",email:"",password:""})
    }

    // async function sendRegister(e){
    //     e.preventDefault()
    //     const respuesta = await dispatch(postRegister(register))
    //     if(respuesta){
    //         history.push('/')
    //     }
    // }
    // async function sendLogin(e){
    //     e.preventDefault()
    //     const respuesta = await dispatch(postLogin(login))
    //     if(respuesta){
    //         history.push('/')
    //     }
    // }

    async function sendInfo(e,arg){        
        e.preventDefault()
        var respuesta;

        if(arg==="register"){
            respuesta = await dispatch(postRegister(register))
        }
        if(arg==="login"){
            respuesta = await dispatch(postLogin(register))
        }
        if(arg==="password"){
            respuesta = await dispatch(postPassword(register))
        }
        
        if(respuesta){
            history.push('/')
        } 
    }


    return(
        <div>
            {status==='register'?(
            <form className="registerForm"  onSubmit={e=>sendInfo(e,"register")} >
                <input placeholder="User name" type="text" value={register.name} required onChange={e=>setRegister({...register,name:e.target.value})}></input>
                <input placeholder="Email" type="email" value={register.email} required onChange={e=>setRegister({...register,email:e.target.value})}></input>
                <input placeholder="Password" type="password" value={register.password} required onChange={e=>setRegister({...register,password:e.target.value})}></input>
                <p style={{cursor:"pointer", width:100+"px"}} onClick={e=>cambio('login')}>Already have an account?</p>
                <button>Register!</button>
            </form> )
            :
            (status==="login"?(<form className="loginForm" onSubmit={e=>sendInfo(e,"login")} >
                <input placeholder="Email" type="email" value={register.email} required onChange={e=>setRegister({...register,email:e.target.value})}></input>
                <input placeholder="Password" type="password" value={register.password} required onChange={e=>setRegister({...register,password:e.target.value})}></input>
                <p style={{cursor:"pointer", width:95+"px"}} onClick={e=>cambio('register')}>Don't have an account yet?</p>
                <p style={{cursor:"pointer", width:95+"px"}} onClick={e=>cambio('forgot')}>Forgot Password?</p>
                <button>Login!</button>
            </form>):(
            <form className="loginForm" onSubmit={e=>sendInfo(e,"password")} >
                <input placeholder="Email" type="email" value={register.email} required onChange={e=>setRegister({...register,email:e.target.value})}></input>
                {/* <input placeholder="Password" type="password" value={login.password} required onChange={e=>setLogin({...login,password:e.target.value})}></input> */}
                {/* <p style={{cursor:"pointer", width:95+"px"}} onClick={e=>cambio('register')}>Don't have an account yet?</p> */}
                <button>Send</button>
            </form>)
            )}
            <button><NavLink to="/">Home</NavLink></button>            
        </div>
    )
}

export default Login