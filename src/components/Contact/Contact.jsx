import React, { useState } from "react";
// import emailjs from "@emailjs/browser";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

    const sendEmail = (e) => {
      e.preventDefault();

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
  
    //   emailjs.sendForm('service_k2si4zg', 'template_2q6exjx', e.target, 'PsflA5qIdmDHTJA67')
    //   .then(() => alert("Form submitted successfully..!!"))
    //   .catch((error) => alert("Form submission Unsuccessful..!! Kindly try again.."));  
    };

  return (

<section id="contact" className="relative">
      <div className="container bg-[#0F2A36] rounded-lg md:px-5 px-3 py-10 my-10 mx-auto flex flex-col items-center justify-center">
        <div className="bg-white md:w-5/6 w-full rounded-lg flex flex-col py-10 shadow-2xl">
        <div className="text-center">
          <i class="fas fa-2x fa-headset inline-block w-10 text-[#03C988]" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-black mb-4">
            Contact <span className="text-[#03C988]"> Us</span>
          </h1>
        </div>
        <div className="flex md:flex-row flex-col">
          <div className="lg:w-1/2 md:w-1/3 w-full items-center justify-center rounded-lg overflow-hidden md:pl-20 pb-3 pr-0 flex items-end justify-start relative">
            <img class="w-full h-96 rounded-lg" src="/contact.avif" alt="contact" />
          </div>
          <form
            onSubmit={sendEmail}
            className="lg:w-1/3 md:w-2/3 flex flex-col w-full md:py-8 md:ml-20 mt-8 md:mt-0 px-2">
            <div className="relative mb-4">
              <i class="fas fa-md fa-user absolute mt-2 ml-2 text-[#03C988]" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                autocomplete="off"
                className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-green-600 text-base outline-none pb-1 pl-8 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="relative mb-4">
              <i class="fas fa-md fa-envelope absolute mt-2 ml-2 text-[#03C988]" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                autocomplete="off"
                className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-green-600 text-base outline-none pb-1 pl-8 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="relative mb-4">
              <i class="fas fa-md fa-phone absolute mt-2 ml-2 text-[#03C988]" />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                autocomplete="off"
                pattern="[0-9]{10}"
                className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-green-600 text-base outline-none pb-1 pl-8 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="relative mb-4">
              <i class="fas fa-md fa-comment-dots absolute mt-2 ml-2 text-[#03C988]" />
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                autocomplete="off"
                className="w-full rounded border items-center pl-10 border-gray-700 focus:border-green-600 h-32 text-base outline-none pb-1 pl-8 resize-none leading-6 transition-colors duration-200 ease-in-out"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <button
              type="submit"
              className="text-white items-center bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-500 rounded text-lg">
              Submit
              <i class="fas fa-sm fa-paper-plane ml-3" />
            </button>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}
