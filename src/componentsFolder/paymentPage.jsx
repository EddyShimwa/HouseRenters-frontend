/* eslint-disable */
import React, { useEffect, useState } from "react";
import logo from './Images/logo.png'
import back from './Images/back.png'
import checked1 from './Images/checked1.png'
import checked2  from './Images/checked2.png'
import creditcardIamge from './Images/mastercard.png'
import mtnLogo from './Images/MTN.png'
import airtelLogo from './Images/airtel.png'
import payPalLogo from './Images/PAYPAL.png'
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { OpenModalContext } from "./context";
const PaymentPage=()=>{
  const[checked,setChecked]=useState(false)
  const[airtelChecked,setAirtelChecked]=useState(false)
  const[paypalChecked,setPaypalChecked]=useState(false)
  const[mobileMoneyChecked,setMobileMoneyChecked]=useState(false)
  const[myProperty,setMyProperty]=useState([])
  const[phonenumberr,setPhoneNumber]=useState(null)
  const{setmessageStatus}=useContext(OpenModalContext)
  const{messageStatus}=useContext(OpenModalContext)
  const{setMessage}=useContext(OpenModalContext)
  const{setMessageType}=useContext(OpenModalContext)
  
  const [loading, setLoading] = useState(false);
  const{Newtoken}=useParams()
  const {id}=useParams()
  console.log("id and token is:",id+""+Newtoken)
   const handleChecked=()=>{
    setChecked(true)
    setPaypalChecked(false);setAirtelChecked(false);setMobileMoneyChecked(false)
    console.log(!checked)
   }
   const property = myProperty.find((property) => property.id === parseInt(id));
   let price=null
   let phoneNumber=null
   // Check if a property with the given id was found
   if (property) {
      price = property.price;
      phoneNumber=property.User.phoneNumber
     console.log(`Price for property with id ${id}: $${price}`);
   } else {
     console.log(`Property with id ${id} not found`);
   }
  
   
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
 
useEffect(()=>{
 getMyRequestedProperty()
})

const requestPayment=async()=>{
  const result=await fetch("https://opay-api.oltranz.com/opay/paymentrequest",{
     body:JSON.stringify(
      {
        "telephoneNumber" :phonenumberr,
        "amount" : 100.0,
        "organizationId" :"d8754601-40cf-4080-848d-ee379989246a",
        "description" :"Payment for rent",
        "callbackUrl" :"http://myonlineprints.com/payments/callback",
        "transactionId" :"ffe037792fc5a11e8b4a4663af0064a09"
      }
     ),
      method:"POST",
      headers:{
        "Content-Type":"application/json",
       
      }
  })
}
const generateRandomTransactionId = (length) => {
  const characters = '0123456789abcdef';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

// Example of generating a random transactionId
const randomTransactionId = generateRandomTransactionId(32); // 32 characters long

console.log('Random Transaction ID:', randomTransactionId);


const HandleRequestPayment= async (e) => {
  e.preventDefault();
  
  
    try {
      setLoading(true);
      const result = await fetch("https://opay-api.oltranz.com/opay/paymentrequest", {
        method: "POST",
        body: JSON.stringify(
          {
            "telephoneNumber" :phonenumberr,
            "amount" :price,
            "organizationId" :"d8754601-40cf-4080-848d-ee379989246a",
            "description" :"Payment for rent",
            "callbackUrl" :"http://myonlineprints.com/payments/callback",
            "transactionId" :randomTransactionId
          }
        ),
        headers: {
          "Content-Type":"application/json",
           "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzhhMjNkMmYtODY1OS00MzUwLWFhYjQtNTk3YmJhNGYwZjljIiwiZmlyc3ROYW1lIjoiTml5b25rdXJ1IiwibGFzdE5hbWUiOiJQYWNpZmlxdWUiLCJtaWRkbGVOYW1lIjpudWxsLCJ0ZWxlcGhvbmVOdW1iZXIiOiIyNTA3ODA2MjEyNjciLCJlbWFpbCI6InBhY2N5bml5b25rdXJ1QGdtYWlsLmNvbSIsImltYWdlIjpudWxsLCJpc0FjdGl2ZSI6dHJ1ZSwiZmlyc3RMb2dpbiI6dHJ1ZSwiaXNEZWZhdWx0UGFzc3dvcmQiOnRydWUsImlzRGVmYXVsdFBpbiI6dHJ1ZX0sImFwcGxpY2F0aW9uIjp7ImlkIjoiMmM4ODEwOWVhYmM4NGQ0ZmI2NWE5ZTczMDY4YzUxYWMiLCJuYW1lIjoiT1BBWSJ9LCJyZXNvdXJjZXMiOlt7InJvbGUiOnsibmFtZSI6Ik9QQVlfTUVSQ0hBTlQiLCJpZCI6IjU1IiwicmVzb3VyY2VzIjpbeyJuYW1lIjoiV0FMTEVUX1RSQU5TQUNUSU9OIiwiY2FuQ3JlYXRlIjp0cnVlLCJjYW5FZGl0Ijp0cnVlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJBUFBMSUNBVElPTl9SRVNPVVJDRSIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjpmYWxzZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiQVBQTElDQVRJT05fUk9MRSIsImNhbkNyZWF0ZSI6dHJ1ZSwiY2FuRWRpdCI6dHJ1ZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiQVBQTElDQVRJT05fVVNFUiIsImNhbkNyZWF0ZSI6dHJ1ZSwiY2FuRWRpdCI6dHJ1ZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiQVBQTElDQVRJT05fVVNFUl9ST0xFIiwiY2FuQ3JlYXRlIjp0cnVlLCJjYW5FZGl0Ijp0cnVlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJHUk9VUF9ST0xFIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6Ik1FTlVTIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6IlBBR0VfTUVOVSIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJQQUdFUyIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJSRVNPVVJDRVMiLCJjYW5DcmVhdGUiOmZhbHNlLCJjYW5FZGl0IjpmYWxzZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiUk9MRV9BUFBMSUNBVElPTiIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJST0xFX0RJVlMiLCJjYW5DcmVhdGUiOmZhbHNlLCJjYW5FZGl0IjpmYWxzZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiUk9MRVMiLCJjYW5DcmVhdGUiOnRydWUsImNhbkVkaXQiOnRydWUsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6IlVTRVJTIiwiY2FuQ3JlYXRlIjp0cnVlLCJjYW5FZGl0Ijp0cnVlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJPUkdBTklaQVRJT05fQVBQTElDQVRJT05TIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6IlBBU1NXT1JEX1JFU0VUIiwiY2FuQ3JlYXRlIjp0cnVlLCJjYW5FZGl0Ijp0cnVlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJPUkdBTklaQVRJT05fVVNFUiIsImNhbkNyZWF0ZSI6dHJ1ZSwiY2FuRWRpdCI6dHJ1ZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiQ1VSUkVOQ1kiLCJjYW5DcmVhdGUiOmZhbHNlLCJjYW5FZGl0IjpmYWxzZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiV0FMTEVUX1RZUEUiLCJjYW5DcmVhdGUiOmZhbHNlLCJjYW5FZGl0IjpmYWxzZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiQlJBTkNIIiwiY2FuQ3JlYXRlIjp0cnVlLCJjYW5FZGl0Ijp0cnVlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJCUkFOQ0hfVVNFUiIsImNhbkNyZWF0ZSI6dHJ1ZSwiY2FuRWRpdCI6dHJ1ZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiV0FMTEVUIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6IlRSQU5TQUNUSU9OUyIsImNhbkNyZWF0ZSI6dHJ1ZSwiY2FuRWRpdCI6dHJ1ZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiTElRVUlEQVRJT04iLCJjYW5DcmVhdGUiOmZhbHNlLCJjYW5FZGl0IjpmYWxzZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiSU5URVJfT1JHQU5JWkFUSU9OU19SRUxBVElPTlNISVBTIiwiY2FuQ3JlYXRlIjp0cnVlLCJjYW5FZGl0Ijp0cnVlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJBUFBMSUNBVElPTiIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJBUFBMSUNBVElPTl9ST0xFX0FDQ0VTU19NQVRSSVgiLCJjYW5DcmVhdGUiOmZhbHNlLCJjYW5FZGl0IjpmYWxzZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiQVBQTElDQVRJT05fVVNFUl9HUk9VUCIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJESVZTIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6IkdST1VQUyIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJNRU5VX0FQUCIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJQQUdFX0RJViIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJST0xFX0FQUF9ESVZfQUNDRVNTIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6IlJPTEVfQVBQX01FTlVfQUNDRVNTIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6IlJPTEVfQVBQX1BBR0VfQUNDRVNTIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6Ik9SR0FOSVpBVElPTiIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJPUkdBTklaQVRJT05fUEdXX0NPTlRSQUNUIiwiY2FuQ3JlYXRlIjpmYWxzZSwiY2FuRWRpdCI6ZmFsc2UsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6Ik9SR0FOSVpBVElPTl9QU1AiLCJjYW5DcmVhdGUiOmZhbHNlLCJjYW5FZGl0IjpmYWxzZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuUmVsZXRlIjpmYWxzZX0seyJuYW1lIjoiQVBQTElDQVRJT05fQUNDRVNTX0xPR1MiLCJjYW5DcmVhdGUiOnRydWUsImNhbkVkaXQiOnRydWUsImNhblJlYWQiOnRydWUsImNhblJlbGV0ZSI6ZmFsc2V9LHsibmFtZSI6Ik9SR0FOSVpBVElPTl9TRVRUSU5HUyIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJNRVRBREFUQSIsImNhbkNyZWF0ZSI6ZmFsc2UsImNhbkVkaXQiOmZhbHNlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfSx7Im5hbWUiOiJVU0VSIiwiY2FuQ3JlYXRlIjp0cnVlLCJjYW5FZGl0Ijp0cnVlLCJjYW5SZWFkIjp0cnVlLCJjYW5SZWxldGUiOmZhbHNlfV19fV0sInJvbGVzIjpbeyJuYW1lIjoiT1BBWV9NRVJDSEFOVCJ9XSwiaWF0IjoxNjk2ODQzNDc0LCJleHAiOjE2OTY4NTA2NzR9.F7TTKtk7RPnR5zL54hmZcUNx2lMo3Xfl25QlfXGAK1Y"
        },
      });
  
      if (!result.ok) {
        // Handle non-successful status codes here
        console.error(result.status);
        setmessageStatus(true)
        setMessage(result.description)
        setMessageType("error")
        
      } else {
        const result2 = await result.json();
        console.log(result2)
       
          setmessageStatus(true);
          setMessage(result2.description)
          setMessageType("success")
       
        
      }
  
      
    } catch (error) {
      console.error("An error occurred:", error);
      setMessageType("error")
      setMessage("login failed")
    }finally {
      setLoading(false); // Step 2: Set loading to false when the request is completed
    }
  };
  



    return(
        <div className=" h-full  pl-32">
            <div className=" ml-10 mt-5">
                <img src={logo} style={{width: '80px'}} alt="" />
            </div>
            <div className="ml-10 mt-5">
            <img style={{width:"7%"}} className=" " src={back} alt="" />
            </div>
             <div className=" flex ml-10 mt-14">
                <div className=" h-full">
                    <div className=" flex items-center">Choose  your Payment method!</div>
                    <div className=" space-y-4 mt-8">
                    <div>
                    <div class="flex items-center  w-full pl-4 border border-blue-500 rounded-lg dark:border-gray-700">
                    <img src={creditcardIamge}  name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="bordered-checkbox-2" class="w-full  py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Credit Card</label>
   <div onClick={handleChecked}>
     {
        checked===true ? <img src={checked2} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>: <img src={checked1} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     }
    </div> 
   
              </div>
                    </div>
                    <div>
                    <div class="flex items-center  w-full pl-4 border border-blue-500 rounded-lg dark:border-gray-700">
                    <img src={airtelLogo}  name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="bordered-checkbox-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Airtel Money</label>
   <div onClick={()=>{setAirtelChecked(true);setChecked(false);setMobileMoneyChecked(false);setPaypalChecked(false)}}>
     {
        airtelChecked===true ? <img src={checked2} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>: <img src={checked1} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     }
    </div> 
   
              </div>
                    </div>
                    <div>
                    <div class="flex items-center  w-full pl-4 border border-blue-500 rounded-lg dark:border-gray-700">
                    <img src={payPalLogo}  name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="bordered-checkbox-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> PayPal</label>
   <div onClick={()=>{setPaypalChecked(true);setAirtelChecked(false);setChecked(false);setMobileMoneyChecked(false)}}>
     {
        paypalChecked===true ? <img src={checked2} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>: <img src={checked1} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     }
    </div> 
   
              </div>
                    </div>
                    <div>
                    <div class="flex items-center  w-full pl-4 border border-blue-500 rounded-lg dark:border-gray-700">
                    <img src={mtnLogo}  name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     <label for="bordered-checkbox-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mobile Money</label>
   <div onClick={()=>{setPaypalChecked(false);setAirtelChecked(false);setChecked(false);setMobileMoneyChecked(true)}}>
     {
        mobileMoneyChecked===true ? <img src={checked2} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>: <img src={checked1} checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4  ml-48  mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
     }
    </div> 
   
              </div>
                    </div>
                    </div>
                </div>
                <div className=" absolute w-64  mt-11 right-64">
                  
                  {
                    mobileMoneyChecked===true?(  <div>
                        <div className="whitespace-nowrap">
                        Enter Your Mtn  Mobile Money Number
                        </div>
                        <div className=" mt-3">
                          <div className=" relative">  <input  onChange={(e)=>{setPhoneNumber(e.target.value)}} className=" rounded-lg" style={{width:"110%"}} type="text" />
                          <button className=" absolute top-0 right-0 pt-1"> <div style={{color:"#01499B"}}>CHANGE</div></button>
                          
                          </div>
                          <div style={{width:"110%"}} className=" mt-3 flex border  border-teal-500 space-x-5">
                           <div className=" flex space-x-5 py-4">
                           <div className=" ml-3">Amount</div>
                            <div>{price}</div>
                           </div>
                        </div> 
                           
                        </div>
                        <div style={{width:"110%",backgroundColor:"#01499B"}} className=" mt-2 border">
                        <button onClick={ HandleRequestPayment} className=" w-full flex justify-center text-white py-3"> Make Payment</button>
                        </div>
                        <div   style={{width:"110%"}} className=" mt-2" >
                            <span style={{fontFamily:"Poppins",fontSize:"16px",fontWeight:400}}>
                            Tips: Please make sure the account balance is greater than rental  fee , otherwise the payment will not be completed
                            </span>
                        </div>
    
                        </div>):(  <span style={{fontFamily:"Poppins",fontSize:"30px",lineHeight:"45px",color:"#01499B"}}>Choose your payment Method
            and make your Payment now!</span>)
                  }
                </div>
             </div>
        </div>
    )
}
export default PaymentPage
