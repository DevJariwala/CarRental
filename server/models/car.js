import mongoose from 'mongoose'

const carShems = mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    capacity:{type:Number,required:true},
    fuelType:{type:String,required:true},
    bookedTimeSlots:[
        {
            from:{type:'String',required:true},
            to:{type:'String',required:true}
        }
    ],
    rentPerHour:{type:Number,required:true},
    user_id:{type:String,required:true},
},{timestamps:true})

export default mongoose.model('Car',carShems)