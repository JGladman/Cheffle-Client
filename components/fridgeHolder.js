import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Switch,
  Typography,
  Grid,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material'

import { Tabs, Tab, MainBox, TwoButtonHolder, RoundButton } from '/styles/commonComponents'
import { NormalButton } from '../styles/commonComponents'

const fridgeHolder = () => {
  const [selected, setSelected] = useState(0)
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('metric')
  const [ingredientNames, setIngredientNames] = useState(['', ''])
  const [quantities, setQuantities] = useState([1, 1])
  const [units, setUnits] = useState(['g', 'g'])
  const [steps, setSteps] = useState(['', ''])
  const [changed, setChanged] = useState(false)

  const router = useRouter()

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      if (newUnit == 'imperial') {
        let tmpQty = [...quantities]
        let tmpUnits = [...units]
        for (let [i, val] of units.entries()) {
          switch (val) {
            case 'mg':
              tmpQty[i] = tmpQty[i] / 28350
              tmpUnits[i] = 'oz'
              break
            case 'g':
              tmpQty[i] = tmpQty[i] / 28.35
              tmpUnits[i] = 'oz'
              break
            case 'kg':
              tmpQty[i] = tmpQty[i] * 35.274
              tmpUnits[i] = 'oz'
              break
            case 'ml':
              tmpQty[i] = tmpQty[i] / 29.574
              tmpUnits[i] = 'oz'
              break
            case 'l':
              tmpQty[i] = tmpQty[i] * 33.814
              tmpUnits[i] = 'oz'
              break
          }
        }
        setQuantities(tmpQty)
        setUnits(tmpUnits)
      } else {
        let tmpQty = [...quantities]
        let tmpUnits = [...units]
        for (let [i, val] of units.entries()) {
          switch (val) {
            case 'oz':
              tmpQty[i] = tmpQty[i] * 28.35
              tmpUnits[i] = 'g'
              break
            case 'pint':
              tmpQty[i] = tmpQty[i] * 473.2
              tmpUnits[i] = 'ml'
              break
            case 'quart':
              tmpQty[i] = tmpQty[i] * 1.057
              tmpUnits[i] = 'l'
              break
            case 'gallon':
              tmpQty[i] = tmpQty[i] * 3.785
              tmpUnits[i] = 'l'
              break
            case 'cup':
              tmpQty[i] = tmpQty[i] * 236.6
              tmpUnits[i] = 'ml'
              break
          }
        }
        setQuantities(tmpQty)
        setUnits(tmpUnits)
      }
      setUnit(newUnit)
      setChanged(true)
    }
  }

  const handleIngredientChange = (i) => (event) => {
    let tmp = [...ingredientNames]
    tmp[i] = event.target.value
    setIngredientNames(tmp)
    setChanged(true)
  }

  const handleQuantityChange = (i) => (event) => {
    if (!isNaN(event.target.value) && !isNaN(parseFloat(event.target.value))) {
      let tmp = [...quantities]
      tmp[i] = event.target.value
      console.log(tmp[i])
      setQuantities(tmp)
      setChanged(true)
    }
  }

  const handleUnitsChange = (i) => (event) => {
    let tmp = [...units]
    tmp[i] = event.target.value
    setUnits(tmp)
    setChanged(true)
  }

  const handleIngredientAdd = (i) => {
    let namesTmp = [...ingredientNames]
    let qtyTmp = [...quantities]
    let unitsTmp = [...units]

    namesTmp.splice(i + 1, 0, '')
    qtyTmp.splice(i + 1, 0, 1)

    if (unit === 'metric') {
      unitsTmp.splice(i + 1, 0, 'g')
    } else {
      unitsTmp.splice(i + 1, 0, 'oz')
    }

    setIngredientNames(namesTmp)
    setQuantities(qtyTmp)
    setUnits(unitsTmp)
    setChanged(true)
  }

  const handleStepChange = (i) => (event) => {
    let tmp = [...steps]
    tmp[i] = event.target.value
    setSteps(tmp)
  }

  const handleStepRemove = (i) => {
    let stepsTmp = [...steps]

    stepsTmp.splice(i, 1)

    setSteps(stepsTmp)
  }

  const handleStepAdd = (i) => {
    let stepsTmp = [...steps]

    stepsTmp.splice(i + 1, 0, '')

    setSteps(stepsTmp)
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab selected={selected == 0} onClick={() => setSelected(0)}>
          <Typography className='text'>My Fridge</Typography>
        </Tab>
      </Tabs>
      <MainBox>
        <Grid container rowSpacing={1}>
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
            <Typography sx={{ color: 'black', marginBottom: '1rem' }}>Items:</Typography>
          </Grid>
          {ingredientNames.map((ingredient, i) => (
            <Grid container key={i} sx={{ marginBottom: '1rem' }}>
              <Grid lg={5}>
                <InputField
                  label='Item'
                  variant='filled'
                  fullWidth
                  value={ingredientNames[i]}
                  onChange={handleIngredientChange(i)}
                  sx={{ width: '90%' }}
                >
                  {ingredient}
                </InputField>
              </Grid>
              <Grid lg={1.5}>
                <InputField
                  label='Qty'
                  variant='filled'
                  sx={{ width: '95%' }}
                  type='number'
                  value={quantities[i]}
                  onChange={handleQuantityChange(i)}
                >
                  {ingredient}
                </InputField>
              </Grid>
              <Grid lg={1.5}>
                <Box sx={{ width: '100%' }}>
                  {unit === 'metric' ? (
                    <DropDown value={units[i]} onChange={handleUnitsChange(i)} sx={{ width: '100%' }}>
                      <MenuItem value='mg'>mg</MenuItem>
                      <MenuItem value='g'>g</MenuItem>
                      <MenuItem value='kg'>kg</MenuItem>
                      <MenuItem value='ml'>ml</MenuItem>
                      <MenuItem value='l'>l</MenuItem>
                    </DropDown>
                  ) : (
                    <DropDown value={units[i]} onChange={handleUnitsChange(i)} sx={{ width: '100%' }}>
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
          {changed && (
            <Grid container>
              <Grid lg={10} />
              <Grid lg={2}>
                <ButtonWrapper>
                  <NormalButton onClick={() => router.push('/recipes')}>
                    <Typography className='text'>Save</Typography>
                  </NormalButton>
                </ButtonWrapper>
              </Grid>
            </Grid>
          )}
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

export default fridgeHolder
