import React, {useEffect} from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Landing(props) {
    const authToken = localStorage.getItem('token');
    const authType = localStorage.getItem('type');
    const navigate = useNavigate();
    const handleShowMenu = ()=>{
        const hambergerMenu = document.getElementById('hamberger-menu');
        hambergerMenu.style.display = 'flex';
    }
    const handleCloseMenu = ()=>{
        const hambergerMenu = document.getElementById('hamberger-menu');
        hambergerMenu.style.display = 'none'
    }
    useEffect(()=>{
        if(authToken){
          if(authType==='creator'){
            navigate("/creator/home");
          }else if(authType==='editor'){
            navigate("/editor/home");
          }
        }
    }, [])
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
                    <div className='flex flex-row justify-around md:justify-evenly md:w-1/4 w-full'>
                        <button className='bg-cshgreen w-[5rem] h-[2.5rem] text-white rounded-md font-semibold' onClick={()=>{navigate('/signup')}}>Sign up</button>
                        <button className='bg-cshoffwhite w-[5rem] h-[2.5rem] text-black rounded-md font-semibold' onClick={()=>navigate('/login')}>Log in</button>
                    </div>
                </div>
            </div>
        </nav>
        <hr />
        <div id='hamberger-menu' className='hamberger-menu hidden flex-col fixed items-center text-2xl bg-white w-[75%] h-[100vh] top-0' style={{"box-shadow": "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
            <div className="cross my-5 flex justify-between w-full py-3 px-4">
                <img className='w-[80%]' src="./images/landingPage/csh_logo.png" alt="" />
                <X className='scale-125' onClick={handleCloseMenu}/>
            </div>
            <ul className='flex flex-col my-40 justify-end'>
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Feature</li>
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Pricing</li>
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Docs</li>
            </ul>
        </div>
        <div className="top-section m-4 md:flex md:justify-center">
            <div className="topimage flex justify-center my-5 md:w-1/2 md:flex md:justify-end md:mx-10">
                <img src="./images/landingPage/img_top.png" alt="" />
            </div>
            <div className='md:w-1/2 md:flex md:flex-col md:mx-10'>
                <div className="title my-4 w-[90%] md:w-[60%]">
                    <h1 className='text-3xl font-extrabold font-csh md:text-4xl'>
                        Create, edit, and publish with your team in real time
                    </h1>
                </div>
                <div className="description w-[90%] text-lg font-semibold md:w-[60%]">
                    <p>Say goodbye to slow exports, endless email chains, and tedious feedback loops. With Collab Studio Hub, you can create beautiful videos faster than ever</p>
                </div>
                <div className="button font-csh w-[55%] flex justify-between my-4 md:w-[35%]">
                    <button className='bg-cshgreen text-white rounded-3xl w-[6rem] h-[2.5rem] font-semibold'>Start now</button>
                    <button className='bg-cshoffwhite rounded-3xl w-[6rem] h-[2.5rem] font-semibold'>Learn more</button>
                 </div>
            </div>
        </div>
        <div className="middle md:flex md:justify-center md:my-16">
            <div className="get-started my-6 w-[80%] flex flex-col md:w-1/2 md:items-center">
                <h1 className='font-csh text-3xl font-extrabold md:text-5xl'>Are you an editor?</h1>
                <div className='w-[70%] flex justify-between md:w-[30%] md:my-5'>
                    <button className='font-csh bg-cshgreen text-white rounded-3xl w-[6rem] h-[2.5rem] my-5 font-semibold'>Join now</button>
                    <button className='font-csh bg-cshoffwhite rounded-3xl w-[6rem] h-[2.5rem] my-5 font-semibold'>Learn more</button>
                </div>
            </div>
        </div>
        <div className="footer bg-cshgreen flex flex-col py-5 px-2">
            <img className='w-[40%] md:w-[20%]' src="./images/landingPage/csh_logo.png" alt="" />
            <div className='md:flex md:justify-start md:m-8'>
                <div className="contact text-cshoffwhite my-6 mx-3 md:mx-12">
                    <h1 className='font-csh font-xl my-6 md:my-2 md:font-bold'>CONTACT</h1>
                    <li className='list-none'>support@csh.com</li>
                    <h1 className='font-csh font-xl my-6 md:my-2 md:font-bold'>LICENCING</h1>
                    <li className='list-none'>Support</li>
                    <li className='list-none'>Licencing</li>
                </div>
                <div className="contact text-cshoffwhite my-6 mx-3 md:mx-12">
                    <h1 className='font-csh font-xl my-6 md:my-2 md:font-bold'>EXPLORE</h1>
                    <li className='list-none'>Blog</li>
                    <li className='list-none'>About</li>
                    <li className='list-none'>Contact</li>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing