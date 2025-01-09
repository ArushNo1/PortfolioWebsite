import React from 'react'
import arushLogo from '/ArushBodlaWithoutBackground.svg'

const Homepage = () => {
  return (
    <div className='bg-black text-snow text-center py-16' id='home'>
    <img src={arushLogo} className="mx-auto h-40 w-40 mb-8 rounded-full object-cover transform transition-transform duration-300 hover:scale-105" alt="Arush Bodla logo" />
    <h1 className='text-4xl font-bold'>
        Hi, I'm {" "}
        <span className="gradient-text">
        Arush Bodla
        </span>
    </h1>
    <p>
        I love to code, and my favorite language is C++.
    </p>
    <div className="space-x-4 mt-8 justify-center">
        <button className="transition-all duration-300 ease-in-out bg-pigment-green text-snow hover:bg-gamboge hover:scale-105 py-2 px-4 rounded-full text-lg font-semibold">
          Contact Me
        </button>
        <button className="transition-all duration-300 ease-in-out bg-lake-blue text-snow hover:bg-gamboge hover:scale-105 py-2 px-4 rounded-full text-lg font-semibold">
          My Resume
        </button>
    </div>
    </div>
  )
}

export default Homepage