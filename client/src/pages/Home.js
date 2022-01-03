import React,{useState,useEffect} from 'react'
import Nav from '../components/Nav/Nav'
import {useSelector,useDispatch} from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import CarInfo from '../components/CarInfo/CarInfo'
import {CircularProgress} from '@material-ui/core'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'
import moment from 'moment'

function Home() {
    
    const [loading, setLoading] = useState(useSelector(state => state.alertsReducer.loading))
    // const [loading, setLoading] = useState(true)
    const [value, onChange] = useState([new Date(), new Date()]);
    const dispatch = useDispatch()
    const cars = useSelector(state=>state.carsReducer.cars)
    const [totalCars, setTotalCars] = useState(cars)
    
    console.log(cars);

    const carsTemp=[
        {
            name:'tata',
            image:'',
            capacity:'120',
            fuelType:'Petrol',
            bookedTimeSlots:{
                from:'2:00 PM',
                to:'3:00 PM'
            },
            rentPerHour:'400 Rs'
        },
        {
            name:'ferari',
            image:'',
            capacity:'120',
            fuelType:'Petrol',
            bookedTimeSlots:{
                from:'2:00 PM',
                to:'3:00 PM'
            },
            rentPerHour:'400 Rs'
        },
        {
            name:'mahindra',
            image:'',
            capacity:'120',
            fuelType:'Petrol',
            bookedTimeSlots:{
                from:'2:00 PM',
                to:'3:00 PM'
            },
            rentPerHour:'400 Rs'
        },
        {
            name:'BMW',
            image:'',
            capacity:'120',
            fuelType:'Petrol',
            bookedTimeSlots:{
                from:'2:00 PM',
                to:'3:00 PM'
            },
            rentPerHour:'400 Rs'
        },
        {
            name:'Mercedes',
            image:'',
            capacity:'120',
            fuelType:'Petrol',
            bookedTimeSlots:{
                from:'2:00 PM',
                to:'3:00 PM'
            },
            rentPerHour:'400 Rs'
        },
        {
            name:'Jaguar',
            image:'',
            capacity:'120',
            fuelType:'Petrol',
            bookedTimeSlots:{
                from:'2:00 PM',
                to:'3:00 PM'
            },
            rentPerHour:'400 Rs'
        },
    ]

    const setFilter=(value)=>{
        var selectedFrom = moment(value[0] , 'DD/MM/YYYY HH:mm:ss')
        var selectedTo = moment(value[1] , 'DD/MM/YYYY HH:mm:ss')
        var temp=[]
        for(var car of cars){
            if(car.bookedTimeSlots.length===0){
                temp.push(car)
            }else{
                for(var booking of car.bookedTimeSlots){
                    
                    if(selectedFrom.isBetween(moment(booking.from,'DD/MM/YYYY HH:mm:ss') ,moment(booking.to  ,'DD/MM/YYYY HH:mm:ss')) ||
                       selectedTo.isBetween(moment(booking.from,'DD/MM/YYYY HH:mm:ss') , moment(booking.to  ,'DD/MM/YYYY HH:mm:ss')) || 
                       moment(booking.from,'DD/MM/YYYY HH:mm:ss').isBetween(selectedFrom , selectedTo) ||
                       moment(booking.to  ,'DD/MM/YYYY HH:mm:ss').isBetween(selectedFrom , selectedTo)
                       )
                       {
                        console.log("Between");
                        console.log(selectedFrom)
                        console.log(selectedTo);
                        console.log(moment(booking.from,'DD/MM/YYYY HH:mm:ss'));
                        console.log(moment(booking.to  ,'DD/MM/YYYY HH:mm:ss'));
                       }
                       else{
                           temp.push(car)
                       }
                }
            }
        }
        console.log("Temp si ",temp);
        setTotalCars(temp)
    }
    
    useEffect(() => {
        console.log("I am dispatching");
        dispatch(getAllCars())
    }, [])

    useEffect(() => {
        setTotalCars(cars)
    }, [cars])

    return (
        <div className='home' style={{minHeight:'100vh'}}>
            <Nav />
            <div style={{marginTop:'20px',marginLeft:'10px',textAlign:'left'}}>
                <DateTimeRangePicker
                    onChange={setFilter}
                    value={value}
                />
            </div>
            {
                loading===true?(
                    <CircularProgress style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}} />
                ):(
                    <div style={{display:'flex',flexWrap:'wrap',padding:'20px',justifyContent:'center'}}>
                        {
                            totalCars.map((car,index)=>(
                            
                                <CarInfo key={index} carInfo={car} />
                                
                            ))
                        }
                    </div>
                )
            }
            
        </div>
    )
}

export default Home
