import React,{useEffect, useState}from "react";
import {useDispatch,useSelector} from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { postRegister,postLogin,postPassword } from "../../Redux/Actions";
import './login.css'
import Spinner from "../Spinner";

function Login(){
    const history=useHistory()
    const dispatch=useDispatch();
    const state=useSelector((state)=>state)
    const [loading,setLoading]= useState(false)
    useEffect(() => {
        if(state.loged) return history.push('/')
    }, []);

    const [register,setRegister]=useState({
        name:"",
        email:"",
        password:""        
    })
    const [status,setStatus]=useState("login")

    function cambio(arg){
        setStatus(arg)     
        setRegister({name:"",email:"",password:""})
    }

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
            setLoading(true)
            respuesta = await dispatch(postPassword(register))
            if(!respuesta) setLoading(false)
        }
        
        if(respuesta){
            history.push('/')
        } 
    }


    return(
        <div>
            {status==='register'?(
            <form className="loginForm"  onSubmit={e=>sendInfo(e,"register")} >
                <div style={{display: "flex",flexDirection: "column"}}>
                <label>Nick name: </label><input placeholder="User name" type="text" value={register.name} required onChange={e=>setRegister({...register,name:e.target.value})}></input>
                <label>Email: </label><input placeholder="Email" type="email" value={register.email} required onChange={e=>setRegister({...register,email:e.target.value})}></input>
                <label>Password:</label><input placeholder="Password" type="password" value={register.password} required onChange={e=>setRegister({...register,password:e.target.value})}></input>
                </div>
                <p style={{cursor:"pointer", width:100+"px"}} onClick={e=>cambio('login')}>Already have an account?</p>
                <button>Register!</button>
                <button style={{marginLeft:"20px"}}><NavLink to="/">Back Home</NavLink></button> 
            </form> )
            :
            (status==="login"?(<form className="loginForm" onSubmit={e=>sendInfo(e,"login")} >
                <div style={{display: "flex",flexDirection: "column"}}>
                <label>Email: </label><input placeholder="Email" type="email" value={register.email} required onChange={e=>setRegister({...register,email:e.target.value})}></input>
                <label>Password:</label><input placeholder="Password" type="password" value={register.password} required onChange={e=>setRegister({...register,password:e.target.value})}></input>
                </div>
                <div style={{display: "flex",alignItems: "center"}}>
                <p style={{cursor:"pointer", width:95+"px",margin:"16px"}} onClick={e=>cambio('register')}>Don't have an account yet?</p>
                <p style={{cursor:"pointer", width:95+"px"}} onClick={e=>cambio('forgot')}>Forgot Password?</p>
                </div>
                <button>Login!</button>
                <button style={{marginLeft:"20px"}}><NavLink to="/">Back Home</NavLink></button> 
                </form>)
                :
                (loading?(<Spinner/>)
                :
                (<form className="loginForm" onSubmit={e=>sendInfo(e,"password")} >                
                <input placeholder="Email" type="email" value={register.email} required onChange={e=>setRegister({...register,email:e.target.value})}></input>
                <button>Send</button>
                <button style={{marginLeft:"20px"}}><NavLink to="/">Back Home</NavLink></button> 
                </form>))
            )}                       
        </div>
    )
}

export default Login