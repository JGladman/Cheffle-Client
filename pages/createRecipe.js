import React from 'react'

import { PageWrapper } from '/styles/commonComponents.js'

import Navbar from '../components/navbar'
import CreateRecipeHolder from '/components/createRecipeHolder'

const CreateRecipe = () => {
  return (
    <PageWrapper>
      <Navbar />
      <CreateRecipeHolder></CreateRecipeHolder>
    </PageWrapper>
  )
}

export default CreateRecipe
