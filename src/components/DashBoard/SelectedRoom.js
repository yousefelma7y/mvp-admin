import React, { useReducer, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

import { TbArrowBigRightLineFilled } from 'react-icons/tb';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdGroupRemove } from 'react-icons/md';
import { BsPersonFillAdd } from 'react-icons/bs';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import ErrorModal from '../../LoadingSpinner/ErrorModal';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { validate, VALIDATOR_MINLENGTH } from "../../util/validators";

import goldMedal from "../../images/medals/gold.png";
import silverMedal from "../../images/medals/silver.png";
import bronzeMedal from "../../images/medals/bronze.png";
import normalMedal from "../../images/medals/normal.png";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import GetCookie from '../../hooks/getCookie';
const medals = [goldMedal, silverMedal, bronzeMedal, normalMedal, normalMedal];

//today date
var today = new Date();
var currDay = ('0' + today.getDate()).slice(-2);
var currMonth = ('0' + (today.getMonth() + 1)).slice(-2);
var currYear = today.getFullYear();

//formName validation
const formNameReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.formName,
        isValid: validate(action.formName, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const SelectedRoom = () => {
const { id } = useParams();
const [loading, setLoading] = useState(true);
const [isLoading ,setIsLoading] = useState(false);
const [error , setError] = useState(false);

const token = GetCookie("Token") ;
const url = `https://coral-app-35v54.ondigitalocean.app/rooms/${id}`;
const [rooms, setRooms] = useState([]);
const [players, setPlayers] = useState([]);

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
      setRooms(res.data.room ,)
      setPlayers(res.data.players)
        console.log({
        'room':  res.data.room,
        'players' :  res.data.players
      })

      })
      setLoading(false)
      setIsLoading(false);  
      });  
  } return () =>clearTimeout(timerId);
  }, []);
  
  //arrange players array from hight score to lower
  // for (let i = 0; i < rooms.length; i++) {
  //   for (var k1 in rooms[i].players)
  //     for (var k2 in rooms[i].players)
  //       if (rooms[i].coinsSummary[rooms[i].players[k1]] > rooms[i].coinsSummary[rooms[i].players[k2]])
  //         [rooms[i].players[k1], rooms[i].players[k2]] =
  //           [rooms[i].players[k2], rooms[i].players[k1]];
  // }

 //FormName validation
 const [formNameState, dispatch] = useReducer(formNameReducer, {
  value: rooms.name,
  isValid: false,
  isTouched: false,
});

const formNameChangeHandler=(event) => {
  dispatch({
    type: "CHANGE",
    formName: event.target.value,
    validators: [VALIDATOR_MINLENGTH(3)],
  });
};
const formNameTouchHandler = () => {
  dispatch({
    type: "TOUCH",
  });
};

const [startDate, setStartDate] = useState(rooms.startDate && rooms.startDate.slice(0, -14));
const [endDate, setEndDate] = useState(rooms.endDate && rooms.endDate.slice(0, -14));

const [paymentStart, setPaymentStart] = useState(rooms.paymentStart && rooms.paymentStart.slice(0, -14));
const [paymentEnd, setPaymentEnd] = useState(rooms.paymentEnd && rooms.paymentEnd.slice(0, -14));
const [prizerangeList, setPrizerangeList] = useState([]);
const [prizerange, setPrizerange] = useState('');
const [rank, setRank] = useState('');

const [playerList, setplayerList] = useState([]);
const [player, setPlayer] = useState('');
const [playerNumber, setPlayerNumber] = useState(rooms.players);

const addPlayerHandler = () => {
  playerList.push(player)
  setPlayer('')
}
const addPrizeHandler = () => {
  prizerangeList.push({'rank': rank , 'value' : prizerange})
  setPrizerange('')
  setRank('')
}

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const deleteRoomHandler=async()=>{
  setIsLoading(true);
  try {
  setError(null);
  const response = await axios.delete(
   ` https://coral-app-35v54.ondigitalocean.app/rooms/${id}`,
   { headers :{
      'Authorization':`Bearer ${token}`
    }
  }
  )
  const responseData = await response;
  console.log(responseData.data)
  setError(responseData.data.message);
  setIsLoading(false);
  window.location.href = '/rooms' ;
}catch (err) {
  setIsLoading(false);
  setError(err.message || "SomeThing Went Wrong , Please Try Again .");
};
}

