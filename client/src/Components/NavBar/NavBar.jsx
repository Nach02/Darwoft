import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './NavBar.css'
import { getLogin, deleteToken } from "../../Redux/Actions";

function NavBar(){
    const state=useSelector((state)=>state)
    const dispatch=useDispatch()
    useEffect(() => {
        if(state.Loged!==true){
            dispatch(getLogin())
        }
    }, []);

    function logOut(){
        dispatch(deleteToken())
    }

    return(        
        <div class="NavBar">
            {state.Loged?(<div class="NavBar">
                <p>bienvenido {state.user[0].name}!!</p>
                <button onClick={e=>logOut(e)}>LogOut</button>
            </div>):(<div class="NavBar">
            <button class="btn"><NavLink to="/login">Log In</NavLink></button>
            {/* <Link class="register">Register</Link> */}
            </div>)}
        </div>        
    )    
}
export default NavBar;