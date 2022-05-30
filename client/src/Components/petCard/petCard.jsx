import React from "react";
import { useDispatch } from "react-redux";
import { deletePets } from "../../Redux/Actions";
import './petCard.css'
import logo from '../../img/logo.png'
import { useHistory } from "react-router-dom";

function PetCard(props){
    const dispatch= useDispatch();
    const history=useHistory()

    function eliminar(id){
        dispatch(deletePets({id}))
    }
    function upDate(){
        return history.push(`/update/${props.pet.id}`)
    }
    function esconder(e){
        var card=document.getElementById(`${props.pet.id}`)
        if(card.classList.contains("visible")){
            card.style.height="0px"
            card.style.border="";
            card.classList.toggle("visible")
        }else{
            card.style.height="300px"
            card.style.border="solid grey 2px"
            card.classList.toggle("visible")
        }
    }

    return (
        <div className="card">
            <div className="nombre">
                <p style={{marginRight:"90px"}}>{props.pet.name}</p>
                <p onClick={e=>esconder(e)} className="esconder">+</p>
            </div>
            <div className='info' id={props.pet.id}>
                <div className="top">
                    <img className="logo" src={logo} alt="logo"/>
                    <p>PET IDENTIFY CARD</p>
                </div>
                <div>
                    <div className="primera">
                        <p>{props.pet.name}</p>
                        <p>ID.NO:   {props.pet.id}</p>
                    </div>
                    <div className="segunda">
                        {props.pet.photo?(<img className="photo" src={props.pet.photo}/>):(<p className="no-photo">PHOTO</p>)}
                        <ul>
                            <li>type:     {props.pet.type}</li>
                            <li>breed:     {props.pet.breed}</li>
                            <li>age:     {props.pet.age}</li>
                            <li>weight:     {props.pet.weight}</li>
                            <li>height:     {props.pet.height}</li>
                        </ul>
                    </div>
                </div>
                <div className="botones">
                <button onClick={e=>{eliminar(props.pet.id)}}>eliminar mascota</button>
                <button onClick={e=>{upDate()}}>modificar info</button>

                </div>
            </div> 
        </div>
    )
}
export default PetCard