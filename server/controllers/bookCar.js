import BookCar from "../models/bookCar.js";
import Car from "../models/car.js";
import {createRequire} from 'module'
import {v4 as uuidv4} from 'uuid'
const require = createRequire(import.meta.url)
const stripe = require('stripe')('sk_test_51JLSIQSIS3yDsbSRWMIVzGEYxf1sbuQs8ysCzwJHSQY2NxmTGqAOfECmttFp3EsBXDYmfW70blbhqsdyNPxrnn3c00VjzjEjR2')

export const bookcar = async(req,res)=>{
    const {car_id,user_id,totalHours,totalAmout,driverRequire,bookedTimeSlot,token,car_name,rentPerHour,image}=req.body
    
    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
          });

        const payment = await stripe.charges.create({
            amount:totalAmout*100,
            currency:"INR",
            customer:customer.id,
            receipt_email:token.email
        },{
            idempotencyKey: uuidv4() //generate unique key like this: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
        })
        
        if(payment){
            const transactionId=payment.source.id
            const newbooking = new BookCar({car_id,user_id,totalHours,totalAmout,driverRequire,bookedTimeSlot,transactionId,car_name,rentPerHour,image})
            await newbooking.save()
            const car = await Car.findById(car_id)
            car.bookedTimeSlots.push(bookedTimeSlot)
            await car.save()
            // console.log(newbooking);
            // console.log(car);
            res.status(200).json(newbooking)
        }else{
            res.status(400).json(error)
        }

        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

export const getMyBookings = async(req,res)=>{
    const {user_id} = req.params;
    console.log("body is ",user_id) ;
    try {
        const finalCarDetail=[]
        const carDetails = await BookCar.find()
        // const cars =await Car.find()
        carDetails.map((car)=>{
            // console.log(car.user_id,user_id);
            if(car.user_id===user_id){
                finalCarDetail.push(car)
            }
        })
        // console.log("Final car details is ",finalCarDetail);
        res.status(200).send(finalCarDetail)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}