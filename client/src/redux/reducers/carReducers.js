import { ADD_CAR, GET_ALL_CARS } from "../../constants/actionType";

const initialState = {
    cars:[],
};

const carsReducer = (state=initialState,action)=>{
    switch (action.type) {
        case ADD_CAR:
            const oldCars = state.cars  
            console.log("before adding",oldCars.length);
            oldCars.push(action.payload)
            console.log("After adding",oldCars.length);
            return {...state,cars:oldCars};
        case GET_ALL_CARS:
            // console.log("ALL car in reducer is ",action.payload);
            return {...state,cars:action.payload};
        default:
            return state;
    }
}

export default carsReducer;