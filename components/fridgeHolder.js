import React, { useState } from 'react'
import styled from 'styled-components'

import { Box, Button, Switch, Typography, Grid } from '@mui/material'

import { Tabs, Tab, MainBox } from '/styles/commonComponents'

const recipeHolder = () => {
  const [selected, setSelected] = useState(0)
  const [recipes, setRecipes] = useState(['Chicken Teriyaki', 'Penne Bolognese', 'Eggs Benedict'])

  return (
    <Wrapper>
      <Tabs>
        <Tab selected={selected == 0} onClick={() => setSelected(0)}>
          <Typography className='text'>My Fridge</Typography>
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
              <StyledSwitch defaultChecked />
            </SwitcherHolder>
          </Grid>
          <Grid md={4} lg={6} />
          <Grid md={3} lg={2}>
            <Box display='flex' justifyContent='flex-end'>
              <NewRecipe onClick={() => setRecipes([...recipes, 'Test'])}>
                <Typography className='text'>New Recipe</Typography>
              </NewRecipe>
            </Box>
          </Grid>
          <Grid md={12}>
            <Box sx={{ height: '2rem' }} />
          </Grid>
          {recipes.map((recipe, i) => (
            <Grid container key={i}>
              <Grid md={5} lg={8}>
                <RecipeHolder>
                  <Typography className='text'>{recipe}</Typography>
                </RecipeHolder>
              </Grid>
              <Grid md={4} lg={2} />
              <Grid md={3} lg={2}>
                <EditDeleteHolder>
                  <RoundButton>
                    <Typography>Edit</Typography>
                  </RoundButton>
                  <RoundButton>
                    <Typography>-</Typography>
                  </RoundButton>
                </EditDeleteHolder>
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

const NewRecipe = styled(Button)(
  ({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    text-transform: none;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
    height: 4rem;
    width: 100%;
    background-color: ${theme.palette.secondary.main};
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

const RoundButton = styled(Button)(
  ({ theme }) => `
    display: flex;
    justify-content: center;
    color: black;
    align-items: center;
    border-radius: 100%;
    width: 4rem;
    height: 4rem;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
    background-color: ${theme.palette.secondary.main};
    &:hover {
      background-color: ${theme.palette.secondary.darker};
    };
    &:active {
      background-color: ${theme.palette.secondary.main};
    };
    && .MuiTouchRipple-child {
      background-color: orange;
    }
  `
)

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

const EditDeleteHolder = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0 0 11rem;
`

export default recipeHolder
