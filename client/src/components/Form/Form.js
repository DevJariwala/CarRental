import React,{useState,useEffect} from 'react'
import './Form.css'
import {TextField} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { addCar } from '../../redux/actions/carsActions'

const initialCarData = {
    name:'',
    image:'',
    capacity:'',
    fuelType:'',
    rentPerHour:'',
    bookedTimeSlots:[],
    user_id:''
}


function Form() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [carData, setCarData] = useState(initialCarData)
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleSubmit=(e)=>{
        e.preventDefault()

        console.log("Car data is ",carData);
        if(user!=null){
            carData.user_id=user.user._id
            dispatch(addCar(carData))    
        }    

        // // console.log("Post Data is ",postData);
        // if(post==null){
        //     dispatch(createPost(postData))
        //     dispatch(getPosts())
        // }else{
        //     dispatch(updatePost(post._id,postData))
        // }
        history.push('/')
    }

    const clear=(e)=>{
        e.preventDefault()
        setCarData(initialCarData)
    }

    return (
        <div className="form">
            <form className="form__data" autoComplete="off" noValidate onSubmit={handleSubmit}>
                <p className="form__heading">Add a Car</p>
                <TextField 
                    style={{width:"80%",maxWidth:'700px',marginTop:'10px'}}
                    name="name"
                    label="Car Name"
                    variant="outlined"
                    value={carData.name}
                    onChange={(e)=>setCarData({...carData,name:e.target.value})}
                />
                <TextField 
                    style={{width:"80%",maxWidth:'700px',marginTop:'10px'}}
                    name="capacity"
                    label="Capacity"
                    variant="outlined"
                    value={carData.capacity}
                    onChange={(e)=>setCarData({...carData,capacity:e.target.value})}
                />
                <TextField 
                    style={{width:"80%",maxWidth:'700px',margin:'10px 0'}}
                    name="fuelType"
                    label="Fuel Type"
                    variant="outlined"
                    value={carData.fuelType}
                    onChange={(e)=>setCarData({...carData,fuelType:e.target.value})}
                />
                <TextField 
                    style={{width:"80%",maxWidth:'700px',margin:'10px 0'}}
                    name="rentPerHour"
                    label="Rent Per Hour"
                    variant="outlined"
                    value={carData.rentPerHour}
                    onChange={(e)=>setCarData({...carData,rentPerHour:e.target.value})}
                />
                <FileBase 
                    type="file"
                    multipe={false}
                    onDone={({base64})=>setCarData({...carData,image:base64})}
                /> <br />

                <div className="buttons">
                    <button className="submitBtn" type="submit">Submit</button>
                    <button className="submitBtn" onClick={clear}>Clear</button>
                </div>
                
            </form>
        </div>
    )
}

export default Form
