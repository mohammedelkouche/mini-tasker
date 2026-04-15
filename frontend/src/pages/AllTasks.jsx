import React, { useState, useEffect } from 'react'
import Card from '../components/Home/Card'
import { IoMdAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  // const [data, setData] = useState(null);
  const [editingTask, setEditingTask] = useState({ id: "", title: "", desc: "" });


  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

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
      // setData(responce.data.data);

      setTasks(responce.data.data.tasks || []);

      console.log(" test how many times this is called = ");

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetch();
   }, []
  );


  return (
    <>
      <div> 
        <div className='w-full flex  justify-end px-4 py-2'>
          <button onClick={() => setInputDiv("fixed")}> 
            <IoMdAddCircle  className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' />
          </button>
        </div>
        {tasks && 
        (
         < Card 
          home={true}
          setInputDiv={setInputDiv}
          data={tasks}
          setEditingTask={setEditingTask}
          onTaskDeleted={handleTaskDeleted} />
        )}
      </div>
      < InputData 
        inputDiv={inputDiv} 
        setInputDiv={setInputDiv} 
        onTaskCreated={handleTaskCreated}
        onTaskUpdated={handleTaskUpdated}
        editetask={editingTask}
        setEditingTask={setEditingTask}
      />
    </>
  )
}

export default AllTasks