const deletePlayerHandler=async(playerId)=>{
  setIsLoading(true);
  try {
  setError(null);
  const response = await axios.delete(
   ` https://coral-app-35v54.ondigitalocean.app/rooms/${id}/details/${playerId}`,
   { headers :{
      'Authorization':`Bearer ${token}`
    }
  }
  )
  const responseData = await response;
  console.log(responseData.data)
  setError(responseData.data.message);
  setIsLoading(false);
}catch (err) {
  setIsLoading(false);
  setError(err.message || "SomeThing Went Wrong , Please Try Again .");
};
}

//submit change in Room
const handleEditRoom =async(e ,roomId)=>{
  e.preventDefault();
  // console.log(roomId)
  setIsLoading(true);
  try {
  setError(null);
  const response = await axios.patch(
   ` https://coral-app-35v54.ondigitalocean.app/rooms/${roomId}`,
   { headers :{
      'Authorization':`Bearer ${token}`
    },
    body:{
      name : formNameState.value ,
      startDate : startDate ,
      endDate : endDate,
      players: playerNumber,
      paymentStart : paymentStart,
      paymentEnd:paymentEnd ,
      prize : prizerangeList
    }
  }
  )
  const responseData = await response;
  console.log(responseData)
  setError(responseData.data.message);
  setIsLoading(false);
}catch (err) {
  setIsLoading(false);
  setError(err.message || "SomeThing Went Wrong , Please Try Again .");
};
}

