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
      setError(error.response?.data?.message || "Login failed");
    }
  }


  return (
    <div className=' h-[98vh] flex items-center justify-center'>
      <div className='p-8 w-11/12 sm:w-4/6 lg:w-2/6 rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl'>
        <div className='text-3xl font-bold mb-2'>LogIn</div>
        {error && <div className='bg-red-500 text-white px-3 py-2 rounded-lg my-2 text-sm'>{error}</div>}
        <input 
          type="text"
          placeholder='username'
          className='bg-gray-700 px-4 py-2.5 my-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'
          name='username'
          onChange={change}
          value={Data.username}
        />
        <input 
          type="password"
          placeholder='password'
          className='bg-gray-700 px-4 py-2.5 my-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'
          name='password'
          onChange={change}
          value={Data.password}
       />
        <div className='w-full flex items-center justify-between'>
          <button className='bg-blue-400 hover:bg-blue-300 text-lg font-semibold text-black px-5 py-2 rounded-lg shadow transition-colors duration-200' onClick={submit}>
          Login
          </button>
          <Link to="/signup" className='text-sm text-gray-400 hover:text-gray-200 transition-colors'>
            not having un account? SingUp here
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Login