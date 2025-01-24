import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import CFIcon from "./CFIcon";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-2xl font-bold text-left mb-2">Arush Bodla</h2>
        <hr className="pb-1"/>
        <div className="flex flex-row justify-between items-center my-4 md:my-0 pt-1">
          <div className="flex items-center space-x-4">
            <a target="_blank" href="https://www.linkedin.com/in/arush-bodla-2a5797306/?trk=opento_sprofile_details" className="text-gray-400 hover:text-white">
              <FaLinkedin size={20}/>
            </a>
            <a target="_blank" href="https://www.github.com/ArushNo1" className="text-gray-400 hover:text-white">
              <FaGithub size={20}/>
            </a>
            <a target="_blank" href="https://codeforces.com/profile/ArushNo1" className="text-gray-400 hover:text-white">
              <CFIcon size={20} />
            </a>
            
          </div>
          <div>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Arush Bodla. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
