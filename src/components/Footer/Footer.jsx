import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="bg-[#0F2A36] mt-8 p-4">
      <div className="footer-main-div">
        <div className="footer-box">
          <div className="text-white text-3xl font-semibold font-Inter pt-8 pl-2">
            BeCommunity
          </div>
        </div>
        <div className="footer-box">
          <div className="text-white text-lg font-semibold font-Inter p-2">
            Communities
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
            Books
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
            Gaming
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
            Memes
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
            Movies
          </div>
        </div>
        <div className="footer-box">
        <div className="text-white text-lg font-semibold font-Inter p-2">
            Links
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
            About
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
            How to use?
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
            Feedback
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
            Help
          </div>
        </div>
        <div className="footer-box">
        <div className="text-white text-lg font-semibold font-Inter p-2">
            Contact
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
          +91 1234567890
          </div>
          <div className="text-[#BCB9B9] text-base font-medium font-Inter p-2">
          <a className="mail-link" href="mailto:becommunity2@gmail.com">becommunity2@gmail.com</a>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Footer;
