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
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiLoader } from 'react-icons/bi';

// today date
var today = new Date();
var currDay = ('0' + today.getDate()).slice(-2);
var currMonth = ('0' + (today.getMonth()+1)).slice(-2);
var currYear =  today.getFullYear();

const Rooms = () => {

const [paginationElements ,setPaginationElements ] = useState(6);
const loadMore = () => {
  setPaginationElements(paginationElements + 2) ;
}

const [rooms, setRooms] = useState({
  "results": [
    {
      "_id": "63cc06801e2a5edff27f01e4",
      "startDate":"2022-03-17",
      "endDate": "2022-03-23",
      "players": [
        "yassin",
        "fo2sh",
        "yousef",
        "ziad" ,
        "hamed"    
      ],
      "coinsSummary": {
        "fo2sh": 26.5,
        "yassin": 59.5,
        "yousef": 80 ,
        "ziad" : 70 ,
        "hamed" : 40    
      },
      "prizeRanges": [
        200,
        100,
        50
      ],
      "name": "Room 1"
    } ,
    {
      "_id": "63cc06343e2a5edff27f01e3",
      "startDate":"2023-03-20",
      "endDate": "2023-03-30",
      "players": [
        "yassin",
        "fo2sh",
        "yousef",
        "ziad" ,
        "hamed"    
      ],
      "coinsSummary": {
        "fo2sh": 26.5,
        "yassin": 59.5,
        "ziad": 80 ,
        "yousef": 70 ,
        "hamed" : 40    
      },
      "prizeRanges": [
        200,
        100,
        50
      ],
      "name": "Room 2"
    },
    {
      "_id": "63cc063345e2a5edff27f01e3",
      "startDate": "2022-09-09",
      "endDate": "2023-09-13",
      "players": [
        "yassin",
        "fo2sh",
        "yousef",
        "ziad" ,
        "hamed"    
      ],
      "coinsSummary": {
        "fo2sh": 26.5,
        "yassin": 59.5,
        "ziad": 80 ,
        "yousef": 70 ,
        "hamed" : 40    
      },
      "prizeRanges": [
        200,
        100,
        50
      ],
      "name": "Room 3"
    },
    {
      "_id": "63cc06343e2asad5edff27f01e3",
      "startDate": "2022-09-09",
      "endDate": "2023-09-13",
      "players": [
        "yassin",
        "fo2sh",
        "yousef",
        "ziad" 
      ],
      "coinsSummary": {
        "fo2sh": 26.5,
        "yassin": 59.5,
        "ziad": 80 ,
        "yousef": 70   
      },
      "prizeRanges": [
        200,
        100,
        50
      ],
      "name": "Room 4"
    }
  ]
});
for(let i=0 ; i < rooms.results.length ; i++) {
  for (var k1 in rooms.results[i].players)
  for (var k2 in rooms.results[i].players)
  if (rooms.results[i].coinsSummary[rooms.results[i].players[k1]] > rooms.results[i].coinsSummary[rooms.results[i].players[k2]])
  [rooms.results[i].players[k1], rooms.results[i].players[k2]] =
  [rooms.results[i].players[k2], rooms.results[i].players[k1]];
}

const [loading, setLoading] = useState(true);
const [isLoading ,setIsLoading] = useState(false);
const [error , setError] = useState(false);

const token = GetCookie("Token") ;
const url = "https://coral-app-35v54.ondigitalocean.app/rooms";

//render Rooms

// useEffect(() => {
//   let timerId;
//   if(loading) { 
//     setIsLoading(true);
//     timerId = setTimeout(async () => {
//     await axios.get(url ,{
//       headers :{
//         'Authorization':`Bearer ${token}`
//       }
//     })
//     .then(res => {
//       setRooms(res.data)
//     })
//     setLoading(false)
//     setIsLoading(false);  
//     });  
// } return () =>clearTimeout(timerId);
// }, [loading]);

const errorHandler =() =>{
  setError(null) ;
} 
const oneSlice =  rooms.results.slice(0,paginationElements) ;
  return (
    <div className='row w-100 justify-content-center py-3 m-0'>
    <ErrorModal error={error} onClear={errorHandler} />
    {isLoading && <LoadingSpinner asOverlay/>}
    {oneSlice.length === 0 ? <h1 className='m-5 p-5' >No Rooms</h1> : ''}
    <div className='py-3 mb-3'>
      {oneSlice.map((data) => (
        <Link key={data._id} className='text-decoration-none p-0 m-0' to={`/selected-rooms/${data._id}`}>
        <div className={
         data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
         data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
         data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
        'active bg-success m-1 py-3 p-1 rounded row col-12 text-white ':
        'not-active bg-light m-1 py-3 p-1 rounded row col-12 text-dark'} >   

        <div className='row col-sm-11 col-10'>
         <h4 className='col-sm-2 col-5 p-0 m-0' >{data.name}</h4> 
         <div className='col-sm-3 col-6 p-0'>
            <span className='fw-bold'>Players : </span> 
            <span className=''>{data.players.length}</span>
          </div>
         <span className={ data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
         data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
         data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)? 
         'col-sm-7 col-12 date ':'col-sm-7 col-12 date text-secondary'}>
            <span className='mx-2'> {data.startDate}</span> 
             <TbArrowBigRightLineFilled className='fs-1 '/> 
            <span className='mx-2'>{data.endDate}</span>
          </span>
        </div>

        <div className={
           data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
           data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
           data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
          "d-none" : 'col-sm-1 col-2 text-center p-0' }>
          <Button className='delete-btn col-12 border-0 fs-4'>
            <RiDeleteBin5Fill/>
          </Button>
        </div>
       </div>
      </Link>       
      ))}
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
