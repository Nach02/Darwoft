import {LOGIN,LOGOUT} from './Actions'

const initialState={  
    Loged:false,
    user:[]

}

const RootReducer=(state=initialState,action)=>{
    switch(action.type){         
        case LOGIN:
            return{
            ...state,
            Loged:true,
            user:[action.payload]
            } 
        case LOGOUT:
            return{
                ...state,
                Loged:false,
                user:[]
            } 
        
        default: return state;
    }
}
export default RootReducer