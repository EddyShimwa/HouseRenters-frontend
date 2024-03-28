/* eslint-disable */
import React, { useEffect, useState } from "react";
import logo from "./Images/logo.png";
import { useContext } from "react";
import { OpenModalContext } from "./context";
import { FamilyRestroomTwoTone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FiUser } from 'react-icons/fi';

const Header = () => {
  const [accountClicked, setAccountClicked] = useState(false);
  const { setOpenLogin } = useContext(OpenModalContext);
  const { openLogin } = useContext(OpenModalContext);
  const { setOpenSignup } = useContext(OpenModalContext);
  const { setOpenChat } = useContext(OpenModalContext);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [userName, setUserName] = useState(""); 
  const{setLandLoadClicked}=useContext(OpenModalContext)
  const{setStudentsClicked}=useContext(OpenModalContext)
  const{landloardClicked}=useContext(OpenModalContext)
  const{setRole}=useContext(OpenModalContext)
  const fetchUserName = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      console.log(userToken);
      if (!userToken) {
        console.error("User token not found");
        return;
      }

      const response = await fetch('https://wheretostay.onrender.com/api/user', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUserName(userData.firstName);
      } else {
        console.error("Error fetching user's information:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user's information", error);
    }
  };
  useEffect(() => {
  fetchUserName();
}, []);

  
  const handleAccountClick = () => {
    setAccountClicked(!accountClicked);
    console.log(!accountClicked);
  };
  const handleOpen = () => {
    setOpenLogin(true);
    setLandLoadClicked(true) 
    setStudentsClicked(false)
    setRole("landlord")
  };
  const handleOpenBooking=()=>{
    setOpenLogin(true);
    setLandLoadClicked(false)
    setStudentsClicked(true)
    setRole("student")
  }
  const handleOpenSignup = () => {
    setOpenSignup(true);
    setAccountClicked(false);
    console.log("signup clicked");
  };
  const handleOpenChat = () => {
    setOpenChat(true);
  };
  const handleMouseOver = () => {
    setMouseIsOver(true);
    console.log(true);
  };
  const handleMouseLeav = () => {
    setMouseIsOver(false);
    console.log(false);
  };
  return (
    <div className="mt-4 h-full mx-8">
      {console.log("landloard clicked is:",landloardClicked)}
      <div className="flex-1 flex justify-between mx-8">
      <div className="flex items-center">
  <span className="text-blue-500 ">Scholarz</span>
  <img src={logo} alt="" className="w-14 mx-2" />
  <span className="text-blue-500">Nid</span>
</div>
        <div>
          <div className="flex space-x-6 justify-center items-center">
            <div className="text-headerFontSize mt-2 font-headerFontFamily font-headerFontWeight leading-headerLineHeight">
              Home
            </div>
            <div className="text-headerFontSize mt-2 font-headerFontFamily font-headerFontWeight leading-headerLineHeight">
              <button onClick={handleOpen} type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                <div className="flex items-center justify-center">
                  <FiUser />
                  <span className="ml-2">LandLords</span>
                </div>
              </button>
            </div>
            <div className="text-headerFontSize mt-2 font-headerFontFamily font-headerFontWeight leading-headerLineHeight">
              <button onClick={handleOpenBooking} type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                <div className="flex items-center justify-center">
                  <FiUser />
                  <span className="ml-2">Students</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
