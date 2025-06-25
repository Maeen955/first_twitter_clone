import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import { Outlet } from 'react-router-dom'
import authService from './../appwriteTwit/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/authSlice';
import Sidebar from './components/Sidebar';

function App() {
   const dispatch = useDispatch();
   const authStatus = useSelector((state) => state.auth.status);

   useEffect(()=>{
     
      authService.getCurrentUser().then((userData)=>{
        if (userData) {
          
          dispatch(login(userData))
        }

      })
      
    


       
   }, [])

 

  return (
    <div className='flex w-screen min-h-screen gap-4 text-white bg-black'>
       {authStatus && <Sidebar/>}
       <Outlet/>
    
    </div>
  )
}

export default App