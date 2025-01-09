//import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black     text-snow px-8 md:px-16 lg:px-24">
        <div className="container py-2 flex justify-between items-center">
            <div className="text-2xl font-bold hidden md:inline">
                <a href='#home'>
                    Arush
                </a>
            </div>
            <div className="space-x-6">
                <a href="#home" className="text-snow hover:text-pigment-green">
                    Home
                </a>
                <a href="#about" className="text-snow hover:text-pigment-green">
                    About
                </a>
                <a href="#projects" className="text-snow hover:text-pigment-green">
                    My Projects
                </a>
                <a href="#resume" className="text-snow hover:text-pigment-green">
                    Resume
                </a>
            </div>
            <button className="transition-all duration-300 ease-in-out bg-pigment-green text-snow hover:bg-gamboge hover:scale-105 py-2 px-4 rounded-full">
                Contact Me
            </button>
        </div>
    </nav>
  );
};

export default Navbar;
