import React from 'react'
import SkillCardList from './SkillCardList'

const developSkills = [
    {
        id: 0,
        title: "Programming Languages", 
        description: "I have lots of experience in C++, Java, and Python, and am familiar with C#, HTML, CSS, and Javascript."
    },
    {
        id: 1,
        title: "Object-Oriented Programming",
        description: "Applied in coursework and projects to design modular, reusable, and scalable software systems."
    },
    {
        id: 2,
        title: "Competitive Programming",
        description: "Solved algorithmic challenges in numerous contests, developing optimized code under strict time constraints."
    },
    {
        id: 3,
        title: "Game Development",
        description: "Built interactive games and simulations, exploring mechanics and user experience with C# and the Unity Game Engine."
    },
    {
        id: 4,
        title: "Web Development",
        description: "Used to create responsive, visually appealing websites and interfaces for personal projects. Worked with React and Next JS for simple websites."
    },
]

const problemSolvingSkills = [
    {
        id: 100,
        title: "Cybersecurity and Reverse Engineering",
        description: "Analyzed executables in CTF competitions to uncover vulnerabilities and extract hidden flags using tools like Ghidra."
    },
    {
        id: 101,
        title: "Debugging and Problem Solving",
        description: "Identified and resolved errors efficiently in programming and game development to ensure smooth functionality."
    },
    {
        id: 102,
        title: "Automation and Scripting",
        description: "Streamlined repetitive tasks like file conversions for school submissions using customized scripts."
    },
    {
        id: 103,
        title: "Networking Tools",
        description: "Simulated and troubleshot network configurations to deepen understanding of networking concepts with Cisco Packet Tracer and Wireshark."
    }
]

const Skills = () => {
  return (
    <div className="bg-black text-white py-20" id='skills'>
        <div className='container mx-auto px-8 md:px-16 lg:px-24'>
            <h2 className='text-4xl font-bold text-center mb-12'>My Skills</h2>
            <div className = 'flex overflow-x-auto scrollbar-hide scroll-smooth gap-8 pb-8'>
                {developSkills.map((skill) => (
                    <div key={skill.id} className='w-80 flex-shrink-0 bg-gray-800 rounded-lg px-6 pb-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105'>
                        <h3 className='mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-neon-green to-neon-blue'>{skill.title}</h3>
                        <p className='mt-2 text-gray-200'>{skill.description}</p>
                    </div>
                ))}
            </div>
            <div className = 'flex overflow-x-auto scrollbar-hide scroll-smooth gap-8'>
                {problemSolvingSkills.map((skill) => (
                    <div key={skill.id} className='w-80 flex-shrink-0 bg-gray-800 rounded-lg px-6 pb-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105'>
                        <h3 className='mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-pink-400 to-yellow-500'>{skill.title}</h3>
                        <p className='mt-2 text-gray-200'>{skill.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Skills