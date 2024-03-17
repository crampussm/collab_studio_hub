import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Workspace from './Workspace';

function Workspaces() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');
    const [isworkspace, setIsWorkspace] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);
    const fetchWorkspaces = async()=>{ 
        const response = await fetch('http://localhost:8000/creator/workspaces/fetch', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken,
            },
        });
        let json = await response.json();
        if (json.success){
            setIsWorkspace(true);
            setWorkspaces(json.workspaces);
        }
    }
    useEffect(()=>{
    if(localStorage.getItem('token')){
        fetchWorkspaces();
        }else{
        navigate('/login');
        }
    }, []);
  return (
    <div>
        <div className="myworkspace mx-5 mt-10 md:flex md:flex-col md:items-center">
            <div className='md:w-[60%] md:flex justify-start my-5'>
                <h1 className='font-bold text-2xl md:text-3xl'>My Workspace</h1>
            </div>
            <div className="workspace h-[80vh] md:w-[60%] md:h-[70vh]">
                {!isworkspace && <span>No Workspaces</span>}
                {workspaces.map((workspace)=>{
                    return <Workspace key={workspace._id} workspace={workspace}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default Workspaces