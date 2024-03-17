import React, { useEffect, useState } from 'react'
import Task from './Task';
import { useNavigate } from 'react-router-dom';
import {useGetContext} from '../context/contextProvider';
import Member from './Member';

function Tasks() {
    const {workspace} = useGetContext();
    let key = 0;
    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');
    const [isTask, setIsTask] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const fetchTasks = async(workspaceId) =>{
        const response = await fetch(`http://localhost:8000/creator/workspaces/tasks/fetch/${workspaceId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            },
        });
        let json = await response.json();
        if (json.success){
            setIsTask(true);
            console.log(json.tasks);
            setTasks(json.tasks);
        }
    }

    const fetchMembers = async(workspaceId)=>{
        const response = await fetch(`http://localhost:8000/creator/workspaces/members/fetch/${workspaceId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            },
        });
        let json = await response.json();
        if (json.success){
            console.log(json.members);
            setMembers(json.members);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            let workspaceid =  sessionStorage.getItem('workspaceId');
            fetchTasks(workspaceid);
            fetchMembers(workspaceid);
        }else{
            navigate('/login');
        }
    }, []);
  return (
    <div className='flex justify-center'>
        <div className='w-[60%]'>
            <div className='my-5 mx-5 flex items-center'>
                <img className='w-[8%]' src="https://collabstudiohub.s3.ap-south-1.amazonaws.com/youtube_default_workspace_pic.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiAdykVpypOrO5BUwfLhz6cwuKisAijf7MOG2QPZXJzIGwIhAOmcJW4u46erkdtLotX8gz75AZ%2BuNGCvKtUikKwnKa5pKoQDCJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMjc2MzM4Igxdm1oGS8UhtnTtmXgq2AJdaO3xyi6mfirLoxKlyE%2FWOkTYOC3uzPumOo6%2B24bEooQmpFzys7mIoh7SrCbVcMQf0vss07RWOiyjW%2B%2BmQESaS1gnLLM2D%2B6i%2FgtAA0GykR37thuRuOCK8uDw7KnISlODnWclg0M8V%2B6ijruh%2FgNxlCwBMrbvS9BDzIbe0s796cnyk8%2FVQVkdKy%2By%2BXfV9gebCpB3yFrpe7UKXnR%2F0svvxSYtu4qaBforUJDnk0wUqGl80jcJA55qqcK%2BWlbP7icA7FPq0zqioKuqGYUqtyNRsao48t6DcsMhODr04iUYbVmDwM3WCx5J%2FiF3FbKFfl2rMIHh%2FnWbbE2gPdnmDPEVurzF7%2B5q8PVF05ICHnFmxQOHgjylgm84nt4DTcBoUEVbECIIzORvBkaBNZeVbGGmzXJVIrUn5QF6arBj6f40Trgt6NIhC09x1pPL9su0CPiV00oubl6UYDCj4dSvBjqzAmEIxBvGg%2F4gYlroisJTtyGHz745BIWVXjs7ZSTlDywLXRGs6uPfZ0VYPWplLDTI%2F0HEN1jVUFC09hiec5m%2FtYIMH0SQ5hhjADYKEGHVcOfb4a560fjEGs95n7UdAAy8FwiSTVDaTLvMUR3RF7aw%2FPP9VqE%2BEUxC5V84up2K8vj7bl0u75xMM5niDQ2z7RvOm6IPgfNKdUJER3qfRQhjeOGIlmyUTXycSRAv3C1IoTuQUOXFNkUQ6LrM4Q%2FVLmJ5IK%2BpOmsln5TCv0hMmwrjEeFHUrAQJm1bzVsVUCgPcswM4ZfBguvBi5FAVuEa3YqUSVp2SNh34I4Qptg%2BA0%2Fu%2BxvffF9MMlPCo2G2G30mS98VconRWkUK1qdWKD6ISE6Tmekg8ZyDSdO0YnWyXIOegFRqmj4%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240316T054348Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZI2LDKEZI5Z5VFMW%2F20240316%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=9d0a01e79e1221a353aa9f51eaeedc7e69bbc79a9d653f8bc82851dba6a4cd4b" alt="" />
                <h1 className='font-semibold text-4xl font-csh mx-4'>{window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}</h1>
            </div>
            <div className="taskandmembers flex">
                <div className="members w-[30%] border-2 border-gray-200">
                    <h2 className='font-csh text-3xl font-semibold px-4 py-3 border-b-2 border-gray-200'>Members</h2>
                    <div className='flex flex-col pt-4 h-[465px] overflow-y-scroll'>
                        <div className="member flex py-3 px-2 border-b-2 border-gray-100">
                            <div className="pr w-[15%] mx-4">
                                <img className='rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                            </div>
                            <div className="dtls flex flex-col ml-2">
                                <p className='font-csh'>You</p>
                                <span className='rounded-2xl bg-green-500 text-white text-[10px] font-csh w-fit px-[5px]'>owner</span>
                            </div>
                        </div>
                        {
                            members.map((member)=>{
                                console.log(member);
                                key++;
                                return <Member key={key} member={member}/>
                            })
                        }
                        {/* <div className="member flex py-3 px-2 border-b-2 border-gray-100">
                            <div className="pr w-[15%] mx-4">
                                <img className='rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                            </div>
                            <div className="dtls flex flex-col ml-2">
                                <p className='font-csh'>Manish Das</p>
                                <span className='rounded-2xl bg-violet-600 text-white text-[10px] font-csh w-fit px-[5px]'>video editor</span>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="tasks w-[70%] border-2 border-gray-200">
                    <h2 className='font-csh text-3xl px-6 py-3 font-semibold border-b-2 border-gray-200'>Tasks</h2>
                    {!isTask && <span>No Tasks</span>}
                    {tasks.map((task)=>{
                        return <Task key={task._id} task={task}/>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tasks