import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:5000'})

export const getAllCars = ()=>API.get('/api/cars/getallcars')


export const signup = (formData) => API.post('./user/signup',formData)
export const signin = (formData) => API.post('./user/signin',formData)

export const addCar = (carData) => API.post('./car/addCar',carData)
export const getCars = () => API.get('./car/getCars')
export const deleteCar = (car_id) => API.patch(`./car/deleteCar/${car_id}`)

export const bookcar = (data) => API.post('/bookingcar/bookcar',data)
export const myBookings = (user_id) => API.post(`/bookingcar/myBookings/${user_id}`)