const errorHandler =() =>{
  setError(null) ;
} 
  return (
    <> 
     <ErrorModal error={error} onClear={errorHandler} />
    {isLoading && <LoadingSpinner asOverlay/>}
        <div className='row w-100 justify-content-center '>
        <>
          <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
              <Modal.Title >Delete This Room ? </Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
            <Modal.Footer className='justify-content-center p-4'>
              <Button variant="secondary" onClick={handleClose} className='col-4'>
                Close
              </Button>
              <Button variant="primary" onClick={deleteRoomHandler} className='col-4 delete-btn border-0'>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
          {/* {rooms.startDate? rooms.endDate ? rooms.startDate.slice(0,-20) <= currYear && rooms.endDate.slice(0,-20) >= currYear &&
            rooms.startDate.slice(5, -17) <= currMonth && currMonth <= rooms.endDate.slice(5, -17) &&
            rooms.startDate.slice(8, -14) <= currDay && currDay <= rooms.endDate.slice(8, -14) :'':'' ?
            <div  className='bg-success m-1 my-4 py-3 p-4 rounded row col-12 text-white '>
              <h2 className="col-sm-4  fw-bold"  >{rooms.name}</h2>
              <div className='row col-sm-8  py-3 fw-bold'>
                <span className='col-12 date'>
                  <span className='mx-2'> {rooms.startDate}</span>
                  <TbArrowBigRightLineFilled className='fs-1 ' />
                  <span className='mx-2'>{rooms.endDate}</span>
                </span>
              </div>
             {players.map((player, index) => (
                <div className="single-score" key={player._id}>
                  <span className="fw-bold">{player.username}</span>
                  <span className="">
                    {index < 5 && (
                      <img
                        className="prize-icon"
                        src={medals[index]}
                        alt="medal"
                      />
                    )}
               <span className='fw-bold text-warning' >
                      {rooms.prizeRanges[index]} EGP</span>
                    <span className='px-2'>{rooms.coinsSummary[player]} pts</span>
                  </span> 
              </div>
              ))}
            </div>
       : */}
            <form onSubmit={(e)=>handleEditRoom(e,rooms._id)}  key={rooms._id}>
              <div className='selected-notActive-room m-1 my-4 py-3 p-4 rounded row col-12 text-dark '>
                <div className='col-12 text-end p-0 row'>
                    <h1 className='col-md-11 col-10 text-center'>Edit Room</h1>
                    <Button onClick={handleShow}
                    className='delete-btn col-md-1 col-2 border-0 fs-4'>
                      <RiDeleteBin5Fill />
                    </Button>
                </div>
         
                <div className='row col-12 py-3 fw-bold m-0 p-0'>

                <div className='row'>
                  <span className='col-lg-3 col-5 py-3 p-0'>RoomName:</span>
                  <Form.Group className="col-lg-3 col-6 m-1 p-0" >
                    <Form.Control
                      type="name"
                      name="RoomName"
                      onChange={formNameChangeHandler}
                      onBlur={formNameTouchHandler}
                      isValid={formNameState.isValid}
                      value={formNameState.value}
                      placeholder={rooms.name}                     
                      className={`p-3 ${
                        !formNameState.isValid &&
                        formNameState.isTouched &&
                        "form-control-invalid"
                      }`}
                    />
                  
                  </Form.Group>    
                  
                    <span className='col-lg-3 col-5 py-3 p-0'>PlayersNumber:</span>
                      <input type='number'
                      value={playerNumber}
                      onChange={(e) => { setPlayerNumber(e.target.value) }}
                      className='col-lg-2 col-6  m-1 border-0 rounded p-3' placeholder={rooms.players} />
                    </div>

                  <div className='col-md-6 col-12'>
                    <label className='fw-bold col-3 m-1 text-center py-3'>Prizes : </label>
                    <select 
                    value={rank}
                    onChange={(e)=>(setRank(e.target.value)  )}
                    className=' py-2 col-2 border-0 rounded my-1 ' aria-label="Default select example">
                      <option value="">Rank</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <input type='number'
                      value={prizerange}
                      onChange={(e) => { setPrizerange(e.target.value) }}
                      className=' col-3 m-1 border-0 rounded p-2' placeholder="Add PrizeRange" />
                    <Button disabled={!rank || !prizerange }
                    className=' col-2 bg-warning border-0 fs-4 m-1' onClick={addPrizeHandler}>
                    <BsDatabaseFillAdd />
                    </Button>
                  </div>
                 
                <div className='col-md-6 col-12'>
                <input type='name'
                  value={player}
                  onChange={(e) => { setPlayer(e.target.value) }}
                  className=' col-9 m-1 border-0 rounded p-3' placeholder="Add Players To This Room" />
                <Button 
                  disabled={!player}
                  className=' col-2 bg-success border-0 fs-3 m-1' onClick={addPlayerHandler}>
                  <BsPersonFillAdd />
                </Button>
                </div>
             

           

                  <div className='row w-100 justify-content-center'>  
                    <span className='col-sm-3 col-5 py-3'>Date :</span>
                    <input type='date'
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value) }}
                    className=' col-sm-4 col-10 m-1 border-0 rounded p-3'
                    placeholder="Room Name" />

                    <input type='date'
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value) }}
                    className=' col-sm-4 col-10 m-1 border-0 rounded p-3'
                    placeholder="Room Name" />
                  </div>

                  <div className='row w-100 justify-content-center'> 
                    <span className='col-sm-3 col-5 py-3'>PaymentDate:</span>
                    <input type='date'
                    value={paymentStart}
                    onChange={(e) => { setPaymentStart(e.target.value) }}
                    className=' col-sm-4 col-10 m-1 border-0 rounded p-3'
                    placeholder="Room Name" />

                    <input type='date'
                    value={paymentEnd}
                    onChange={(e) => { setPaymentEnd(e.target.value) }}
                    className=' col-sm-4 col-10 m-1 border-0 rounded p-3'
                    placeholder="Room Name" />
                  </div>    
                </div>

                {players.map((player, index) => (
                  <div className="single-score" key={player._id}>
                    <span className="fw-bold">{player.username}</span>
                    <span className="">
                      {index < 5 && (
                        <img
                          className="prize-icon"
                          src={medals[index]}
                          alt="medal"
                        />
                      )}
                      <span className='fw-bold text-danger' >
                        {rooms.prize[index].value} EGP</span>
                      <span className='px-2'>{player.totalScore} pts</span> 
                    </span>
                    <Button onClick={()=>deletePlayerHandler(player._id)}
                    className='delete-btn border-0 fs-4'>
                      <MdGroupRemove />
                    </Button>
                  </div>
                ))}
              </div>
              <div className=''>
                <Button
                type='submit'
                className='fw-bold p-3 col-md-3 col-4'>Submit</Button>
              </div>
            </form>
          {/* }  */}
        </div>
    </>
  )
}

export default SelectedRoom
