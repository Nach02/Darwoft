import React, { useState } from "react";
import { putRegister } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


function PassReset(props){
    const dispatch=useDispatch()
    const history=useHistory()
    const id=props.match.params.id
    const [register,setRegister]=useState({
        name:"",
        id:id,
        newId:"",
        confirm:"",
    })
    var mensaje={mensaje:"The password confirmation does not match",status:false}
    if(register.confirm!==register.newId){mensaje.status=true} 

    async function sendInfo(e){
        e.preventDefault()
        var respuesta;
        respuesta = await dispatch(putRegister(register))
        if(respuesta){
            history.push('/')
        } 
    }

    return(
        <div>
            <form className="loginForm"  onSubmit={e=>sendInfo(e,"register")} >
            <div style={{display: "flex",flexDirection: "column"}}>
                <input placeholder="Nickname" type="text" value={register.name} required onChange={e=>setRegister({...register,name:e.target.value})}></input>
                <input placeholder="NewPassword" type="password" value={register.newId} required onChange={e=>setRegister({...register,newId:e.target.value})}></input>
                <input placeholder="Confirm NewPassword" type="password" value={register.confirm} required onChange={e=>setRegister({...register,confirm:e.target.value})}></input>
                {mensaje.status===true?(<p style={{color:"red"}}>{mensaje.mensaje}</p>):(<></>)}
                </div>
                <button disabled={mensaje.status}>Enviar</button>
            </form> 
        </div>
    )
}
export default PassReset