import React from "react";
import Header from "./header";
import '../App.css'
import { useState } from "react";
import bodyPic from './Images/Rectangle 1.png'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css';
import config from './config';
 import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import phonepng from './Images/phonePng.png'
import emaillogo from './Images/Vector@2x.png'
const Chat=()=>{
    const[accountClicked,setAccountClicked]=useState(false)
    const handleAccountClick=()=>{
        setAccountClicked(!accountClicked)
        console.log(!accountClicked)
    }
    return(
        <div>
        <Header></Header>
        <div className="mt-5 h-full  mx-8">
        <div className="relative h-1/3 ">
    <img className="brightness-50  " src={bodyPic} alt="" />
    <div className="w-full inset-x-0  top-20  absolute flex justify-center items-center">
      <span className="text-center   font-txtFontFamily text-txtFontSize font-headerFontWeight leading-txtlineHeight tracking-txtLetterSpacing text-white">We want to hear from you</span>
     </div>
     <div className="w-full inset-x-0  top-28  absolute flex justify-center items-center">
      <span className="text-center   font-txtFontFamily text-txtFontSize font-headerFontWeight leading-txtlineHeight tracking-txtLetterSpacing text-white">Send us a message, give us a call, or better still visit us.</span>
     </div>
     <div className=" text-white left-40  bottom-0 top-4   absolute w-full mt-40">
         <div style={{width:'930px',height:'520px'}} className=" bg-white  flex  border-txtecolor border-8">
            <div style={{width:'43%'}}>
            <Chatbot    config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider} />
            </div>
            {/* <div className=" text-black">
                <div>
                    <div>Company Email/Phone</div>
                    <div className=" flex">
                    <div className='  mt-2'><img style={{width:'21px',height:'18px'}} src={phonepng} alt="" /></div>
                    <div>:</div>
                        <div>0788000000</div>

                    </div>
                    <div className=" flex">
                    <div className='  mt-2'><img style={{width:'21px',height:'18px'}} src={phonepng} alt="" /></div>
                    <div>:</div>
                        <div>0788000000</div>

                    </div>
                </div>
                <div>n</div>
                <div>o</div>
            </div> */}
         </div>
   </div>
  </div>
        </div>
        </div>
    )
}
export default Chat