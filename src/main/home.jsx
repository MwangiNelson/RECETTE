import React from 'react'
import './home.css'

function Home() {
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
                <div className="intro-container">
                    <h3>HELLO THERE!</h3>
                    <p>
                        Welcome to <b>RECETTE</b> beta version <br />
                        As a developer, the only thing I can cook is spaghetti code
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Home