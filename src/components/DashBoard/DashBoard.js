import React from 'react';
import RemoveCookie from '../../hooks/removeCookie';
import Canvas from './Canvas';
import Prizes from './Prizes';
import Rooms from './Rooms';
import Waitlist from './Waitlist';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './Dashboard.css'
import { Row } from 'react-bootstrap';
import AddRoom from './AddRoom';
import SelectedRoom from './SelectedRoom';

const DashBoard = () => {

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const logout=()=>{
   localStorage.removeItem("UserData");
   RemoveCookie("Token");
   window.location.href = '/' ;
  }
  return (
    <div className='row text-white p-3 m-0 w-100'>    
    <Row className='justify-content-center'>
      <div className='col-2'>
        <Canvas />
      </div>
      <div className='row col-lg-12 col-10 justify-content-center'>
       <h1 className='col-md-6 col-10 dashboard-title rounded p-2'>Admin Portal</h1> 
      </div>
    </Row>

     <div className="d-lg-flex d-none col-3 p-3" style={{ height: "750px" }}>

      <div className=" bg-secondary rounded justify-content-center col-xl-9">     
        <div className="canvas-links row justify-content-center p-5">
          <a className={splitLocation[1] === "" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/"}>
            Waitlist 
          </a>
          <a className={splitLocation[1] === "rooms" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/rooms"}>
          Rooms 
          </a>
          <a className={splitLocation[1] === "prizes" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/prizes"}>
          Prizes 
          </a>   
          <a className='logout-btn p-2 my-5 rounded fs-5' href={"/"} onClick={logout}>
          LOG OUT  
          </a> 
        </div>
      </div>
    </div>
    <div className="col-lg-9 col-12 text-center p-0 m-0 ">
      <Routes>
        <Route exact path="/" element={<Waitlist/>} />
        <Route path="/rooms" element={<Rooms/>} />
        <Route path="/selected-rooms/:id" element={<SelectedRoom/>} />
        <Route path="/add-room" element={<AddRoom/>} />
        <Route path="/prizes" element={<Prizes/>} />
      </Routes>
    </div>
    </div>
  )
}

export default DashBoard
