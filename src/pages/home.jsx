import React, { useState, useEffect, useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Button, Textarea, Tooltip } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import run from '../modules/contexts/Gemini'; // Import the run function
import { ModelContext } from '../modules/contexts/ModelContext';
 // Import ModelContext if not already imported
import { useNavigate } from 'react-router-dom';

function Home() {
    const { register, handleSubmit: handleFormSubmit, watch } = useForm();
    const { setResponse, setLoading } = useContext(ModelContext);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [userPrompt, setUserPrompt] = useState('');

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log('setLoading type:', typeof setLoading); // Should log 'function'
        run(userPrompt, setResponse, setLoading);
        navigate('/recipe-page'); // Navigate to recipe page after setting the response
    };

    return (
        <div className="h-full relative w-full overflow-hidden  flex flex-col items-center justify-center rounded-lg">
            <h1 className="md:text-8xl text-4xl font-bold text-white relative">
                RECETTE
            </h1>
            <p className="text-center mt-2 text-neutral-300 text-2xl relative">
                Elevate your culinary skills with the power of AI
            </p>
            <form onSubmit={handleSubmit} className="w-1/2 flex gap-1 flex-col bg-[#202020]/60 rounded-lg p-2 items-center justify-center mt-4 ">
                <div className="flex flex-row w-full h-fit gap-2">
                    {
                        image && (
                            <div className='relative'>
                                <img src={URL.createObjectURL(image)} alt="Uploaded" className='w-16 h-16 rounded-md' />
                                <button onClick={() => setImage(null)} className="absolute  -right-2 -top-2 text-red-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-circle-fill text-2xl" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                    </svg>
                                </button>
                            </div>
                        )
                    }
                </div>
                <Textarea
                    placeholder="'Generate a quick Swahili recipe with eggs as the base'"
                    color="dark"
                    className="w-full bg-[#202020]/60 h-fit rounded-md  border-[1px] border-none text-white focus:outline-none focus:ring-0 focus:border-none"
                    {...register('userPrompt', { required: true })}
                    onChange={(e) => setUserPrompt(e.target.value)}
                />
                <div className="flex w-full flex-row justify-between">
                    <div className="relative flex flex-row items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-paperclip rotate-45 text-gray-400" viewBox="0 0 16 16">
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                        </svg>
                        <label className="flex flex-row gap-2 items-center text-sm text-gray-300 font-extralight shadow-lg rounded-md px-2 py-2 hover:bg-gray-500 cursor-pointer">
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                            </svg>
                            Image
                        </label>

                        <Tooltip className='w-full' placement='top' content="Upload an image to get it's recipe">
                            <div className="flex text-gray-50  rounded-full w-3 h-3 absolute -right-5 top-3 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                                </svg>
                            </div>
                        </Tooltip>

                    </div>

                    <div className="flex flex-row gap-2">

                        <button type='submit' className="bg-gray-800 text-sm flex flex-row gap-3 items-center text-yellow-300 font-extralight  shadow-lg rounded-md px-4 py-2 hover:bg-gray-700">
                            Generate Recipe
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" bi bi-stars" viewBox="0 0 16 16">
                                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
            <h3 className='text-white font-inter font-extralight'>Generate recipes from simple prompts and images</h3>
        </div>
    )
}

export default Home;
