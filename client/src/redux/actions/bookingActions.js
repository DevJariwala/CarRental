import * as api from '../../api/index'
import { LOADING, MY_BOOKINGS } from '../../constants/actionType';

export const bookCar = (data)=>async(dispatch)=>{
    dispatch({type:LOADING,payload:true})
    try {
        const response = await api.bookcar(data)
        console.log("data is ",response.data);
        dispatch({type:LOADING,payload:false})
        alert("Your car is booked successfully")
    } catch (error) {
        console.log(error);
        alert("Something went wrong")
    }
}

export const myBookings = (user_id)=> async(dispatch)=>{
    try {
        console.log("User id is ",user_id);
        const response = await api.myBookings(user_id)
        console.log("My booking is ",response.data);
        dispatch({type:MY_BOOKINGS,payload:response.data})
        return response.data
    } catch (error) {
        console.log(error);
        alert("Something went Wrong")
    }
}