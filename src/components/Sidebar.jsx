import React, { useState } from 'react'
import { GoHomeFill } from "react-icons/go";
import { PiEnvelopeSimpleBold } from "react-icons/pi";
import { IoSearch } from 'react-icons/io5'
import {  BsTwitterX } from "react-icons/bs";
import { CiCircleMore, CiUser } from "react-icons/ci";
import { IoMdCreate, IoMdNotificationsOutline } from "react-icons/io";
import { FaIoxhost } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import service from '../../appwriteTwit/config';
import authService from '../../appwriteTwit/Auth';
import { logout } from '../store/authSlice';


function Sidebar() {

 
  const [userPopup, setUserPopUp] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData)

  const userLogOut = () => {
     try {
      const session = authService.logOut();

     if (session) {
       dispatch(logout());
       navigate('/')

     }
      
     } catch (error) {
      console.log(error);
      throw error
     }
  }
  
  

  
    

    const navItems = [
    { 
        title: 'Logo', 
        icon: <BsTwitterX/>,
        link: '/home'
    },
    { 
        title: 'Home', 
        icon: <GoHomeFill/>,
        link: '/home'
    },
    { 
        title: 'Explore',
         icon: <IoSearch/>,
         link: '/explore'
    },
    { 
        title: 'Notifications', 
        icon: <IoMdNotificationsOutline/>,
        link: '/notification'
    },
    { 
        title: 'Messages',
         icon: <PiEnvelopeSimpleBold />,
         link: 'message'
    },
  
    { 
        title: 'User',
         icon: <CiUser/>,
         link: `${userData.name?.replace(/\s/g, "")}`
     },
    { 
        title: 'More',
        icon: <CiCircleMore />,
        link: '/more'
     },
      { 
        title: 'grok',
        icon: <FaIoxhost />,
        link: '/grok'
     },
      { 
        title: 'Post',
        icon: <IoMdCreate />,
        link: '/post'
     }
   
 
    ]

  return (
    <div className='md:w-[180px] fixed px-4 py-6'>
       <nav className='relative h-full'>
        <ul className='flex flex-col justify-center  items-end gap-6'>
          {navItems.map((item) => (
            <li
            className='text-[28px] text-gray-200'
            key={item.title}>
                 <Link to={item.link}>
                    {item.icon}
                 </Link>
            </li>
          ))}
          
           {
           userData ? ( <li
           onClick={()=> setUserPopUp(!userPopup)}
           className=' flex justify-center  items-center cursor-pointer  rounded-full w-8 h-8 mt-4 overflow-hidden bg-gray-200'>
            <img className='w-full h-full object-cover' src={service.getFilePreview(userData.$id)} />
          </li>) : null
           }
        </ul>
        <div className={`absolute py-4 w-[300px]  left-0 md:left-30 flex-col bottom-13 rounded-2xl bg-black shadow-sm shadow-gray-400 ${userPopup ? "flex" : "hidden"}`}>
          <p className='px-4 font-semibold py-2 hover:bg-gray-900'>Add an existing account</p>
          <p 
          onClick={userLogOut}
          className='px-4 py-2 w-full hover:bg-gray-900 font-semibold'>Log out @{userData.name}</p>
        </div>
       </nav>
    </div>
  )
}

export default Sidebar