import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form, Row } from 'react-bootstrap'
import GetCookie from '../../hooks/getCookie';
import { Link } from 'react-router-dom';
import { BsPersonFillAdd } from 'react-icons/bs';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import PlayersCharts from './PlayersCharts';



const AddRoom = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [roomName, setRoomName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [PrizeStartDate, setPrizeStartDate] = useState('');
  const [PrizeEndDate, setPrizeEndDate] = useState('');
  const [rank, setRank] = useState('');

  // const [playerList, setplayerList] = useState([]);
  const [player, setPlayer] = useState('');
  const [prizerangeList, setPrizerangeList] = useState([]);
  const [prizerange, setPrizerange] = useState('');

  const token = GetCookie("Token");
  const url = "https://coral-app-35v54.ondigitalocean.app/rooms";

  // const addPlayerHandler = () => {
  //   playerList.push(player)
  //   setPlayer('')
  // }
  const addPrizeHandler = () => {
    prizerangeList.push({'rank': rank , 'value' : prizerange})
    setPrizerange('')
    setRank('')
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      setError(null);
      const response = await axios.post(
        url,
        {
          name: roomName,
          startDate: startDate,
          endDate: endDate,
          playerCount: player,
          prize: prizerangeList,
          paymentStart : PrizeStartDate ,
          paymentEnd : PrizeEndDate
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const responseData = await response;
      console.log(responseData.data);
      setIsLoading(false);
    }
    catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.response.data.error || "SomeThing Went Wrong , Please Try Again .");
    }
    setRoomName(''); setEndDate(''); setStartDate('');
  }

  return (
    <>
      <Row className='p-0 py-3 justify-content-center m-0 '>
        <form onSubmit={formSubmitHandler}
          className='bg-info text-dark col-lg-10 col-12 p-3 m-0 row justify-content-center rounded'>

          <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Room Name : </label>
          <input type='name'
            value={roomName}
            onChange={(e) => { setRoomName(e.target.value) }}
            className='col-sm-5 col-10 m-1 border-0 rounded p-2'
            placeholder="Room Name" />

          <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Start Date : </label>
          <input type='date'
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value) }}
            className='col-sm-5 col-10 m-1 border-0 rounded p-2'
            placeholder="Room Name" />
          <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>End Date  : </label>
          <input type='date'
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value) }}
            className='col-sm-5 col-10 m-1 border-0 rounded p-2'
            placeholder="Room Name" />

          <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Players : </label>
          <input type='number'
            value={player}
            onChange={(e) => {setPlayer(e.target.value) }}
            className='col-sm-5 col-10 m-1 border-0 rounded p-2' placeholder="Players Number" />
          {/* <Button className='col-sm-1 col-2 bg-success border-0 fs-3 m-1' onClick={addPlayerHandler}>
            <BsPersonFillAdd />
          </Button> */}

          <label className='fw-bold fs-3 col-sm-4 col-10 m-1 text-start px-5'>Prizes : </label>
          <select 
          value={rank}
          onChange={(e)=>(setRank(e.target.value)  )}
          className='col-sm-2 col-4 border-0 rounded my-1 ' aria-label="Default select example">
            <option value="">Rank</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type='number'
            value={prizerange}
            onChange={(e) => { setPrizerange(e.target.value) }}
            className='col-sm-4 col-5 m-1 border-0 rounded p-2' placeholder="Add PrizeRange" />
          <Button disabled={!rank || !prizerange }
          className='col-sm-1 col-2 bg-warning border-0 fs-3 m-1' onClick={addPrizeHandler}>
          <BsDatabaseFillAdd />
          </Button>

          <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Prize Start Date : </label>
          <input type='date'
            value={PrizeStartDate}
            onChange={(e) => { setPrizeStartDate(e.target.value) }}
            className='col-sm-5 col-10 m-1 border-0 rounded p-2'
            placeholder="Room Name" />
          <label className='fw-bold fs-3 col-sm-5 col-10 m-1 text-start'>Prize End Date : </label>
          <input type='date'
            value={PrizeEndDate}
            onChange={(e) => { setPrizeEndDate(e.target.value) }}
            className='col-sm-5 col-10 m-1 border-0 rounded p-2'
            placeholder="Room Name" />



          <Row className='justify-content-center p-3 '>
            <Button disabled={!roomName || !startDate || !endDate || !PrizeStartDate || !PrizeEndDate || !player || prizerangeList.length === 0}
              type='submit' className='col-md-3 col-5 p-2 mx-2 fw-bold'>
              Add Room
            </Button>
            <Link to='/rooms'
              className='delete-btn col-md-3 col-4 p-3 mx-2 fw-bold  border-0 text-white rounded'>
              Cancel
            </Link>
          </Row>
        </form>
      </Row>
      {/* <PlayersCharts /> */}
    </>
  )
}

export default AddRoom
