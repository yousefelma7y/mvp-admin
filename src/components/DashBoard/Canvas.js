import React, { useState , useContext } from 'react';
import {AuthContext} from "../../AuthContext";

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { BsMenuButtonWideFill } from 'react-icons/bs';
import RemoveCookie from '../../hooks/removeCookie';

import { useLocation } from "react-router-dom";


const Canvas = () => {

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authContext = useContext(AuthContext);
  function logout(){
    localStorage.removeItem("UserData");
    RemoveCookie("Token");
    window.location.href = '/' ;
  }


  return (
    <div className='d-lg-none'>
    <Button variant="primary" onClick={handleShow} className="canvas-btn p-3 rounded">
      <BsMenuButtonWideFill/>
    </Button>

    <Offcanvas show={show} onHide={handleClose} className="canvas-body text-white">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className=' text-center'>
      <div className="canvas-links row justify-content-center p-5">
          <a className={splitLocation[1] === "" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/"}>
            Waitlist 
          </a>
          <a className={splitLocation[1] === "rooms" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/rooms"}>
          Rooms 
          </a>
          <a className={splitLocation[1] === "prizes" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/add-players"}>
          Add Players 
          </a>   
          <a className='logout-btn p-3 my-5 rounded fs-5' href={"/"} onClick={logout}>
          LOG OUT  
          </a> 
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  </div>
  )
}

export default Canvas