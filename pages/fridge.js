import React from 'react'

import { PageWrapper } from '/styles/commonComponents.js'

import Navbar from '../components/navbar'
import FridgeHolder from '/components/fridgeHolder'

const Recipes = () => {
  return (
    <PageWrapper>
      <Navbar />
      <FridgeHolder />
    </PageWrapper>
  )
}

export default Recipes
