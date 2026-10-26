import React, { useState, useEffect } from 'react'
import Card from '../components/Home/Card'
import axios from 'axios';

const IncompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const headers = {
    id : localStorage.getItem("id"),
    Authorization : `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const responce = await axios.get("http://localhost:5000/api/v2/get-incomplete-tasks", { headers });
        setTasks(responce.data.data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetch();
   }, []);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Incomplete Tasks</h2>
      <Card home={false} data={tasks} />
    </div>
  )
}

export default IncompletedTasks