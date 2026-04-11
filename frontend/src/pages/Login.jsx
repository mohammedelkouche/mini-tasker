import { Link, Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { authAction } from "../store/auth";
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {

  const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  const history = useNavigate();

  const [Data , setData] = useState({ username:"", password:"" });
  
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  if (isloggedIn === true) {
    return <Navigate to="/" replace />;
    // history("/");
  }

  const change = (e) => {
    setError("");
    setData({...Data , [e.target.name] : e.target.value});
  }

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        setError("Please fill all the fields");
        return;
      }
      else
      {
        const responce =  await axios.post("http://localhost:5000/api/v1/log-in" , Data);
        // is i have to empty the data after submiting the form
        setData({ username:"", password:"" });
        localStorage.setItem("id", responce.data.id);
        localStorage.setItem("token", responce.data.token);
        dispatch(authAction.login());
        // dispatch(autAction.login({id: responce.data.id, token: responce.data.token}));
        history("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  }


  return (
    <div className=' h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div className='text-2xl font-semibold'>LogIn</div>
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
          type="passworld"
          placeholder='passworld'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          name='password'
          onChange={change}
          value={Data.password}
       />
        <div className='w-full flex items-center justify-between'>
          <button className='bg-blue-400 text-xl  font-semibold text-black px-3 py-2 rounded' onClick={submit}>
          Login
          </button>
          <Link to="/signup" className='text-gray-400 hover:text-gray-200'>
            not having un account? SingUp here
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Login