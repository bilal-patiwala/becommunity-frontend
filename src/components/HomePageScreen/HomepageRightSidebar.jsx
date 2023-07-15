import React from 'react'
import "./HomepageScreen.css";
function HomepageRightSidebar() {
  return (
    <>
        <div className="w-1/5 h-screen font-Inter flex flex-col shadow-xl z-10 p-2 bg-[#0B222C] rounded-lg sticky overflow-y-auto right-0 top-10">
            <p className="text-center text-white mt-5 font-medium text-xl">
              Popular Communities
            </p>
            <p className="text-center text-white mt-1 font-medium text-xl">
              <span className="text-lg font-small text-left text-[#ACACAC] mr-10 cursor-pointer hover:underline">
                Arts
              </span>
              <span className="text-lg font-small text-right text-[#ACACAC] ml-10 cursor-pointer hover:underline">
                Space
              </span>
            </p>
            <p className="text-center text-white mt-1 font-medium text-xl">
              <span className="text-lg font-small text-left text-[#ACACAC] mr-7 cursor-pointer hover:underline">
                Gaming
              </span>
              <span className="text-lg font-small text-right text-[#ACACAC] ml-7 cursor-pointer hover:underline">
                Cinema
              </span>
            </p>
            <p className="text-center text-white mt-1 font-medium text-xl">
              <span className="text-lg font-small text-left text-[#ACACAC] mr-9 cursor-pointer hover:underline">
                Books
              </span>
              <span className="text-lg font-small text-right text-[#ACACAC] ml-9 cursor-pointer hover:underline">
                Tech
              </span>
            </p>
            <div className="w-full flex flex-col items-center">
              <div className="w-2/3 bg-[#0F2A36] text-white py-2 text-center text-xl rounded-lg w-full mt-4 mb-4 cursor-pointer">
                Link 1
              </div>
              <div className="w-2/3 bg-[#0F2A36] text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer">
                Link 2
              </div>
              <div className="w-2/3 bg-[#0F2A36] text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer">
                Link 3
              </div>
            </div>
          </div>
    </>
  )
}

export default HomepageRightSidebar