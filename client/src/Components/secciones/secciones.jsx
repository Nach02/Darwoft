import React from "react";
import './secciones.css'

function Seccion(props){

    return (
        <div className="seccion">
            <img alt='icono de seccion'src={props.logo} style={{height:"10px",width:"10px"}}/>
            <div className="data"><p style={{color:"grey", fontSize:"10px", marginBottom:"-10px"}}>{props.title}</p><p style={{color:"rgb(129, 205, 201)", fontSize:"10px"}}>{props.data}</p></div>

        </div>
    )
}

export default Seccion