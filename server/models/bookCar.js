import mongoose from 'mongoose'

const bookCarSchema = mongoose.Schema({
    car_id:{type:String,required:true},
    user_id:{type:String,required:true},
    totalHours:{type:Number,required:true},
    totalAmout:{type:Number,required:true},
    driverRequire:{type:Boolean,required:true},
    bookedTimeSlot:{
        from:{type:String,required:true},
        to:{type:String,required:true}
    },
    transactionId:{type:String},
    // added
    car_name:{type:String,required:true},
    rentPerHour:{type:Number,required:true},
    image:{type:String,required:true}
},{timestamps:true})

export default mongoose.model("BookCar",bookCarSchema)