import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState("creator");
  const [credentials, setCredentials] = useState({emailorpass: "", password: ""})
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [usernameOrEmailErrorMsg, setUsernameOrEmailErrorMsg] = useState('');
  const handleShowMenu = ()=>{
      const hambergerMenu = document.getElementById('hamberger-menu');
      hambergerMenu.style.display = 'flex';
  }
  const handleCloseMenu = ()=>{
      const hambergerMenu = document.getElementById('hamberger-menu');
      hambergerMenu.style.display = 'none'
  }
  const handleLoginMode = ()=>{
    if(loginMode==="editor"){
      setLoginMode("creator");
    }else{
      setLoginMode("editor");
    }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  const handleLogin = async(e)=>{
    e.preventDefault();

    if(credentials.password.length<8){
      return setPasswordErrorMsg('length of password should be more than 8');
    }

    if(credentials.emailorpass.split(" ").length>1){
      return setUsernameOrEmailErrorMsg('username or email should not contain space');
    }

    if(loginMode==="creator"){
      const response = await fetch(`http://localhost:8000/creator/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({usernameOrEmail: credentials.emailorpass, password: credentials.password})
      });
      let json = await response.json();
      if(json.success){
          localStorage.setItem('token', json.authToken);
          navigate("/creator/home");
          console.log("success");
      }
      else{
        const errMsg = json.error[0].msg;
        console.log(errMsg);
          if(errMsg === "Wrong email or username"){
            setUsernameOrEmailErrorMsg(errMsg.toLowerCase());
          }else if(errMsg === "Wrong password"){
            setPasswordErrorMsg(errMsg.toLowerCase());
          }
      }
    }else{
      const response = await fetch(`http://localhost:8000/editor/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({usernameOrEmail: credentials.emailorpass, password: credentials.password})
      });
      let json = await response.json();
      if(json.success){
          localStorage.setItem('token', json.authToken);
          navigate("/editor/home");
          console.log("success");
      }
      else{
        const errMsg = json.error[0].msg;
        console.log(errMsg);
          if(errMsg === "Wrong email or username"){
            setUsernameOrEmailErrorMsg(errMsg.toLowerCase());
          }else if(errMsg === "Wrong password"){
            setPasswordErrorMsg(errMsg.toLowerCase());
          }
      }
    }
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
                        <button className='bg-cshgreen w-[5rem] h-[2.5rem] text-white rounded-md font-semibold' onClick={()=>{navigate('/signup')}}>Sign up</button>
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
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Feature</li>
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Pricing</li>
                <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Docs</li>
            </ul>
        </div>
        <div className="switch-mode flex justify-center mt-[7rem] mb-5">
          <div className="switch-field bg-cshoffwhite rounded-xl flex justify-between w-[50%] h-[30px] items-center md:h-[50px] md:w-[20%] md:rounded-3xl">
            <div className={`font-csh flex items-center cursor-pointer px-6 w-1/2 md:h-full md:justify-center rounded-3xl ${loginMode==="creator"?"bg-cshgreen text-white":""}`} onClick={handleLoginMode}>Creator</div>
            <div className={`font-csh flex items-center cursor-pointer px-6 w-1/2 pl-8 md:h-full md:justify-center md:pl-5 rounded-3xl ${loginMode==="editor"?"bg-cshgreen text-white":""}`} onClick={handleLoginMode}>Editor&nbsp;</div>
          </div>
        </div>
        <div className='flex justify-center '>
          <div className="login-box flex flex-col font-csh items-center w-[80%] rounded-md md:w-1/3" style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"}}>
            <h1 className='font-csh font-bold my-3 text-xl'>Log in</h1>
            <form action="" onSubmit={handleLogin} className='flex flex-col w-full p-6'>
              <div>
                <label htmlFor="emailorpass" className='my-5 font-csh'>Email</label>
                <input type="text" id='emailorpass' className='border-2 bg-cshoffwhite rounded-md w-full h-[35px] py-2 px-2' name='emailorpass' value={credentials.email} onChange={onChange}/>
                <span id='invemailorusername' className='text-red-600 font-csh text-sm'>{usernameOrEmailErrorMsg}</span>
              </div>
              <div className='my-5 font-csh'>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' className='border-2 bg-cshoffwhite rounded-md w-full h-[35px] py-2 px-2' name='password' value={credentials.password} onChange={onChange}/>
                <span id='wrngpass' className='text-red-600 font-csh text-sm'>{passwordErrorMsg}</span>
                <p className='my-1 text-amber-700 text-sm underline hover:cursor-pointer'>Forgot password?</p>
              </div>
              <button className='bg-cshgreen text-white font-csh rounded-md py-2' type='submit'>Log in</button>
              <div className='flex justify-center my-2'>
                <p className='my-1 text-amber-700 text-sm'>New to Collab Studio Hub?</p>
              </div>
              <button className='bg-cshoffwhite text-black font-csh rounded-md py-2' onClick={()=>navigate('/signup')}>Create a new account</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login