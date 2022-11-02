import React from 'react'

import {PageWrapper} from '/styles/commonComponents.js'

import Navbar from '../components/navbar'
import RecipeHolder from '/components/recipeHolder'

const Recipes = () => {
  return (
    <PageWrapper>
      <Navbar/>
      <RecipeHolder></RecipeHolder>
    </PageWrapper>
  )
}

export default Recipes