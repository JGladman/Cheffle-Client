import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

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
  const [unit, setUnit] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const isMounted = useRef(false)
  const [changed, setChanged] = useState([])
  const [deleted, setDeleted] = useState([])

  const router = useRouter()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/ingredients/`).then((res) => {
      const loaded = []
      res.data.ingredients.map((ingredient) => {
        loaded.push(ingredient)
      })
      setIngredients(loaded)
      setUnit(res.data.unit)
      setLoading(false)
    })
  }, [])

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      let ingredientsTmp = [...ingredients]
      let changedTmp = [...changed]
      if (newUnit == 'imperial') {
        ingredientsTmp.map((ingredient) => {
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
          if (changedTmp.filter((item) => item.id == ingredient['id']).length == 0) changedTmp.push(ingredient)
          else {
            const tmpIndex = changedTmp.findIndex((item) => item.id == ingredient['id'])
            changedTmp.splice(tmpIndex, 1, ingredient)
          }
          setChanged(changedTmp)
        })
      } else {
        ingredientsTmp.map((ingredient) => {
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
          if (changedTmp.filter((item) => item.id == ingredient['id']).length == 0) changedTmp.push(ingredient)
          else {
            const tmpIndex = changedTmp.findIndex((item) => item.id == ingredient['id'])
            changedTmp.splice(tmpIndex, 1, ingredient)
          }
          setChanged(changedTmp)
        })
      }
      setIngredients(ingredientsTmp)
      setUnit(newUnit)
    }
  }

  const handleIngredientChange = (id, field) => (event) => {
    let changedTmp = [...changed]
    let index = ingredients.findIndex((item) => item['id'] == id)
    let ingredientTmp = [...ingredients]
    const ingredient = ingredients[index]
    ingredient[field] = event.target.value
    ingredientTmp.splice(index, 1, ingredient)
    setIngredients(ingredientTmp)

    if (changedTmp.filter((item) => item.id == id).length == 0) changedTmp.push(ingredient)
    else {
      const tmpIndex = changedTmp.findIndex((item) => item.id == id)
      changedTmp.splice(tmpIndex, 1, ingredient)
    }
    setChanged(changedTmp)
    console.log('Changed: ', changed)
  }

  const handleQuantityChange = (id, field) => (event) => {
    if (!isNaN(event.target.value) && !isNaN(parseFloat(event.target.value)) && event.target.value > 0) {
      let tmp = [...changed]
      let index = ingredients.findIndex((item) => item['id'] == id)
      let ingredientTmp = [...ingredients]
      const ingredient = ingredients[index]
      ingredient[field] = event.target.value
      ingredientTmp.splice(index, 1, ingredient)
      setIngredients(ingredientTmp)

      if (tmp.filter((item) => item.id == id).length > 0) tmp.push(ingredient)
      else {
        const tmpIndex = tmp.findIndex((item) => item.id == id)
        tmp.splice(tmpIndex, 1, ingredient)
      }
      setChanged(tmp)
    }
  }

  const handleIngredientAdd = (i) => {
    const ingredientsTmp = [...ingredients]
    const changedTmp = [...changed]

    const id = Math.floor(Math.random() * 100000)
    const ingredient = {
      id: id,
      ingredientName: '',
      quantity: 1,
      unit: unit === 'metric' ? 'g' : 'oz',
      new: true
    }
    ingredientsTmp.splice(i + 1, 0, ingredient)
    if (changedTmp.filter((item) => item.id == id).length == 0) changedTmp.push(ingredient)
    else {
      const tmpIndex = changedTmp.findIndex((item) => item.id == id)
      changedTmp.splice(tmpIndex, 1, ingredient)
    }
    setIngredients(ingredientsTmp)
    setChanged(changedTmp)
  }

  const handleIngredientRemove = (id) => {
    const ingredientsTmp = [...ingredients]
    const ingredientsIndex = ingredientsTmp.findIndex((item) => item.id == id)
    ingredientsTmp.splice(ingredientsIndex, 1)
    setIngredients(ingredientsTmp)

    const deletedTmp = [...deleted]
    deletedTmp.push(id)
    setDeleted(deletedTmp)
  }

  const save = () => {
    const added = []
    const updated = []
    const removed = []
    changed.map((change) => {
      if ('new' in change) {
        added.push(change)
      } else {
        updated.push(change)
      }
    })
    deleted.map((id) => removed.push(id))
    setChanged([])
    setDeleted([])
    if (added.length > 0) axios.post(`http://127.0.0.1:8000/ingredients/create/`, { new: added })
    if (updated.length > 0) axios.put(`http://127.0.0.1:8000/ingredients/update/`, { changes: updated })
    if (removed.length > 0) axios.delete(`http://127.0.0.1:8000/ingredients/delete/`, { data: { ids: removed } })
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab selected={selected == 0} onClick={() => console.log(ingredients)}>
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
          {ingredients.map((ingredient, i) => (
            <Grid container key={ingredient['id']} sx={{ marginBottom: '1rem' }}>
              <Grid lg={5}>
                <InputField
                  label='Item'
                  variant='filled'
                  fullWidth
                  value={ingredient['ingredientName']}
                  onChange={handleIngredientChange(ingredient['id'], 'ingredientName')}
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
                  value={ingredient['quantity']}
                  onChange={handleQuantityChange(ingredient['id'], 'quantity')}
                >
                  {ingredient}
                </InputField>
              </Grid>
              <Grid lg={1.5}>
                <Box sx={{ width: '100%' }}>
                  {unit === 'metric' ? (
                    <DropDown
                      value={ingredient['unit']}
                      onChange={handleIngredientChange(ingredient['id'], 'unit')}
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value='mg'>mg</MenuItem>
                      <MenuItem value='g'>g</MenuItem>
                      <MenuItem value='kg'>kg</MenuItem>
                      <MenuItem value='ml'>ml</MenuItem>
                      <MenuItem value='l'>l</MenuItem>
                    </DropDown>
                  ) : (
                    <DropDown value={ingredient['unit']} onChange={handleIngredientChange(ingredient['id'], 'unit')}>
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
                  <RoundButton onClick={() => handleIngredientRemove(ingredient['id'])}>
                    <Typography>-</Typography>
                  </RoundButton>
                </TwoButtonHolder>
              </Grid>
            </Grid>
          ))}
          <Grid lg={12}>
            <Box sx={{ height: '2rem' }} />
          </Grid>
          {changed.length + deleted.length > 0 && (
            <Grid container>
              <Grid lg={10} />
              <Grid lg={2}>
                <ButtonWrapper>
                  <NormalButton onClick={() => save()}>
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
