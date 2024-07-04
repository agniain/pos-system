import React from 'react';
import HiveIcon from '@mui/icons-material/Hive';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="p-4 bg-lime-600 flex flex-col lg:flex-row justify-between items-center lg:px-10">
        <div className="lg:ml-10 mb-6 lg:mb-0 text-white text-center lg:text-left">
            <p className="text-xl font-semibold"> <HiveIcon /> MIDORI</p>
            <p className="mt-3"><LocationOnIcon />Bandung, Indonesia</p>     
        </div>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-white">
          <div className="flex flex-col space-y-4">
            <Link to='/'>Home</Link>
            <Link to='/'>About</Link>
            <Link to='/'>Products</Link>
            <Link to='/'>Contact</Link> 
          </div>
          <div className="flex flex-col space-y-4">
            <Link to='/'>Help</Link>
            <Link to='/'>Payment Methods</Link>
            <Link to='/'>Privacy Policy</Link>
          </div>          
        </div>
    </footer>
  )
}

export default Footer;