import React, { useEffect } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Header from "./header";
import logo from './Images/logo.png'
import homelogo from './Images/homelogo.png'
import dashboardlogo from './Images/dashlogo.png'
import addnewrentallogo from './Images/dashboardLogo.png'
import logoutlogo from './Images/logoutlogo.png'
import profilePhoto from './Images/accountOwner.png'
import locationlogo from './Images/location.png'
import apartmentlogo from './Images/apartmentlogo.png'
import bedroomlogo from './Images/bedroomlogo.png'
import bathroomlogo from './Images/bathroomlogo.png'
import { useContext } from "react";
import { OpenModalContext } from "./context";
import Chart from 'react-apexcharts';
import houseImage from './Images/house0.png'
import { useState } from "react";
import { AiOutlineHome} from 'react-icons/ai'
import { CiLocationOn } from 'react-icons/ci';
import{MdBedroomParent,MdBathroom} from 'react-icons/md'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";


const LandLoadDashboard=()=>{
   const navigate=useNavigate()
   const [isVisible, setIsVisible] = useState(true);
    const{newToken}=useParams()
   const splitToken=newToken.split(' ')
  const newToken2=splitToken[1]
  const{tokenToUseInPayment}=useParams()
   const[myProperty,setMyProperty]=useState([])
   const [homeCount, setHomeCount] = useState(0);
  const [apartmentCount, setApartmentCount] = useState(0);
  const [ghettoCount, setGhettoCount] = useState(0);
  const[openDeleteWarning,setOpenDeleteWarning]=useState(false)
  const[deleteStatus,setDeleteStatus]=useState(false)
  const{setmessageStatus}=useContext(OpenModalContext)
  const{messageStatus}=useContext(OpenModalContext)
  const{setMessage}=useContext(OpenModalContext)
  const{setMessageType}=useContext(OpenModalContext)
  const [propertyToDelete, setPropertyToDelete] = useState(null);
   const[username,setUserName]=useState(null)
   const[lastname,setLastname]=useState(null)
   const[requestMade,setRequestMade]=useState([])
   const[itemId,setItemid]=useState([])
  const [chartData, setChartData] = useState({
    options: {
      labels: ['Home', 'Apartment', 'Ghetto'],
      legend:{
        position:'left',
        paddingLeft:'10px'
        
      },
      
    },
    series: [ghettoCount, homeCount, apartmentCount],
    
  });
  const [LinechartData, setLineChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  
  
    
  });
  
  const getMyProperty = async () => {
   const result = await fetch("https://wheretostay.onrender.com/api/my-properties", {
     method: 'GET',
     headers: {
       "Authorization": newToken2,
    
     },
   });
   const result2 = await result.json();
   
   const result3=[result2]
   let homeCount = 0;
   let apartmentCount = 0;
   let ghettoCount = 0;
   const propertyIds = [];
     if(Array.isArray(result2))
     {
      result2.length!==0&&result2.forEach(property => {
        propertyIds.push(property.id);
        console.log("property id is:",property.id)
        switch (property.property_type) {
          case "home":
            homeCount++;
            break;
          case "apartment":
            apartmentCount++;
            break;
          case "ghetto":
            ghettoCount++;
            break;
          default:
            // Handle other property types if needed
        }
      });
     }
     else{
     [result2].length!==0&&[result2].forEach(property => {
      propertyIds.push(property.id);
        switch (property.property_type) {
          case "home":
            homeCount++;
            break;
          case "apartment":
            apartmentCount++;
            break;
          case "ghetto":
            ghettoCount++;
            break;
          default:
           
        }
      });
     }
   
   
   setChartData({
     options: {
       labels: ['Home', 'Apartment', 'Ghetto'],
       legend: {
         position: 'left',
         paddingLeft: '10px',
       },
     },
     series: [homeCount, apartmentCount, ghettoCount], 
   });
 
   setHomeCount(homeCount);
   setApartmentCount(apartmentCount);
   setGhettoCount(ghettoCount);
 
   console.log("Property counts:", {
     home: homeCount,
     apartment: apartmentCount,
     ghetto: ghettoCount
   });
 
   if (Array.isArray(result2)) {
    setMyProperty(result2);
    setItemid(propertyIds);
  } else {
    setMyProperty([]); 
    setItemid([result2.id]);
  }
 
   console.log("my from landloard dashboard property:", result2);
   
 };
 
    useEffect(()=>{
     getMyProperty()
     
    },[])


    const fetchUserName = async () => {
      try {
        
        const response = await fetch('https://wheretostay.onrender.com/api/user', {
          headers: {
            Authorization:newToken2,
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          console.log("userdata is:",userData);
          setUserName(userData.firstName);
          setLastname(userData.lastName);
        } else {
          console.error("Error fetching user's information:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user's information", error);
      }
    };
   
    console.log("item id before",itemId)

  
 



  useEffect(() => {
    fetchUserName();
    console.log("item id in useeffect is",itemId)
  }, []);

    const handleDeleteProperty = async (propertyId) => {
      
      try {
        // Make an API call to delete the property
        const response = await fetch(`https://wheretostay.onrender.com/api/properties/delete/${propertyId}`, {
          method: 'DELETE',
          headers: {
            "Authorization": newToken2,
          },
        });
  
        if (response.status === 200) {
         
          setMyProperty((prevProperties) =>
            prevProperties.filter((property) => property.id !== propertyId)
          );
          console.log("Property deleted successfully");
          setmessageStatus(true)
          window.location.reload()
        setMessage("Property deleted successfully")
        setMessageType("success")
        setOpenDeleteWarning(false)
        } else {
          
          console.error("Error deleting property");
          setmessageStatus(true)
        setMessage("Error deleting property")
        setMessageType("error")
        setOpenDeleteWarning(false)
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        setmessageStatus(true)
        setMessage("Error deleting property")
        setMessageType("error")
        setOpenDeleteWarning(false)
      }
    };
    
    useEffect(() => {
      const fetchData = async () => {
        const requestCounts = {}; 
    
        
        await Promise.all(
          myProperty.map(async (item) => {
            console.log("Fetching data for property with ID:", item.id);
            try {
              const result = await fetch(`https://wheretostay.onrender.com/api/studentsBooked/${item.id}`, {
                method: 'GET',
                headers: {
                  Authorization: newToken2,
                },
              });
              if (!result.ok) {
                console.log("No response");
              } else {
                const result2 = await result.json();
                console.log("Data for property with ID:", item.id, "is", result2);
    
               
                requestCounts[item.id] = result2.length;
              }
            } catch (error) {
              console.log("Error fetching data for property with ID:", item.id, ":", error);
            }
          })
        );
    
      
        setRequestMade(requestCounts);
      };
    
      fetchData();
    }, [myProperty]);
    
    

 return(
        <div className=" h-full overflow-y-auto">
         {openDeleteWarning && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={() => setOpenDeleteWarning(false)}
          style={{ pointerEvents: 'auto' }} 
        ></div>
      )}

     
      <div style={{ display: openDeleteWarning ? 'block' : 'none' }}>
        <div style={{ maxWidth: '30%', marginLeft: '45%', position: 'fixed', marginTop: '5%',zIndex: '100' }}>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Are you sure you want to delete that property? 
            <button onClick={() => { handleDeleteProperty(propertyToDelete); setOpenDeleteWarning(false) }}>
              <strong>Delete</strong>
            </button>
            <button onClick={() => { setDeleteStatus(false); setOpenDeleteWarning(false) }}>
              <strong className="ml-8">Cancel</strong>
            </button>
          </Alert>
        </div>
      </div>

            <div className=" fixed top-1">
            <div className=" mt-4 w-full mx-8 ">
        <div className=" w-full  flex-1 flex   justify-between  mx-8">
           <div>
            <img style={{maxWidth:'150px'}} src={logo} alt="" />
            </div> 
            <div className=" w-full">
               <div style={{marginLeft:'540%'}} className=" ">
               <HideOn atHeight height={3}>
             <div id="hide">
             <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button"> 
<svg  class="w-7 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
  </svg>
<div class="relative flex">
  {/* <div class="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div> */}
</div>
</button>
             </div>
            </HideOn>
               </div>
            </div>
   
           </div>
 
 
    </div>
   
   </div>
   <div className=" mt-10">
    
    
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="default-sidebar" class="fixed border   top-28  left-10 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 bg-txtecolor overflow-y-auto  dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
      <li>
            <a href="#" class="flex flex-col  items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
               <img style={{maxWidth:'50px'}} src={profilePhoto} alt="" />
               <span  class=" ">{username} {lastname}</span>
            </a>
         </li>
        
        
     <Link to={`/addnewrental/${newToken}`}> <li>
            <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
               <img src={addnewrentallogo} alt="" />
               <span class="flex-1 ml-3 whitespace-nowrap">Add New Rental</span>
             
            </a>
         </li>
         </Link>
         <li>
         <Link to="/home">  <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
              <img src={logoutlogo} alt="" />
               <span  class="flex-1 ml-3 whitespace-nowrap">LogOut</span>
            </a> </Link>
         </li>
        
      </ul>
   </div>
</aside>

<div class="p-4  sm:ml-64 flex">
  <div style={{width:"95%"}} className=" mt-12 border rounded-2xl border-black  ml-24 ">
    <div className=" ml-32 mt-5 text-mycolor font-txtFontFamily text-dashFontsize font-ttttttxtbodyFontWeight leading-dashLineHeight tracking-dashLetterSpacing">House status</div>
 <div  className="donut flex justify-center ml-16 mt-5 ">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="380"
      />
    </div>
    </div>
    {/* <div style={{width:"47%"}} className=" mt-12 border  rounded-2xl border-black  ml-10">
    <div className=" ml-20 text-txtbodyFontsize mt-5 text-mycolor font-txtFontFamily  leading-txtbodylineHeight  tracking-txtbodyLetterspacing font-ttttttxtbodyFontWeight  ">Days/views</div>
 <div  className="donut flex justify-center ml-16 mt-5 ">
 <Chart
    options={LinechartData.options}
    series={LinechartData.series}
    type="line"
    width="500"
  />
    </div>
    </div> */}
   

</div>
      

   </div>
   <div className=" ml-80 flex flex-wrap ">
   {
     myProperty.length>0?myProperty.map((item)=>{
          
      
     return<div style={{width:'32%'}} className=" ml-3 py-5 pb-5 shadow-xl shadow-black">

         <div className=" py-6  pl-8">
         <div>
            <img style={{width:'70%'}} src={item.imageUrls[0]} alt="" />
         </div>
         <div className=" mt-4 ml-7 font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing text-txthecolor">{item.description} </div>
         <div className=" space-y-5 ml-1 mt-3">
         <div className=" flex space-x-8 font-headerFontFamily font-txtbodyFontWeight leading-anotherLineHeight tracking-txtbodyLetterspacing text-txthecolor">
         <div className=" flex space-x-3">
            <div>
            <CiLocationOn size={25} color="blue"  />
            </div>
            <div>
            {item.city}
            </div>
         </div>
         <div className=" flex   space-x-3">
            <div>
            <AiOutlineHome size={25}  color="blue"  height='30px'/>
            </div>
            <div>
            {item.property_type}
            </div>
         </div>
         </div>
         <div className=" flex space-x-8 font-headerFontFamily font-txtbodyFontWeight leading-anotherLineHeight tracking-txtbodyLetterspacing text-txthecolor">
         <div className=" flex space-x-1">
            <div>
               <MdBedroomParent color="blue" size={25} />
            </div>
            <div>
               {item.number_rooms} Bedrooms
            </div>
         </div>
         <div className=" flex space-x-3">
            <div>
               <MdBathroom color="blue" size={25} />
            </div>
            <div>
            {item.number_of_bathrooms} Bathrooms
            </div>
         </div>
         </div>
         <div className=" flex space-x-8 font-headerFontFamily font-txtbodyFontWeight leading-anotherLineHeight tracking-txtbodyLetterspacing text-txthecolor">
         <div className=" flex space-x-9">
            
            <div className="  text-txtecolor font-headerFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-anotherLineHeight tracking-txtbodyLetterspacing">
            {item.price} Rwf
            </div>
         </div>
       <Link to={`/bookingstatuspage/${newToken2}/${item.id}`}><div className=" flex space-x-3  text-txtecolor underline underline-offset-4 font-headerFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-anotherLineHeight tracking-txtbodyLetterspacing">
             <div>
            {requestMade[item.id]} students need this house 
          

          

            </div>
         </div></Link>
         </div>
         <div className=" pt-5">
            
        

<button type="button"   onClick={()=>{setOpenDeleteWarning(true);setPropertyToDelete(item.id)}} class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Delete</button>
<button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Update</button>

         </div>
         </div>
         </div>
      </div>
    
    
   
     
      })
      :<div className="  pl-48 ">
         <div id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <div class="ml-3 text-sm font-medium">
    You have not uploaded any properties  <span class="font-semibold "> click add new rental button to upload your first property</span>
    </div>
   
</div>
      </div>
   }
   </div>
    </div>
    )
}

export default LandLoadDashboard