import { MY_BOOKINGS } from "../../constants/actionType";

const initialState = {
    myBookings:[],
}

const bookingReducer = (state=initialState,action)=>{
    switch (action.type) {
        case MY_BOOKINGS:
            console.log("Here in reducer",action.payload);
            return {...state,myBookings:action.payload}
        default:
            return state
    }
}

export default bookingReducer;