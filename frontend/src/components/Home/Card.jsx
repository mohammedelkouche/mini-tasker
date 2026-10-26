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
    setTasks((prev) => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
  }, [JSON.stringify(data)]);

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
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-2 sm:p-4'>
      {tasks.map((item) => (
        <div key={item._id} className='flex flex-col justify-between bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-gray-600 transition-all duration-300'>
          <div>
            <h3 className='text-xl font-semibold break-words'>{item.title}</h3>
            <p className='text-gray-300 my-3 text-sm leading-relaxed break-words'>{item.desc}</p>
          </div>
          <div className='mt-4 w-full flex items-center gap-3'>
            <button 
              className= {` ${item.complete ?  "bg-green-700 hover:bg-green-600" : "bg-red-400 hover:bg-red-500" } px-3 py-2 rounded-lg text-sm font-semibold flex-1 shadow transition-colors duration-200 ${updatingTaskIds.includes(item._id) ? "opacity-70 cursor-not-allowed" : ""} `}
              onClick={() => handleCompletedTask(item._id)}
              disabled={updatingTaskIds.includes(item._id)}
            > 
              {item.complete ? "Completed" : "InCompleted"}
            </button>
            <div className='text-white text-xl flex items-center gap-3'>
              <button
                onClick={() => handleImportant(item._id)}
                disabled={updatingImportantTaskIds.includes(item._id)}
                className={`p-1.5 rounded-lg hover:bg-gray-700 hover:scale-110 transition-all duration-200 ${updatingImportantTaskIds.includes(item._id) ? "opacity-70" : ""}`}
              >
                <FaHeart className={item.important ? "text-red-500" : "text-white"} />
              </button>
              <button className='p-1.5 rounded-lg hover:bg-gray-700 hover:scale-110 transition-all duration-200' onClick={() => editeTask(item._id, item.title, item.desc ) } >
                <FaEdit />
              </button>
              <button className='p-1.5 rounded-lg hover:bg-gray-700 hover:text-red-400 hover:scale-110 transition-all duration-200' onClick={() => deleteTask(item._id) } > 
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home && (
        <button className='flex flex-col justify-center items-center min-h-[160px] bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-2xl p-5 text-gray-400 hover:text-white hover:border-gray-400 hover:bg-gray-800 hover:scale-105 cursor-pointer transition-all duration-300' onClick={ ()=> setInputDiv("fixed")}>
          <IoMdAddCircle  className='text-5xl '/>
          <h2 className='text-2xl mt-4'>Add Task</h2>
        </button> 
      )}
    </div>
  );
}

export default Card;