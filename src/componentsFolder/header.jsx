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
    <div className=" mt-4 h-full mx-8 ">
      {console.log("landloard clicked is:",landloardClicked)}
      <div className="  flex-1 flex  justify-between  mx-8">
        <div >
          <img src={logo} alt="" />
        </div>
        <div>
          <div className=" flex space-x-6 justify-center items-center">
            <div className=" text-headerFontSize mt-2 font-headerFontFamily font-headerFontWeight leading-headerLineHeight">
              Home
            </div>
            <div className=" text-headerFontSize mt-2 font-headerFontFamily font-headerFontWeight leading-headerLineHeight">
            <button  onClick={handleOpen} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Rental lists</button>
            </div>
            <div className=" text-headerFontSize mt-2 font-headerFontFamily font-headerFontWeight leading-headerLineHeight">
            <button onClick={handleOpenBooking} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Bookings</button>
            </div>
             
            {/* <div class="flex items-center justify-center space-x-4">
        
        <div>
            <div class="relative">
                <button
                    onClick={handleAccountClick}
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="text-black rounded-lg px-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                                 <div class="w-12 h-12 mr-2 rounded-full bg-green-500 flex items-center justify-center">
            <h1 class="text-white text-2xl">
            <FiUser></FiUser>
            </h1>
        </div>

                    <svg
                        class="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
            </div>

            <div className="absolute">
                {accountClicked && (
                    <div
                        id="dropdown"
                        class="z-10 relative bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700"
                    >
                        <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200 w-48 font-medium leading-5"
                            aria-labelledby="dropdownDefaultButton"
                        >    
                            <li>
                                <button
                                    onClick={handleOpen}
                                    href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                                >
                                    login
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleOpenSignup}
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                                >
                                    signup
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div> */}
  
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
