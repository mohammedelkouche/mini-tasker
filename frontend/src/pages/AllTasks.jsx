import React from 'react'
import Card from '../components/Home/Card'
import { IoMdAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';


const AllTasks = () => {
  return (
    <>
      <div> 
        <div className='w-full flex  justify-end px-4 py-2'>
          <button> <IoMdAddCircle  className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' /> </button>
        </div>
        {/* < Card home={"true"} /> */}
          < Card home={true} />
      </div>
      < InputData />
    </>
  )
}

export default AllTasks