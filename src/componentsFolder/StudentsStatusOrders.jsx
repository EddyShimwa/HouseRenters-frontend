/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button'; 
import Title from './Title';
import { useParams } from 'react-router-dom';
// import ALLhouses from './Allhouses';
// import Cookies from 'js-cookie';/
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { OpenModalContext } from './context';


function createData(date, propertyType, propertyLocation, numberOfRooms, numberOfBathrooms, propertyOwner, ownerPhoneNumber, amount, status) {
  return { date, propertyType, propertyLocation, numberOfRooms, numberOfBathrooms, propertyOwner, ownerPhoneNumber, amount, status };
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

export default function StudentsStatusOrders() {
  const{setNewTokenToUse}=useContext(OpenModalContext)
  const { Newtoken } = useParams();
 setNewTokenToUse(Newtoken)
  console.log("students token is:",Newtoken)
  const [currentDate] = useState(new Date());
  const [MyProperty, setMyProperty] = useState([]);
  
  const navigate=useNavigate(Navigate)
  // ... (previous code)
  const handlePayment=(id)=>{
    navigate(`/paymentpage/${Newtoken}/${id}`)
  }



// ... (rest of your code)

  
  const getMyRequestedProperty = async () => {
    const result = await fetch("https://wheretostay.onrender.com/api/my-bookings", {
      method: 'GET',
      headers: {
        "Authorization": Newtoken,
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


  useEffect(() => {
    getMyRequestedProperty();
  }, []);

  // const handleCancelRequest = (index) => {
    
  // };

  return (
    <div className='space-y-8'>
      <Title>Your Bookings Status</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{color:'#1976D2'}}>Date</TableCell>
            <TableCell style={{color:'#1976D2'}}>Property Type</TableCell>
            <TableCell style={{color:'#1976D2'}}>Property Location</TableCell>
            <TableCell style={{color:'#1976D2'}}>Number of Rooms</TableCell>
            <TableCell style={{color:'#1976D2'}}>Number of Bathrooms</TableCell>
            <TableCell style={{color:'#1976D2'}}>Amount</TableCell>
            <TableCell style={{color:'#1976D2'}}>Status</TableCell>
            <TableCell style={{color:'#1976D2'}}>Action</TableCell>
            {/* <TableCell style={{color:'#1976D2'}}>Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          { MyProperty.length===0? (<TableCell style={{paddingLeft:'50%',fontStyle: 'italic'}}>NO Booking found</TableCell>): MyProperty.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.property_type}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell>{item.number_rooms}</TableCell>
              <TableCell>{item.number_of_bathrooms}</TableCell>
                
              {/* <TableCell>{item.User.firstName + " " + item.User.lastName}</TableCell> */}
              {/* <TableCell>{item.User.phoneNumber}</TableCell> */}
              <TableCell>{item.price}</TableCell>
              <TableCell>
               {item.bookings[0]["status"]=="Rejected"&&<div className=' text-red-500'>{item.bookings[0]["status"]}</div>}
               {item.bookings[0]["status"]=="Request Sent"&&<div className=' text-black'>{item.bookings[0]["status"]}</div>}
               {item.bookings[0]["status"]=="Approved"&&<div  className=' text-emerald-500'>{item.bookings[0]["status"]}</div>}
              </TableCell>
             
             {
              item.bookings[0]["status"]=="Rejected"&& <TableCell>
              
              <div type="button" class="text-red-700 hover:text-white border  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 , dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">try again later</div>
            </TableCell>
             }
             {
              item.bookings[0]["status"]=="Approved"&& <TableCell>
              
              <button onClick={()=>{handlePayment(item.id)}}  type="button" class="text-white hover:text-white border bg-emerald-500   hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 , dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Continue payment</button>
            </TableCell>
             }
              {
              item.bookings[0]["status"]=="Request Sent"&& <TableCell>
              
              <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
     Cancel
  </span>
</button>
            </TableCell>
             }
            </TableRow>
          ))}
        </TableBody>
      </Table>
       
    </div>
     
  );
}
