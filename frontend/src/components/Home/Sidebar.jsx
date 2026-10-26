import React , { useEffect , useState}from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from "../../store/auth";
import axios from 'axios';

const Sidebar = () => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const [data, setData] = useState(null);

  const DATA = [
    {
      title : "All tasks",
      icon : <CgNotes/>,
      link : '/'
    },
    {
      title : "Important tasks",
      icon : <MdLabelImportant />,
      link : '/ImportantTasks'
    },
    {
      title : "Completed tasks",
      icon : <FaCheckDouble />,
      link : '/CompletedTasks'
    },
    {
      title : "Incomplered tasks",
      icon : <TbNotebookOff />,
      link : '/IncompletedTasks'
    },
  ]

  const logout = () => {
    dispatch( authAction.logout() );
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    history("/login");
  }

  const headers = {
    id : localStorage.getItem("id"),
    Authorization : `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const responce = await axios.get("http://localhost:5000/api/v1/profile"
          , 
          {
            headers
            // headers : 
            // {
            //   id : localStorage.getItem("id"),
            //   Authorization : `Bearer ${localStorage.getItem("token")}`
            // }
          }
      );
      console.log("response of profile = ", responce);
      setData(responce.data.user);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetch();
   }, []
  )

  return (
    <>
    {data &&
      <div className='pb-3'>
        <h2 className='text-xl font-semibold truncate'> {data.username}</h2>
        <h4 className='mb-3 text-sm text-gray-400 truncate'> {data.email} </h4>
        <hr className='border-gray-700' />
      </div>
    }
      <div className='flex flex-col gap-1 flex-1 py-2'>
        {DATA.map((items, i) => (
          <Link 
            to={items.link}
            key={i} 
            className='gap-3 flex items-center text-sm lg:text-base hover:bg-blue-600 hover:translate-x-1 px-3 py-2.5 rounded-lg transition-all duration-300'>
            {items.icon}  {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className='bg-gray-600 hover:bg-gray-500 w-full px-3 py-2.5 rounded-lg font-medium transition-colors duration-200' onClick={logout}> Log out</button>
      </div>
    </>
  )
}

export default Sidebar
