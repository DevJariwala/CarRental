import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import userRoutes from './routes/users.js'
import carRoutes from './routes/cars.js'
import bookCarRoutes from './routes/bookingCar.js'

const app = express()
const PORT = process.env.PORT || 5000
const CONNECTION_URL = 'mongodb+srv://DevJariwala:2MIHCr2H30Vw9ccN@cluster0.2vwit.mongodb.net/Car-Rental'

// for request
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


app.use('/user',userRoutes)
app.use('/car',carRoutes)
app.use('/bookingcar',bookCarRoutes)

app.get('/',(req,res)=>{
    res.send("Hello this is backend")
})

// app.listen(PORT,()=>console.log(`Server is listening on ${PORT}`))

// connect to the monodb database
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server is listening on Port: http://localhost:${PORT}`)))
.catch((error)=>console.log(`${error} did not connect`))
