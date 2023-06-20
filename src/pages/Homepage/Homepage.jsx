import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import "./Homepage.css";

function Homepage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header id="navbar" className="relative z-20 bg-[#0F2A36] shadow-xl w-full sticky top-0 left-0">
        <nav className="container md:flex items-center flex-row w-full py-1 md:pl-0 pl-5 md:px-1">

          <div onClick={() => setOpen(!open)} className='text-3xl absolute left-5 top-3 cursor-pointer'>
            <i className={open ? 'fa fa-close text-white' : 'fa-solid fa-bars text-white'}></i>
          </div>

          <div className='w-1/4 font-bold text-2xl cursor-pointer flex text-left items-center'>
            <a className="flex flex-row no-underline" href="/">
              <span className="text-white font-sans">BeCommunity</span>
            </a>
          </div>

          <div className='w-1/2 font-bold text-2xl cursor-pointer flex text-left items-center'>
            <div className='relative w-5/6'>
              <i class="fa fa-search absolute top-2 right-4 text-white" aria-hidden="true"></i>
              <input className='bg-[#0B222C] h-10 w-full rounded-lg text-white pl-5 text-md py-1 pb-2 font-medium' placeholder='Search' type="text" name="search" id="search" />
            </div>
          </div>

          <div className='w-1/4 flex items-center justify-end'>

            <div id="create" className="flex w-fit h-fit px-2 py-1 pb-2 items-center justify-center text-center rounded-lg shadow-xl bg-green-700 mr-28">
              <Tooltip className="transition delay-40 ease-in duration-400 text-black" title="Create a Community" arrow>
                <button className="text-xl text-white font-bold">+ Create</button>
              </Tooltip>
            </div>

            <div className="flex w-14 h-14 items-center justify-center mx-2 cursor-pointer">
              <button className="rounded-full object-fit mx-1 bg-white">
                <img src="../../src/assets/profile-icon.png" className="rounded-full" alt="userimg" />
              </button>
              <i className="fa fa-caret-down text-white"></i>
            </div>

          </div>

        </nav>
      </header >

      <div className='w-full flex h-screen bg-[#0F2A36]'>
        <div className='w-1/5 h-screen flex flex-col items-center shadow-xl z-10 p-2 bg-[#0B222C] rounded-lg sticky left-0 top-10'>
          <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mt-4 mb-4 cursor-pointer'>
            Home
          </div>
          <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer'>
            Top
          </div>
          <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer'>
            New
          </div>
          <div className='w-2/3 border-b-2 border-white text-white py-2 text-left text-xl rounded-md w-full mb-4'>
            Joined
          </div>
          <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer'>
            Marvel
          </div>
          <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer'>
            Astro
          </div>
          <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer'>
            Books
          </div>
        </div>

        <div className='w-3/5 h-screen flex flex-col items-center shadow-xl z-10 p-2 bg-[#0F2A36] rounded-lg pt-5'>
          <div className='w-2/3 rounded-lg bg-[#0B222C] py-3 mb-5'>
            <div className='title text-[#ACACAC] py-2 px-4'>
              Sam67 | SpaceTalks
            </div>
            <div className='content text-white px-4 pb-4'>
              Batman trilogy is the only good DC movie according to me in a longest time. #DC #Batman #Nolan
            </div>

            <div className='reactions text-white px-4 pb-4'>
              <i class="fa-solid fa-arrow-up text-white cursor-pointer"><span className='text-gray-400 mx-2'>67</span></i>
              <i class="fa-solid fa-arrow-down text-white ml-4 cursor-pointer"><span className='text-gray-400 mx-2'>23</span></i>
            </div>
          </div>
          <div className='w-2/3 rounded-lg bg-[#0B222C] py-3 mb-5'>
            <div className='title text-[#ACACAC] py-2 px-4'>
              Sam67 | SpaceTalks
            </div>
            <div className='content text-white px-4 pb-4'>
              Batman trilogy is the only good DC movie according to me in a longest time. #DC #Batman #Nolan
            </div>

            <div className='reactions text-white px-4 pb-4'>
              <i class="fa-solid fa-arrow-up text-white cursor-pointer"><span className='text-gray-400 mx-2'>67</span></i>
              <i class="fa-solid fa-arrow-down text-white ml-4 cursor-pointer"><span className='text-gray-400 mx-2'>23</span></i>
            </div>
          </div>
        </div>


        <div className='w-1/5 h-screen flex flex-col shadow-xl z-10 p-2 bg-[#0B222C] rounded-lg sticky right-0 top-10'>
          <p className='text-center text-white mt-5 font-medium text-xl'>Popular Communities</p>
          <p className='text-center text-white mt-1 font-medium text-xl'>
            <span className='text-lg font-small text-left text-[#ACACAC] mr-10 cursor-pointer hover:underline'>Arts</span>
            <span className='text-lg font-small text-right text-[#ACACAC] ml-10 cursor-pointer hover:underline'>Space</span>
          </p>
          <p className='text-center text-white mt-1 font-medium text-xl'>
            <span className='text-lg font-small text-left text-[#ACACAC] mr-7 cursor-pointer hover:underline'>Gaming</span>
            <span className='text-lg font-small text-right text-[#ACACAC] ml-7 cursor-pointer hover:underline'>Cinema</span>
          </p>
          <p className='text-center text-white mt-1 font-medium text-xl'>
            <span className='text-lg font-small text-left text-[#ACACAC] mr-9 cursor-pointer hover:underline'>Books</span>
            <span className='text-lg font-small text-right text-[#ACACAC] ml-9 cursor-pointer hover:underline'>Tech</span>
          </p>
          <div className='w-full flex flex-col items-center'>
            <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mt-4 mb-4 cursor-pointer'>
              Link 1
            </div>
            <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer'>
              Link 2
            </div>
            <div className='w-2/3 bg-gray-900 text-white py-2 text-center text-xl rounded-lg w-full mb-4 cursor-pointer'>
              Link 3
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Homepage