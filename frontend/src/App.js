import React from 'react'
import Home from './pages/Home'
import AllTasks from './pages/AllTasks'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompletedTasks from './pages/IncompletedTasks'
// import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'


const App = () => {
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
      < BrowserRouter future={{ v7_startTransition: true }}>
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
      </BrowserRouter>
    </div>
  )
}

export default App

