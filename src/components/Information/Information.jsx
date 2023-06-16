import React from 'react'
import { motion } from 'framer-motion';
import "./Information.css"
import infoImage1 from "../../assets/undraw_people_re_8spw.svg";
import infoImage2 from "../../assets/undraw_social_interaction_re_dyjh.svg";
import infoImage3 from "../../../public/info3.svg";
function Information() {
  return (
    <div id="about" className="my-10">
      <motion.div 
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true }}
       transition={{ duration: 1 }}
       variants={{
         visible: { opacity: 1, translateY: 0 },
         hidden: { opacity: 0, translateY: 100 },
       }}
      className='flex justify-center items-center flex-wrap-reverse mt-4 mb-10 py-20'>
        <div className='info-box-1'>
          <img src={infoImage1} alt="" className="info-img" />
        </div>
        <div className='info-box-1'>
          <div className='font-bold text-3xl font-Inter text-black mt-2'>Connecting with people made easier</div>
          <div className='font-Inter text-[#4D4A4A] mt-4 text-xl'>Now it is very easy to connect with people having same interest as you. Whether it is books, shows, space or anything that interest you, We have got every type of community for you.</div>
        </div>

      </motion.div>
      <motion.div
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true }}
       transition={{ duration: 1 }}
       variants={{
         visible: { opacity: 1, translateY: 0 },
         hidden: { opacity: 0, translateY: 100 },
       }}
      className='flex justify-center items-center flex-wrap mt-8 bg-gray-100 py-20'>
        <div className='info-box-1'>
          <div className='font-bold text-3xl font-Inter text-black mt-2'>Create your own or Join</div>
          <div className='font-Inter text-[#4D4A4A] mt-4 text-xl'>If you want to create your own community then create it and invite other people to join, or join someone else's communities if you interested in them.</div>
        </div>
        <div className='info-box-1'>
          <img src={infoImage2} alt="" className="info-img" />
        </div>
      </motion.div>
      <motion.div 
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true }}
       transition={{ duration: 1 }}
       variants={{
         visible: { opacity: 1, translateY: 0 },
         hidden: { opacity: 0, translateY: 100 },
       }}
      className='flex justify-center items-center flex-wrap-reverse mt-4 mb-20 py-20'>
        <div className='info-box-1'>
          <img src={infoImage3} alt="" className="info-img" />
        </div>
        <div className='info-box-1'>
          <div className='font-bold text-3xl font-Inter text-black mt-2'>Interactive feeds & personalized recommendations</div>
          <div className='font-Inter text-[#4D4A4A] mt-4 text-xl'>Explore your favourite feeds now, with the power of realtime post analysis right on your fingertip. Scroll through to unleash exciting & productive feeds daily. </div>
        </div>

      </motion.div>
    </div>
  )
}

export default Information