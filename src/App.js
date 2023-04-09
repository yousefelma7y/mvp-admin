import React, { useContext } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signin from './components/Signin/Signin';
import DashBoard from './components/DashBoard/DashBoard';
import {AuthProvider , AuthContext } from './AuthContext';

function App() {
  const authContext = useContext(AuthContext);

  return (
    <div className="app">
    <BrowserRouter>
    {authContext.auth.name ?   
      <Routes>
        <Route path="/*" element={<DashBoard />} />
      </Routes> 
      :
      <Routes> 
        <Route path="/" element={<Signin />} />
      </Routes> 
    }
    </BrowserRouter>  
    </div>
  );
}

function AppWithStore(){
  return (<AuthProvider>
    <App />
  </AuthProvider>);
}

export default AppWithStore;
