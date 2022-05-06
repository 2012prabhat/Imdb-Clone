import React from 'react'
import Image from "./image.png"
import {useEffect,useState} from 'react';
import axios from 'axios';

function Banner() {
    const [banner, setbanner] = useState([]);
    useEffect(() => {
        axios("https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9&page=1").then((res)=>{
            setbanner(res.data.results[0]);
        })
      
    }, []);
  return (
      <>
    
    <div className={`bg-[url("https://image.tmdb.org/t/p/original/${banner.backdrop_path}")] h-[35vh] md:h-[60vh] bg-center bg-cover flex items-end`}>
        <div className='text-white md:text-3xl text-l p-6
        bg-gray-900 bg-opacity-50 w-full flex justify-center'>{banner.title}</div>
    </div>
    </>
    
  )
}

export default Banner