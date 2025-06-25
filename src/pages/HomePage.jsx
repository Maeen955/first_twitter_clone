import React, { useEffect } from 'react'
import Login from './Login'
import Hero from './Hero';
import { useSelector } from 'react-redux';

function HomePage() {
    const authStatus = useSelector((state) => state.auth.status)

  
    
 
    return (
    <div className=''>
        {authStatus ? (<Hero/>) : (<Login/>)}
        
    </div>
  )
}

export default HomePage