import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import GenRecipePage from '../pages/gen_recipe_page'
import LoadingScreen from '../components/layouts/LoadingScreen'

const NavigationRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loading-screen' element={<LoadingScreen />} />
        <Route path='/recipe-page' element={<GenRecipePage />} />
    </Routes>
  )
}

export default NavigationRoutes