import React from 'react'
import Sidebar from '../components/Sidebar'
import TwitterHome from '../components/TwitterHome'
import { useSelector } from 'react-redux'
import HomePage from './HomePage';

function Hero() {
  
  const isAuthor = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData)

  if (!isAuthor) return <HomePage/>
  

  return (
    <div className=''>
      

      {/* <Sidebar userData={userData}/> */}
    

      <TwitterHome/>
    
    </div>
  )
}

export default Hero