import React, { useEffect, useState } from 'react'
import { BiMessageRounded } from "react-icons/bi";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from 'react-icons/ci';
import {  FaRegHeart } from 'react-icons/fa6';
import { IoIosStats } from "react-icons/io";
import { RiShare2Line } from "react-icons/ri";
import service from './../../appwriteTwit/config';


function Intereact({data}) {
      
    const [currentLikes, setCurrentLikes] = useState(data.likes)

  useEffect(() => {
        setCurrentLikes(data.likes);
    }, [data.likes]);

  const updatePost = async () => {
        try {
           
          const newLikes = currentLikes + 1;
          setCurrentLikes(newLikes);

          const dbPost = await service.updateLike(data.$id, {
            ...data,
             likes: newLikes
          })          

          
        } catch (error) {
          console.log(error);
          setCurrentLikes(currentLikes - 1)
        }
  }
  
  const items = [
        {
            name: "reply",
            icons: <BiMessageRounded />,
            onclick: null,
            hover: "hover:text-[#FF6347]",
            likes: "33"
        },
         {
            name: "repost",
            icons: <BiRepost />,
            onclick: null,
            hover: "hover:text-[#32CD32]",
             likes: "10k"

        },
         {
            name: "Like",
            icons: <FaRegHeart/>,
            onclick: updatePost,
            hover: "hover:text-[#1d9bf0]",
             likes: currentLikes
        },
         {
            name: "view",
            icons: <IoIosStats />,
            onclick: null,
            hover: "hover:text-[#800080]",
             likes: "20k"

        },
        //   {
        //     name: "Bookmark",
        //     icons: <CiBookmark/>,
        //     onclick: null,
        //     hover: "hover:text-[#1d9bf0]"

        // },


    ]

  return (
    <div className='flex w-[80%] md:w-full justify-between items-center'>
          <div className='flex flex-grow justify-between pt-4'>
            {items.map((item) => (
                <button  
                onClick={item.onclick}
                className={`flex cursor-pointer justify-center items-center gap-1  text-gray-400 outline-none ${item.hover}`}
                key={item.name}>{item.icons}{item.likes}</button>
            ))}
          </div>

          <div className='flex mt-4 mx-6 text-gray-400'>
            <CiBookmark/>
            <RiShare2Line />
          </div>
    </div>
  )
}

export default Intereact