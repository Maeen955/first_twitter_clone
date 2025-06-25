import React, { useRef } from 'react'
import service from '../../appwriteTwit/config'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { MdOutlineGifBox } from "react-icons/md";
import { FaIoxhost } from 'react-icons/fa6';
import { FaRegSmile } from 'react-icons/fa';
import { CiImageOn, CiLocationOn } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { postRefresh } from '../store/authSlice';

function PostForm({handlePostCreated}) {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch()
  const {register, handleSubmit, setValue, reset} = useForm();
  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  const handleButtonClick = () => {
    fileInputRef.current.click();
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image', file)
    }
  }
  
    const onSubmit = async (data) => {
    
    const file = await service.uploadFile(data.image);
       
      if(file){
        const fileId = file.$id;
        data.featuredImage = fileId;
        data.fileType = file.mimeType.includes("image") ? "image" : "video";
               
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
          name: userData.name
        })

        if (dbPost) {
          dispatch(postRefresh());
          navigate('/');
          console.log(dbPost);
          
          
        }
        
        
      }
    // Your submission logic here
    reset()
  };



  const extraItems = [
    {
      name: "gif",
      icon: <MdOutlineGifBox/>
    },
     {
      name: "grok",
      icon: <FaIoxhost/>
    },
     {
      name: "imoji",
      icon: <FaRegSmile/>
    },
     {
      name: "loacotion",
      icon: <CiLocationOn/>
    }
  ]
  return (
    <div className='p-4 flex gap-4 border-b border-gray-700'>
      <div className='w-10 h-10 mt-2'>
      <img className='w-full h-full object-cover rounded-full' src={service.getFilePreview(userData?.$id)} />

      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
          

             <textarea 
             placeholder='Whats happening?'
            {...register('content', {required: true})}
            name='content' id='content'
            className='text-xl w-full  text-gray-200 outline-none min-h-30 rounded-xl p-2 bg-black'
            ></textarea>

             <input
          type="file"
          ref={(e) => {
            // Register the input with react-hook-form
            register('image').ref(e);
            // Also store the ref for our click handler
            fileInputRef.current = e;
          }}
          onChange={handleFileUpload}
          className='hidden'
         
        />

          

            <div className='flex justify-between items-center pt-4 px-2 border-t border-gray-700 w-[400px] md:w-[480px]'>

              <ul className='flex gap-3 text-xl text-[#1ba1fa]'>
                <li 
                onClick={handleButtonClick}
                className='cursor-pointer'
                >
                  
                  <CiImageOn/>
                </li>
                {extraItems.map((item)=> (
                  <li
                  className=''
                  key={item.name}>{item.icon}</li>
                ))}
              </ul>

              <button type='submit'
              className='cursor-pointer px-4 py-1 bg-white rounded-full text-black font-semibold'
              >
                Post
              </button>

            </div>

      </form>
    </div>
  )
}

export default PostForm