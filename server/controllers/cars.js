import Car from "../models/car.js";
import mongoose from 'mongoose'

export const addCar = async(req,res)=>{
    const {name,image,capacity,fuelType,bookedTimeSlotes,rentPerHour,user_id} = req.body
    
    try {
        const newCar = new Car({name,image,capacity,fuelType,bookedTimeSlotes,rentPerHour,user_id})
        await newCar.save()
        // console.log("New car is ",newCar);
        res.status(201).json(newCar)
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'Something went Wrong'})
    }
}

export const getCars = async(req,res)=>{
    try {
        const allCars = await Car.find();
        res.status(200).json(allCars)
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
}

export const deleteCar = async(req,res)=>{
    try {
        const {car_id}=req.params
        if(!mongoose.Types.ObjectId.isValid(car_id)) return res.status(404).send(`No post with id: ${post_id}`)
        await Car.findByIdAndDelete(car_id)
        const allCars = await Car.find();
        res.status(200).json(allCars)
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
}