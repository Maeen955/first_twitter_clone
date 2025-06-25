import React from 'react'
import PostForm from '../components/PostForm'
import AllPosts from '../components/AllPosts'

function PostFormPage() {
  return (
    <div className='w-screen flex justify-center items-center h-screen bg-gray-800'>
        <div className=' flex items-center justify-center w-full h-full z-100 bg-black  '>
          <div className='border rounded-2xl border-gray-600'>

        <PostForm />
          </div>

        </div>
    </div>
  )
}

export default PostFormPage