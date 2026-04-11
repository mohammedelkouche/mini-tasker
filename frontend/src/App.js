import React from 'react'
import Home from './pages/Home'
import AllTasks from './pages/AllTasks'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompletedTasks from './pages/IncompletedTasks'
// import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { authAction } from './store/auth.js'

const App = () => {
  const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  console.log("isloggedIn " , isloggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if( localStorage.getItem("token") && localStorage.getItem("id") )
    {
      dispatch(authAction.login());
    }
    else if (isloggedIn === false) {
        console.log("User is not logged in, navigating to login page.");
        navigate('/signup');
      }
  },[]);
  // },[isloggedIn, navigate]);
  

  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
      {/* < Router future={{ v7_startTransition: true }}> */}
        < Routes >
          < Route exact path='/' element={ <Home/> } > 
            < Route index element={ <AllTasks/>} />
            < Route path='/ImportantTasks'  element={ <ImportantTasks/>} />
            < Route path='/CompletedTasks'  element={ <CompletedTasks/>} />
            < Route path='/IncompletedTasks'  element={ <IncompletedTasks/>} />
          </ Route>
          < Route path='/signup' element={ <Signup /> } />
          < Route path='/login' element={ <Login /> } />
        </Routes>
      {/* </Router> */}
    </div>
  )
}

export default App

