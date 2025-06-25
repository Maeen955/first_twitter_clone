import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import service from '../../appwriteTwit/config';
import Posts from './Posts';
import PostForm from './PostForm';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    // const [refreshPosts, setRefreshPosts] = useState(false)
    const userData = useSelector((state) => state.auth.userData);
    const refreshPost = useSelector((state) => state.auth.refreshPost);

    

  useEffect(()=>{
      service.getPosts().then((posts)=> {
        if (posts) {
          setPosts(posts.documents);
          
        }
      })
  }, [refreshPost]);




  return (
    <>
    <PostForm/>
    <div className=''>
        {posts && posts.map((item, index)=> (
         
         <Posts key={index} item={item}/>

        ))}
    </div>
    </>
  )
}

export default AllPosts