import {GETPETS, LOGIN,LOGOUT,DELETE} from './Actions'

const initialState={  
    loged:false,
    user:[],
    pets:[]

}

const RootReducer=(state=initialState,action)=>{
    switch(action.type){    
        case DELETE:
            var mantener=state.pets.filter(p=>p.id!==action.payload.id)
            return{
                ...state,
                pets:mantener
            }
        case LOGIN:
            return{
            ...state,
            loged:true,
            user:action.payload
            } 
        case LOGOUT:
            return{
                ...state,
                loged:false,
                user:[]
            } 
        case GETPETS:
            return{
                ...state,
                pets:action.payload
            }
        default: return state;
    }
}
export default RootReducer