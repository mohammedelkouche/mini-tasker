import React from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
// import { useState } from 'react';

const Card = ({ home , setInputDiv}) => {  // Destructure correctly
  console.log( 'HOME -> ', home);
  const data = [
    {
      title: "The best coding channel",
      desc: "I have to create my channel",
      status : "In Complete"
    },
    {
      title: "Important tasks",
      desc: "lalalal",
      status : "Complete"
    },
    {
      title: "Completed tasks",
      desc: "hello" ,
      status : "In Complete"
    },
    {
      title: "Incomplete tasks",
      desc: "test" ,
      status : "In Complete"
    },
  ];

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {data.map((item, i) => (
        <div key={i} className=' flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
          <div >  
            <h3 className='text-xl font-semibold'>{item.title}</h3> 
            <p className='text-gray-300 my-2'>{item.desc}</p> 
          </div>
          <div className='mt-4 w-full flex items-center'>
            <button className= {` ${item.status === "In Complete" ?  "bg-red-400" : "bg-green-700" } p-2 rounded w-3/6 `}> {item.status} </button>
            <div className='text-white  p-2 w-3/6 text-2xl font-semibold flex justify-around'>
              <button> <CiHeart /> </button>
              <button> <FaEdit /> </button>
              <button> <MdDelete /> </button>
            </div>
          </div>
        </div>
      ))}
      {home && (
        <button className=' flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover: cursor-pointer transition-all duration-300' onClick={ ()=> setInputDiv("fixed")}>
          <IoMdAddCircle  className='text-5xl '/>
          <h2 className='text-2xl mt-4'>Add Task</h2>
        </button> 
      )}
    </div>
  );
}

export default Card;