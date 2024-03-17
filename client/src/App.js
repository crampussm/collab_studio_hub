import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Homecreator from './components/Homecreator';
import Homeeditor from './components/Homeeditor'
import Error from './components/Error';
import CreatorNavbar from './components/CreatorNavbar';
import { useEffect, useState } from 'react';
import Tasks from './components/Tasks';
import {useGetContext} from './context/contextProvider';

function App() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');
  const {workspace, setWorkspace} = useGetContext();
  useEffect(()=>{
    if(!authToken){
      navigate('/');
    }
  }, [])
  return (
    <div className='overflow-x-hidden'>
      {authToken!=null && <CreatorNavbar/>}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='login/' element={<Login/>}/>
        <Route path='signup/' element={<Signup/>}/>
        <Route path='creator/home/' element={<Homecreator/>}/>
        <Route path={`creator/home/tasks/:workspacename`} element={<Tasks/>}/>
        <Route path='editor/home/' element={<Homeeditor/>}/>
        <Route path='error/' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
