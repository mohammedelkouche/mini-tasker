import React, { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios';
// import { useState } from 'react';

const Card = ({ home , setInputDiv, data = []}) => {  // Destructure correctly
  console.log( 'HOME -> ', home);
  // const data = [
  //   {
  //     title: "The best coding channel",
  //     desc: "I have to create my channel",
  //     status : "In Complete"
  //   },
  //   {
  //     title: "Important tasks",
  //     desc: "lalalal",
  //     status : "Complete"
  //   },
  //   {
  //     title: "Completed tasks",
  //     desc: "hello" ,
  //     status : "In Complete"
  //   },
  //   {
  //     title: "Incomplete tasks",
  //     desc: "test" ,
  //     status : "In Complete"
  //   },
  // ];

  const headers = {
    id : localStorage.getItem("id"),
    Authorization : `Bearer ${localStorage.getItem("token")}`
  }

  const [tasks, setTasks] = useState(data);
  const [updatingTaskIds, setUpdatingTaskIds] = useState([]);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const handleCompletedTask = async (id) => {
      const task = tasks.find((item) => item._id === id);
      if (!task || updatingTaskIds.includes(id)) return;

      const previousCompleteValue = task.complete;
      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === id ? 
            { ...item, complete: !item.complete } 
            : item
        )
      );
      setUpdatingTaskIds((prevIds) => [...prevIds, id]);

      // Make an API call to update the task's completion status
      try {
        const responce =  await axios.put(
          `http://localhost:5000/api/v2/update-complete-task/${id}`,
          {},
          { headers }
        );
        console.log(" responce of compteted = ", responce);
      } catch (error) {
        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            item._id === id ? 
              { ...item, complete: previousCompleteValue }
              : item
          )
        );
        console.error("Error updating task completion status:", error);
      } finally {
        setUpdatingTaskIds((prevIds) => prevIds.filter((taskId) => taskId !== id));
      }
  }

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {tasks.map((item, i) => (
        <div key={i} className=' flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
          <div >  
            <h3 className='text-xl font-semibold'>{item.title}</h3> 
            <p className='text-gray-300 my-2'>{item.desc}</p> 
          </div>
          <div className='mt-4 w-full flex items-center'>
            <button 
              className= {` ${item.complete ?  "bg-green-700" : "bg-red-400" } p-2 rounded w-3/6 ${updatingTaskIds.includes(item._id) ? "opacity-70" : ""} `}
              onClick={() => handleCompletedTask(item._id)}
              disabled={updatingTaskIds.includes(item._id)}
            > 
              {item.complete ? "Completed" : "InCompleted"}
            </button>
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