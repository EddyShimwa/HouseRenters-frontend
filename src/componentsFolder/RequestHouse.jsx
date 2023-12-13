import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { OpenModalContext } from './context';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Generate Order Data
function createData(id,date,propertyType,propertylocation,numberofrooms,numberofBathrooms, ownerphonenumber,amount) {
  return { id, date,propertyType,propertylocation,numberofrooms,numberofBathrooms,ownerphonenumber, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'ghetto',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  
];

function preventDefault(event) {
    event.preventDefault();
   
}

export default function Orders() {

    const[houseDescriptionById,setHouseDescriptionById]=React.useState(null)
    const navigate=useNavigate(Navigate)
    const {houseId}=useParams()
    const{token}=useParams()
    const [currentDate, setCurrentDate] =React.useState(new Date());
    const{setmessageStatus}=useContext(OpenModalContext)
  const{messageStatus}=useContext(OpenModalContext)
  const{setMessage}=useContext(OpenModalContext)
  const{setMessageType}=useContext(OpenModalContext)
    console.log("house id from description:",houseId)
    console.log("token to use in  sendbook request  is:",token)
    const SplitToken=token.split(" ")
    const Newtoken=SplitToken[1]||token
    console.log(" new token to use in  sendbook request  is",Newtoken)
    const SendBookingRequest=async()=>{
      const result =await fetch("https://wheretostay.onrender.com/api/bookings/create",{
        method:"POST",
        body:JSON.stringify({
           
          "property_id":houseId
                
        }),
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": Newtoken ? ` ${Newtoken}` : `${token}`
        } 
      })
      if (!result.ok) {
        
        const errorResponse = await result.text();
        console.error(result.status);
        setmessageStatus(true)
        setMessage("Booking request failed: " + errorResponse);
        setMessageType("error")
        console.error(result.status);
         console.error(errorResponse);
      }
      else {
        const result2 = await result.json();
        console.log("booking requested is:",result2)
        setmessageStatus(true);
        setMessage("house Booking successfully send ")
        setMessageType("success")
        navigate(`/studentstatuspage/${Newtoken}`)
      }

    }
    
  
    const getHouseById=async()=>{
      const result=await fetch(`https://wheretostay.onrender.com/api/properties/${houseId}`) 
      const result2=await result.json()  
      console.log(result2)
      setHouseDescriptionById(result2)
        
     }
  
     useEffect(()=>{
     getHouseById()
    
     },[])
  return (
    <React.Fragment>
    <>
    {
        houseDescriptionById&&( <div><Title>Summary</Title>
        <Table size=" large">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>property type</TableCell>
              <TableCell>property location</TableCell>
              <TableCell>number of rooms</TableCell>
              <TableCell>number of bathrooms</TableCell>
              <TableCell>property owner</TableCell>
              <TableCell> owner phone number</TableCell>
              <TableCell align="right"> Amount</TableCell>
              <TableCell>.........</TableCell>
              <TableCell className=' pl-64' align="right"> Action</TableCell>
              <TableCell>.........</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
           
              <TableRow >
              <TableCell style={{width:'5%'}}>{currentDate.toString()}</TableCell>
                <TableCell>{houseDescriptionById.property_type}</TableCell>
                <TableCell>{houseDescriptionById.city}</TableCell>
                <TableCell>{houseDescriptionById.number_rooms}</TableCell>
                <TableCell>{houseDescriptionById.number_of_bathrooms}</TableCell>
                <TableCell>{houseDescriptionById.User.firstName+"   "+houseDescriptionById.User.lastName}</TableCell>
                <TableCell>{houseDescriptionById.User.phoneNumber}</TableCell>
                <TableCell>{houseDescriptionById.price}/month</TableCell>
                <TableCell className=' relative'>
                    <div style={{top:'42%'}} className=' absolute flex  left-14 '>
                    <button onClick={SendBookingRequest} type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Book</button>
                   <button type="button" class="text-white bg-gradient-to-r  from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cancel</button>
                    </div>
                </TableCell>
              </TableRow>
        
          </TableBody>
        </Table> </div>)
    }
    
    
    </>
     
    </React.Fragment>
  );
}