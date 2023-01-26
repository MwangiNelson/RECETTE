import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { query, collection, onSnapshot, addDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css'

function Home() {

    const [visible, setVisible] = useState(true)
    const [cursorposition, setCursorPosition] = useState({ x: null, y: null })

    const [newIngredient, setNewIngredient] = useState([])
    const [ingredientsList, updateIngredientsList] = useState([])

    const [name, setName] = useState([])
    const [title, setTitle] = useState('')
    const [procedure, setProcedure] = useState('')
    const [data, setData] = useState({})


    useEffect(() => {
        function handle(e) {
            setCursorPosition(
                {
                    x: e.clientX,
                    y: e.clientY
                }
            )
        }


        document.addEventListener("mousemove", handle)
        return () => document.removeEventListener("mousemove", handle)
    })

    const { x, y } = cursorposition

    const collectData = () => {
        setData(data.name = name, data.title = title, data.procedure = procedure, data.ingredients = list)
    }
    const createRecipe = async (e) => {
        collectData()
        e.preventDefault(e)
        console.log(data)

        await addDoc(collection(db, 'recipes'), {
            author: data.name,
            procedure: data.procedure,
            ingredients: data.ingredients,
            title: data.title
        })

        toast.success("Recipe created successfully",
            {
                position: "top-center",
                autoClose: 5000,
            })
    }

    function deleteItem(id) {
        setList(ingredientsList.filter((item, i) => i !== id))
    }

    return (
        <section className='home'>
            <nav className="home-nav-bar">
                <ul className='flex-row'>
                    <li><a href=""><i className="fa-solid fa-magnifying-glass"></i> FIND RECIPES</a></li>
                    <li><a href="">RECIPE GENERATOR</a></li>
                    <li><a href="">POST RECIPE</a></li>
                    <li><a href="">CREATE ACCOUNT</a></li>
                </ul>
            </nav>

            <div className="main-body">
                <div className={visible ? "intro-container" : "invisible"}>
                    <h3>HELLO THERE!</h3>
                    <p>
                        Welcome to <b>RECETTE</b> beta version <br />
                        As a developer, the only thing I can cook is spaghetti code
                    </p>
                    <button className="close-module flex-row" id="close-btn" onClick={() => { setVisible(false) }}>
                        <i className="fa-solid fa-xmark"></i>
                        CLOSE POP-UP
                    </button>
                    <img src="straw.png" alt="" className="strawberry" />
                </div>

                <div className="recipe-form-wrapper flex-col">
                    <div className="header">
                        <h4>Add Your Recipe Here</h4>
                    </div>
                    <div className="recipe-form-container">
                        <form action="" className="recipe-form" onSubmit={createRecipe}>
                            <div className="input-field">
                                <div className="input-label">
                                    <label htmlFor="name">Your name:</label>
                                </div>
                                <div className="fillable">
                                    <input type="text" className="form-input" placeholder='Your name goes here' value={name} onChange={(e) => { setName(e.target.value) }} />
                                    <small>Your name will be used to give more details about your recipe</small>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <label htmlFor="title">Recipe title:</label>
                                </div>
                                <div className="fillable">
                                    <input type="text" className="form-input" placeholder='eg. Kenducky Frayed Cheeks' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                    <small>This is the name for your recipe</small>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <label htmlFor="name">Ingredients:</label>
                                </div>
                                <div className="fillable">
                                    <div className="ingredients">
                                        <input type="text" onChange={(e) => { setNewIngredient(e.target.value) }} className="form-input" />
                                        <button className="add-btn" type='button' onClick={() => { updateIngredientsList([...ingredientsList, newIngredient]) }}>ADD</button>
                                    </div>
                                    <small>What do I need?</small>
                                    <div className="ingredients-list">
                                        {ingredientsList.map((item, index) => { return <span className="ingredient-item">{item} <button className="ingred-btn" id={index} type='button' onClick={() => deleteItem(index)}>< i className="fa-solid fa-xmark"></i></button></span> })}
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="label-holder">
                                    <label htmlFor="name">Procedure</label>
                                </div>
                                <div className="fillable">
                                    <textarea name="procedure" value={procedure} onChange={(e) => { setProcedure(e.target.value) }} rows="7"></textarea>
                                </div>
                            </div>
                            <div className="submit">
                                <button className='submit-btn' type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home