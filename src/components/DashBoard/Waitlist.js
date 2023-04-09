import React, { useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import GetCookie from '../../hooks/getCookie' ;
import ErrorModal from '../../LoadingSpinner/ErrorModal';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { BsPersonFillAdd } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CgClose } from 'react-icons/cg';

const Waitlist = () => {

const [list, setList] = useState([]);
const [searchList, setSearchList] = useState({});

const [searchName, setSearchName] = useState('');
const [search, setSearch] = useState(false);
const [addName, setAddName] = useState('');

const [loading, setLoading] = useState(true);
const [isLoading ,setIsLoading] = useState(false);
const [error , setError] = useState(false);

const token = GetCookie("Token") ;

const url = "https://coral-app-35v54.ondigitalocean.app/waitlist";

//render list
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
      setList(res.data)
    })
    setLoading(false)
    setIsLoading(false);  
    });  
} return () =>clearTimeout(timerId);
}, [loading]);

//add username
const addUsername = async event =>{
  event.preventDefault();
  setIsLoading(true);
  try {
    setError(null);
    const response = await axios.post(
      url ,
      {username:addName} ,
      { headers :{
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json'
      }}
    );
   const responseData = await response;
   console.log(responseData.data) ;
   setIsLoading(false);
  } 
  catch (err) {
    console.log(err);
    setIsLoading(false);
    setError(err.response.data.error || "SomeThing Went Wrong , Please Try Again .");
  }
setAddName('')
}

//search users by name 
const searchUsername = async event =>{
 setSearch(true)
 for(let i=0 ; i < list.length ; i++){
  if(list[i].username = searchName){
    setSearchList(list[i])
  }
 };
}
// close search 
const closeSearch = () =>{
  window.location.reload(true);
  setSearchName('')
}

//delete users by username 
const deleteUserHandler=async(user)=>{
  setIsLoading(true);
  try {
  setError(null);
  const response = await axios.delete(
    url, {
      headers: {
        'Authorization':` Bearer ${token}`
      },
      data: {
       username: user
      } 
    }
  )
  .then(function (response) { 
    console.log(response);
    setError(response);
    setIsLoading(false);
  })
}catch(err){
  console.log(err);
  setIsLoading(false);
  setError(err.message || "SomeThing Went Wrong , Please Try Again .");
};
}

//modal error handler
const errorHandler =() =>{
  setError(null) ;
} 
  return (
    <div className='row w-100 justify-content-center m-0  px-0'>
    <ErrorModal error={error} onClear={errorHandler} />
    {isLoading && <LoadingSpinner asOverlay/>}
      <h1>Waitlist</h1>
      <Row className='p-0 my-2'>
        <div className='col-lg-6 col-12 px-4 p-1 '>
          <input
          value={addName}
          onChange={(e) => { setAddName(e.target.value) }}
          type="name"
          placeholder="Add UserName"
          className="col-lg-8 col-8 p-3 rounded border-0 " />
          <Button disabled={!addName}
           className='add-btn col-md-2 col-3 mx-1 bg-info border-0 fs-3 ' onClick={addUsername}><BsPersonFillAdd/></Button>
        </div>
        <div className='col-lg-6 col-12 px-4 p-1 '>
          <input
          value={searchName}
          onChange={(e) => { setSearchName(e.target.value) }}
          type="name"
          placeholder="Search UserName"
          className="col-lg-8 col-8 p-3 rounded border-0" />
          {!search ? 
          <Button disabled={!searchName}
           className='search-btn col-md-2 col-3 mx-1 bg-success border-0 fs-3'
           onClick={searchUsername}>
           <FaSearch/>
          </Button> 
           : 
          <Button
           className='delete-btn col-md-2 col-3 mx-1 border-0 fs-3'
           onClick={closeSearch}>
           <CgClose/>
          </Button>}
        </div>
      </Row>
    {list? <div>      
      <Row className='px-lg-5 p-0'> 
        <div className='row bg-secondary text-white p-3 m-1 rounded' >
          <span className='col-4 fw-bold '>UserName</span>
          <span className='col-4 fw-bold '>Added_At</span>
        </div>
      </Row>
      <Row className='px-lg-5 p-0'>
        {!search ? list.map((user)=>(
          <div  key={user._id} className='row bg-white text-black p-2 m-1 rounded' >
            <span className='col-4'>{user.username} </span>
            <span className='col-4'>{user.added_at} </span>
            <div className='col-4 text-center p-0'>
              <Button onClick={()=>deleteUserHandler(user.username)}
              className='delete-btn col-md-4 col-sm-6 col-9 border-0 fs-4'>
                <RiDeleteBin5Fill/>
              </Button>
            </div>
          </div>
        )) :      
       <div  key={searchList._id} className='row bg-white text-black p-2 m-1 rounded' >
        <span className='col-4'>{searchList.username} </span>
        <span className='col-4'>{searchList.added_at} </span>
        <div className='col-4 text-center p-0'>
          <Button onClick={()=>deleteUserHandler(searchList.username)}
          className='delete-btn col-md-4 col-sm-6 col-9 border-0 fs-4'>
            <RiDeleteBin5Fill/>
          </Button>
        </div>
      </div> }
      </Row>
    </div>  : <h1 className='text-white p-5 m-5'>No Users In Waitlist </h1>}
    </div>
  )
}

export default Waitlist
