import React, { useEffect } from "react";
import Header from "./header";
import makeAnimated from 'react-select/animated';
import Select from "react-select";

import logo from "./Images/logo.png";
import homelogo from "./Images/homelogo.png";
import dashboardlogo from "./Images/dashlogo.png";
import addnewrentallogo from "./Images/dashboardLogo.png";
import logoutlogo from "./Images/logoutlogo.png";
import profilePhoto from "./Images/accountOwner.png";
import locationlogo from "./Images/location.png";
import apartmentlogo from "./Images/apartmentlogo.png";
import bedroomlogo from "./Images/bedroomlogo.png";
import bathroomlogo from "./Images/bathroomlogo.png";
import Chart from "react-apexcharts";
import houseImage from "./Images/house0.png";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdBedroomParent, MdBathroom } from "react-icons/md";
import imglogo from "./Images/imglogo.png";
import { useContext } from "react";
import { OpenModalContext } from "./context";
import { useLocation, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { color } from "@cloudinary/url-gen/qualifiers/background";
import "../App.css";


const AddnewRental = () => {
  const navigate = useNavigate(Navigate);
  const{tokenToUseInPayment}=useParams()
  const { newToken } = useParams();
  const splitToken = newToken.split(" ");
  const newTokenn = splitToken[1];
  console.log("token from dashboard", newTokenn);
  const [imageURL, setImageURL] = useState("");
  const [imageURL2, setImageURL2] = useState("");
  const [imageURL3, setImageURL3] = useState("");
  const [imageURL4, setImageURL4] = useState("");
  const [imageURL5, setImageURL5] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [Status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [sector, setSector] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numberOfBedroom, setNumberOfBedroom] = useState(0);
  const [numberofBoothroom, setNumberOfBoothRoom] = useState(0);
  const [rentalPrice, setRentalPrice] = useState(0);
  const [DescriptionOfProperty, setDescriptionOfProperty] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const { setmessageStatus } = useContext(OpenModalContext);
  const { messageStatus } = useContext(OpenModalContext);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { setMessage } = useContext(OpenModalContext);
  const { setMessageType } = useContext(OpenModalContext);
  const [loading, setLoading] = useState(false);
  const [IsImageUploaded, setIsImageUploaded] = useState(false);
  const [IsImageUploaded2, setIsImageUploaded2] = useState(false);
  const [IsImageUploaded3, setIsImageUploaded3] = useState(false);
  const [IsImageUploaded4, setIsImageUploaded4] = useState(false);
  const [IsImageUploaded5, setIsImageUploaded5] = useState(false);
  const [location, setLocation] = useState([0, 0]);

  const maxWords = 8;
  const handleDescriptionChange = (e) => {
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/);
    const currentWordCount = words.length;

    if (currentWordCount <= maxWords) {
      setDescriptionOfProperty(inputText);
      setWordCount(currentWordCount);
    }
  };
  const amenitiesOptions = [
    { value: "pool", label: "Pool" },
    { value: "gym", label: "Gym" },
    { value: "parking", label: "Parking" },
    { value: "security", label: "Security" },
    {value: "wifi", label: "Wifi"},
    {value: "water", label: "Water"},
    {value: "electricity", label: "Electricity"},
    {value: "furnished rooms", label: "Furnished Rooms"},
    {value: "kitchen", label: "Kitchen"},
    {value: "laundry", label: "Laundry"},
    {value: "air conditioning", label: "Air Conditioning"},
    {value: "cctv", label: "CCTV"}
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%", 
      border: "none", 
      borderBottom: "1px solid #d1d5db", 
      borderRadius: 0, 
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "dodgerblue" : "white",
      color: state.isSelected ? "white" : "black",
    }),
  }

  const handleAmenitiesChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedAmenities(selectedValues);
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ww2ueyt4");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhtyvcwxo/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setIsImageUploaded(true);
          setImageURL(imageUrl);
          console.log("link yifoto", imageUrl);
        } else {
          console.error("Image upload failed");
          setIsImageUploaded(false);
        }
      } catch (error) {
        console.error("An error occurred while uploading the image:", error);
        setIsImageUploaded(false);
      }
    } else {
      console.error("No files selected.");
      setIsImageUploaded(false);
    }
  };
  const handleImageUpload2 = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ww2ueyt4");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhtyvcwxo/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setIsImageUploaded2(true);
          setImageURL2(imageUrl);
          console.log("link yifoto", imageUrl);
        } else {
          console.error("Image upload failed");
          setIsImageUploaded2(false);
        }
      } catch (error) {
        console.error("An error occurred while uploading the image:", error);
        setIsImageUploaded2(false);
      }
    } else {
      console.error("No files selected.");
      setIsImageUploaded2(false);
    }
  };

  const handleImageUpload3 = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ww2ueyt4");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhtyvcwxo/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setIsImageUploaded3(true);
          setImageURL3(imageUrl);
          console.log("link yifoto", imageUrl);
        } else {
          console.error("Image upload failed");
          setIsImageUploaded3(false);
        }
      } catch (error) {
        console.error("An error occurred while uploading the image:", error);
        setIsImageUploaded3(false);
      }
    } else {
      console.error("No files selected.");
      setIsImageUploaded3(false);
    }
  };
  const handleImageUpload4 = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ww2ueyt4");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhtyvcwxo/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setIsImageUploaded4(true);
          setImageURL4(imageUrl);
          console.log("link yifoto", imageUrl);
        } else {
          console.error("Image upload failed");
          setIsImageUploaded4(false);
        }
      } catch (error) {
        console.error("An error occurred while uploading the image:", error);
        setIsImageUploaded4(false);
      }
    } else {
      console.error("No files selected.");
      setIsImageUploaded4(false);
    }
  };
  const handleImageUpload5 = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ww2ueyt4");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhtyvcwxo/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setIsImageUploaded5(true);
          setImageURL5(imageUrl);
          console.log("link yifoto", imageUrl);
        } else {
          console.error("Image upload failed");
          setIsImageUploaded5(false);
        }
      } catch (error) {
        console.error("An error occurred while uploading the image:", error);
        setIsImageUploaded5(false);
      }
    } else {
      console.error("No files selected.");
      setIsImageUploaded5(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setLocation([latitude, longitude]);
      });
      console.log(location);
    } else {
      alert("Geolocation is not supported by your browser.");
    }

  };
  const handleSubmitHouse = async (e) => {
    e.preventDefault();
   
    if (
      IsImageUploaded == false &&
      IsImageUploaded2 == false &&
      IsImageUploaded3 == false &&
      IsImageUploaded4 == false &&
      IsImageUploaded5 == false
    ) {
      setmessageStatus(true);
      setMessage("failed uploading image");
      setMessageType("error");
      return;
    } else {
      console.log([
        DescriptionOfProperty,
        city,
        rentalPrice,
        location,
        streetAddress,
        propertyType,
        imageURL,
        numberOfBedroom,
        selectedAmenities,
        numberofBoothroom,
      ]);
      try {
        setLoading(true);
        const result = await fetch(
          "https://wheretostay.onrender.com/api/properties/create",
          {
            method: "POST",
            body: JSON.stringify({
              description: DescriptionOfProperty,
              street_address: streetAddress,
              price: rentalPrice,
              location: { latitude: location[0], longitude: location[1] },
              property_type: propertyType,
              imageUrls: [imageURL, imageURL2, imageURL3, imageURL4, imageURL5],
              number_rooms: numberOfBedroom,
              number_of_bathrooms: numberofBoothroom,
              city: city,
              amenities: selectedAmenities,
            }),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: newTokenn,
            },
          }
        );

        if (!result.ok) {
          console.error(result.status);
          setmessageStatus(true);
          setMessage("failed");
          setMessageType("error");
        } else {
          const result2 = await result.json();
          console.log(result2);

          setmessageStatus(true);
          setMessage("property posted successfully");
          setMessageType("success");
          navigate(`/dashboard/${newToken}`);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setMessageType("error");
        setMessage("login failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" h-full overflow-y-auto">
      <div className=" fixed top-1">
        <div className=" mt-4 w-full mx-8 ">
          <div className=" flex-1 flex   justify-between  mx-8">
            <div>
              <img style={{ maxWidth: "150px" }} src={logo} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-10">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="default-sidebar"
          class="fixed border   top-28  left-10 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div class="h-full px-3 py-4 bg-txtecolor overflow-y-auto  dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  class="flex flex-col  items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
                >
                  <img style={{ maxWidth: "50px" }} src={profilePhoto} alt="" />
                  {/* <span class="">Uwase Yvonne</span> */}
                </a>
              </li>

              <li>
                <button
                  onClick={() => {
                    navigate(`/dashboard/${newToken}`);
                  }}
                >
                  {" "}
                  <div class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                    <img src={dashboardlogo} alt="" />
                    <span class="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                  </div>
                </button>
              </li>

              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
                >
                  <img src={logoutlogo} alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap">LogOut</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div style={{ marginLeft: "38%" }} className="  mt-28 space-y-4">
 
        <div class="mb-3 flex space-x-4">
            <label
              for="large-input"
              class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              onChange={(e) => {
                setCity(e.target.value);
              }}
              style={{ width: "55%", marginLeft: "22%", padding: "8px", fontSize: "14px" }}
              type="text"
              id="large-input"
              class="block  p-4 text-gray-900 border  border-b-mycolor rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="mb-6 flex space-x-16">
            <label
              for="large-input"
              class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Street Address
            </label>
            <input
              onChange={(e) => {
                setStreetAddress(e.target.value);
              }}
              style={{ width: "55%", marginLeft: "14%", padding: "8px", fontSize: "14px" }}
              type="text"
              id="large-input"
              class="block  p-4 text-gray-900 border  border-b-mycolor rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* <div className="mb-3 flex space-x-4">
  <label
    htmlFor="large-input"
    className="block mb-1 mt-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Location
  </label>
  <input
    style={{ width: "50%", marginLeft: "18.5%", padding: "8px", fontSize: "14px" }}
    type="text"
    placeholder="click the button to get your location"
    id="large-input"
    className="block p-2 text-gray-900 border border-b-mycolor rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    value={location.join(", ")}
    readOnly
  />
  <button
    onClick={handleGetLocation}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded text-sm"
  >
    <FaLocationArrow />
  </button>
</div> */}



          <div class="mb-6 flex space-x-16">
            <label
              for="large-input"
              class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Property Type
            </label>
            <select
              onChange={(e) => {
                setPropertyType(e.target.value);
              }}
              style={{ width: "55%", marginLeft: "14.5%", padding: "8px", fontSize: "14px" }}
              type="text"
              id="large-input"
              class="block  p-4 text-gray-900 border  border-b-mycolor rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
            >
              <option value="ghetto">Ghetto</option>
              <option value="apartment">Apartment</option>
              <option value="home">Home</option>
            </select>
          </div>
          <div class="mb-6 flex space-x-16">
  <label
    for="bedroom-select"
    class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
  >
    Number of Bedrooms
  </label>
  <select
    onChange={(e) => {
      setNumberOfBedroom(e.target.value);
    }}
    style={{ width: "55%", marginLeft: "9%", padding: "8px", fontSize: "14px" }}
    id="bedroom-select"
    className="block p-4 text-gray-900 border border-b-mycolor rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option> 
    <option value="7">7</option>
    <option value="8">8</option>
  </select>
</div>


          <div class="mb-6 flex space-x-16">
  <label
    for="bathroom-select"
    class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
  >
    Number of bathrooms
  </label>
  <select
    onChange={(e) => {
      setNumberOfBoothRoom(e.target.value);
    }}
    style={{ width: "55%", marginLeft: "9%", padding: "8px", fontSize: "14px" }}
    id="bathroom-select"
    class="block p-4 text-gray-900 border border-b-mycolor rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
  </select>
</div>

<div className="mb-6 flex space-x-20 w-4/5" style={{ maxHeight: "300px" }}>
  <label
    htmlFor="large-input"
    className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
    style={{ marginRight: "12%" }}
  >
    Amenities
  </label>
  <Select
    isMulti
    options={amenitiesOptions}
    value={selectedAmenities.map(value => ({ value, label: value }))}
    onChange={handleAmenitiesChange}
    styles={{
      marginLeft: "10%",
      padding: "8px",
      fontSize: "14px",
      maxHeight: "80%",
    }}
    className="w-3/4"
  />
</div>


          <div class="mb-6 flex space-x-16">
            <label
              for="large-input"
              class="block mb-2 mt-4 mr-8 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rental Price
            </label>
            <input
              onChange={(e) => setRentalPrice(e.target.value)}
              style={{ width: "55%", marginLeft: "13%", padding: "8px", fontSize: "14px" }}
              type="number"
              id="large-input"
              class="block  p-4 text-gray-900 border  border-b-mycolor rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          
          <div class="mb-6 flex space-x-16">
            <label
              for="large-input"
              class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description Of Property
            </label>
            <textarea
              onChange={handleDescriptionChange}
              style={{ width: "55%", marginLeft: "8%", padding: "8px", fontSize: "14px" }}
              type="text"
              id="large-input"
              value={DescriptionOfProperty}
              class="block  p-4 text-gray-900 border  border-b-mycolor rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
            <p className="text-gray-500">{wordCount} word{wordCount !== 1 ? 's' : ''}</p>
          </div>
          <div className=" flex  space-x-10">
            <div className=" mt-4">Upload Photo</div>
            <div className="flex space-x-7" style={{ marginLeft: '19%' }}>
              <div
                style={{ marginLeft: "1%", maxWidth: "6%", maxHeight: "80%" }}
                class="relative   text-white p-2 rounded border border-black   cursor-pointer"
              >
                <div className="flex justify-center items-center w-full relative group">
                  <label className="flex justify-center items-center w-full relative group">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="opacity-0 absolute inset-0"
                    />
                    {imageURL ? (
                      <img
                        className="w-full h-full max-w-full max-h-full pb-4" // Add these styles
                        src={imageURL}
                        alt="Uploaded Image"
                      />
                    ) : (
                      <BsFillImageFill
                        className="camera-icon transition-blur group-hover:blur-sm "
                        size={48}
                      />
                    )}
                    <div className="absolute inset-0 flex justify-center items-center text-black opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in">
                      <AiOutlineCloudUpload size={40} />
                    </div>
                  </label>
                </div>
              </div>
              <div
                style={{ marginLeft: "1%", maxWidth: "6%", maxHeight: "80%" }}
                class="relative   text-white p-2 rounded border border-black   cursor-pointer"
              >
                <div className="flex justify-center items-center w-full relative group">
                  <label className="flex justify-center items-center w-full relative group">
                    <input
                      type="file"
                      onChange={handleImageUpload2}
                      accept="image/*"
                      className="opacity-0 absolute inset-0"
                    />
                    {imageURL2 ? (
                      <img
                        className="w-full h-3/4 max-w-full max-h-full" // Add these styles
                        src={imageURL2}
                        alt="Uploaded Image"
                      />
                    ) : (
                      <BsFillImageFill
                        className="camera-icon transition-blur group-hover:blur-sm "
                        size={48}
                      />
                    )}
                    <div className="absolute inset-0 flex justify-center items-center text-black opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in">
                      <AiOutlineCloudUpload size={40} />
                    </div>
                  </label>
                </div>
              </div>
              <div
                style={{ marginLeft: "1%", maxWidth: "6%", maxHeight: "80%" }}
                class="relative   text-white p-2 rounded border border-black   cursor-pointer"
              >
                <div className="flex justify-center items-center w-full relative group">
                  <label className="flex justify-center items-center w-full relative group">
                    <input
                      type="file"
                      onChange={handleImageUpload3}
                      accept="image/*"
                      className="opacity-0 absolute inset-0"
                    />
                    {imageURL3 ? (
                      <img
                        className="w-full h-3/4 max-w-full max-h-full" // Add these styles
                        src={imageURL3}
                        alt="Uploaded Image"
                      />
                    ) : (
                      <BsFillImageFill
                        className="camera-icon transition-blur group-hover:blur-sm "
                        size={48}
                      />
                    )}
                    <div className="absolute inset-0 flex justify-center items-center text-black opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in">
                      <AiOutlineCloudUpload size={40} />
                    </div>
                  </label>
                </div>
              </div>
              <div
                style={{ marginLeft: "1%", maxWidth: "6%", maxHeight: "80%" }}
                class="relative   text-white p-2 rounded border border-black   cursor-pointer"
              >
                <div className="flex justify-center items-center w-full relative group">
                  <label className="flex justify-center items-center w-full relative group">
                    <input
                      type="file"
                      onChange={handleImageUpload4}
                      accept="image/*"
                      className="opacity-0 absolute inset-0"
                    />
                    {imageURL4 ? (
                      <img
                        className="w-full h-3/4 max-w-full max-h-full" 
                        src={imageURL4}
                        alt="Uploaded Image"
                      />
                    ) : (
                      <BsFillImageFill
                        className="camera-icon transition-blur group-hover:blur-sm "
                        size={48}
                      />
                    )}
                    <div className="absolute inset-0 flex justify-center items-center text-black opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in">
                      <AiOutlineCloudUpload size={40} />
                    </div>
                  </label>
                </div>
              </div>
              <div
                style={{ marginLeft: "1%", maxWidth: "6%", maxHeight: "80%" }}
                class="relative   text-white p-2 rounded border border-black   cursor-pointer"
              >
                <div className="flex justify-center items-center w-full relative group">
                  <label className="flex justify-center items-center w-full relative group">
                    <input
                      type="file"
                      onChange={handleImageUpload5}
                      accept="image/*"
                      className="opacity-0 absolute inset-0"
                    />
                    {imageURL5 ? (
                      <img
                        className="w-full h-3/4 max-w-full max-h-full" 
                        src={imageURL5}
                        alt="Uploaded Image"
                      />
                    ) : (
                      <BsFillImageFill
                        className="camera-icon transition-blur group-hover:blur-sm "
                        size={48}
                      />
                    )}
                    <div className="absolute inset-0 flex justify-center items-center text-black opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in">
                      <AiOutlineCloudUpload size={40} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "45%" }}>
            <button
              onClick={handleSubmitHouse}
              type="button"
              class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Submit
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AddnewRental;
