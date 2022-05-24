import Swal from 'sweetalert2';

export const LOGIN='LOGIN';
export const LOGOUT='LOGOUT'

export const postRegister=function(register){
    return function (dispatch){
        return fetch(`http://localhost:3001/auth/register`,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(register)
                }) 
                .then((descarga)=> descarga.json())
                .then((respuesta)=>{
                    if(respuesta.status===true){
                    dispatch({
                        type:LOGIN,
                        payload:respuesta.user
                    })
                    Swal.fire({
                        icon: "success",
                        title: respuesta.message,
                        showConfirmButton: true,
                        heightAuto: false,
                        timer: 3000,
                      });
                      return "si"
                    // alert(respuesta.message)
                }else{
                    Swal.fire({
                        icon: "error",
                        title: respuesta.message,
                        showConfirmButton: true,
                        heightAuto: false,
                        timer: 3000,
                      });
                }
                })
                .catch((err)=>alert(`Ocurrio un error ${err}`))
    }
}

export const postLogin=function(login){
    return function (dispatch){
        return fetch(`http://localhost:3001/auth/login`,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(login)
                })
                .then((descarga)=> descarga.json())
                .then((respuesta)=>{
                    console.log(respuesta.token)
                    localStorage.setItem('token',respuesta.token)
                    if(respuesta.status===true){
                    dispatch({
                        type:LOGIN,
                        payload:respuesta.user
                    })
                    return "si"
                    }
                    else{
                        Swal.fire({
                            icon: "error",
                            title: respuesta.message,
                            showConfirmButton: true,
                            heightAuto: false,
                            timer: 3000,
                          });
                    }
                })
                .catch((err)=>alert(`Ocurrio un error ${err}`))
    }
}

export const getLogin=function(){
    return function (dispatch){
        return fetch(`http://localhost:3001/auth/user`,{
                method: "GET",
                headers: {'content-type': 'application/json', Authorization: "Bearer " + localStorage.getItem("token")}
                })
                .then((descarga)=> descarga.json())
                .then((respuesta)=>{
                    console.log(respuesta)
                    if(respuesta.status===true){
                    dispatch({
                        type:LOGIN,
                        payload:respuesta.user
                    })
                    }
                })
                .catch((err)=>alert(`Ocurrio un error ${err}`))
    }
}

export function deleteToken(){
    localStorage.setItem('token',"")
    return{
        type:LOGOUT,        
    }
}