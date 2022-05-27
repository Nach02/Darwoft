import React from "react";
import { useDispatch } from "react-redux";
import { deletePets } from "../../Redux/Actions";

function PetCard(props){
    const dispatch= useDispatch();

    function eliminar(id){
        dispatch(deletePets({id}))
    }

    return (
        <div>
            esta mascota se llama {props.name} 
            <button onClick={e=>{eliminar(props.id)}}>eliminar mascota</button>
        </div>
    )
}
export default PetCard