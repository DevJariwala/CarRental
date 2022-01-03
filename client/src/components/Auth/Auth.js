import React,{useState} from 'react'
import {TextField} from '@material-ui/core'
import './Auth.css'
import { useHistory } from 'react-router'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { signin, signup } from '../../redux/actions/auth'

const initial_form = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
}

function Auth() {

    const [isSignUp, setisSignUp] = useState(true)
    const [formData, setFormData] = useState(initial_form)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSwitch = ()=>{
        if(isSignUp===true){
            setisSignUp(false)
        }else{
            setisSignUp(true)
        }
    }

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
    
        if(isSignUp){
            if(formData.password!==formData.confirmPassword){
                alert("Password is not matching")
            }else{
                console.log(formData);
                dispatch(signup(formData,history))
                // dispatch(signup(formData,history))
                setFormData(initial_form)
            }
        }else{
            console.log(formData);
            dispatch(signin(formData,history))
            // dispatch(signin(formData,history))
            setFormData(initial_form)
        }   
    }

    return (
        <div className="auth">
            <h3 className="auth__head">{isSignUp?'Sign Up':'Sign In'}</h3>
            <form className="auth__form" onSubmit={handleSubmit}>
                <div className="auth__details">
                    {
                        isSignUp && 
                        <div className="auth__name">
                            <TextField 
                                style={{margin:"20px 20px 10px 20px"}}
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                autoFocus
                                xs={6}
                                required
                                variant="outlined"
                            />
                            <TextField 
                                style={{margin:"20px 20px 10px 20px"}}
                                name="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                autoFocus
                                xs={6}
                                required
                                variant="outlined"
                            />
                        </div>
                        
                    }
                    <TextField 
                        style={{margin:"10px",width:"81%"}}
                        name="email"
                        label="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        variant="outlined"
                        required
                    />
                    <TextField 
                        style={{margin:"10px",width:"81%"}}
                        name="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        variant="outlined"
                        xs={12}
                        required
                    />
                    {
                        isSignUp && 
                        <TextField 
                            style={{margin:"10px",width:"81%"}}
                            name="confirmPassword"
                            label="Repeat Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            variant="outlined"
                            xs={12}
                            required
                        />
                    }
                </div>
            
                <button className="auth__btn" type="submit">
                    {
                        isSignUp?'Sign Up':'Sign In'
                    }
                </button>

                <div className="auth__switch">
                    <p className="auth__switchBtn" onClick={handleSwitch}>
                        {
                            isSignUp?'Already have an account? Sign In':"Don't have an account? Sign Up"
                        }
                    </p>
                </div>
                
            </form>
        </div>
    )
}

export default Auth
