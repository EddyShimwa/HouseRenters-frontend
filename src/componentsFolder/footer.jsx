import React from "react";
import logo from './Images/logo.png'
 import facebooklogo from './Images/facebook.png'
 import watsapplogo from './Images/watsapp.png'
 import twitterlogo from './Images/twitter.png'
 import instgramlogo from './Images/instgram.png'
 import locationlogo from './Images/location.png'
 import phonelogo from './Images/phone.png'
 import maillogo from './Images/mail.png'
 import captionlogo from './Images/caption.png'
const Footer=()=>{
    return(
        <div className=" w-full pt-5 pb-2">
            <div className=" py-9">
        <div className="flex mx-16  justify-between">
            <div className=" space-y-5">
                <div>
                    <img src={logo} alt="" />
                </div>
                <div className=" w-64">
                    <span className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing">
                    On our web site  landlords advertise their rental house and connect with people who are searching for a better home to live
                    </span>
                </div>
                <div className=" flex space-x-5">
                    <div>
                        <img style={{width:'11px',height:'19.5px'}} src={facebooklogo} alt="" />
                    </div>
                    <div>
                        <img style={{width:'19.9px',height:'20px'}} src={watsapplogo} alt="" />
                    </div>
                    <div>
                        <img style={{width:'20px',height:'20px'}} src={instgramlogo} alt="" />
                    </div>
                    <div>
                        <img style={{width:'20.25px',height:'18px'}} src={twitterlogo} alt="" />
                    </div>
                </div>
            </div>
            <div className=" ml-5 space-y-4 mt-7">
                <div>
                    <span className=" font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing text-txtecolor">Get in touch</span>
                </div>
                <div className=" flex space-x-2">
                    <div>
                        <img style={{width:'16px',height:'20px'}} src={locationlogo} alt="" />
                    </div>
                    <div>:</div>
                    <div>
                        <span className=" font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing">0000</span>
                    </div>
                </div>
                <div className="  flex space-x-2">
                    <div>
                        <img style={{width:'18px',height:'18px'}} src={phonelogo} alt="" />
                    </div>
                    <div>:</div>
                    <div>
                        <span className=" font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing">0784792020</span>
                    </div>
                </div>
                <div className=" space-x-2 flex">
                    <div>
                        <img style={{width:'20px',height:'16px'}} src={maillogo} alt="" />
                    </div>
                    <div>:</div>
                    <div>
                        <span className=" font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing">wheretostay@gmail.com</span>
                    </div>
                </div>
            </div>
            <div  className="mt-7 space-y-2">
                <div>
                    <span className=" font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing text-txtecolor">Property cite</span>
                </div>
                <div>
                    <span className=" font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing">Gasabo</span>
                </div>
                <div>
                    <span className=" font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing">Kicukiro</span>
                </div>
                <div>
                    <span className=" font-txtFontFamily text-txtbodyFontsize font-headerFontWeight leading-txtbodylineHeight tracking-txtbodyLetterspacing">Nyarugenge</span>
                </div>
            </div>
           
        </div>
        <div className=" flex  justify-center">
            <div  className=" ">
                <img src={captionlogo} alt="" />
            </div>
            <div  className="">
                <span className=" text-center  font-txtFontFamily text-txtbodyFontsize  leading-txtbodylineHeight tracking-txtbodyLetterspacing  font-txtbodyFontWeight">All Right Reserved By <span className="text-txtecolor">WhereToStay ltd 2023</span></span>
            </div>
            </div>
        </div>
        </div>
    )
}
export default Footer