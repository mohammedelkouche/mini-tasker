import React, { useState } from 'react'
import Card from '../components/Home/Card'
import { IoMdAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';


const AllTasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  return (
    <>
      <div> 
        <div className='w-full flex  justify-end px-4 py-2'>
          <button onClick={() => setInputDiv("fixed")}> 
            <IoMdAddCircle  className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' />
          </button>
        </div>
        < Card home={true} setInputDiv={setInputDiv} />
      </div>
      < InputData  inputDiv={inputDiv} setInputDiv={setInputDiv}/>
    </>
  )
}

export default AllTasks