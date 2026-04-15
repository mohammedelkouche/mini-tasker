import React, { useEffect, useState } from 'react'
// import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios';
// import { useState } from 'react';


const Card = ({ home , setInputDiv, data = [], setEditingTask, onTaskDeleted }) => {  // Destructure correctly
  const headers = {
    id : localStorage.getItem("id"),
    Authorization : `Bearer ${localStorage.getItem("token")}`
  }

  const [tasks, setTasks] = useState(data);
  const [updatingTaskIds, setUpdatingTaskIds] = useState([]);
  const [updatingImportantTaskIds, setUpdatingImportantTaskIds] = useState([]);

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
      // Add the task ID to the updatingTaskIds state to indicate it's being updated
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
        // Remove the task ID from the updatingTaskIds state after the API call is complete
        setUpdatingTaskIds((prevIds) => prevIds.filter((taskId) => taskId !== id));
      }
  }

  const handleImportant = async (id) => {
      const task = tasks.find((item) => item._id === id);
      if (!task || updatingImportantTaskIds.includes(id)) return;

      const previousImportantValue = task.important;
      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === id
            ? { ...item, important: !item.important }
            : item
        )
      );
      setUpdatingImportantTaskIds((prevIds) => [...prevIds, id]);

      try {
        const response = await axios.put(
          `http://localhost:5000/api/v2/update-important-task/${id}`,
          {},
          { headers }
        );
        console.log("response of important = ", response);
      } catch (error) {
        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            item._id === id
              ? { ...item, important: previousImportantValue }
              : item
          )
        );
        console.error("Error updating task important status:", error);
      } finally {
        setUpdatingImportantTaskIds((prevIds) =>
          prevIds.filter((taskId) => taskId !== id)
        );
      }
  }

  const deleteTask = async (id) => {
    try {
      const responce = await axios.delete(
        `http://localhost:5000/api/v2/delete-tasks/${id}`,
        { headers }
      );
      console.log("responce of delete = ", responce);
      setTasks((prevTasks) => prevTasks.filter((item) => item._id !== id));
      if (onTaskDeleted) {
        onTaskDeleted(id);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        // If backend says task is already missing, keep UI state consistent.
        setTasks((prevTasks) => prevTasks.filter((item) => item._id !== id));
        if (onTaskDeleted) {
          onTaskDeleted(id);
        }
      }
      console.error("Error deleting task:", error);
    }
  }

  const editeTask = (id, title, desc ) => {
    // Logic to edit the task
    console.log("Edit task with ID:", id);
    setInputDiv("fixed");
    setEditingTask({ id: id, title: title, desc: desc });


  }


  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {tasks.map((item) => (
        <div key={item._id} className=' flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
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
              <button
                onClick={() => handleImportant(item._id)}
                disabled={updatingImportantTaskIds.includes(item._id)}
                className={updatingImportantTaskIds.includes(item._id) ? "opacity-70" : ""}
              >
                <FaHeart className={item.important ? "text-red-500" : "text-white"} />
              </button>
              <button onClick={() => editeTask(item._id, item.title, item.desc ) } >
                <FaEdit />
              </button>
              <button onClick={() => deleteTask(item._id) } > 
                <MdDelete />
              </button>
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