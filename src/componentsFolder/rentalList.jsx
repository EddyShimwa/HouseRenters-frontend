/* eslint-disable */
import React, { useEffect } from "react";
 import RentallistHeader from "./rentallistHeader";
import bodyPic from './Images/Rectangle 1.png'
// import searchIcon from './Images/Vector (9).png'
// import housePic from './Images/Rectangle 2.png'
// import profilePic from './Images/Ellipse 1 (1).png'
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome} from 'react-icons/ai'
import { CiLocationOn } from 'react-icons/ci';
import{MdBedroomParent,MdBathroom} from 'react-icons/md'
import { useContext } from "react";
import { OpenModalContext } from "./context";
 import { ThreeDots } from "react-loader-spinner"; 
 import {FaExclamationCircle} from 'react-icons/fa'
 import { useParams } from "react-router-dom";
 import Footer from "./footer";
import { useState } from "react";


const RentalList=()=>{
 
const [allHouse,setAllHouse]=useState([])
const[LocationaccountClicked,setLocationAccountClicked]=useState(false)
const[typeOfPropertyaccountClicked,setTypeOfPropertyAccountClicked]=useState(false)
const[bedRoomaccountClicked,setbedRoomAccountClicked]=useState(false)
const[BathroomaccountClicked,setbathroomAccountClicked]=useState(false)
const[priceRange,setPriceRange]=useState(false)
const{setOpenChat}=useContext(OpenModalContext)
const[mouseIsOver,setMouseIsOver]=useState(false)
const[locationSelected,setLocationSelected]=useState("")
const[typeOfPropertySelected,setTypeOfPropertySelected]=useState("")
const[BedroomSelected,setBedroomSelected]=useState("")
const[bathroomSelected,setBathroomSelected]=useState("")
const[priceRangeAmount,setPriceRangeAmount]=useState("")
const[filteredArray,setFilteredArray]=useState([])
const[allHouseToFilter,setAllHouseToFilter]=useState([])
const{newToken}=useParams()
const{tokenToUseInPayment}=useParams()
console.log("token to use in payment presente in rental list is:",tokenToUseInPayment)
const newtoken2=newToken.split(" ")
const newtoken3=newtoken2[1]
console.log(priceRangeAmount)
const handleOpenChat=()=>{
  setOpenChat(true)
}
const handleMouseOver=()=>{
  setMouseIsOver(true)
  console.log(true)
}
const handleMouseLeav=()=>{
 setMouseIsOver(false)
 console.log(false)
}
 
  const GetAllHouse=async()=>{
    const result=await fetch("https://wheretostay.onrender.com/api/properties/all")
    const result2=await result.json()
    console.log(result2)
    if(Array.isArray(result2))
    {
      setAllHouse(result2)
      setAllHouseToFilter(result2)
    }
    else{
      setAllHouse([result2])
      setAllHouseToFilter([result2])
    }
  }
  const getMyProperty = async () => {
    const result = await fetch("https://wheretostay.onrender.com/api/my-properties", {
      method: 'GET',
      headers: {
        "Authorization":newtoken3,
     
      },
    });
    const result2 = await result.json();
    
    if (Array.isArray(result2)) {
     setAllHouse(result2);
    
   } else {
     setAllHouse([]); 
    
   }
  
    console.log("my from landloard dashboard property:", result2);
    
  };


   
    const navigate=useNavigate(Navigate)
    const handleLocationAccountClick=()=>{
         setLocationAccountClicked(!LocationaccountClicked)
        
    }
    const handleTypeOfPropertyAccountClick=()=>{
      setTypeOfPropertyAccountClicked(!typeOfPropertyaccountClicked)
    
    }
    const handleNumberOfBedroomAccountClick=()=>{
      setbedRoomAccountClicked(!bedRoomaccountClicked)
    
    }
    const handleNumberOfBathroomAccountClick=()=>{
      setbathroomAccountClicked(!BathroomaccountClicked)
    
    }
    const handlePriceRangeAccount=()=>{
      setPriceRange(!priceRange)

    }

    const handleHouseClicked=()=>{
      navigate('/housedescription')
    }
    useEffect(()=>{
     getMyProperty()
    },[])

    const filterRange=priceRangeAmount
  const [minPriceStr, maxPriceStr] = filterRange.split('-');
  const minPrice = priceRangeAmount!==""&&parseFloat(minPriceStr.replace(/[^\d.]/g, ''));
  const maxPrice = priceRangeAmount!==""&&parseFloat(maxPriceStr.replace(/[^\d.]/g, ''));
  
  const handleFiltering = () => {
    let filteredResults = allHouse;
  
    if (locationSelected !== "" && typeOfPropertySelected !== "") {
      
      filteredResults = filteredResults.filter((item) => {
        return item.location === locationSelected && item.property_type === typeOfPropertySelected;
      });
    } 
     if(locationSelected!=="" && BedroomSelected!==""){
      filteredResults=filteredResults.filter((item)=>{
        return item.location===locationSelected&&item.number_rooms==BedroomSelected
      })
    }
     if(locationSelected!=""&&bathroomSelected!==""){
      filteredResults=filteredResults.filter((item)=>{
        return item.location===locationSelected&&item.number_of_bathrooms==bathroomSelected
      })
    }
     if(locationSelected!=""&&priceRangeAmount!==""){
      filteredResults=filteredResults.filter((item)=>{
        return item.location===locationSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
     if(locationSelected!="" && typeOfPropertySelected!="" && BedroomSelected!=="")
    {
     filteredResults=filteredResults.filter((item)=>{
        return item.location===locationSelected&&item.property_type===typeOfPropertySelected&&item.number_rooms==BedroomSelected
     })  
    }
    if(locationSelected!=""&&typeOfPropertySelected!=""&&bathroomSelected!=""){
      filteredResults=filteredResults.filter((item)=>{
        return item.location===locationSelected&&item.property_type===typeOfPropertySelected&&item.number_of_bathrooms==bathroomSelected
      })
    }
     if(locationSelected!==""&&typeOfPropertySelected!==""&&priceRangeAmount!==""){
      filteredResults=filteredResults.filter((item)=>{
        return item.location===locationSelected&&item.property_type===typeOfPropertySelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(locationSelected!==""&&BedroomSelected!==""&&bathroomSelected!==""){
      filteredResults=filteredResults.filter((item)=>{
      return item.location===locationSelected&&item.number_rooms==BedroomSelected&&item.number_of_bathrooms==bathroomSelected
      })
    }
    if(locationSelected!==""&&BedroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
    return item.location===locationSelected&&item.number_rooms==BedroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(locationSelected!==""&&bathroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
   return item.location===locationSelected&&item.number_of_bathrooms==bathroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(locationSelected!==""&&typeOfPropertySelected!==""&&BedroomSelected!==""&&bathroomSelected!==""){
      filteredResults=filteredResults.filter((item)=>{
        return item.location===locationSelected&&item.property_type===typeOfPropertySelected&&item.number_rooms==BedroomSelected&&item.number_of_bathrooms==bathroomSelected
      })
    }
    if(locationSelected!==""&&typeOfPropertySelected!==""&&BedroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
    return item.location===locationSelected&&item.property_type===typeOfPropertySelected&&item.number_rooms==BedroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(locationSelected!==""&&typeOfPropertySelected!==""&&bathroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
   return item.location===locationSelected&&item.property_type===typeOfPropertySelected&&item.number_of_bathrooms==bathroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(locationSelected!==""&&typeOfPropertySelected!==""&&BedroomSelected!==""&&bathroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
        return item.location===locationSelected&&item.property_type===typeOfPropertySelected&&item.number_rooms==BedroomSelected&&item.number_of_bathrooms==bathroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(typeOfPropertySelected!==""&&BedroomSelected!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
        return item.property_type===typeOfPropertySelected&&item.number_rooms==BedroomSelected
      })
    }
    if(typeOfPropertySelected!==""&&bathroomSelected!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
        return item.property_type===typeOfPropertySelected&&item.number_of_bathrooms==bathroomSelected
      })
    }
    if(typeOfPropertySelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
      return item.property_type===typeOfPropertySelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(typeOfPropertySelected!==""&&BedroomSelected!==""&&bathroomSelected!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
     return item.property_type===typeOfPropertySelected&&item.number_rooms==BedroomSelected&&item.number_of_bathrooms==bathroomSelected
      })
    }
    if(typeOfPropertySelected!==""&&BedroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
       return item.property_type===typeOfPropertySelected&&item.number_rooms==BedroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(typeOfPropertySelected!==""&&bathroomSelected!==""&&priceRangeAmount!=="")
    {
     filteredResults=filteredResults.filter((item)=>{
      return item.property_type===typeOfPropertySelected&&item.number_of_bathrooms==bathroomSelected&&item.price>=minPrice&&item.price<=maxPrice
     })
    }
    if(typeOfPropertySelected!==""&&BedroomSelected!==""&&bathroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
        return item.property_type===typeOfPropertySelected&&item.number_rooms==BedroomSelected&&item.number_of_bathrooms==bathroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(BedroomSelected!==""&&bathroomSelected!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
      return item.number_rooms==BedroomSelected&&item.number_of_bathrooms==bathroomSelected
      })
    }
    if(BedroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
      return item.number_rooms==BedroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(BedroomSelected!==""&&bathroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
    return item.number_rooms==BedroomSelected&&item.number_of_bathrooms==bathroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    if(bathroomSelected!==""&&priceRangeAmount!=="")
    {
      filteredResults=filteredResults.filter((item)=>{
      return item.number_of_bathrooms==bathroomSelected&&item.price>=minPrice&&item.price<=maxPrice
      })
    }
    
    
    else {
     
      if (locationSelected !== "") {
        filteredResults = filteredResults.filter((item) => item.location === locationSelected);
      }
  
      if (typeOfPropertySelected !== "") {
        filteredResults = filteredResults.filter((item) => item.property_type === typeOfPropertySelected);
      }
  
      if (BedroomSelected !== "") {
        filteredResults = filteredResults.filter((item) => item.number_rooms === BedroomSelected);
      }
  
      if (bathroomSelected !== "") {
        filteredResults = filteredResults.filter((item) => item.number_of_bathrooms === bathroomSelected);
      }
  
      if (priceRangeAmount !== "") {
        filteredResults = filteredResults.filter((item) => item.price >= minPrice && item.price <= maxPrice);
      }
    }
  
    return filteredResults;
  };
  
    
 useEffect(()=>{
  handleFiltering()
 },[locationSelected,typeOfPropertySelected,bathroomSelected,BedroomSelected,priceRangeAmount])

    return(
        <>
        <div className=" h-full mx-5">
       <RentallistHeader></RentallistHeader>
      
        <div  onMouseOver={handleMouseOver}   onMouseOut={handleMouseLeav} className="flex bg-white  z-10 bottom-5 fixed  right-0 ">
            <button    onClick={handleOpenChat} className="  px-5 text-headerFontSize font-headerFontFamily font-headerFontWeight leading-headerLineHeight text-blue-700">Chat with Us</button>
            <div>
              {
                mouseIsOver?(  <div className='mb-2  w-8'>
                <svg  color="inherit" viewBox="0 0 32 32" class="css-1usdo54">
        <path fill="#4384F5" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"></path>
        <path fill="blue" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="css-1adcsh3 eam5rsy0"></path>
        <circle fill="white" cx="14" cy="16" r="">
          <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle fill="white" cx="18" cy="16" r="">
          <animate attributeName="r" values="2;4;2" dur="1s" begin="0.2s" repeatCount="indefinite" />
        </circle>
        <circle fill="white" cx="22" cy="16" r="">
          <animate attributeName="r" values="2;4;2" dur="1s" begin="0.4s" repeatCount="indefinite" />
        </circle>
      </svg>
      
                </div>):<div className='  mb-2 w-8'>
                <svg  color="inherit" viewBox="0 0 32 32" class="css-1usdo54">
        <path fill="#4384F5" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"></path>
        <path fill="white" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="css-1adcsh3 eam5rsy0"></path>
        
      </svg>
      
                </div>
              }
            </div>
            </div> 
        <div className="mt-5 h-full  mx-8">
  <div className="relative h-1/3 ">
    <img className="brightness-50 h-[200px] w-[1250px] " src={bodyPic} alt="" />

     <div className=" text-white inset-x-0  bottom-28 absolute w-full mt-40">

    <div className=" flex justify-between border mx-24 py-7 px-7 rounded-lg bg-white mb-[-83px]">
        
        <div>
            <div className=" ml-9 text-black font-txtFontFamily font-txtbodyFontWeight text-txtbodyFontsize leading-txtbodylineHeight tracking-txtbodyLetterspacing">Location</div>       
            <div>
            
            <select onChange={(e)=>{setLocationSelected(e.target.value)}} className="relative text-black rounded-none border-none" >   
            <option value=""   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Select the area</span></option>
            <option  value="gasabo"  class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Gasabo</span></option>
            <option  value="kicukiro"  class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Kicukiro</span></option>
            <option   value="nyarugenge"  class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Nyarugenge</span></option>
           </select> 
  

            </div>
        </div>
        <div>
            <div className=" text-black font-txtFontFamily font-txtbodyFontWeight text-txtbodyFontsize leading-txtbodylineHeight tracking-txtbodyLetterspacing">Type of property</div>
            <div>
            <div className="relative" > 
            <select onChange={(e)=>{setTypeOfPropertySelected(e.target.value)}} className="relative text-black rounded-none border-none" >   
            <option  value=""  class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" ><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">All types</span></option>
            <option  value="apartment" class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" ><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Apartment</span></option>  
            <option  value="ghetto" class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" ><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Ghetto</span></option> 
            <option  value="home" class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" ><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Home House</span></option>         
           </select>        
            </div> 


            </div>
        </div>
        <div>
            <div className="ml-9 text-black font-txtFontFamily font-txtbodyFontWeight text-txtbodyFontsize leading-txtbodylineHeight tracking-txtbodyLetterspacing">Bedrooms</div>
            <div>
            <div className="relative" > 
            <select onChange={(e)=>{setBedroomSelected(e.target.value)}} className="relative ml-8 text-black rounded-none border-none" >   
            <option value=""   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">all</span></option>
            <option value="1"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">1</span></option>
            <option value="2"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">2</span></option>
            <option value="3"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">3</span></option>
            <option value="4"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">4</span></option>
            <option value="5"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">5</span></option>
           </select>        
            </div>

            </div>
        </div>
        <div>
            <div className="ml-9 text-black font-txtFontFamily font-txtbodyFontWeight text-txtbodyFontsize leading-txtbodylineHeight tracking-txtbodyLetterspacing">Bathrooms</div>
            <div>
            <div className="relative" > 
            <select onChange={(e)=>{setBedroomSelected(e.target.value)}} className="relative ml-8 text-black rounded-none border-none" >   
            <option value=""   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">all</span></option>
            <option value="1"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">1</span></option>
            <option value="2"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">2</span></option>
            <option value="3"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">3</span></option>
            <option value="4"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">4</span></option>
            <option value="5"   class="text-black   rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">5</span></option>
           </select> 
          </div> 
  

            </div>
        </div>
        <div>
            <div className=" ml-32 text-black font-txtFontFamily font-txtbodyFontWeight text-txtbodyFontsize leading-txtbodylineHeight tracking-txtbodyLetterspacing">Price range</div>
            <div>
            <div className="relative" > 
            <select onChange={(e)=>{setPriceRangeAmount(e.target.value)}} style={{ maxWidth: '100%' }} className="relative z-10 overflow-x-auto ml-8 text-black rounded-none border-none" >   
            <option  value=""  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">All</span></option>
            <option  value="0rwf-30000rwf"  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Less than 30, 000frw</span></option>
            <option  value="30000frw-50000frw"  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">30, 000frw- 50 000 frw</span></option>
            <option  value="50000frw-70000frw"  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">50 000frw - 70 000 frw</span></option>
            <option  value="70000frw-100000frw"  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">70 000frw - 100 000 frw</span></option>
            <option  value="100000frw-150000frw"  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">100 000frw - 150 000 frw</span></option>
            <option  value="150000frw-200000frw"  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">150 000frw - 200 000 frw</span></option>
            <option  value="200000frw-400000frw"  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">200 000frw - 400 000 frw</span></option>
            <option  value="4000000frw-200000000frw"  class="text-black    rounded-lg  px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span  className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing ">Above 400 000 frw</span></option>
           </select>      
            </div> 


            </div>
        </div>
        <div className="  ">
        <button  type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>Search
    </button>
        </div>
        </div>


     </div>
  </div>
  

{allHouse.length === 0 ? (
        <div className="bg-white  flex justify-center">
          <div id="alert-border-2" class=" text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
    <svg class=" mt-2 flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <div class="ml-3 text-sm font-medium">
    You have not uploaded any properties  <span class="font-semibold "> click  landlord dashboard button to upload your first property</span>
    </div>
   
</div>

        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          
    {
      locationSelected!=="" || typeOfPropertySelected!=="" || bathroomSelected!=="" || BedroomSelected!=="" || priceRangeAmount!=""?(
        handleFiltering().length===0?(<div style={{position:'absolute',marginLeft:'50%', top:300}} className=" w-full  ">
        <FaExclamationCircle size={48} color="red" />
        <p className=" ">No results found.</p>
      </div>):
        handleFiltering().map((item, index) => (
          <div
            key={index}
            className="bg-white anime rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <img
              src={item.imageUrls[0]}
              alt={item.location}
              className="w-full h-48 bject-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.description}</h2>
              <div className="text-gray-600 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <CiLocationOn size={25} color="blue" />
                    <span className="ml-2">{item.location}</span>
                  </div>
                  <div className="flex items-center">
                    <AiOutlineHome size={25} color="blue" />
                    <span className="ml-2">{item.property_type}</span>
                  </div>
                </div>
               
             </div>
             </div>
             <div className=" flex space-x-8 max-md:space-x-1 sm:space-x-1 max-lg:space-x-2 font-headerFontFamily font-txtbodyFontWeight leading-anotherLineHeight tracking-txtbodyLetterspacing text-txthecolor">
             <div className=" flex space-x-1">
                <div>
                   <MdBedroomParent color="blue" size={25} />
                </div>
                <div>
                {item.number_rooms}
                </div>
             </div>
             <div className=" flex space-x-3">
                <div>
                   <MdBathroom color="blue" size={25} />
                </div>
                <div>
                 {item.number_of_bathrooms}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-purple-700 font-semibold text-xl">
                  {item.price} Rwf
                </div>
               
              </div>
            </div>
          </div>
        ))
      ):( allHouse.map((item, index) => (
        <div
          key={index}
          className="bg-white anime rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <img
            src={item.imageUrls[0]}
            alt={item.location}
            className="w-full h-48 bject-cover object-center"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.description}</h2>
            <div className="text-gray-600 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <CiLocationOn size={25} color="blue" />
                  <span className="ml-2">{item.city}</span>
                </div>
                <div className="flex items-center">
                  <AiOutlineHome size={25} color="blue" />
                  <span className="ml-2">{item.property_type}</span>
                </div>
              </div>
             
           </div>
           </div>
           <div className=" flex space-x-8 max-md:space-x-1 sm:space-x-1 max-lg:space-x-2 font-headerFontFamily font-txtbodyFontWeight leading-anotherLineHeight tracking-txtbodyLetterspacing text-txthecolor">
         
           <div className=" flex space-x-1">
              <div>
                 <MdBedroomParent color="blue" size={25} />
              </div>
              <div>
              {item.number_rooms}rooms
              </div>
           </div>
           <div className=" flex space-x-3">
              <div>
                 <MdBathroom color="blue" size={25} />
              </div>
              <div>
               {item.number_of_bathrooms}bathrooms
              </div>
            </div>
           
            <div className="flex justify-between items-center">
              <div className="text-purple-700 font-semibold text-xl">
                {item.price} Rwf
              </div>
            
            </div>
          </div>
        </div>
      )))
    }
  </div>
  )}
</div>


</div>


    <div className=" flex flex-col items-center h-60 mt-10 bg-blue-500 ml-5 mr-3">
      <div className=" w-full py-6  space-y-4">
     <div  className=" flex justify-center">
       <span className=" font-txtFontFamily text-txtbFontsize font-headerFontWeight tracking-txtbodyLetterspacing text-white">would you like to share your feedback?</span>
     </div>
     <div  className="  w-full ">
     
<form className="">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative flex justify-center">
   <input type="search" id="default-search" class="block w-2/3 p-4  justify-center pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your message here..." required/>
        </div>
    </form>

     </div>
     <div className=" w-full">
      
<form>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative flex justify-center">
        <div class="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
           
        </div>
        <input type="search" id="default-search" class="block w-2/3 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email address" required/>
        <button type="submit" class="text-white absolute   right-64  bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
    </div>
</form>

     </div>
     </div>
   </div>
   <div>
    <Footer></Footer>
   </div>

      </>
    )
}
export default RentalList