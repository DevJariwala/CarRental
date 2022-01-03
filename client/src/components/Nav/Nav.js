import React,{useState,useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import './Nav.css'
import { useDispatch } from 'react-redux';
import { GET_ALL_CARS, LOGOUT } from '../../constants/actionType';
import MenuIcon from '@material-ui/icons/Menu'
import { getAllCars } from '../../redux/actions/carsActions';

function Nav() {

    const history = useHistory();
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [display, setDisplay] = useState('none')
    const dispatch = useDispatch()

    const logout=()=>{
        console.log("I clicked ");
        dispatch({type:LOGOUT})
        setUser(null)
        dispatch(getAllCars())
        history.push('/')
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
        const token = user?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp*1000 < new Date().getTime()){
                logout()
                // if token expire, logout the user
            }
        }
    }, [location,user?.token])

    const handleDisplay=()=>{
        // console.log("CLicked");
        if(display=='none'){
            setDisplay('flex');
        }else{
            setDisplay('none')
        }
    }

    return (
        <div className='nav'>
            <p className='nav__name' onClick={()=>history.push('/')}>Car Rental</p>
            {
                user?(
                    <div className='nav__detail'>
                        <h3 style={{color:'white',letterSpacing:'2px',cursor:'pointer'}} onClick={()=>history.push('/')} >{user.user.name}</h3>
                        <MenuIcon style={{cursor:'pointer',margin:'0 10px'}} onClick={()=>handleDisplay()} />
                        <div className='nav_display' style={{display:`${display}`,position:'absolute',flexDirection:'column',right:'20px',top:'60px',zIndex:'20'}} >
                            <p onClick={logout}>Logout</p>
                            <p onClick={(e)=> history.push('/addcar')} >Add Car</p>
                            <p onClick={(e)=> history.push('/userBooking')}>Your Booking</p>
                        </div>
                        
                    </div>
                ):(
                    <div>
                    <p onClick={(e)=> history.push('/login')} className='nav__btn'>Login/SignUp</p>
                    </div>
                )
            }
            
        </div>
    )
}

export default Nav
