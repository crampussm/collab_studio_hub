import React, { useState } from 'react';
import CreatorNavbar from './CreatorNavbar';
import { Route, Routes } from 'react-router-dom';
import Workspaces from './Workspaces';
import Tasks from './Tasks';

function Homecreator() {
    const [workspaceName, setWorkspaceName] = useState('null');
  return (
    <div>
        <Workspaces/>
    </div>
  )
}

export default Homecreator