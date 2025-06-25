import React from "react";
import service from "../../appwriteTwit/config";
import { formatDistanceToNow } from "date-fns";
import { FaIoxhost } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import Intereact from "./Intereact";

function Posts({ item }) {
  const formatTwitterTime = (dateString) => {
    const time = formatDistanceToNow(new Date(dateString), {
      addSuffix: false,
    });

    

    // Convert to Twitter-style abbreviations
    return time
      .replace("about ", "")
      .replace("less than a minute", "now")
      .replace(" minute", "m")
      .replace(" hour", "h")
      .replace(" day", "d")
      .replace(" month", "mo")
      .replace(" year", "y")
      .replace("s", ""); // Remove plurals
  };
  return (
    <div className="border-t border-gray-500 p-4 items-start flex gap-2">
      <div className="w-12 h-12 rounded-full object-contain overflow-hidden">
        <img
          className="w-[100%]"
          src={service.getFilePreview(item.userId)}
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-[16px] font-semibold">{item.name.slice(0,16)}</h1>
            <p className="text-gray-400">@{item.name.replace(/\s/g, "")}</p>
            <p className="text-gray-400">
              {formatTwitterTime(item.$createdAt)}
            </p>
          </div>

          <div className="flex gap-2 text-xl text-gray-400">
            <FaIoxhost />
            <CiCircleMore />
          </div>
        </div>
        <p className="mt-2 text-[16px]">{item.content}</p>

        <div className="mt-4 w-[400px] md:w-[500px] border border-gray-700 shadow-lg shadow-gray-900 h-[400px] flex justify-center items-center rounded-xl overflow-hidden">
          {item.fileType === "image" && <img
            className="w-full h-full object-cover"
            src={service.getFilePreview(item.featuredImage)}
            alt="Post Image"
          />}
          {item.fileType === "video" && (
            <video 
            className="w-full h-full object-cover"
            src={service.getFilePreview(item.featuredImage)}
            autoPlay
            loop 
            controls
            ></video>
          )}
        </div>
      <div className="">
        <Intereact data={item}/>
      </div>
      </div>

    </div>
  );
}

export default Posts;
