import Image from "next/image";
import React from "react";
const ArushLogo = "/SuitPic.png";

const About = () => {
  return (
    <div className="bg-black text-white text-center py-16" id="about">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <Image
            src={ArushLogo}
            width={288}
            height={320}
            className="rounded-3xl object-cover mb-8 md:mb-0"
            alt="Arush Bodla logo"
          />
          <div className="flex-col">
            <div className="flex-1">
              <p className="text-lg mb-4 text-left">
              I&apos;m a passionate software developer specializing in competitive programming, game development, and full-stack web applications. With 4+ years of hands-on experience, I excel at solving complex algorithmic challenges and building efficient, scalable systems.
              </p>
              <p className="text-lg mb-4 text-left">
              As a competitive programmer, I&apos;ve participated in 25+ programming contests, consistently optimizing code for performance and accuracy. My expertise in C++, Java, and Python allows me to tackle diverse technical challenges across multiple domains.
              </p>
              <p className="text-lg mb-8 text-left">
              Beyond coding, I&apos;m a technical leader who has organized hackathons, led programming clubs, and mentored peers in algorithm design and software development best practices.
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
