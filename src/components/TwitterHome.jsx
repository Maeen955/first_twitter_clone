import React from 'react'
import { Link } from 'react-router-dom'
import PostForm from './PostForm'
import AllPosts from './AllPosts';

function TwitterHome() {
  return (
    <div className='ml-16 md:ml-[186px] w-[600px] bg-black border border-gray-700'>
       <nav className=' w-full border-b-gray-800 border-b'>
        <ul className='flex w-full justify-center flex-nowrap text-gray-400 font-semibold '>
          <button className=' px-6 py-5 hover:bg-gray-800'>For you</button>
          <button className='px-6 py-5 hover:bg-gray-800'>Following</button>
          <button className='px-6 py-5 hover:bg-gray-800'>Learn English</button>
        </ul>
       </nav>
       <div>
         <AllPosts/>
       </div>
    </div>
  )
}

export default TwitterHome