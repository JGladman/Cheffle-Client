import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Box, Button, Switch, Typography, Grid } from '@mui/material'

import { Tabs, Tab, MainBox, TwoButtonHolder, RoundButton, NormalButton } from '/styles/commonComponents'

const recipeHolder = () => {
  const [selected, setSelected] = useState(0)
  const [recipes, setRecipes] = useState([])
  const [ready, setReady] = useState(false)

  const router = useRouter()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/recipes/`).then((res) => {
      const loaded = []
      res.data.recipes.map((ingredient) => {
        loaded.push(ingredient)
      })
      setRecipes(loaded)
    })
  }, [])

  const deleteRecipe = (id) => {
    axios.delete(`http://127.0.0.1:8000/recipes/delete/${id}/`)
    const tmp = [...recipes]
    const index = tmp.findIndex((item) => item.id == id)
    tmp.splice(index, 1)
    setRecipes(tmp)
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab selected={selected == 0} onClick={() => setSelected(0)}>
          <Typography className='text'>My Recipes</Typography>
        </Tab>
        {/* <Tab selected={selected == 1} onClick={() => setSelected(1)}>
          <Typography className='text'>Saved Recipes</Typography>
        </Tab> */}
      </Tabs>
      <MainBox>
        <Grid container rowSpacing={1}>
          <Grid md={5} lg={4}>
            <SwitcherHolder>
              <p className='text'>Ingredients in Fridge:</p>
              <StyledSwitch onChange={(event) => setReady(!ready)} />
            </SwitcherHolder>
          </Grid>
          <Grid md={4} lg={6} />
          <Grid md={3} lg={2}>
            <Box display='flex' justifyContent='flex-end'>
              <NormalButton onClick={() => router.push('/createRecipe')}>
                <Typography className='text'>New Recipe</Typography>
              </NormalButton>
            </Box>
          </Grid>
          <Grid md={12}>
            <Box sx={{ height: '2rem' }} />
          </Grid>
          {ready
            ? recipes
                .filter((recipe) => recipe.ready)
                .map((recipe) => (
                  <Grid container key={recipe.id}>
                    <Grid md={5} lg={8}>
                      <RecipeHolder onClick={() => router.push(`/recipe/${recipe.id}`)}>
                        <Typography className='text'>{recipe.recipeName}</Typography>
                      </RecipeHolder>
                    </Grid>
                    <Grid md={4} lg={2} />
                    <Grid md={3} lg={2}>
                      <TwoButtonHolder>
                        <RoundButton>
                          <Typography>Edit</Typography>
                        </RoundButton>
                        <RoundButton onClick={() => deleteRecipe(recipe.id)}>
                          <Typography>-</Typography>
                        </RoundButton>
                      </TwoButtonHolder>
                    </Grid>
                    <Grid md={12}>
                      <Box sx={{ height: '2rem' }} />
                    </Grid>
                  </Grid>
                ))
            : recipes.map((recipe) => (
                <Grid container key={recipe.id}>
                  <Grid md={5} lg={8}>
                    <RecipeHolder onClick={() => router.push(`/recipe/${recipe.id}`)}>
                      <Typography className='text'>{recipe.recipeName}</Typography>
                    </RecipeHolder>
                  </Grid>
                  <Grid md={4} lg={2} />
                  <Grid md={3} lg={2}>
                    <TwoButtonHolder>
                      <RoundButton>
                        <Typography>Edit</Typography>
                      </RoundButton>
                      <RoundButton onClick={() => deleteRecipe(recipe.id)}>
                        <Typography>-</Typography>
                      </RoundButton>
                    </TwoButtonHolder>
                  </Grid>
                  <Grid md={12}>
                    <Box sx={{ height: '2rem' }} />
                  </Grid>
                </Grid>
              ))}
        </Grid>
      </MainBox>
    </Wrapper>
  )
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main
  },
  marginRight: '1rem'
}))

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 3rem 10rem 3rem 10rem;
  width: auto;
  height: auto;
`

const SwitcherHolder = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffebbd;
  border-radius: 10px;
  width: 100%;
  height: 4rem;
  padding-left: 2rem;
`

const RecipeHolder = styled(Button)(
  ({ theme }) => `
    display: flex;
    text-transform: none;
    flex-direction: row;
    background-color: ${theme.palette.secondary.main};
    width: 100%;
    height: 4rem;
    border-radius: 10px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    &:hover {
      background-color: ${theme.palette.secondary.darker};
    };
    &:active {
      color: ${theme.palette.secondary.main};
      background-color: ${theme.palette.secondary.main};
    };
    && .MuiTouchRipple-child {
      background-color: orange;
    }
  `
)

export default recipeHolder
