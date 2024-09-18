import React, { useContext } from 'react'
import { ModelContext } from '../modules/contexts/ModelContext';
import LoadingScreen from '../components/layouts/LoadingScreen';

const GenRecipePage = () => {
    const { response, loading } = useContext(ModelContext);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className='w-full min-h-screen h-fit flex items-center justify-center'>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                {/* <div className="bg-red-500 p-1 h-full w-4 absolute"></div> */}
                <h1 className='text-white text-2xl font-bold'>Recipe Generator</h1>
                {/* Some comment */}
                <div className="bg-white p-6 px-10 rounded-xl shadow-2xl w-3/4 min-h-[500px]">
                    <p>{response}</p>
                </div>
            </div>
        </div>
    )
}

export default GenRecipePage