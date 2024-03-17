import React from 'react'
import { Menu, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CreatorNavbar() {
    const navigate = useNavigate();
    const handleShowMenu = ()=>{
        const hambergerMenu = document.getElementById('hamberger-menu');
        hambergerMenu.style.display = 'flex';
    }
    const handleCloseMenu = ()=>{
        const hambergerMenu = document.getElementById('hamberger-menu');
        hambergerMenu.style.display = 'none';
    }
  return (
    <div>
        <nav>
            <div className='px-2 md:px-10 py-4 w-full flex justify-between'>
                <div className="hambeerger flex items-center md:hidden">
                    <Menu onClick={handleShowMenu}/>
                </div>
                <div className="logo w-1/2 items-center flex">
                    <img className=' md:w-1/3 hover:cursor-pointer' src="./images/landingPage/csh_logo.png" alt="" />
                </div>
                <div className="navitems flex flex-row w-1/2 md:justify-end justify-around items-center">
                    <ul className='hidden md:flex flex-row justify-evenly w-1/2'>
                        <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh'>Feature</li>
                        <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh'>Pricing</li>
                        <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh'>Docs</li>
                    </ul>
                    <div className='flex flex-row justify-end md:justify-evenly md:w-1/4 w-full'>
                        <button className='bg-cshgreen w-[9rem] h-[2.5rem] text-white rounded-md font-semibold' onClick={()=>{navigate('/signup')}}>New Workspace</button>
                    </div>
                    <div className="profile mx-4 scale-125">
                        <div className="profile-section rounded-full border-slate-200 border-2">
                            <User/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <hr />
        <div id='hamberger-menu' className='hamberger-menu hidden flex-col fixed items-center text-2xl bg-white w-[75%] h-[100vh] top-0' style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
            <div className="cross my-5 flex justify-between w-full py-3 px-4">
                <img className='w-[80%]' src="./images/landingPage/csh_logo.png" alt="" />
                <X className='scale-125' onClick={handleCloseMenu}/>
            </div>
            <ul className='flex flex-col my-40 justify-end'>
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>My Dashboard</li>
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Explore</li>
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Pricing</li>
            </ul>
        </div>
    </div>
  )
}

export default CreatorNavbar