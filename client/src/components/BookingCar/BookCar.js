import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllCars } from '../../redux/actions/carsActions';
import './BookCar.css'
import moment from 'moment'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import {Checkbox} from '@material-ui/core'
import { bookCar } from '../../redux/actions/bookingActions';
import {CircularProgress} from '@material-ui/core'
import StripeCheckout from 'react-stripe-checkout'
import CloseIcon from '@material-ui/icons/Close'

const initialData={
    user_id:'',
    car_id:'',
    totalHours:'',
    totalAmout:'',
    driverRequire:'',
    bookedTimeSlot:{},
    token:{},
    car_name:'',
    rentPerHour:0,
    image:''
}

function BookCar() {

    const history = useHistory()
    const [value, onChange] = useState([new Date(), new Date()]);
    // const [circularBar, setCircularBar] = useState()
    const [loading, setLoading] = useState(useSelector((state)=>state.alertsReducer.loading))
    const [driverRequir, setDriverRequir] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [showModel, setShowModel] = useState(false)
    console.log("User is ",user);
    

    console.log(value);
    const from = moment(value[0]).format('DD/MM/YYYY HH:mm:ss')
    const to = moment(value[1]).format('DD/MM/YYYY HH:mm:ss')
    var ms = moment(from,"DD/MM/YYYY HH:mm:ss").to(moment(to,"DD/MM/YYYY HH:mm:ss"));
    // console.log(from);
    // console.log(to);
    console.log(ms);
    var time=''
    var day_hour=''
    var space=false
    for(let i=3;i<ms.length;i++){
        if(ms[i]===' '){
            space=true;
            continue;
        }
        if(space===false){
            time+=ms[i];
        }else{
            day_hour+=ms[i];
        }
    }
    if(day_hour==='day' || day_hour==='hour'){
        time=1
    }
    console.log("time is ",time);
    console.log("day hour is ",day_hour);
    

    const {car_id} = useParams()
    const dispatch = useDispatch()
    console.log(car_id);
    const car_details = useSelector((state)=>car_id?state.carsReducer.cars.find((car)=>car._id===car_id):null)
    
    const handleOnClick=()=>{
        if(driverRequir===true){
            setDriverRequir(false)
        }else{
            setDriverRequir(true)
        }
    }

    const onToken = (token)=>{
        // console.log(token);
        var totalHour=(day_hour==='days'||day_hour==='day')?(parseInt(time)*24):(parseInt(time))
        var totalAmount=(day_hour==='hours'||day_hour==='hour')?(parseInt(time)*car_details?.rentPerHour):(parseInt(time)*car_details?.rentPerHour*24)
        var driverRequires=driverRequir
        var bookedTimeSlot={
            from:from,to:to
        }
        if(driverRequir){
            totalAmount=totalAmount+parseInt(time)*30
        }
        console.log('Button Clicked');
       
        if(totalAmount>0 && user!=null){
            initialData.user_id=user?.user?._id
            initialData.car_id=car_id
            initialData.totalHours=totalHour
            initialData.totalAmout=totalAmount
            initialData.driverRequire=driverRequires
            initialData.bookedTimeSlot=bookedTimeSlot
            initialData.token=token
            initialData.car_name=car_details.name
            initialData.rentPerHour=car_details.rentPerHour
            initialData.image=car_details.image
            console.log(initialData);

            dispatch(bookCar(initialData))

        }
    }

    const handleBookCar=(e)=>{
        e.preventDefault()
        // user:
        // car:car_id
        var totalHour=(day_hour==='days'||day_hour==='day')?(parseInt(time)*24):(parseInt(time))
        var totalAmount=(day_hour==='hours'||day_hour==='hour')?(parseInt(time)*car_details?.rentPerHour):(parseInt(time)*car_details?.rentPerHour*24)
        var driverRequires=driverRequir
        var bookedTimeSlot={
            from:from,to:to
        }
        if(driverRequir){
            totalAmount=totalAmount+parseInt(time)*30
        }
        console.log('Button Clicked');
        if(user===null){
            alert("Please Login or Sign Up to book the car")
        }
        if(totalAmount>0 && user!=null){
            initialData.user_id=user?.user?._id
            initialData.car_id=car_id
            initialData.totalHours=totalHour
            initialData.totalAmout=totalAmount
            initialData.driverRequire=driverRequires
            initialData.bookedTimeSlot=bookedTimeSlot
            console.log(initialData);

            dispatch(bookCar(initialData))

        }
    }

    useEffect(() => {
        dispatch(getAllCars())
    }, [])


    // console.log(car_details);
    return (

        <div className='bookcar'>
            {
                loading===true &&
                <div style={{height:'100%',width:'100%',zIndex:'4',position:'absolute',alignItems:'center',justifyContent:'center'}}>
                    <CircularProgress />
                </div>
            }
            <div className="bookcar__image">
                <img className='car__image' src={car_details?.image} alt="carImage"/>
            </div>
            <div className="bookcar__details">
                <p className='bookcar__header'>Car Details</p>
                <div className='bookcar__det' style={{borderBottom:'2px solid grey',width:'100%'}}>
                    <p>Car Name: {car_details?.name}</p>
                    <p>Fuel Type: {car_details?.fuelType}</p>
                    <p>Max Person: {car_details?.capacity}</p>
                    <p>{car_details?.rentPerHour} Rent Per Hour /-</p>
                </div>
                
                <p className='bookcar__header'>Select Time Sloat</p>
                <div>
                
                    <DateTimeRangePicker
                        onChange={onChange}
                        value={value}
                    
                    />
                    <br />
                    <button className='bookcar__bnt' onClick={()=>setShowModel(true)}>See Booked Time Slots</button>
                    { 
                    
                    (((day_hour==='hours'||day_hour==='hour' || day_hour==='days' || day_hour==='day')&&user!=null)) &&
                        <div className='bookcar__det' style={{width:'100%',marginTop:'20px'}}>
                            {
                                (day_hour==='hours'||day_hour==='hour') &&  <p>Total Hour: <strong>{time}</strong> </p>
                            }
                            {
                                (day_hour==='days' || day_hour==='day') && <p>Total Hour: <strong>{parseInt(time)*24}</strong></p>
                            }
                            <p>Rent Per Hour: <strong>{car_details?.rentPerHour}</strong></p>
                            
                            {
                                (day_hour==='hours'||day_hour==='hour'||day_hour==='days'||day_hour==='day') && <p>Total Amount: {time!==''&&(day_hour==='hours'||day_hour==='hour')?(<strong>{parseInt(time)*car_details?.rentPerHour}</strong>):(<strong>{parseInt(time)*car_details?.rentPerHour*24}</strong>)}</p>
                            
                            }
                            {
                                (driverRequir && (day_hour==='hours'||day_hour==='hour'||day_hour==='days'||day_hour==='day')) && 
                                <p>Total Amount With Driver: {time!==''&&(day_hour==='hours'||day_hour==='hour')?(<strong>{parseInt(time)*car_details?.rentPerHour+parseInt(time)*30}</strong>):(<strong>{parseInt(time)*car_details?.rentPerHour*24+parseInt(time)*30}</strong>)}</p>
                            }
                            <div style={{display:'flex',alignItems:'center',marginTop:'-10px'}}>
                                <span><Checkbox onClick={()=>handleOnClick()} /></span>
                                <p>Driver Require: </p>
                            </div>
                            
                            <StripeCheckout
                                shippingAddress
                                token={onToken}
                                currency='INR'
                                amount={time!==''&&(day_hour==='hours'||day_hour==='hour')?((parseInt(time)*car_details?.rentPerHour+parseInt(time)*30)*100):((parseInt(time)*car_details?.rentPerHour*24+parseInt(time)*30))*100}
                                stripeKey='pk_test_51JLSIQSIS3yDsbSRepElQLHblFMwQEXgiC38RHAhhNLW0ieea875WIyuBPs0KsHDdfu25gU24EupLm8xquZFjUGZ00ItlxCMFn'
                            >
                                
                                <button className='bookcar__bnt'>Book Car</button>
                                
                                {/* <button onClick={(e)=>handleBookCar(e)}>Book Car</button> */}
                            </StripeCheckout>
                        </div>
                    }
                    {
                        
                        user==null&&(<button className='bookcar__bnt' style={{marginLeft:'10px'}} onClick={()=>history.push('/login')}>Login to Book Car</button>)
                    }
                    
                </div>
                
            </div>
            <div style={{display:`${showModel===true?'':'none'}`,position:'absolute',top:'20vh',zIndex:'10',backgroundColor:'white',width:'80%',margin:'auto',borderRadius:'10px'}}>
                {/* <button style={{position:'absolute',right:'0'}} onClick={()=>setShowModel(false)}>close</button> */}
                <CloseIcon style={{position:'absolute',right:'10',top:'5px',cursor:'pointer'}} onClick={()=>setShowModel(false)} />
                <h1>Booked Time Slots</h1>
                {car_details?(
                    <div>
                        {
                            car_details.bookedTimeSlots.map((slot)=>(
                                <li style={{marginBottom:'5px'}}>{slot.from} - {slot.to}</li>
                            ))
                        }
                        {
                            car_details.bookedTimeSlots.length===0 && <p>Car is available</p>
                        }
                    </div>
                ):(
                    <p>No Time Slots</p>
                )}
                
            </div>
        </div>
    )
}

export default BookCar
