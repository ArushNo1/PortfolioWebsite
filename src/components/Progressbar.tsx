import React from 'react'

const Progressbar = ({ label, width, gradientClass = "bg-gradient-to-r from-neon-green to-neon-blue" }: { label: string; width: number; gradientClass?: string }) => {
    return (
        <div className="flex items-center">
            <label className="w-2/12">{label}</label>
            <div className="grow bg-gray-800 rounded-full h-2.5">
                <div
                    className={`${gradientClass} h-2.5 rounded-full 
                    transform transition-transform duration-100 hover:scale-y-125`}
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Progressbar

{/* <ProgressBar label="Data Structures and Algorithms" width={95} />
                <ProgressBar label="Machine Learning" width={85} />
                <ProgressBar label="Object Oriented Programming" width={80} /> */}