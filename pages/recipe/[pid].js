import React, { useEffect } from 'react'

import { PageWrapper } from '/styles/commonComponents.js'

import Navbar from '../../components/navbar'
import ViewRecipeHolder from '../../components/viewRecipeHolder'
import { useRouter } from 'next/router'

const CreateRecipe = () => {
  const router = useRouter()
  const { pid } = router.query

  useEffect(() => {
    console.log('Router:', router.query.pid)
  }, [])

  return (
    <PageWrapper>
      <Navbar />
      <ViewRecipeHolder id={router.query.pid} />
    </PageWrapper>
  )
}

export default CreateRecipe
