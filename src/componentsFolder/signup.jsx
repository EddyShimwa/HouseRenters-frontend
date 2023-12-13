import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {  Space } from 'antd';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { OpenModalContext } from './context';
 import closeIcon from './Images/close.png'
 import emaillogo from './Images/Vector@2x.png'
 import passwLogo from './Images/passwordlogo.png'
 import viewPasswordLogo from './Images/viewpasswordlogo.png'
 import loginlogo from './Images/loginlogo.png'
 import signuplogo from './Images/signup-logo.png'
 import googlelogo from './Images/Google.png'
 import fblogo from './Images/fb.png'
 import phonepng from './Images/phonePng.png'
 import profilepng from './Images/profilePng.png'
 import { message } from 'antd';
import { useState } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ToastStatusExample from './alert';
import LinearProgress from '@mui/material/LinearProgress';
  
    

const style = {
  position: 'absolute',
  top: '53%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Signup() {
    const{openSignup}=useContext(OpenModalContext)
 const{setOpenSignup}=useContext(OpenModalContext)
  const[firstname,setFirstName]=useState("")
  const [secondname,setSecondname]=useState("")
  const[phoneNumber,setPhoneNumber]=useState("")
  const[email,setEmail]=useState("")
 const{role}=useContext(OpenModalContext)
  const[password,setPassword]=useState("")
  const{setMessage}=useContext(OpenModalContext)
  const[confirmPassword,setConfirmPassword]=useState("")
  const{setmessageStatus}=useContext(OpenModalContext)
  const{messageStatus}=useContext(OpenModalContext)
  const{setMessageType}=useContext(OpenModalContext)
  const{open}=useContext(OpenModalContext)
 const{setOpen}=useContext(OpenModalContext)
 const [loading, setLoading] = useState(false);
 const{landloardClicked}=useContext(OpenModalContext)
 const{studentsClicked}=useContext(OpenModalContext)
  const{setOpenLogin}=useContext(OpenModalContext)
  





  const HandleRequestPayment= async () => {
   
    
    
      try {
        setLoading(true);
        const result = await fetch("https://opay-api.oltranz.com/opay/register", {
          method: "POST",
          body: JSON.stringify(
            {
              "businessName" : "WhereToStay",
              "firstName" :firstname,
              "lastName" :secondname,
              "telephoneNumber" :phoneNumber,
              "email" :email,
              "address" : "kigali",
          
            }
          ),
          headers: {
            "Content-Type":"application/json",
          
          },
        });
    
        if (!result.ok) {
          // Handle non-successful status codes here
          console.error(result.status);
          setmessageStatus(true)
          setMessage(result.description)
          setMessageType("error")
          console.log(result.description)
          
        } else {
          const result2 = await result.json();
          console.log(result2)
         
            setmessageStatus(true);
            setMessage(result2.description)
            setMessageType("success")
         console.log(result2.description)
          
        }
    
        
      } catch (error) {
        console.error("An error occurred:", error);
        setMessageType("error")
        setMessage(" failed")
      }finally {
        setLoading(false); // Step 2: Set loading to false when the request is completed
      }
    };
  






 const handlecloseSignup=()=>{
    setOpenSignup(false)
 }
 
  
 const handleFormSubmit = async (e) => {
   
     e.preventDefault();
  if(/^[A-Za-z\s]+$/.test(firstname)===false)
  {
    e.preventDefault();
    setmessageStatus(true)
    setMessage("invalid first name")
     setMessageType("error")
     return;
     
  }
  else if(/^[A-Za-z]+$/.test(secondname)===false)
  {
    e.preventDefault();
    setmessageStatus(true)
    setMessage("invalid second name")
     setMessageType("error")
     return;
     
  }
  else if(/^(\+\d{12}|\d{12})$/.test(phoneNumber)===false)
  {
    e.preventDefault();
    setmessageStatus(true)
    setMessage("invalid phone number")
     setMessageType("error")
     return;
     
  }
  else if(password !== confirmPassword)
  {
    e.preventDefault();
    setmessageStatus(true)
    setMessage("password mismatch")
     setMessageType("error")
     return;
     
  }
  else{
  try {
    setLoading(true);
    const result = await fetch("https://wheretostay.onrender.com/api/auths/signup", {
      method: "POST",
      body: JSON.stringify({
        "firstName": firstname,
        "lastName": secondname,
        "phoneNumber": phoneNumber,
        "email": email,
        "password": password,
        "role": role,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (!result.ok) {
     
      console.error("API request failed with status: ", result.status);
      setmessageStatus(true)
      setMessage("email already exist ")
      setMessageType("error")
      
    } else {
      const result2 = await result.json();
    
      if (result2.message === "tenant registered successfully") {
        setmessageStatus(true);
        setMessage(result2.message)
        setOpenLogin(true);
        setMessageType("success")
        setOpenSignup(false)
        setOpen(true)

      }
     else
      {
        setmessageStatus(true);
        setMessage(result2.message)
        // HandleRequestPayment()
        setMessageType("success")
        setOpenSignup(false)
        
      }
      
    }

    
  } catch (error) {
    console.error("An error occurred:", error);
  }finally {
    setLoading(false); 
  }
}

};



  return (
    <div>

      {
        console.log("role is:",role)
      }
     {
              messageStatus&&(<ToastStatusExample></ToastStatusExample>)
            }
   <Modal
    
        open={openSignup}
        onClose={handlecloseSignup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
       
        <Box sx={style}  style={{maxHeight:550}} className=" overflow-y-auto w-2/3  rounded-2xl">
           
            
          <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className=' flex justify-end '> <button onClick={handlecloseSignup}> <img  src={closeIcon} alt="" /></button></div>
              {
                loading&&(
                  <div className='  overlay absolute flex   right-48  top-80  justify-center space-x-3'>
   
                
                                 
                                    
                  <div style={{width:'140%'}} class="flex items-center justify-center h-36 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                  <LinearProgress color="secondary" />
                  <LinearProgress color="success" />
                  <LinearProgress color="inherit" />
                  </Stack>
                  </div>
                  
                                  </div>
                )
               }
               <span className=' flex justify-center font-txtFontFamily text-loginFontsize font-txtbodyFontWeight leading-loginLineHeight tracking-txtbodyLetterspacing text-txtecolor underline underline-offset-8'>SignUp</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleFormSubmit} action="">
            <div className=' space-y-4 w-full'>

            <div  className=' flex space-x-2 rounded-lg w-full  border-black border-2'>
                <div className='flex space-x-2 py-1 pl-2'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={profilepng} alt="" /></div>
                <div> <input style={{width:'210%'}} required onChange={(e)=>{setFirstName(e.target.value)}} className=' border-none  focus:outline-none' placeholder='First name' type="text" /> </div>
                </div>
              </div>
            <div  className=' flex space-x-2 rounded-lg w-full  border-black border-2'>
                <div className='flex space-x-2 py-1 pl-2'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={profilepng} alt="" /></div>
                <div> <input style={{width:'210%'}} required onChange={(e)=>{setSecondname(e.target.value)}} className=' border-none  focus:outline-none' placeholder='Second name' type="text" /> </div>
                </div>
              </div>
            <div  className=' flex space-x-2 rounded-lg w-full  border-black border-2'>
                <div className='flex space-x-2 py-1 pl-2'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={phonepng} alt="" /></div>
                <div> <input style={{width:'210%'}} required onChange={(e)=>{setPhoneNumber(e.target.value)}} className=' border-none  focus:outline-none' placeholder='Phone number  format:078.....' type="text" /> </div>
                </div>
                
              </div>
              <div  className=' flex space-x-2 rounded-lg w-full  border-black border-2'>
                <div className='flex space-x-2 py-1 pl-2'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={profilepng} alt="" /></div>
                <div className=' '> 
                  <label className=' mt-5' htmlFor="role">role</label>
                  {
                    landloardClicked&&(
                   <select  className=' ml-64' name="" id="">
                    <option value="landlord">landlord</option>
                  </select> 
                    )
                  }
                  {
                    studentsClicked&&(
                      <select  className=' ml-64' name="" id="">
                      <option value="landlord">student</option>
                    </select> 
                    )
                  }
                </div>
                </div>
                
              </div>
            <div  className=' flex space-x-2 rounded-lg w-full  border-black border-2'>
                <div className='flex space-x-2 py-1 pl-2'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={emaillogo} alt="" /></div>
                <div> <input style={{width:'210%'}} required onChange={(e)=>{setEmail(e.target.value)}} className=' border-none  focus:outline-none' placeholder='Enter your email' type="email" /> </div>
                </div>
              </div>  
              
              <div  className=' flex space-x-2 rounded-lg  w-full  border-black border-2'>
                <div className='flex  py-1 pl-2 w-full '>
                <div className='   mt-3'><img style={{width:'21px',height:'18px'}} src={passwLogo} alt="" /></div>
                <div> <input style={{width:'213%'}} required  onChange={(e)=>{setPassword(e.target.value)}} className=' border-none   focus:outline-none' placeholder='Enter your password' type="password" /> </div>
                <div className=' ml-56  mt-3 '><img  className=' flex justify-end '   style={{width:'21px',height:'18px'}} src={viewPasswordLogo} alt="" /></div>
                </div>
              </div>
              <div  className=' flex space-x-2 rounded-lg  w-full  border-black border-2'>
                <div className='flex  py-1 pl-2 w-full '>
                <div className='   mt-3'><img style={{width:'21px',height:'18px'}} src={passwLogo} alt="" /></div>
                <div> <input style={{width:'213%'}} required onChange={(e)=>{setConfirmPassword(e.target.value)}} className=' border-none   focus:outline-none' placeholder='Confirm your password' type="password" /> </div>
                <div className=' ml-56  mt-3 '><img  className=' flex justify-end '   style={{width:'21px',height:'18px'}} src={viewPasswordLogo} alt="" /></div>
                </div>
              </div>
              <div className=' flex space-x-2 justify-center'>
                <div className=' font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing'>Forgot your password?</div>
                <button className=' font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing text-txtecolor'>Set one</button>
              </div>
              <div className=' flex space-x-6 '>
                <div className=' flex space-x-2  border-2 border-black bg-txtecolor rounded-lg'>
                  <div className='flex py-1 px-6 space-x-2  w-64 justify-center'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={loginlogo} alt="" /></div>
                <div> <button className=' border-none mt-3  font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing text-white'>Login</button> </div>
                </div>
                </div>
                <div className=' flex space-x-2 bg-white rounded-lg border-4  border-txtecolor '>
                  <div className='flex justify-center py-1 px-6 space-x-2  w-64'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={signuplogo} alt="" /></div>
                <div> <button type='submit' className=' border-none mt-3  focus:outline-none font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing'>Sign up</button> </div>
                </div>
                </div>
               
              </div>
              <div className=' flex justify-center font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing'>or</div>
              <div className=' flex space-x-6 '>
                <div className=' flex space-x-2  border-4  border-txtecolor  rounded-lg'>
                  <div className='flex py-1 px-6 space-x-2  w-64 justify-center'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={fblogo} alt="" /></div>
                <div> <button className=' border-none mt-3  focus:outline-none '> <span className='whitespace-pre-line font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing'>Continue with Facebook</span></button> </div>
                </div>
                </div>
                <div className=' flex space-x-2 bg-white rounded-lg border-4  border-txtecolor '>
                  <div className='flex justify-center py-1 px-6 space-x-2  w-64 '>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={googlelogo} alt="" /></div>
                <div> <button className=' border-none mt-3  focus:outline-none font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing'>Continue with Google</button> </div>
                </div>
                </div>
               
              </div>
 
            </div>
            </form>

          </Typography>
        </Box>
     
      </Modal>
     
    </div>
  );
}
