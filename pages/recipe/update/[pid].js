import React, { useEffect } from 'react'

import { PageWrapper } from '/styles/commonComponents.js'

import Navbar from '../../../components/navbar'
import UpdateRecipeHolder from '../../../components/updateRecipeHolder'
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
      <UpdateRecipeHolder id={router.query.pid} />
    </PageWrapper>
  )
}

export default CreateRecipe
