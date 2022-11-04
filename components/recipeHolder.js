import React, { useState } from 'react'
import styled from 'styled-components'

import { Box, Button, Switch, Typography, Grid } from '@mui/material'

const recipeHolder = () => {
  const [selected, setSelected] = useState(0)

  return (
    <Wrapper>
      <Tabs>
        <Tab selected={selected == 0} onClick={() => setSelected(0)}>
          <p className='text'>My Recipes</p>
        </Tab>
        <Tab selected={selected == 1} onClick={() => setSelected(1)}>
          <p className='text'>Saved Recipes</p>
        </Tab>
      </Tabs>
      <Holder>
        <Row>
          <SwitcherHolder>
            <p className='text'>Ingredients in Fridge:</p>
            <StyledSwitch defaultChecked />
          </SwitcherHolder>
          <StyledButton>
            <Typography className='text'>New Recipe</Typography>
          </StyledButton>
        </Row>
        <Row>
          <RecipeHolder>
            <Typography className='text'>Chicken Teriyaki (Icons TBD)</Typography>
          </RecipeHolder>
          <EditDeleteHolder>
            <RoundButton></RoundButton>
            <RoundButton></RoundButton>
          </EditDeleteHolder>
        </Row>
      </Holder>
    </Wrapper>
  )
}

const StyledButton = styled(Button)(
  ({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    text-transform: none;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
    height: 4rem;
    width: 11rem;
    padding-left: 2rem;
    padding-right: 2rem;
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
    align-items: center;
    border-radius: 100%;
    width: 4rem;
    height: 4rem;
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

const Tabs = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 10px;
`

const Tab = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 50px;
  background-color: ${(props) => (props.selected ? '#F7C244' : '#FFEBBD')};
  border-radius: 15px 15px 0px 0px;
  box-shadow: ${(props) => (props.selected ? null : '4px 0px 4px rgba(0,0,0,0.45)')};
  &:hover {
    box-shadow: 0px 0px 0px black;
    background-color: #f7c244;
  }
`

const Holder = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f7c244;
  width: 100%;
  height: 100%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
  border-radius: 0px 15px 15px 15px;
  padding-top: 1.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  gap: 2rem;
`

const SwitcherHolder = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffebbd;
  border-radius: 10px;
  width: 20rem;
  height: 4rem;
  padding-left: 2rem;
`

const Row = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10rem;
`

const RecipeHolder = styled(Button)(
  ({ theme }) => `
    display: flex;
    text-transform: none;
    flex-direction: row;
    background-color: ${theme.palette.secondary.main};
    flex: 2 1 auto;
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
