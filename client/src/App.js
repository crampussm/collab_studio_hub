import { useState } from 'react';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Homecreator from './components/Homecreator';
import Homeeditor from './components/Homeeditor'

function App() {
  
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='login/' element={<Login/>}/>
        <Route path='signup/' element={<Signup/>}/>
        <Route path='creator/home/' element={<Homecreator/>}/>
        <Route path='editor/home/' element={<Homeeditor/>}/>
      </Routes>
    </div>
  );
}

export default App;
