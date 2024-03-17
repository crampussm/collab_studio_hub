import React from 'react';
import { Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {useGetContext} from '../context/contextProvider';

function Workspace(props) {
    const {setWorkspace} = useGetContext();
    const navigate = useNavigate();
    const showWorkspace = () => {
        setWorkspace({workspaceId: props.workspace._id, workspaceName: props.workspace.name});
        sessionStorage.setItem('workspaceId', props.workspace._id);
        navigate(`tasks/${props.workspace.name}`);
    }
  return (
    <div className='workspace-item flex flex-row justify-evenly md:justify-stretch mx-2 my-1 py-4 px-2 hover:cursor-pointer' style={{boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px'}} onClick={showWorkspace}>
        <div className='w-[20%] md:w-[10%]'>
            <img src="../images/youtube_default_workspace_pic.png" alt="" />
        </div>
        <div className='flex flex-col md:w-[80%] md:mx-10 font-csh'>
            <h2 className='font-semibold text-lg font-csh md:text-2xl'>{props.workspace.name}</h2>
            <p className='font-csh text-amber-700'>{props.workspace.description}</p>
            <div className='flex w-full justify-between my-2'>
                <span className='flex '>
                    <Users className='mr-2 scale-75'  color="#019963"/>
                    <p className='font-csh text-cshgreen'>{props.workspace.members.length} members</p>
                </span>
                <Trash2 className='hover:cursor-pointer' color='#ff575f' onClick={(e)=>console.log(props.workspace._id)}/>
            </div>
        </div>
    </div>
  )
}

export default Workspace