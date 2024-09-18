import React from 'react'

const Footer = () => {
    return (
        <div className="w-full absolute bottom-0 px-4 h-fit py-4  flex flex-row items-center justify-between z-99">
            <p className="text-gray-500 text-xl font-bold">RECETTE {new Date().getFullYear()}</p>

            <h3>POWERED BY <a href="https://astralyngroup.com" target="_blank" rel="noopener noreferrer" className="text-black font-black hover:text-gray-500"><b>ASTRALYN</b></a></h3>
        </div>
    )
}

export default Footer