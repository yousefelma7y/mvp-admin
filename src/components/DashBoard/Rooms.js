import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Rooms.css';

import GetCookie from '../../hooks/getCookie' ;
import ErrorModal from '../../LoadingSpinner/ErrorModal';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AiFillFolderAdd } from 'react-icons/ai';
import { TbArrowBigRightLineFilled } from 'react-icons/tb';
import { BiLoader } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CgClose } from 'react-icons/cg';


// today date
var today = new Date();
var currDay = ('0' + today.getDate()).slice(-2);
var currMonth = ('0' + (today.getMonth()+1)).slice(-2);
var currYear =  today.getFullYear();

//search rooms
const getFilteredItems = (searchName, rooms ,From ,To) => {
  if (!searchName ) {
    return rooms;
  }
  return rooms.filter((room) => room.name.includes(searchName));
};

const Rooms = () => {

const [paginationElements ,setPaginationElements ] = useState(6);
const loadMore = () => {
  setPaginationElements(paginationElements + 2) ;
}

const [loading, setLoading] = useState(true);
const [isLoading ,setIsLoading] = useState(false);
const [error , setError] = useState(false);

const token = GetCookie("Token") ;
const url = "https://coral-app-35v54.ondigitalocean.app/rooms";
const [rooms, setRooms] = useState([]);

//render Rooms
useEffect(() => {
  let timerId;
  if(loading) { 
    setIsLoading(true);
    timerId = setTimeout(async () => {
    await axios.get(url ,{
      headers :{
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res => {
      setRooms(res.data.items)
      console.log(res.data)
    })
    setLoading(false)
    setIsLoading(false);  
    });  
} return () =>clearTimeout(timerId);
}, [loading]);

// for(let i=0 ; i < rooms.length ; i++) {
//   for (var k1 in rooms[i].players)
//   for (var k2 in rooms[i].players)
//   if (rooms[i].coinsSummary[rooms[i].players[k1]] > rooms[i].coinsSummary[rooms[i].players[k2]])
//   [rooms[i].players[k1], rooms[i].players[k2]] =
//   [rooms[i].players[k2], rooms[i].players[k1]];
// }

//search 
const [searchName, setSearchName] = useState('');
const [From, setFrom] = useState('');
const [To, setTo] = useState('');
const filteredItems = getFilteredItems(searchName, rooms ,From ,To);

const errorHandler =() =>{
  setError(null) ;
} 
// console.log(
//          From.slice(-10 ,-6) ,
//         From.slice(-5 ,-3),
//         From.slice(-2) 
// )
// const oneSlice =  rooms.slice(0,paginationElements) ;
  return (
    <div className='row w-100 justify-content-center py-3 m-0'>
    <ErrorModal error={error} onClear={errorHandler} />
    {isLoading && <LoadingSpinner asOverlay/>}
    {rooms.length === 0 ? <h1 className='m-5 p-5' >No Rooms</h1> : ''}
    <div className='py-3 mb-3 '>
    <div className='row p-1 w-100'>

      {/* <div className='col-sm-4 col-6'>
        <label className='fw-bold  m-1 text-start'>From : </label>
        <input type='date'
            onChange={(e) => { setFrom(e.target.value) }}
            className=' m-1 border-0 rounded p-3'
            placeholder="Room Name" />
      </div>

      <div className='col-sm-4 col-6'>
        <label className='fw-bold  m-1 text-start'>To : </label>
        <input type='date'
          onChange={(e) => { setTo(e.target.value) }}
          className=' m-1 border-0 rounded p-3'
          placeholder="Room Name" />
      </div> */}

      <div className='col-sm-4 col-12 '>
       <input
        onChange={(e) => { setSearchName(e.target.value) }}
        type="name"
        placeholder="Search RoomName"
        className=" p-3 rounded border-0 " />
      </div>

    </div>

      { !filteredItems.length==0 ? filteredItems.map((data) => (
          // data.startDate.slice(0,-20)<=From.slice(-10 ,-6) && 
          // data.startDate.slice(5,-17)<=From.slice(-5 ,-3)&&
          // data.startDate.slice(8,-14)<= From.slice(-2) && 
          // data.endDate.slice(0,-14) <= To &&
        <Link key={data._id} className='text-decoration-none p-0 m-0' to={`/selected-rooms/${data._id}`}>
        <div className={
         data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
         data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
         data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
        'active bg-success m-1 py-3 p-1 rounded row col-12 text-white ':
        'not-active bg-light m-1 py-3 p-1 rounded row col-12 text-dark'} >   

        <div className='row col-12 '>
         <span className='col-sm-4 col-3 p-0 m-0 fw-bold' >{data.name}</span> 
         <span className={ data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
         data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
         data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)? 
         'col-sm-8 col-9 date ':'col-sm-8 col-9 date text-secondary'}>
            <span className='text-black fw-bold'>Date :</span>
            <span className='mx-2'> { data.startDate.slice(0,-14)}</span> 
            {/* <TbArrowBigRightLineFilled className='fs-1 '/>  */}-
            <span className='mx-2'>{data.endDate.slice(0,-14)}</span>
          </span>

          <div className='col-sm-4 col-3 p-0'>
            <span className='fw-bold'>Players : </span> 
            <span className=''> {data.players.length}/{data.players.length}</span>
          </div>

        {data.paymentStart && data.paymentEnd&& 
        <span className={ data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
         data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
         data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)? 
         'col-sm-8 col-9 date ':'col-sm-8 col-9 date text-secondary'}>
            <span className='text-black fw-bold'>PaymentDate :</span>
            <span className='mx-2'> {data.paymentStart.slice(0,-14)}</span> 
             {/* <TbArrowBigRightLineFilled className='fs-1 '/>  */}-
            <span className='mx-2'>{data.paymentEnd.slice(0,-14)}</span>
          </span>
          }
        </div>
       </div>
      </Link>       
      )) : 
      <div>
        <h1>
          No Rooms Here
        </h1>
      </div>
      }

    </div>
    <Row className='p-0 justify-content-center '>
      <Button onClick={loadMore}
      className='load-btn mx-2 p-3 col-md-3 col-sm-5 col-6 p-0 fw-bold border-0'>
        <BiLoader className='fs-3'/> More Rooms
      </Button>
      <Link to="/add-room" className='col-md-3 col-sm-5 col-5 p-0 '>
        <Button className='add-btn w-100 p-3 fw-bold bg-info border-0'>
          <AiFillFolderAdd className='fs-3'/> Add Room
        </Button>
      </Link>
    </Row>
    </div>
  )
}

export default Rooms
