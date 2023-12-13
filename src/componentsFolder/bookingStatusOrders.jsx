import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'; 
import Title from './Title';
import { useParams } from 'react-router-dom';
import ALLhouses from './Allhouses';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { OpenModalContext } from './context';

function createData(date, email, firstname, lastname) {
  return { date, email, firstname, lastname};
}

const rows = [
  createData(
    '16 Mar, 2019',
    'ghetto',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
];

export default function BookingStatusOrders() {
  const { newToken2 } = useParams();
   const{NewtokenToUse}=useContext(OpenModalContext)
  console.log("test new token is:",newToken2)
  const { itemId } = useParams();
 console.log(" i am going to use this token",NewtokenToUse)
  const [currentDate] = useState(new Date());
  const [MyProperty, setMyProperty] = useState([]);
   const [allBookingIds,setAllbokkingIds]=useState([])
   const { setmessageStatus } = useContext(OpenModalContext);
   const { messageStatus } = useContext(OpenModalContext);
   const { setMessage } = useContext(OpenModalContext);
   const { setMessageType } = useContext(OpenModalContext);
   const serializedBookingIds = Cookies.get("bookingIds");
   const[status,setStatus]=useState("no action")
   let propertyBookingIds = []; // Declare propertyBookingIds here
   
   if (serializedBookingIds) {
     // Parse the JSON string back into an array of arrays
     const bookingIdArrays = JSON.parse(serializedBookingIds);
 
     // Now you can use the array of arrays
     console.log("Booking IDs retrieved from cookie:", bookingIdArrays);
      
     // Example: Access the booking IDs for each property
     bookingIdArrays.forEach((propertyBookingIds, propertyIndex) => {
       console.log(`Booking IDs for Property ${propertyIndex + 1}:`, propertyBookingIds);
 
       // Example: Access each booking ID within a property
       propertyBookingIds.forEach((bookingId, bookingIndex) => {
         console.log(`Booking ID ${bookingIndex + 1} for Property ${propertyIndex + 1}:`, bookingId);
          
      
       });
     });
   } else {
     console.log("No 'bookingIds' cookie found.");
   }
   
   const getMyRequestedPropertyAll = async () => {
    const result = await fetch("https://wheretostay.onrender.com/api/my-bookings", {
      method: 'GET',
      headers: {
        "Authorization":NewtokenToUse,
      },
    });
    const result2 = await result.json();
    if (Array.isArray(result2)) {
      setMyProperty(result2);
      const bookingIdArrays = result2.map((item) => {
       
        if (Array.isArray(item.bookings) && item.bookings.length > 0) {
         
          return item.bookings.map((booking) => booking.id);
        }
      
        return [];
      });

   
    } else {
      setMyProperty([]); 
    }
    console.log("my requested property:", result2);
  };
   

   const  handleBookingRequest = async (bookingId) => {
    try {
      const result = await fetch(`https://wheretostay.onrender.com/api/bookings/reject/${bookingId}`, {
        method:"PUT",
        headers: {
          "Authorization":newToken2
        }
      });
      const result2 = await result.json()
      if(result2.error){
        setmessageStatus(true);
        setMessage(result2.error);
        setMessageType("error");
       }
       else{
        setmessageStatus(true);
        setMessage("Rejected successfully");
        
        setMessageType("error");
       }
      console.log(result2)
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setStatus("reject")
  };
   

const   handleAcceptBookingRequest = async (bookingId) => {
    try {
      const result = await fetch(`https://wheretostay.onrender.com/api/bookings/approve/${bookingId}`, {
        method:"PUT",
        headers: {
          "Authorization":newToken2
        }
      });
      const result2 = await result.json()
      if(!result2.ok){
        setmessageStatus(true);
        setMessage(result2.error);
        setMessageType("error");
      }
      console.log(result2)
     if(result2.error){
      setmessageStatus(true);
      setMessage(result2.error);
      setMessageType("error");
     }
     else{
      setmessageStatus(true);
      setMessage("Approved successfully");
      
      setMessageType("success");
     }
    } catch (error) {
      console.error("An error occurred:", error);
      setmessageStatus(true);
      setMessage(error);
      setMessageType("error");
    }
  };



  const getMyRequestedProperty = async () => {
    const result = await fetch(`https://wheretostay.onrender.com/api/studentsBooked/${itemId}`, {
      method: 'GET',
      headers: {
        "Authorization":newToken2,
      },
    });
    const result2 = await result.json();
    if (Array.isArray(result2)) {
      setMyProperty(result2);
    } else {
      setMyProperty([]); 
    }
    console.log("my requested booking property:", result2);
  };


  useEffect(() => {
    getMyRequestedProperty();
  }, []);

  const handleCancelRequest = (index) => {
    
  };

  return (
    <div className='space-y-8'>
      <Title>Requests</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{color:'#1976D2'}}>Date</TableCell>
            <TableCell style={{color:'#1976D2'}}>Email</TableCell>
            <TableCell style={{color:'#1976D2'}}>First Name</TableCell>
            <TableCell style={{color:'#1976D2'}}>Last Name</TableCell>
            <TableCell style={{color:'#1976D2'}}>Action</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          { MyProperty.length===0? (<TableCell style={{paddingLeft:'50%',fontStyle: 'italic'}}>NO Booking found</TableCell>): MyProperty.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{currentDate.toDateString()}</TableCell>
              <TableCell>{item.student.email}</TableCell>
              <TableCell>{item.student.firstName}</TableCell>
              <TableCell>{item.student.lastName}</TableCell>
              <TableCell className=' space-y-2'>
                <div>
                <button onClick={()=>{handleAcceptBookingRequest(item.bookingId)}} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Accept</button>
                </div>
                <div>
                <button  onClick={()=>{handleBookingRequest(item.bookingId)}} type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Reject</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       
    </div>
     
  );
}
