import React from 'react'
import "./Notify.css";

function NotifyModal() {

  return (
    <>
      <div className='notify z-50 absolute w-96 h-96 px-3 pb-3 bg-[#0B222C] flex-col justify-center rounded-lg overflow-y-auto text-left text-white font-Inter'>
        <div className='py-2 border-b-2 border-gray-100 text-gray-100 text-left px-1 text-xl mb-4'>Notifications</div>
        <div className='mb-5'>
        <span className='font-bold'>Community Event Reminder:</span> Join us for a fun-filled day of activities this Saturday at the local park.!
        </div>

        <div className='mb-5'>
        <span className='font-bold'>New Community Initiative: </span> 
          Introducing "Neighbors Helping Neighbors" program! If you need assistance with grocery shopping, errands, or any other tasks.
        </div>
        
        <div className='mb-2'>
        <span className='font-bold'>Youth Talent Show Auditions: </span> Calling all talented youngsters! Showcase your skills and join our upcoming youth talent show. 
        </div>
      </div>
    </>
  )
}

export default NotifyModal