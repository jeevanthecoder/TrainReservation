import React, { useState } from 'react'
import "../style.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Updatetrain(props) {


  const navigate = useNavigate()

  if(props.trainData === ''){
    window.location.href = '/'
  }
  const date_list = props.trainData.dateOfJourney.split("-")||[];
  const time = props.trainData.time.split(':')[0]+":"+props.trainData.time.split(':')[1]||''
  let date = ""
  for(let i=0; i<date_list.length; i++){
    date = date + date_list[i]
    if(i!== date_list.length-1){
      date = date+"-"
    }
  }
 
  const [token] = useState(localStorage.getItem('authToken') || null);

  const [isClass, setIsClass] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const classData = {
    gseats:'',
    gcost:'',
    aseats:'',
    acost:'',
    sseats:'',
    scost:''
  }
  for(let i=0; i<props.trainData.classType.length; i++){
    if(props.trainData.classType[i].classtype === 'General'){
      classData.gseats = props.trainData.classType[i].numberOfSeats
      classData.gcost = props.trainData.classType[i].costPerSeat
    }
    if(props.trainData.classType[i].classtype === 'AC'){
      classData.aseats = props.trainData.classType[i].numberOfSeats
      classData.acost = props.trainData.classType[i].costPerSeat
    }
    if(props.trainData.classType[i].classtype === 'Sleeper'){
      classData.sseats = props.trainData.classType[i].numberOfSeats
      classData.scost = props.trainData.classType[i].costPerSeat
    }
  }

  const [trainDetails, setTrainDetails] = useState({
    trainNumber: props.trainData.trainNumber,
    trainName: props.trainData.trainName,
    source: props.trainData.source,
    destination: props.trainData.dest,
    date: date,
    time: time,
    general: classData.gseats,
    ac:classData.aseats,
    sleeper: classData.sseats,
    gprice: classData.gcost,
    acprice: classData.acost,
    sprice: classData.scost
  });

  const num = props.trainData.trainNumber

      const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainDetails({
          ...trainDetails,
          [name]: value,
        });
      };

      const classType = []
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if((trainDetails.ac!==''&&trainDetails.acprice!=='')||(trainDetails.general!==''||trainDetails.gprice!=='')||(trainDetails.sleeper!==''||trainDetails.sprice!=='')){
          setIsClass(false)
          if(trainDetails.general!==''||trainDetails.gprice!==''){
           const newClass =  {
              classtype: 'General',
              numberOfSeats: Number(trainDetails['general']),
              costPerSeat: trainDetails.gprice
            }
            classType.push(newClass)
          }
          if(trainDetails.ac!==''&&trainDetails.acprice!==''){
            const newClass = {
                classtype: 'AC',
                numberOfSeats: Number(trainDetails['ac']),
                costPerSeat: trainDetails.acprice
              
            }
            classType.push(newClass)
          }
          if(trainDetails.sleeper!==''||trainDetails.sprice!==''){
            const newClass = {
              classtype: 'Sleeper',
              numberOfSeats: Number(trainDetails['sleeper']),
              costPerSeat: trainDetails.sprice
            }
            classType.push(newClass)
          }
      
          let formatedDetails = {
            trainNumber: trainDetails['trainNumber'],
            trainName: trainDetails['trainName'],
            classType: classType,
            source: trainDetails['source'],
            dest: trainDetails['destination'],
            dateOfJourney: trainDetails['date'],
            time: trainDetails['time'] + ":11",
          }
      

        const headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log(formatedDetails)
        try {
          
          const user = localStorage.getItem('currentUser')
          const response = await axios.put(`http://localhost:7002/admin/update-TrainDetails/${num}`, formatedDetails, {
            headers: headers,
          });
    
          console.log('Server response:', response.status);
          navigate('/admin')
          window.location.reload()
        } catch (error) {
          // Handle errors
          setIsEmpty(true)
          console.error('Error sending data to server:', error);
        }
      }
      else{
        setIsClass(true)
      }
      };


  return (
    <div>
    {token?<div className="train-form-container">
    <h2>Train Details Form</h2>
    {isClass&&<p className='wrong'>please give atleast one class seats and price</p>}
    {isEmpty&&<p className='wrong'>fill all the fields</p>}
    <form onSubmit={handleSubmit}>
      <label>
        Train Number:
        <input
          type="text"
          name="trainNumber"
          value={trainDetails.trainNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        Train Name:
        <input
          type="text"
          name="trainName"
          value={trainDetails.trainName}
          onChange={handleChange}
        />
      </label>
      <label>
        Source:
        <input
          type="text"
          name="source"
          value={trainDetails.source}
          onChange={handleChange}
        />
      </label>
      <label>
        Destination:
        <input
          type="text"
          name="destination"
          value={trainDetails.destination}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={trainDetails.date}
          onChange={handleChange}
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          name="time"
          value={trainDetails.time}
          onChange={handleChange}
        />
      </label>
      <label>
            No of seats in General:
            <input
              className='classInput'
              type="number"
              name="general"
              value={trainDetails.general}
              onChange={handleChange}
            />
            <input
              className='classInput'
              type="number"
              name="gprice"
              value={trainDetails.gprice}
              onChange={handleChange}
              placeholder='price per seat'
            />
          </label>
          <label>
            No of seats in AC:
            <input
              className='classInput'
              type="number"
              name="ac"
              value={trainDetails.ac}
              onChange={handleChange}
            />
            <input
              className='classInput'
              type="number"
              name="acprice"
              value={trainDetails.acprice}
              onChange={handleChange}
              placeholder='price per seat'
            />
          </label>
          <label>
            No of seats in Sleeper:
            <input
              className='classInput'
              type="number"
              name="sleeper"
              value={trainDetails.sleeper}
              onChange={handleChange}
            />
            <input
              className='classInput'
              type="number"
              name="sprice"
              value={trainDetails.sprice}
              onChange={handleChange}
              placeholder='price per seat'
            />
          </label>
      <button type="submit">Submit</button>
    </form>
  </div>:
  <div>not logged in</div>
  }
    
  </div>
  )
}

export default Updatetrain