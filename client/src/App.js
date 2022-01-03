import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import BookingCar from './pages/BookingCar';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Form from './components/Form/Form';
import UserBookings from './pages/UserBookings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/bookingcar/:car_id' exact>
              <BookingCar />
            </Route>
            <Route path='/addcar' exact>
              <Form />
            </Route>
            <Route path='/userBooking' exact>
              <UserBookings />
            </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
