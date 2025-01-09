import React from 'react'
import SkillCardList from './SkillCardList'

const developSkills = [
    {
        id: 0,
        title: "Languages", 
        description: "I have lots of experience in C++, Java, and Python, and am familiar with C#, HTML, CSS, and Javascript."
    }
]

const Skills = () => {
  return (
    <div className="bg-black text-white py-20" id='skills'>
        <div className='container mx-auto px-8 md:px-16 lg:px-24'>
            <h2 className='text-4xl font-bold text-center mb-12'>My Skills</h2>
            <div className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {developSkills.map((skill) => (
                    <div key={skill.id} className='h-[176px] bg-gray-800 rounded-lg px-6 pb-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105'>
                        <h3 className='mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-neon-green to-neon-blue'>{skill.title}</h3>
                        <p className='mt-2 text-gray-200'>{skill.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Skills