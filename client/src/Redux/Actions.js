import Swal from 'sweetalert2';

export const LOGIN='LOGIN';
export const LOGOUT='LOGOUT'
export const GETPETS='GETPETS'
export const DELETE="DELETE"

export const putRegister=function(register){
    return function (dispatch){
        return fetch(`http://localhost:3001/auth/register`,{
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(register)
                }) 
                .then((descarga)=> descarga.json())
                .then((respuesta)=>{
                    if(respuesta.status===true){
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
                        localStorage.setItem('token',respuesta.token)
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
                    if(respuesta.status===true){
                        localStorage.setItem('token',respuesta.token)
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

export const postPassword=function(pass){
    return function (dispatch){
        return fetch(`http://localhost:3001/auth/mail`,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(pass)
                })
                .then((descarga)=> descarga.json())
                .then((respuesta)=>{
                    if(respuesta.status===true){
                        Swal.fire({
                            icon: "success",
                            title: respuesta.message,
                            showConfirmButton: true,
                            heightAuto: false,
                            timer: 3000,
                          });
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
                headers: {'content-type': 'application/json', Authorization: localStorage.getItem("token")}
                })
                .then((descarga)=> descarga.json())
                .then((respuesta)=>{
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

export const getPets=function(info){
    return function(dispatch){
        return fetch(`http://localhost:3001/pets/${info}`,{
        })
        .then((descarga)=>descarga.json())
        .then((respuesta)=>{
            if(respuesta.status===true){
                dispatch({
                    type:GETPETS,
                    payload:respuesta.data.pets
                })
                }
        })
        .catch((err)=>alert(`Ocurrio un error ${err}`))
    }
}
export const addPets=function(info){
    return function(dispatch){
        return fetch(`http://localhost:3001/pets`,{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(info)
        })
        .then((descarga)=>descarga.json())
        .then((respuesta)=>{
            if(respuesta.status===true){
                Swal.fire({
                    icon: "success",
                    title: respuesta.message,
                    showConfirmButton: true,
                    heightAuto: false,
                    timer: 3000,
                  });
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

export const deletePets=function(info){
    console.log("entrando a la actioncon:",info)
    return function(dispatch){
        return fetch(`http://localhost:3001/pets`,{
            method:"DELETE",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(info)
        })
        .then((descarga)=>descarga.json())
        .then((respuesta)=>{            
            if(respuesta.status===true){
                console.log("despachando")
                dispatch({
                    type:DELETE,
                    payload:info
                });
                Swal.fire({
                    icon: "success",
                    title: respuesta.message,
                    showConfirmButton: true,
                    heightAuto: false,
                    timer: 3000,
                  });
                  
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

export function deleteToken(){
    localStorage.setItem('token',"")
    return{
        type:LOGOUT,        
    }
}