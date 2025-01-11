import React from "react";
const ArushLogo = "/ArushBodlaWithoutBackground.svg";

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
              I'm a passionate software developer who thrives on tackling complex problems and crafting efficient, well-thought-out solutions. As a quick learner, I'm constantly seeking opportunities to grow and refine my skills.
              </p>
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
