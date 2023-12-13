import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Login() {
 const{open}=useContext(OpenModalContext)
 const{setOpen}=useContext(OpenModalContext)
 const[enterYourEmail,setEnterYourEmail]=useState("")
 const[enterYourPassword,setEnterYourPassword]=useState("")
 const{setmessageStatus}=useContext(OpenModalContext)
  const{messageStatus}=useContext(OpenModalContext)
  const{setMessage}=useContext(OpenModalContext)
  const{setMessageType}=useContext(OpenModalContext)
  const [loading, setLoading] = useState(false);
  const{houseId}=useContext(OpenModalContext)
  const { setOpenSignup } = useContext(OpenModalContext);
  const{setBookingStatus}=useContext(OpenModalContext)
  const { setOpenLogin } = useContext(OpenModalContext);
   console.log("house id in login is",houseId)
 const navigate=useNavigate(Navigate)
 const handleclose=()=>{
    setOpen(false)
 }





 const handleLoginn = async (e) => {
e.preventDefault();


  try {
    setLoading(true);
    const result = await fetch("https://wheretostay.onrender.com/api/auths/login", {
      method: "POST",
      body: JSON.stringify({
        "email":enterYourEmail,
        "password":enterYourPassword
              }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (!result.ok) {
      // Handle non-successful status codes here
      console.error(result.status);
      setmessageStatus(true)
      setMessage("incorrect user name or password")
      setMessageType("error")
      
    } else {
      const result2 = await result.json();
      console.log(result2)
      
      if (result2.message === "landlord successfuly logged in") {
        setmessageStatus(true);
        setMessage(result2.message)
        setMessageType("success")
        setOpen(false)
        const token = result2.token;
        localStorage.setItem("token", token);
        console.log("token is",result2.token)

        navigate('/dashboard',{state:{token:result2.token}})
        
      }
     else
      {
        setmessageStatus(true);
        setMessage(result2.message)
        setMessageType("success")
        setOpen(false)
        const token=result2.token
        localStorage.setItem("token", token);
        console.log("house id in login",houseId)
        navigate(`/userDashboard/${houseId}/${token}`)
        console.log("token  of student is:",result2.token)
      }
      
    }

    
  } catch (error) {
    console.error("An error occurred:", error);
    setMessageType("error")
    setMessage("login failed")
  }finally {
    setLoading(false); // Step 2: Set loading to false when the request is completed
  }
};

const handleOpenSignup = () => {
  setOpenSignup(true);
  setOpen(false)
  console.log("signup clicked")
};




  return (
    <div>
      <Modal
        open={open}
        onClose={handleclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className=" w-2/3  rounded-2xl">
          <Typography id="modal-modal-title" variant="h6" component="h2">
               {
                loading&&(
                  <div className=' flex justify-center space-x-3'>
   
                  <div class="flex items-center justify-center w-16  border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                  </div>
                                 
                                    
                  <div class="flex items-center justify-center w-16 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <div role="status">
                          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                          <span class="sr-only">Loading...</span>
                      </div>
                  </div>
                  
                                  </div>
                )
               }
              <div className=' flex justify-end '> <button onClick={handleclose}> <img  src={closeIcon} alt="" /></button></div>
               <span className=' flex justify-center font-txtFontFamily text-loginFontsize font-txtbodyFontWeight leading-loginLineHeight tracking-txtbodyLetterspacing text-txtecolor underline underline-offset-8'>LogIn</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className=' space-y-4 w-full'>
              <div  className=' flex space-x-2 rounded-lg w-full  border-black border-2'>
                <div className='flex space-x-2 py-1 pl-2'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={emaillogo} alt="" /></div>
                <div> <input style={{width:'220%', border: 'none', outline: 'none'}} onChange={(e)=>{setEnterYourEmail(e.target.value)}} className='myclass border-none  focus-visible:outline-none focus-visible:border-none  focus:outline-none' placeholder='Enter your email' type="text"    /> </div>
                </div>
              </div>
              <div  className=' flex space-x-2 rounded-lg  w-full  border-black border-2'>
                <div className='flex  py-1 pl-2 w-full '>
                <div className='   mt-3'><img style={{width:'21px',height:'18px'}} src={passwLogo} alt="" /></div>
                <div> <input style={{width:'220%', border: 'none', outline: 'none',marginLeft:'3%'}} onChange={(e)=>{setEnterYourPassword(e.target.value)}} className=' border-none   focus:outline-none' placeholder='Enter your password' type="password" /> </div>
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
                <div> <button onClick={handleLoginn} className=' border-none mt-3  font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing text-white'>Login</button> </div>
                </div>
                </div>
                <div className=' flex space-x-2 bg-white rounded-lg border-4  border-txtecolor '>
                  <div className='flex justify-center py-1 px-6 space-x-2  w-64'>
                <div className=' mt-3'><img style={{width:'21px',height:'18px'}} src={signuplogo} alt="" /></div>
                <div> <button   className=' border-none mt-3  focus:outline-none font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing'>Sign up</button> </div>
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
           

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
