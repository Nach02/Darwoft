import React from "react";
import imagen from '../../img/vet-home.jpg'
import './home.css'
function Home(){
    return(
        <div>
            <div>
                <p className="texto1">Mantenga sus mascontas en</p>
                <p className="texto2">el camino hacia el bienestar</p>
            </div>
            <div className="texto3">Cuidado de alta calidad. El amor es la mejor medicina.</div>
            <img alt ="imagen de bienvenida" className="imagenfondo" src={imagen}/>
        </div>
    )
}

export default Home;