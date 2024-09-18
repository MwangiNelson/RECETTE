import React from 'react'

const RecipeGenerator = () => {
    return (
        <div className="w-full h-fit min-h-screen">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white">Recipe Generator</h1>
            </div>
            <p className="text-white">Generate a recipe based on the ingredients you have</p>
                    <div className="flex flex-row justify-center items-center">

                    
                <button className="w-[100px] h-[50px] rounded-md bg-[#ff5400] text-white">Generate</button>
            </div>
        </div>
    )
}

export default RecipeGenerator