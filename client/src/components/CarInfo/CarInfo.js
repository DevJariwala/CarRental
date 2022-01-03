import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import DeleteIcon from '@material-ui/icons/Delete'
import './CarInfo.css'
import { deletecar } from '../../redux/actions/carsActions'
import {useDispatch} from 'react-redux'

function CarInfo({carInfo}) {

    const history = useHistory();
    const dispatch=useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const handleDelete = ()=>{
        console.log("Clicked on Delete");
        dispatch(deletecar(carInfo?._id))
    }

    return (
        <div className='car'>
            <img className='carimg' style={{height:'180px',width:'auto',maxWidth:'300px',borderRadius:'5px'}} src={carInfo.image} alt="carImage" />
            <div  className='car__info'>
                <div className='car__info1'>
                    <p style={{fontWeight:'bold',textTransform:'uppercase'}}>{carInfo?.name}</p>
                    <p>{carInfo?.rentPerHour} Rs Rent Per Hour </p>
                </div>
                {
                    user?.user?._id===carInfo?.user_id &&
                    <DeleteIcon onClick={()=>handleDelete()} style={{position:'absolute',top:'0',right:'0',cursor:'pointer'}} />
                }
                <div className='car__info2'>
                    <p onClick={()=>history.push(`/bookingcar/${carInfo._id}`)}>Book Now</p>
                </div>
            </div>
        </div>
    )
}

export default CarInfo
