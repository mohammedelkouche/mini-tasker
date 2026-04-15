import React from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useEffect , useState} from 'react';


const InputData = ({ inputDiv, setInputDiv, onTaskCreated, onTaskUpdated, editetask, setEditingTask }) => {

    const [data, setData] = useState({ title : "", desc : "" });

    useEffect(() => {

        setData({
            title : editetask.title || "",
            desc : editetask.desc || ""
        });
    }, [editetask]);


    const change = (e) => {
        // setData({...data , [e.target.name] : e.target.value});
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const headers = {
        id : localStorage.getItem("id"),
        Authorization : `Bearer ${localStorage.getItem("token")}`
    }

    const submitdata = async () => {
        try {
            if (data.title === "" || data.desc === "") {
                alert("Please fill all the fields");
                return;
            }
            else
            {
                const responce = await axios.post("http://localhost:5000/api/v2/create-task" , data, {
                    headers
                });
                    
                console.log("responce of creating task = ", responce);
                if (onTaskCreated) {
                    onTaskCreated(responce.data.task);
                }
                setData({ title : "", desc : "" });
                setInputDiv("hidden");
                    
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }

    const updateTask = async () => {
        try {
            if (data.title === "" || data.desc === "") {
                alert("Please fill all the fields");
                return;
            }
            else
            {
                const responce = await axios.put(
                    `http://localhost:5000/api/v2/update-tasks/${editetask.id}`,
                    data,
                    { headers }
                );
                console.log("responce of updating task = ", responce);
                if (onTaskUpdated) {
                    onTaskUpdated(responce.data.task);
                }
                setEditingTask({ id: "", title: "", desc: "" });
                setData({ title : "", desc : "" });
                setInputDiv("hidden");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

  return (
    <>
        <div className={`${inputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}>
            
        </div>
        <div className={` ${inputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}> 
            
            <div className='w-2/6 bg-gray-900  p-4 rounded'>
                <div className='flex justify-end'>
                    <button className='text-2xl' 
                        
                        onClick={()=> {
                            setInputDiv("hidden")
                            setData({ title : "", desc : "" });
                            setEditingTask({ id: "", title: "", desc: "" });
                        }}
                        
                    >
                        < RxCross2/>
                    </button>
                </div>
                <input 
                    type="text" 
                    placeholder='Title' 
                    name='title'
                    className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                    value={data.title}
                    onChange={change}
                />
                <textarea 
                    name="desc"
                    cols="30" 
                    rows="10"
                    type="text" 
                    placeholder='description ...' 
                    className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                    value={data.desc}
                    onChange={change}
                ></textarea>

                {editetask.id ? (
                < button className='px-3 py-2 bg-green-500 rounded text-black text-xl font-semibold mr-2'
                    onClick ={updateTask}
                >
                    Update
                </button>
                ) : (
                <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' 
                    onClick={submitdata} > 
                    submit
                </button>
                )}
            </div>
        </div>
    </>
    
  )
}

export default InputData