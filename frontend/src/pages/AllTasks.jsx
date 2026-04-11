import React, { useState, useEffect } from 'react'
import Card from '../components/Home/Card'
import { IoMdAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [data, setData] = useState(null);

  const headers = {
    id : localStorage.getItem("id"),
    Authorization : `Bearer ${localStorage.getItem("token")}`
  }


  useEffect(() => {
    const fetch = async () => {
      try {
        const responce = await axios.get("http://localhost:5000/api/v2/get-all-tasks"
          , 
          { headers }
      );
      setData(responce.data.data);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetch();
   }, []
  );

  console.log("data = ", data);

  return (
    <>
      <div> 
        <div className='w-full flex  justify-end px-4 py-2'>
          <button onClick={() => setInputDiv("fixed")}> 
            <IoMdAddCircle  className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' />
          </button>
        </div>
        {data && 
        (
         < Card home={true} setInputDiv={setInputDiv}  data={data.tasks} />
        )}
      </div>
      < InputData  inputDiv={inputDiv} setInputDiv={setInputDiv}/>
    </>
  )
}

export default AllTasks