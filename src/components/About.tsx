import React from "react";
const ArushLogo = "/ArushBodlaWithoutBackground.svg";

const ProgressBar = ({ label, width, gradientClass = "bg-gradient-to-r from-neon-green to-neon-blue" }: { label: string; width: number; gradientClass?: string }) => {
    return (
        <div className="flex items-center">
            <label className="w-2/12">{label}</label>
            <div className="grow bg-gray-800 rounded-full h-2.5">
                <div
                    className={`${gradientClass} h-2.5 rounded-full 
                    transform transition-transform duration-300 hover:scale-105`}
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};


const About = () => {
  return (
    <div className="bg-black  text-about-text text-center py-16" id="about">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <img
            src={ArushLogo}
            className="w-72 h-80 rounded object-cover mb-8 md:mb-0"
            alt="Arush Bodla logo"
          />
          <div className="flex-col">
            <div className="flex-1">
              <p className="text-lg mb-8">
                I'm a sofware developer that loves thinking through challenging
                problems and writing efficient solutions. A quick learner, I'm
                always eager to improve my skills.
              </p>
            </div>
            <div className="space-y-4">
              <ProgressBar label="C++" width={95} />
              <ProgressBar label="Machine Learning" width={85} />
              <ProgressBar label="Java" width={80} />
            </div>
            <div className='mt-12 flex justify-between text-center'>
                <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-neon-green to-neon-blue">
                        4+
                    </h3>
                    <p>Years of Experience</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-neon-blue to-neon-green">
                        15+
                    </h3>
                    <p>Projects</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-neon-green to-neon-blue">
                        25+
                    </h3>
                    <p>Competitions</p>
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;
