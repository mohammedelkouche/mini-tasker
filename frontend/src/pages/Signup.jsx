import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {

  const [Data , setData] = useState({ username:"", email:"", password:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const change = (e) => {
    setError("");
    setData({...Data , [e.target.name] : e.target.value});
  }

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        setError("Please fill all the fields");
        return;
      }
      else
      {
        const responce =  await axios.post("http://localhost:5000/api/v1/sign-in" , Data);
        console.log(responce);
        // is i have to empty the data after submiting the form
        setData({ username:"", email:"", password:"" });
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className=' h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div className='text-2xl font-semibold'>Signup</div>
        {error && <div className='bg-red-500 text-white px-3 py-2 rounded my-2'>{error}</div>}
        <input 
          type="username"
          placeholder='username'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          name='username'
          onChange={change}
          value={Data.username}
        />
        <input 
          type="email"
          placeholder='email'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          name='email'
          required
          onChange={change}
          value={Data.email}
        />
        <input 
          type="passworld"
          placeholder='password'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          name='password'
          onChange={change}
          value={Data.password}
       />
       <div className='w-full flex items-center justify-between'>
          <button className='bg-blue-400 text-xl  font-semibold text-black px-3 py-2 rounded' 
            onClick={submit}
          >
          SignUp
          </button>
          <Link to="/login" className='text-gray-400 hover:text-gray-200'>
            Already having un account? Login here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup