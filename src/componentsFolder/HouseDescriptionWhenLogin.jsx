 import AllHouseHeader from "./AllhousesHeader";
import marker from "./Images/icon8.gif";
import houseOwner from "./Images/accountOwner.png";
import { useContext, useEffect, useState } from "react";
import { OpenModalContext } from "./context";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import React from "react";
import "react-slideshow-image/dist/styles.css";
import Footer from "./footer";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


const customIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [38, 38],
  iconAnchor: [16, 32],
});
const { BaseLayer, Overlay } = LayersControl;

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

const HouseDescriptionWhenLogedIn = () => {
  const [houseDescriptionById, setHouseDescriptionById] = useState(null);
  const userID = Cookies.get("userID");
  const { setOpen } = useContext(OpenModalContext);
  const { houseId } = useParams();
  const navigate=useNavigate(Navigate)
  const{Newtoken}=useParams()
  const token=Newtoken
  const { setHouseId } = useContext(OpenModalContext);
  console.log("useparams  id:", houseId);
  const slideImages = [
    {
      url: houseDescriptionById && houseDescriptionById.imageUrls[0],
    },
    {
      url: houseDescriptionById && houseDescriptionById.imageUrls[1],
    },
    {
      url: houseDescriptionById && houseDescriptionById.imageUrls[2],
    },
    {
      url: houseDescriptionById && houseDescriptionById.imageUrls[3],
    },
    {
      url: houseDescriptionById && houseDescriptionById.imageUrls[4],
    },
  ];
  const getHouseById = async () => {
    const result = await fetch(
      `https://wheretostay.onrender.com/api/properties/${houseId}`
    );
    const result2 = await result.json();
    console.log(result2);
    setHouseDescriptionById(result2);
  };

  useEffect(() => {
    getHouseById();
    console.log(houseDescriptionById);
  }, []);
  return (
    <div className=" w-full">
     <AllHouseHeader></AllHouseHeader>
      <div className=" flex justify-center mt-16">
        <span className=" font-txtFontFamily text-txtbFontsize font-ttttttxtbodyFontWeight leading-tttttttttxtbodylineHeight tracking-txtbodyLetterspacing">
          More details about this Rental
        </span>
        <div className="  ml-52">
          <button
            onClick={() => {
            //   setHouseId(houseId);
            navigate(`/userDashboard/${houseId}/${token}`)

            }}
            type="button"
            class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Book Now
          </button>
        </div>
      </div>
      {houseDescriptionById && (
        <div>
          <div className=" flex justify-center  space-x-9">
            <div style={{ width: "500px" }} className="slide-container mt-20">
              <Slide>
                {slideImages.map((slideImage, index) => (
                  <div key={index}>
                    <div
                      style={{
                        ...divStyle,
                        backgroundImage: `url(${slideImage.url})`,
                      }}
                    ></div>
                  </div>
                ))}
              </Slide>
            </div>
            <div className=" mt-20 grid grid-cols-2 space-x-5 space-y-3">
              <div>
                <img
                  className="  w-52  h-36"
                  src={houseDescriptionById.imageUrls[1]}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="  w-52  h-36"
                  src={houseDescriptionById.imageUrls[2]}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="  w-52  h-36"
                  src={houseDescriptionById.imageUrls[3]}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="  w-52  h-36"
                  src={houseDescriptionById.imageUrls[4]}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="  w-52  h-36"
                  src={houseDescriptionById.imageUrls[1]}
                  alt=""
                />
              </div>
              <div>
                <img
                  className="  w-52  h-36"
                  src={houseDescriptionById.imageUrls[0]}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className=" ml-30 mt-7 flex items-center justify-center">
            <div className=" space-y-3 mr-40">
              <div>
                <span className=" font-txtFontFamily text-headerFontSize font-headerFontWeight leading-txttttLineHeight tracking-txttttttttttttttttttbodyLetterspacing">
                  Description
                </span>
              </div>
              <div className=" w-96">
                <span className=" font-txtFontFamily  font-txtbodyFontWeight  leading-txtbodylineHeight  tracking-txttttttttttttttttttbodyLetterspacing text-txtbodyFontsize">
                  {houseDescriptionById.description}
                </span>
              </div>
              <div className=" flex space-x-32">
                <div>
                  <div>
                    <span className=" font-txtFontFamily text-headerFontSize font-headerFontWeight leading-txttttLineHeight tracking-txttttttttttttttttttbodyLetterspacing">
                      Address
                    </span>
                  </div>
                  <div className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txttttttttttttttttttbodyLetterspacing">
                    <div>
                      <span>Address: {houseDescriptionById.location}</span>
                    </div>
                    <div>
                      <span>District: Gasabo</span>
                    </div>
                    <div>
                      <span>Sector: Bumbogo</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span className=" font-txtFontFamily text-headerFontSize font-headerFontWeight leading-txttttLineHeight tracking-txttttttttttttttttttbodyLetterspacing">
                      Overview
                    </span>
                  </div>
                  <div className=" font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txttttttttttttttttttbodyLetterspacing">
                    <div>
                      <span>
                        Property Type:{houseDescriptionById.property_type}
                      </span>
                    </div>
                    <div>
                      <span>
                        Number of Bedrooms:{houseDescriptionById.number_rooms}
                      </span>
                    </div>
                    <div>
                      <span>
                        Number of bathrooms:
                        {houseDescriptionById.number_of_bathrooms}
                      </span>
                    </div>
                    <div>
                      <span>
                        Price:{houseDescriptionById.price} Rwf per month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" space-y-3">
              <div className=" font-txtFontFamily text-headerFontSize font-headerFontWeight leading-txttttLineHeight tracking-txttttttttttttttttttbodyLetterspacing">
                Location
              </div>
              <div>
              <MapContainer
  center={[-1.9503097781668681, 30.133552819906043]}
  zoom={15}
  style={{ width: "500px", height: "300px" }}
>
  <LayersControl position="topright">
    <BaseLayer checked name="Street Map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </BaseLayer>
    <BaseLayer name="Satellite View">
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
      attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
      />
    </BaseLayer>
  </LayersControl>

  <Marker
    position={[-1.9503097781668681, 30.133552819906043]}
    icon={customIcon}
  />
</MapContainer>
              </div>
            </div>
          </div>
          <div className=" ml-32  mt-8">
            <div className="">
              <span className="  font-txtFontFamily text-headerFontSize font-headerFontWeight leading-txttttLineHeight tracking-txttttttttttttttttttbodyLetterspacing">
                Contact the Owner
              </span>
            </div>
            <div className=" flex  pt-4">
              <div
                style={{ width: "10%", height: "80px" }}
                className=" mr-5  mt-16 "
              >
                <img
                  className=" "
                  style={{ width: "100%" }}
                  src={houseOwner}
                  alt=""
                />
              </div>
              <div className=" mt-24  font-txtFontFamily text-txtbodyFontsize font-txtbodyFontWeight leading-txtbodylineHeight tracking-txttttttttttttttttttbodyLetterspacing">
                <div>
                  <span>
                    Property Owner:{houseDescriptionById.User.firstName}{" "}
                  </span>
                </div>
                <div>
                  <span>Phone:{houseDescriptionById.User.phoneNumber}</span>
                </div>
                <div>
                  <span>Email:{houseDescriptionById.User.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};
export default HouseDescriptionWhenLogedIn;
