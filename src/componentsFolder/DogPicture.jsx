// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';

const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    const GetAllHouse=async()=>{
      const result=await fetch("https://wheretostay.onrender.com/api/properties/all")
      const result2=await result.json()
      console.log(result2)
      setImageUrl(result2)
    }
    GetAllHouse()
  }, []);

  return (
    <div className=' space-y-3'>
      {
        imageUrl.map((item)=>{
          return <img src={item.imageUrls[0]} alt='a dog' />
        }) 
      }
    </div>
  );
};

export default DogPicture;


 export  const GhettoPictures = () => {
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    const GetAllHouse=async()=>{
      const result=await fetch("https://wheretostay.onrender.com/api/properties/all")
      const result2=await result.json()
      console.log(result2)
      setImageUrl(result2)
    }
    GetAllHouse()
  }, []);

  return (
    <div className=' space-y-3'>
      {
        imageUrl.filter((item1)=>item1.property_type.toLowerCase()==="ghetto").map((item)=>{
          return <img src={item.imageUrls[0]} alt='a dog' />
        }) 
      }
    </div>
  );
};

