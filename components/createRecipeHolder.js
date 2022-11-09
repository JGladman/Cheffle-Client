import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Box, Typography, Grid, TextField, ToggleButtonGroup, ToggleButton, Select, MenuItem } from '@mui/material'

import { Tabs, Tab, MainBox, TwoButtonHolder, RoundButton } from '/styles/commonComponents'
import { NormalButton } from '../styles/commonComponents'

const recipeHolder = () => {
  const [selected, setSelected] = useState(0)
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('metric')
  const [steps, setSteps] = useState([{ stepNumber: 0, step: '' }])
  const [ingredients, setIngredients] = useState([{ ingredientName: 'New Ingredient', unit: 'g', quantity: 1 }])

  const router = useRouter()

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      let tmp = [...ingredients]
      if (newUnit == 'imperial') {
        tmp.map((ingredient) => {
          switch (ingredient['unit']) {
            case 'mg':
              ingredient['quantity'] = ingredient['quantity'] / 28350
              ingredient['unit'] = 'oz'
              break
            case 'g':
              ingredient['quantity'] = ingredient['quantity'] / 28.35
              ingredient['unit'] = 'oz'
              break
            case 'kg':
              ingredient['quantity'] = ingredient['quantity'] * 35.274
              ingredient['unit'] = 'oz'
              break
            case 'ml':
              ingredient['quantity'] = ingredient['quantity'] / 29.574
              ingredient['unit'] = 'oz'
              break
            case 'l':
              ingredient['quantity'] = ingredient['quantity'] * 33.814
              ingredient['unit'] = 'oz'
              break
          }
          ingredient['quantity'] = Math.ceil(ingredient['quantity'] * 100) / 100
        })
        setIngredients(tmp)
      } else {
        tmp.map((ingredient) => {
          switch (ingredient['unit']) {
            case 'oz':
              ingredient['quantity'] = ingredient['quantity'] * 28.35
              ingredient['unit'] = 'g'
              break
            case 'pint':
              ingredient['quantity'] = ingredient['quantity'] * 473.2
              ingredient['unit'] = 'ml'
              break
            case 'quart':
              ingredient['quantity'] = ingredient['quantity'] * 1.057
              ingredient['unit'] = 'l'
              break
            case 'gallon':
              ingredient['quantity'] = ingredient['quantity'] * 3.785
              ingredient['unit'] = 'l'
              break
            case 'cup':
              ingredient['quantity'] = ingredient['quantity'] * 236.6
              ingredient['unit'] = 'ml'
              break
          }
          ingredient['quantity'] = Math.ceil(ingredient['quantity'] * 100) / 100
        })
        setIngredients(tmp)
      }
      setUnit(newUnit)
    }
  }

  const handleIngredientChange = (i, field) => (event) => {
    let tmp = [...ingredients]
    tmp[i][field] = event.target.value
    setIngredients(tmp)
  }

  const handleQuantityChange = (i) => (event) => {
    if (!isNaN(event.target.value) && !isNaN(parseFloat(event.target.value))) {
      let tmp = [...ingredients]
      tmp[i]['quantity'] = event.target.value
      setIngredients(tmp)
    }
  }

  const handleIngredientAdd = (i) => {
    let tmp = [...ingredients]
    tmp.splice(i + 1, 0, {
      ingredientName: '',
      quantity: 1,
      unit: unit === 'metric' ? 'g' : 'oz'
    })
    setIngredients(tmp)
  }

  const handleStepChange = (i) => (event) => {
    let tmp = [...steps]
    tmp[i]['step'] = event.target.value
    setSteps(tmp)
  }

  const handleStepRemove = (i) => {
    let stepsTmp = [...steps]

    stepsTmp.splice(i, 1)
    for (let i = 0; i < stepsTmp.length; i++) {
      stepsTmp[i].stepNumber = i
    }

    setSteps(stepsTmp)
  }

  const handleStepAdd = (i) => {
    let stepsTmp = [...steps]

    stepsTmp.splice(i + 1, 0, { stepNumber: i + 1, step: '' })
    for (let i = 0; i < stepsTmp.length; i++) {
      stepsTmp[i].stepNumber = i
    }

    setSteps(stepsTmp)
  }

  const handleSave = () => {
    axios
      .post(`http://127.0.0.1:8000/recipes/create/`, {
        recipeName: name,
        ingredients: ingredients,
        steps: steps
      })
      .then(router.push('/recipes'))
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab selected={selected == 0} onClick={() => setSelected(0)}>
          <Typography className='text'>New Recipe</Typography>
        </Tab>
      </Tabs>
      <MainBox>
        <Grid container rowSpacing={1}>
          <Grid lg={8}>
            <InputField
              label='Recipe Name'
              variant='filled'
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid lg={2} />
          <Grid lg={2}>
            <ToggleButtonGroup value={unit} exclusive onChange={handleUnitChange}>
              <UnitButton value='metric'>
                <Typography>Metric</Typography>
              </UnitButton>
              <UnitButton value='imperial'>
                <Typography>Imperial</Typography>
              </UnitButton>
            </ToggleButtonGroup>
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
                <InputField
                  label='Ingredient'
                  variant='filled'
                  fullWidth
                  value={ingredient.ingredientName}
                  onChange={handleIngredientChange(i, 'name')}
                  sx={{ width: '90%' }}
                >
                  {ingredient.ingredientName}
                </InputField>
              </Grid>
              <Grid lg={1.5}>
                <InputField
                  label='Qty'
                  variant='filled'
                  sx={{ width: '95%' }}
                  type='number'
                  value={ingredient['quantity']}
                  onChange={handleQuantityChange(i)}
                >
                  {ingredient['quantity']}
                </InputField>
              </Grid>
              <Grid lg={1.5}>
                <Box sx={{ width: '100%' }}>
                  {unit === 'metric' ? (
                    <DropDown
                      value={ingredient['unit']}
                      onChange={handleIngredientChange(i, 'unit')}
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value='mg'>mg</MenuItem>
                      <MenuItem value='g'>g</MenuItem>
                      <MenuItem value='kg'>kg</MenuItem>
                      <MenuItem value='ml'>ml</MenuItem>
                      <MenuItem value='l'>l</MenuItem>
                    </DropDown>
                  ) : (
                    <DropDown
                      value={ingredient['unit']}
                      onChange={handleIngredientChange(i, 'unit')}
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value='oz'>oz</MenuItem>
                      <MenuItem value='pint'>Pint</MenuItem>
                      <MenuItem value='quart'>Quart</MenuItem>
                      <MenuItem value='gallon'>Gallon</MenuItem>
                      <MenuItem value='cup'>Cup</MenuItem>
                    </DropDown>
                  )}
                </Box>
              </Grid>
              <Grid md={4} lg={2} />
              <Grid md={3} lg={2}>
                <TwoButtonHolder>
                  <RoundButton onClick={() => handleIngredientAdd(i)}>
                    <Typography>+</Typography>
                  </RoundButton>
                  <RoundButton onClick={() => handleIngredientRemove(i)}>
                    <Typography>-</Typography>
                  </RoundButton>
                </TwoButtonHolder>
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
                <InputField
                  label={'Step'.concat(' ', i + 1)}
                  variant='filled'
                  fullWidth
                  multiline
                  value={steps[i]['step']}
                  onChange={handleStepChange(i)}
                  sx={{ width: '100%' }}
                >
                  {step}
                </InputField>
              </Grid>
              <Grid md={4} lg={2} />
              <Grid md={3} lg={2}>
                <TwoButtonHolder>
                  <RoundButton onClick={() => handleStepAdd(i)}>
                    <Typography>+</Typography>
                  </RoundButton>
                  <RoundButton onClick={() => handleStepRemove(i)}>
                    <Typography>-</Typography>
                  </RoundButton>
                </TwoButtonHolder>
              </Grid>
            </Grid>
          ))}
          <Grid lg={12}>
            <Box sx={{ height: '4rem' }} />
          </Grid>
          <Grid lg={10} />
          <Grid lg={2}>
            <ButtonWrapper>
              <NormalButton onClick={() => handleSave()}>
                <Typography className='text'>Save</Typography>
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

const InputField = styled(TextField)(({ theme }) => ({
  boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.45)',
  '& label.Mui-focused': {
    color: theme.palette.primary.darker
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: theme.palette.primary.darker
  },
  '& .MuiFilledInput-root': {
    backgroundColor: theme.palette.secondary.main
  }
}))

const DropDown = styled(Select)(({ theme }) => ({
  boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.45)',
  backgroundColor: theme.palette.secondary.main
}))

const UnitButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: 'black',
  textTransform: 'none',
  width: '50%',
  height: '3.25rem',
  boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.45)',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.darker,
    color: 'white'
  }
}))

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 3rem 10rem 3rem 10rem;
  width: auto;
  height: auto;
`

export default recipeHolder
