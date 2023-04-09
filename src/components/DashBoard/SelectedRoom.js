import React, { useReducer, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'

import { TbArrowBigRightLineFilled } from 'react-icons/tb';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdGroupRemove } from 'react-icons/md';
import { BsPersonFillAdd } from 'react-icons/bs';

import { validate, VALIDATOR_MINLENGTH } from "../../util/validators";

import goldMedal from "../../images/medals/gold.png";
import silverMedal from "../../images/medals/silver.png";
import bronzeMedal from "../../images/medals/bronze.png";
import normalMedal from "../../images/medals/normal.png";
import { useParams } from 'react-router-dom';
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
  const [rooms, setRooms] = useState({
    "results": [
      {
        "_id": "63cc06801e2a5edff27f01e4",
        "startDate": "2022-03-17",
        "endDate": "2022-03-23",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad",
          "hamed"
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "yousef": 80,
          "ziad": 70,
          "hamed": 40
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 1"
      },
      {
        "_id": "63cc06343e2a5edff27f01e3",
        "startDate": "2023-03-20",
        "endDate": "2023-03-30",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad",
          "hamed"
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80,
          "yousef": 70,
          "hamed": 40
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
          "ziad",
          "hamed"
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80,
          "yousef": 70,
          "hamed": 40
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
          "ziad": 80,
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
  //arrange players array from hight score to lower
  for (let i = 0; i < rooms.results.length; i++) {
    for (var k1 in rooms.results[i].players)
      for (var k2 in rooms.results[i].players)
        if (rooms.results[i].coinsSummary[rooms.results[i].players[k1]] > rooms.results[i].coinsSummary[rooms.results[i].players[k2]])
          [rooms.results[i].players[k1], rooms.results[i].players[k2]] =
            [rooms.results[i].players[k2], rooms.results[i].players[k1]];
  }

 //FormName validation
 const [formNameState, dispatch] = useReducer(formNameReducer, {
  value: '',
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

const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [playerList, setplayerList] = useState([]);
const [player, setPlayer] = useState('');
const addPlayerHandler = () => {
  playerList.push(player)
  setPlayer('')
}
// console.log(startDate , endDate)

//submit change in Room
const handleEditRoom = ()=>{

}
  return (
    <>
      {rooms.results.map((data) => (data._id === id ?

        <div className='row w-100 justify-content-center ' key={data._id}>
          {data.startDate.slice(-10, -6) <= currYear && data.startDate.slice(-10, -6) >= currYear &&
            data.startDate.slice(-5, -3) <= currMonth && currMonth <= data.endDate.slice(-5, -3) &&
            data.startDate.slice(-2) <= currDay && currDay <= data.endDate.slice(-2) ?
            <div  className='bg-success m-1 my-4 py-3 p-4 rounded row col-12 text-white '>
              <h2 className="col-sm-4  fw-bold"  >{data.name}</h2>
              <div className='row col-sm-8  py-3 fw-bold'>
                <span className='col-12 date'>
                  <span className='mx-2'> {data.startDate}</span>
                  <TbArrowBigRightLineFilled className='fs-1 ' />
                  <span className='mx-2'>{data.endDate}</span>
                </span>
              </div>
              {data.players.map((player, index) => (
                <div className="single-score" key={player}>
                  <span className="fw-bold">{player}</span>
                  <span className="">
                    {index < 5 && (
                      <img
                        className="prize-icon"
                        src={medals[index]}
                        alt="medal"
                      />
                    )}
                    <span className='fw-bold text-warning' >
                      {data.prizeRanges[index]} EGP</span>
                    <span className='px-2'>{data.coinsSummary[player]} pts</span>
                  </span>
                </div>
              ))}
            </div>
            :
            <form onSubmit={handleEditRoom}  key={data._id}>
              <div className='selected-notActive-room m-1 my-4 py-3 p-4 rounded row col-12 text-dark '>
                <div className='col-12 text-end p-0 row'>
                    <h1 className='col-md-11 col-10 text-center'>Edit Room</h1>
                    <Button className='delete-btn col-md-1 col-2 border-0 fs-4'>
                      <RiDeleteBin5Fill />
                    </Button>
                </div>
         
                <div className='row col-12 py-3 fw-bold m-0 p-0'>
                <Form.Group className="col-md-10 col-9 m-1 p-0" >
                  <Form.Control
                    type="name"
                    name="RoomName"
                    onChange={formNameChangeHandler}
                    onBlur={formNameTouchHandler}
                    isValid={formNameState.isValid}
                    value={formNameState.value}
                    placeholder={data.name}                     
                    className={`p-3 ${
                      !formNameState.isValid &&
                      formNameState.isTouched &&
                      "form-control-invalid"
                    }`}
                  />
                </Form.Group>    
                <input type='name'
                  value={player}
                  onChange={(e) => { setPlayer(e.target.value) }}
                  className='col-md-10 col-9 m-1 border-0 rounded p-3' placeholder="Add Players To This Room" />
                  <Button 
                  disabled={!player}
                  className='col-md-1 col-2 bg-success border-0 fs-3 m-1' onClick={addPlayerHandler}>
                    <BsPersonFillAdd />
                  </Button>
                  
                  <input type='date'
                  value={data.startDate}
                  onChange={(e) => { setStartDate(e.target.value) }}
                  className=' col-sm-5 col-10 m-1 border-0 rounded p-3'
                  placeholder="Room Name" />

                  <input type='date'
                  value={data.endDate}
                  onChange={(e) => { setEndDate(e.target.value) }}
                  className=' col-sm-5 col-10 m-1 border-0 rounded p-3'
                  placeholder="Room Name" />

                
                </div>

                {data.players.map((player, index) => (
                  <div className="single-score" key={player}>
                    <span className="fw-bold">{player}</span>
                    <span className="">
                      {index < 5 && (
                        <img
                          className="prize-icon"
                          src={medals[index]}
                          alt="medal"
                        />
                      )}
                      <span className='fw-bold text-danger' >
                        {data.prizeRanges[index]} EGP</span>
                      <span className='px-2'>{data.coinsSummary[player]} pts</span>
                    </span>
                    <Button className='delete-btn border-0 fs-4'>
                      <MdGroupRemove />
                    </Button>
                  </div>
                ))}
              </div>
              <div className=''>
                <Button type='submit'
                className='fw-bold p-3 col-md-3 col-4'>Submit</Button>
              </div>
            </form>
          }
        </div>
        : ''
      ))}
    </>
  )
}

export default SelectedRoom
