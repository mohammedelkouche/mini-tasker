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
        <div className={`${inputDiv} fixed top-0 left-0 bg-black/60 backdrop-blur-sm h-screen w-full`}>
            
        </div>
        <div className={` ${inputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}> 
            
            <div className='w-11/12 sm:w-4/6 lg:w-2/6 bg-gray-900 border border-gray-700 shadow-2xl p-6 rounded-2xl'>
                <div className='flex justify-end'>
                    <button className='text-2xl text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300' 
                        
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
                    className='px-4 py-2.5 rounded-lg w-full bg-gray-700 my-3 outline-none focus:ring-2 focus:ring-blue-400 transition'
                    value={data.title}
                    onChange={change}
                />
                <textarea 
                    name="desc"
                    cols="30" 
                    rows="8"
                    type="text" 
                    placeholder='description ...' 
                    className='px-4 py-2.5 rounded-lg w-full bg-gray-700 my-3 outline-none resize-none focus:ring-2 focus:ring-blue-400 transition'
                    value={data.desc}
                    onChange={change}
                ></textarea>

                {editetask.id ? (
                < button className='px-5 py-2 bg-green-500 hover:bg-green-400 rounded-lg text-black text-lg font-semibold shadow transition-colors duration-200'
                    onClick ={updateTask}
                >
                    Update
                </button>
                ) : (
                <button className='px-5 py-2 bg-blue-400 hover:bg-blue-300 rounded-lg text-black text-lg font-semibold shadow transition-colors duration-200' 
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