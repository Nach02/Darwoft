import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './NavBar.css'
import { getLogin, deleteToken } from "../../Redux/Actions";
import imagen from '../../img/logo.png'
import Seccion from "../secciones/secciones";
import phone from '../../img/phone.jpg'
import location from '../../img/location.jpg'
import clock from '../../img/clock.png'

function NavBar(){
    const state=useSelector((state)=>state)
    const dispatch=useDispatch()
    useEffect(() => {
        if(!state.loged){
            dispatch(getLogin())
        }
    }, []);

    function logOut(){
        dispatch(deleteToken())
    }


    return(        
        <div style={{display:"flex",flexDirection:"column-reverse",height: "90px",width:"100%"}}>
            
            {state.loged?(<div class="NavBar">
                <p>bienvenido {state.user.name}!!</p>
                <button onClick={e=>logOut(e)}>LogOut</button>
                <NavLink to="/user">Mi cuenta</NavLink>
            </div>):(<div class="NavBar">
            <NavLink to="/login">Log In</NavLink>
            {/* <Link class="register">Register</Link> */}
            </div>)}
            <div className="header">
                <img alt="logo de veterinaria" className="logo" src={imagen}/>
                <div style={{display:"flex"}}>
                    <Seccion title="Ubicacion" logo={location} data="Juan B Justo 967,Ciudad, Mendoza"/>
                    <Seccion title="Horario" logo={clock} data="09:00 - 17:00"/>
                    <Seccion title="Llamanos" logo={phone} data="0 (800) 337 337"/>
                </div>
            </div>
        </div>        
    )    
}
export default NavBar;