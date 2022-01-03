import * as api from '../../api/index'
import { AUTH } from '../../constants/actionType';

export const signup = (formData,history)=>async(dispatch)=>{
    try {
        console.log("Form data is ",formData);
        const {data} = await api.signup(formData);
        console.log("data is ->",data);
        if(data==="User alreay exist"){
            alert('User Already Exist with Same Email Id')
        }else{
            console.log("Data is ",data);
            dispatch({type:AUTH,payload:data})
            history.push('/')
        }

    } catch (error) {
        alert(error.message)
        console.log(error);
    }
}

export const signin = (formData,history) => async(dispatch)=>{
    try {
        const {data} = await api.signin(formData)
        if(data==="User doesn't exist"){
            alert("User doesn't exist")
        }else if(data==="Invalid Credentials"){
            alert("Invalid Credentials")
        }else{
            console.log("Sign in Data",data);
            dispatch({type:AUTH,payload:data})
            history.push('/')
        }
    } catch (error) {
        console.log(error);
    }
}