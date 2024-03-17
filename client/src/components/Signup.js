import React, { useCallback, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const authToken = localStorage.getItem('token');
  const authType = localStorage.getItem('type');
  const navigate = useNavigate();
  const [signupMode, setSignupMode] = useState("creator");
  const [credentials, setCredentials] = useState({ firstname: "", lastname: "", username: "", email: "", password: "", cnfpassword: "" });
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const handleShowMenu = () => {
    const hambergerMenu = document.getElementById('hamberger-menu');
    hambergerMenu.style.display = 'flex';
  }
  const handleCloseMenu = () => {
    const hambergerMenu = document.getElementById('hamberger-menu');
    hambergerMenu.style.display = 'none';
  }
  const handleSignupMode = () => {
    if (signupMode === "editor") {
      setSignupMode("creator");
    } else {
      setSignupMode("editor");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSignup = async (e) => {
    e.preventDefault();

    if (credentials.username.split(" ").length > 1) {
      console.log('usernameerr');
      return setUsernameErrorMsg('username should not contain space');
    }

    if (credentials.password.length <= 8) {
      console.log('passerr');
      return setPasswordErrorMsg('length of password should be more than 8');
    }

    if (signupMode === "creator") {
      const response = await fetch(`http://localhost:8000/creator/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, firstname: credentials.firstname, lastname: credentials.lastname, username: credentials.username, password: credentials.password })
      });
      let json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('type', json.type);
        navigate("/creator/home");
        console.log("success");
      }
      else {
        const errMsg = json.error[0].msg;
        console.log(errMsg);
        if (errMsg === "User must be unique") {
          setUsernameErrorMsg(errMsg.toLowerCase());
        } else if (errMsg === "Email already exists") {
          setEmailErrorMsg(errMsg.toLowerCase());
        }else{
          navigate('/error');
        }
      }
    } else {
      const response = await fetch(`http://localhost:8000/editor/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, firstname: credentials.firstname, lastname: credentials.lastname, username: credentials.username, password: credentials.password })
      });
      let json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('type', json.type);
        navigate("/editor/home");
        console.log("success");
      }
      else {
        const errMsg = json.error[0].msg;
        console.log(errMsg);
        if (errMsg === "User must be unique") {
          setUsernameErrorMsg(errMsg.toLowerCase());
        } else if (errMsg === "Email already exists") {
          setEmailErrorMsg(errMsg.toLowerCase());
        }else{
          navigate('/error');
        }
      }
    }
  }
  const matchPass = useCallback(() => {
    const confirmPasswordErrMsg = document.getElementById('wrngcnfpass');
    const signupButton = document.getElementById('signupbutton');
    if (credentials.password !== credentials.cnfpassword) {
      confirmPasswordErrMsg.hidden = false;
      if(credentials.password===""){
        signupButton.disabled = true;
        setButtonState(false);
      }
    } else {
      confirmPasswordErrMsg.hidden = true;
      if(credentials.password!==""){
        signupButton.disabled = false;
        setButtonState(true);
      }
    }
  }, [credentials])

  useEffect(() => {
    matchPass();
  }, [matchPass])

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
            <Menu onClick={handleShowMenu} />
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
              <button className='bg-cshgreen w-[5rem] h-[2.5rem] text-white rounded-md font-semibold' onClick={() => { navigate('/login') }}>Log in</button>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      <div id='hamberger-menu' className='hamberger-menu hidden flex-col fixed items-center text-2xl bg-white w-[75%] h-[100vh] top-0' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
        <div className="cross my-5 flex justify-between w-full py-3 px-4">
          <img className='w-[80%]' src="./images/landingPage/csh_logo.png" alt="" />
          <X className='scale-125' onClick={handleCloseMenu} />
        </div>
        <ul className='flex flex-col my-40 justify-end'>
          <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Feature</li>
          <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Pricing</li>
          <li className='list-none hover:cursor-pointer hover:text-cshgreen font-csh my-6'>Docs</li>
        </ul>
      </div>
      <div className="switch-mode flex justify-center mt-[3rem] mb-5">
        <div className="switch-field bg-cshoffwhite rounded-xl flex justify-between w-[50%] h-[30px] items-center md:h-[50px] md:w-[20%] md:rounded-3xl">
          <div className={`font-csh flex items-center cursor-pointer px-6 w-1/2 md:h-full md:justify-center rounded-3xl ${signupMode === "creator" ? "bg-cshgreen text-white" : ""}`} onClick={handleSignupMode}>Creator</div>
          <div className={`font-csh flex items-center cursor-pointer px-6 w-1/2 pl-8 md:h-full md:justify-center md:pl-5 rounded-3xl ${signupMode === "editor" ? "bg-cshgreen text-white" : ""}`} onClick={handleSignupMode}>Editor&nbsp;</div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className="login-box flex flex-col font-csh items-center w-[80%] rounded-md md:w-1/3" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" }}>
          <h1 className='font-csh font-bold my-3 text-xl'>Sign up</h1>
          <form action="" onSubmit={handleSignup} className='flex flex-col w-full p-6'>
            <div className='my-3 font-csh'>
              <label htmlFor="firstname" className='my-5 font-csh'>First name</label>
              <input type="text" id='firstname' className='border-2 bg-cshoffwhite rounded-md w-full h-[35px] py-2 px-2' name='firstname' value={credentials.firstname} onChange={onChange} required />
            </div>
            <div className='my-3 font-csh'>
              <label htmlFor="lastname" className='my-5 font-csh'>Last name</label>
              <input type="text" id='lastname' className='border-2 bg-cshoffwhite rounded-md w-full h-[35px] py-2 px-2' name='lastname' value={credentials.lastname} onChange={onChange} required />
            </div>
            <div className='my-3 font-csh'>
              <label htmlFor="username" className='my-5 font-csh'>Username</label>
              <input type="text" id='username' className='border-2 bg-cshoffwhite rounded-md w-full h-[35px] py-2 px-2' name='username' value={credentials.username} onChange={onChange} required />
              <span id='invemailorusername' className='text-red-600 font-csh text-sm'>{usernameErrorMsg}</span>
            </div>
            <div className='my-3 font-csh'>
              <label htmlFor="email" className='my-5 font-csh'>Email</label>
              <input type="email" id='email' className='border-2 bg-cshoffwhite rounded-md w-full h-[35px] py-2 px-2' name='email' value={credentials.email} onChange={onChange} required />
              <span id='invemailorusername' className='text-red-600 font-csh text-sm'>{emailErrorMsg}</span>
            </div>
            <div className='my-3 font-csh'>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' className='border-2 bg-cshoffwhite rounded-md w-full h-[35px] py-2 px-2' name='password' value={credentials.password} onChange={onChange} required />
              <span id='wrngpass' className='text-red-600 font-csh text-sm'>{passwordErrorMsg}</span>
            </div>
            <div className='my-3 font-csh'>
              <label htmlFor="cnfpassword">Confirm password</label>
              <input type="password" id='cnfpassword' className='border-2 bg-cshoffwhite rounded-md w-full h-[35px] py-2 px-2' name='cnfpassword' value={credentials.cnfpassword} onChange={onChange} required />
              <span id='wrngcnfpass' className='text-red-600 font-csh text-sm' hidden>password and confirm password must be same</span>
            </div>
            <button id='signupbutton' className={`mt-5 ${buttonState===false?"bg-cshlightgreen":"bg-cshgreen"} text-white font-csh rounded-md py-2`} type='submit' disabled>Sign up</button>
            <div className='flex justify-center my-2'>
              <p className='my-1 text-amber-700 text-sm'>Already have an account Collab Studio Hub?</p>
            </div>
            <button className='bg-cshoffwhite text-black font-csh rounded-md py-2' onClick={() => navigate('/login')}>Login to an existing account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup