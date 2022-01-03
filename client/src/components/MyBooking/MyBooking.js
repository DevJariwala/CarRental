import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { myBookings } from '../../redux/actions/bookingActions';
import { getAllCars } from '../../redux/actions/carsActions';
import './MyBooking.css'

function MyBooking() {

    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [bookedCarDetails, setBookedCarDetails] = useState(useSelector((state)=>state.bookingReducer.myBookings))
    console.log("User is ",user);
    console.log("MY BOOKINGS",bookedCarDetails);
    const fetchBooking =async ()=>{
        const carDetails = await dispatch(myBookings(user.user._id))
        console.log(carDetails);
        setBookedCarDetails(carDetails)
    }
    useEffect(() => {
        if(user){
            dispatch(myBookings(user.user._id))
        }
    }, [])
    useEffect(() => {
        fetchBooking()
    }, [])

    return (
        <div className='myBookings'>
            {
                bookedCarDetails.length===0 && <h1>You haven't booked any car</h1>
            }
           {
               bookedCarDetails?.map((carDetails,idx)=>(
                <div key={idx} className='booking'>
                    <div className="image">
                        <img height='250px' width='350px' src={carDetails.image} alt="" srcset="" />
                        <h1>{carDetails.car_name}</h1>
                    </div>
                    {/* <div className='booking__details'> */}
                        <div className="carDetails1">
                            <p>Total Hours: {carDetails.totalHours}</p>
                            <p>Rent Per Hour: {carDetails.rentPerHour}</p>
                            <p>Total Amout: {carDetails.totalAmout}</p>
                            <p>From: {carDetails.bookedTimeSlot.from}</p>
                            <p>to:   {carDetails.bookedTimeSlot.to}</p>
                        </div>
                        {/* <div className="carDetails2">
                            <p>From: {carDetails.bookedTimeSlot.from}</p>
                            <p>to:   {carDetails.bookedTimeSlot.to}</p>
                            <p>TransactionId:{carDetails.transactionId}</p>
                        </div> */}
                    {/* </div> */}
                </div>
               ))
           }
        </div>
    )
}

export default MyBooking
