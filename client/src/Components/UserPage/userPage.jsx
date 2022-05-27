import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPets } from "../../Redux/Actions";
import PetCard from "../petCard/petCard";


function UserPage(){
    const state= useSelector((state)=>state)
    const history= useHistory()
    const dispatch=useDispatch()
    useEffect(() => {
        if(!state.loged) return history.push('/')
        dispatch(getPets(state.user.email))
    }, []);
    console.log(state.pets)
    return(
        <div>
            {state.pets[0]===undefined?(
            <div>
                <p>No pets Found</p>
                <NavLink to='/user/newpet'>Add your first pet</NavLink>
            </div>
            ):(
            state.pets.map(p=>(
                <PetCard key={p.id} name={p.name} id={p.id}/>
            ))
            )}
            <NavLink to='/user/newpet'>Add a new pet</NavLink>
            
            este es la pagina del perfil
            <button style={{marginLeft:"20px"}}><NavLink to="/">Back Home</NavLink></button>
        </div>
    )
}
export default UserPage