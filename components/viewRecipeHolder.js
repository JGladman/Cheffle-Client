import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Box, Typography, Grid } from '@mui/material'

import { Tabs, Tab, MainBox, NormalButton } from '/styles/commonComponents'

const viewRecipeHolder = ({ id }) => {
  const [selected, setSelected] = useState(0)
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const [steps, setSteps] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [ready, setReady] = useState(false)

  const router = useRouter()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/recipes/${id}/`).then((res) => {
      setName(res.data.recipe)
      setIngredients(res.data.ingredients)
      setSteps(res.data.steps)
      setReady(res.data.ready)
    })
  }, [])

  const handleCook = () => {
    axios.put(`http://127.0.0.1:8000/recipes/cook/${id}/`).then(router.push('/recipes'))
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab selected={selected == 0} onClick={() => setSelected(0)}>
          <Typography className='text'>My Recipe</Typography>
        </Tab>
      </Tabs>
      <MainBox>
        <Grid container rowSpacing={1}>
          <Grid lg={8}>
            <Field>
              <Typography className='text'>{name}</Typography>
            </Field>
          </Grid>
          <Grid lg={2} />
          <Grid lg={2}>
            {/* <ToggleButtonGroup value={unit} exclusive>
              <UnitButton value='metric'>
                <Typography>Metric</Typography>
              </UnitButton>
              <UnitButton value='imperial'>
                <Typography>Imperial</Typography>
              </UnitButton>
            </ToggleButtonGroup> */}
          </Grid>
          <Grid lg={12}>
            <Box sx={{ height: '2rem' }} />
          </Grid>
          <Grid lg={12}>
            <Typography sx={{ color: 'black', marginBottom: '1rem' }}>Ingredients:</Typography>
          </Grid>
          {ingredients.map((ingredient, i) => (
            <Grid container key={i} sx={{ marginBottom: '1rem' }}>
              <Grid lg={5}>
                <Field>
                  <Typography sx={{ color: 'black' }}>{ingredient.ingredientName}</Typography>
                </Field>
              </Grid>
              <Grid lg={1} />
              <Grid lg={2}>
                <Field>
                  <Typography sx={{ color: 'black' }}>{`${ingredient.quantity} ${ingredient.unit}`}</Typography>
                </Field>
              </Grid>
            </Grid>
          ))}
          <Grid lg={12}>
            <Box sx={{ height: '2rem' }} />
          </Grid>
          <Grid lg={12}>
            <Typography sx={{ color: 'black', marginBottom: '1rem' }}>Steps:</Typography>
          </Grid>
          {steps.map((step, i) => (
            <Grid container key={i} sx={{ marginBottom: '1rem' }}>
              <Grid lg={8}>
                {/\r|\n/.exec(step) ? (
                  <StepField>
                    <Typography className='display-linebreak' sx={{ color: 'black' }}>{`${i + 1}. ${step}`}</Typography>
                  </StepField>
                ) : (
                  <Field>
                    <Typography className='display-linebreak' sx={{ color: 'black' }}>{`${i + 1}. ${step}`}</Typography>
                  </Field>
                )}
              </Grid>
            </Grid>
          ))}
          <Grid lg={12}>
            <Box sx={{ height: '4rem' }} />
          </Grid>
          {ready && (
            <Grid container>
              <Grid lg={10} />
              <Grid lg={2}>
                <ButtonWrapper>
                  <NormalButton onClick={() => handleCook()}>
                    <Typography className='text'>Cook</Typography>
                  </NormalButton>
                </ButtonWrapper>
              </Grid>
              <Grid lg={12}>
                <Box sx={{ height: '1rem' }} />
              </Grid>
            </Grid>
          )}
          <Grid lg={10} />
          <Grid lg={2}>
            <ButtonWrapper>
              <NormalButton onClick={() => router.push(`/recipe/update/${id}`)}>
                <Typography className='text'>Edit</Typography>
              </NormalButton>
            </ButtonWrapper>
          </Grid>
        </Grid>
      </MainBox>
    </Wrapper>
  )
}

const ButtonWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 2rem;
`

const Field = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  textTransform: 'none',
  height: '3.5rem',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  paddingLeft: '1rem'
}))

const StepField = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  textTransform: 'none',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  paddingLeft: '1rem'
}))

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 3rem 10rem 3rem 10rem;
  width: auto;
  height: auto;
`

export default viewRecipeHolder
