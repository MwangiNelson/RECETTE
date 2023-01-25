import React from 'react'
import './home.css'

function Home() {
    return (
        <section className='home'>
            <nav className="home-nav-bar">
                <ul className='flex-row'>
                    <li><a href=""><i class="fa-solid fa-magnifying-glass"></i> FIND RECIPES</a></li>
                    <li><a href="">RECIPE GENERATOR</a></li>
                    <li><a href="">POST RECIPE</a></li>
                    <li><a href="">CREATE ACCOUNT</a></li>
                </ul>
            </nav>

            
        </section>
    )
}

export default Home