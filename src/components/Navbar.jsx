import React from 'react' 
import Logo from "./logo.png";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div className='flex md:space-x-8 space-x-4 md:pl-12 pl-4 items-center border py-4'>
    <img src={Logo} className="h-[50px] md:h-[80px]"></img>
    <Link to="/" className='text-pink-900 font-bold text-xl md:text-3xl'>Movies</Link>
    <Link to="/favourite" className='text-pink-900 font-bold text-xl md:text-3xl'>Favourites</Link>
    <Link to="/favourite2" className='text-pink-900 font-bold text-xl md:text-3xl'>Ratings</Link>
    </div>
  )
}

export default Navbar