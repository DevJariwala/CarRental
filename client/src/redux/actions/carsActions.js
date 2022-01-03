import * as api from '../../api/index'
import { ADD_CAR, GET_ALL_CARS, LOADING } from "../../constants/actionType"


export const addCar = (carData) => async(dispatch)=>{
    try {
        const {data} = await api.addCar(carData)
        console.log("in frontend Car data is ",data);
        dispatch({type:ADD_CAR,payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const getAllCars = ()=> async(dispatch)=>{
    dispatch({type:LOADING,payload:true})

    try {
        const {data} = await api.getCars()
        console.log("Data is frontend ",data);
        dispatch({type:GET_ALL_CARS,payload:data})
        dispatch({type:LOADING,payload:false})
        return data;
        
    } catch (error) {
        console.log(error);
        // dispatch({type:LOADING,payload:false})
    }
}

export const deletecar = (car_id) => async(dispatch)=>{
    try {
        const {data} = await api.deleteCar(car_id)
        console.log("Cars after deleting",data);
        dispatch({type:GET_ALL_CARS,payload:data})
    } catch (error) {
        console.log(error);
    }
}