import React, { useState } from 'react'
import { FaApple, FaXTwitter } from 'react-icons/fa6'
import CreateAccount from '../components/CreateAccount';
import LoginAccount from '../components/LoginAccount';


function Login() {
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
 

  const handleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  }



 
  const handlePopup = () => {
    setShowPopup(!showPopup)
  }


  return (
    <>
      <div className='flex flex-col md:flex-row  justify-center w-full h-screen p-20 md:items-center items-start md:gap-20 relative'>
        <div>
            <FaXTwitter className='mb-10 text-[80px] md:text-[350px]' />
        </div>
        <div className='flex h-full text-gray-100 flex-col justify-center  md:pl-20'>
            <h1 className='text-6xl font-bold mb-10'>Happening now</h1>
            <p className='text-3xl font-semibold mb-6'>Join today.</p>
            <div className='flex gap-4 flex-col'>
                <button className='bg-white w-[300px] py-1 text-lg cursor-pointer rounded-full text-black flex justify-center items-center mb-2'>
                    <FaApple className='text-2xl mr-2' />
                    Sign up with Apple</button>
                <button className=' w-[300px] py-1 rounded-full cursor-pointer bg-[#1d9bf0] text-white text-lg mb-10'
                onClick={handlePopup}
                >Create account</button>
            </div>
            <div className=''>
                <p className='text-xl font-semibold'>Already have an account?</p>
                <button className=' w-[300px] py-1 rounded-full cursor-pointer border text-blue-500 hover:bg-gray-900 border-blue-200   text-lg mt-4 shadow'

                onClick={handleLoginPopup}
               
                >Sign in</button>
            </div>
        </div>

    
    </div>

     <div className={`${showPopup ? "flex" : "hidden"} absolute  w-full h-full top-0   justify-center items-center`}>

      <CreateAccount 
      handlePopup={handlePopup}
      />
    </div>

      <div className={`${showLoginPopup ? "flex" : "hidden"} absolute  w-full h-full top-0   justify-center items-center`}>
       <LoginAccount 
       
       handleLoginPopup={handleLoginPopup}
       
       />
    </div>
      
         </>
  
  )
}

export default Login