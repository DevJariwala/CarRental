import { AUTH, LOGOUT } from "../../constants/actionType";

const initialState = {
    authData:null
}

const authReducer = (state=initialState,action)=>{
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            console.log("in redux",localStorage.getItem('profile'));
            console.log("In redux data is ",action.payload);
            return {...state,authData:action.payload}
    
        case LOGOUT:
            localStorage.clear()
            console.log("I am logging out");
            return {...state,authData:null}
        default:
            return state;
    }
}

export default authReducer;