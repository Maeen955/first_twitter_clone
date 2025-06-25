import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TiArrowLeft } from "react-icons/ti";
import { MdVerified } from "react-icons/md";
import authService from "../../appwriteTwit/Auth";
import { login } from "../store/authSlice";
import service from "../../appwriteTwit/config";
import { FaRegCalendarAlt } from "react-icons/fa";
import ProfilePost from "../components/ProfilePost";

function ProfilePage() {
  const { userName } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [postLength, setPostLength] = useState(null)
  const navigate = useNavigate();


  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData));
      }
    });
  }, []);


  const date = new Date(userData?.$createdAt);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });

  const listItems = ["replies", "highlights", "articles", 'media', 'Likes']

  if (userData) {
    return (
      <div className="ml-16 md:ml-[186px] w-[600px] bg-black border border-gray-700">
        <nav className="flex  px-4 py-1 items-center gap-6">
          <button 
          onClick={()=> navigate(-1)} className="cursor-pointer"
          >
          <TiArrowLeft className=" text-3xl text-gray-200" />

          </button>
          <div className="text-gray-100">
            <h1 className="text-xl font-semibold capitalize">
              {userData?.name}
            </h1>
            <p className="text-sm text-gray-500">{postLength} posts</p>
          </div>
        </nav>
        <div className="h-[210px] relative bg-[#333639]">
          <div className="w-35 h-35 absolute border-black rounded-full border-3 left-8 -bottom-16 ">
            <img
              className="w-full rounded-full h-full object-cover "
              src={service.getFilePreview(userData.$id)}
              alt=""
            />
          </div>
          <button className="absolute -bottom-12 right-4 border-b-gray-400 font-bold border px-4 py-1 rounded-full cursor-pointer text-gray-200">
            Edit profile
          </button>
        </div>

        <div className="px-6 pt-24">
          <div className="flex gap-6">
            <p className="text-2xl font-semibold capitalize">{userData.name}</p>
            <button className="flex items-center gap-1 border text-[14px] px-3 rounded-full font-semibold border-gray-300 text-gray-300 ">
              <MdVerified className="text-[#1d9bf0]" /> Get Verified
            </button>
          </div>
          <p className="text-gray-400">@{userData.name?.replace(/\s/g, "")}</p>
          <p className="flex items-center gap-2 text-gray-400 mt-4 text-md capitalize">
            <FaRegCalendarAlt /> joined {month} {year}
          </p>
          <p className="flex gap-4 text-gray-400">
            <span className="hover:underline">
              <span className="text-white font-bold">160</span> Following
            </span>

            <span className="hover:underline">
              <span className="text-white font-bold">16</span> Followers
            </span>
          </p>

        </div>
        <div className="">
          <ul className="flex items-center font-semibold text-[18px] mt-8 w-full  justify-around">
            <li className="hover:bg-gray-800 capitalize p-2 text-center w-full transition-all text-white ">Post</li>
            {listItems.map((item)=> (
              <li className="hover:bg-gray-800 capitalize p-2 text-center w-full transition-all text-gray-400 duration-100 h-full" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-2">
          <ProfilePost setPostLength={setPostLength}/>
        </div>
      </div>
    );
  } else {
    return <h1 className="text-4xl font-bold ml-10 mt-6">Loading......</h1>;
  }
}

export default ProfilePage;
