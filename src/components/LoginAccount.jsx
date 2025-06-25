import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import authService from '../../appwriteTwit/Auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';



function LoginAccount({handleLoginPopup}) {
    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const signIn = async (data) => { 
         try {
           const userData = await authService.login(data);

         if (userData) {
            dispatch(login(userData));
            navigate("/home")
           
         }
        reset();
         } catch (error) {
          alert(error)
         }
        
    }

  



  
    
  return (

        <div className='w-[550px] relative bg-gray-900 rounded-2xl shadow'>
          <button className='absolute text-3xl left-6 top-5 text-gray-200 cursor-pointer'
          onClick={handleLoginPopup}
          >
            <IoClose/>
          </button>
           <form className='p-6' onSubmit={handleSubmit(signIn)}>
            <div className='flex flex-col justify-center items-start p-4 space-y-6'>
                <p className=' w-full text-4xl mt-2 flex justify-center items-center'><FaXTwitter/></p>
                <h1 className='text-2xl font-bold'>Log in to your account</h1>

              

                <input 
                type="email"
                  {...register('email', {required: true})}
                placeholder='Email'
                className='w-full focus:border-[#1d9bf0] focus:outline-none border-gray-500 p-4 border' />
                 
                 <input 
                type="password"
                placeholder='Password'
                className='w-full focus:border-[#1d9bf0] focus:outline-none border-gray-500 p-4 border'
                  {...register('password', {required: true})} />

                <button type='submit' className='w-full bg-[#1d9bf0] text-white py-2 rounded-full hover:bg-blue-500 transition duration-300'>
                    Next
                </button>



            </div>
            
            </form> 

        

        </div>
   
  )
}

export default LoginAccount