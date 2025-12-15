import Image from "next/image";
import React from "react";
const ArushLogo = "/ArushBodlaWithoutBackground.svg";

const Homepage = () => {
  return (
    <div className="bg-black text-snow text-center py-16" id="home">
      <Image  
        src={ArushLogo}
        width={160}
        height={160}
        className="mx-auto h-40 w-40 mb-8 rounded-lg object-cover transform transition-transform duration-300 hover:scale-105"
        alt="Arush Bodla logo"
      />
      <h1 className="text-4xl md:text-5xl font-bold">
        Hi, I&apos;m{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
          Arush Bodla
        </span>
      </h1>
      <p className="text-xl md:text-2xl mt-4 text-gray-300">Software Developer | Competitive Programmer | Game Developer</p>
      <p className="text-lg mt-2 text-gray-400 max-w-2xl mx-auto">Specializing in C++ and algorithm optimization, with expertise in building scalable applications and leading technical teams.</p>
      <div className="space-x-4 mt-8 justify-center">
        <a href="/contact">
          <button className="transition-all duration-300 ease-in-out bg-pigment-green text-snow hover:bg-gamboge hover:scale-105 py-2 px-4 rounded-full text-lg font-semibold">
            Contact Me
          </button>
        </a>
        <a href="https://raw.githubusercontent.com/ArushNo1/ArushNo1/main/Resume.pdf">
          <button className="transition-all duration-300 ease-in-out bg-lake-blue text-snow hover:bg-gamboge hover:scale-105 py-2 px-4 rounded-full text-lg font-semibold">
            My Resume
          </button>
        </a>
      </div>
    </div>
  );
};

export default Homepage;
