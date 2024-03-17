import React, { useEffect, useState } from 'react';
import { ChevronDown, History, CheckCircle, CircleAlert, AlertCircle } from 'lucide-react';

function Task(props) {
  const authToken = localStorage.getItem('token');
  const [taskStatus, setTaskStatus] = useState("pending");
  const StatusColor = new Map([
    ["pending", "bg-yellow-100 border-yellow-200 text-yellow-600"],
    ["done", "bg-green-100 border-green-200 text-green-600"],
    ["on hold", "bg-red-100 border-red-200 text-red-600"]
  ])
  const [isDropdown, SetIsDropdown] = useState(false);
  const [rotation, setRotation] = useState("rotate-0");
  const handleDropdown = ()=>{
    if(isDropdown){
      SetIsDropdown(false);
      setRotation("rotate-0");
    }else{
      SetIsDropdown(true);
      setRotation("rotate-180");
    }
  }
  const updateTaskStatus = async(taskstatus)=>{
    const response = await fetch(`http://localhost:8000/creator/updatetask/${props.task._id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
        },
        body: JSON.stringify({taskstatus}),
    });
    let json = await response.json();
    if (json.success){
        console.log(json.tasks);
        setTaskStatus(json.task.taskStatus);
    }else{
      console.log(json);
    }
  }
  const handleChaneStatus = (e)=>{
    e.preventDefault();
    var newStatus = e.target.className.split(" ")[0].replace("_", " ");
    console.log(newStatus);
    setTaskStatus(newStatus);
    console.log("the task status is", taskStatus);
    updateTaskStatus(newStatus);
    handleDropdown();
  }
  useEffect(()=>{
    setTaskStatus(props.task.taskStatus);
  },[]);
  return (
    <>
    <div className='p-4 border-b-2 border-gray-100 flex justify-between'>
      <div className='flex flex-col'>
        <h3 className='font-csh text-xl cursor-pointer hover:underline'>{props.task.name}</h3>
        <p className='font-csh text-sm'>{props.task.description}</p>
      </div>
      <div className='mr-4 flex items-center'>
        <div className={`flex items-center justify-center rounded-2xl px-3 border-2 ${StatusColor.get(taskStatus)}`}>
          {
            taskStatus === "pending" &&
              <History className='size-3'/>  
          }
          {
            taskStatus === "done" &&
            <CheckCircle className="size-3"/>
          }
          {
            taskStatus === "on hold" &&
            <AlertCircle className="size-3"/>
          }
          <p className='font-csh mx-1'>{taskStatus}</p>
        </div>
        <ChevronDown id='drop-arrow' className={`size-4 cursor-pointer ${rotation}`} onClick={handleDropdown}/>
      </div>
    </div>
    {
      isDropdown &&
      <div className="dropdown relative left-[75%] bottom-6 bg-white rounded-lg w-[20%] flex justify-center items-center" style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
        <ul className='w-full flex flex-col items-center justify-center'>
          <li className='pending w-full flex justify-center my-2 cursor-pointer text-yellow-400 hover:bg-slate-100' onClick={handleChaneStatus}>pending</li>
          <li className='done w-full flex justify-center my-2 cursor-pointer text-green-600 hover:bg-slate-100' onClick={handleChaneStatus}>done</li>
          <li className='on_hold w-full flex justify-center my-2 cursor-pointer text-red-600 hover:bg-slate-100' onClick={handleChaneStatus}>on hold</li>
        </ul>
      </div>
    }
    </>

  )
}

export default Task