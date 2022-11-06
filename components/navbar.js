import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { Box, Typography } from '@mui/material'

const navbar = () => {
  return (
    <Wrapper>
      <Link href='/'>
        <Title className='title'>Cheffle</Title>
      </Link>
      <ButtonWrapper>
        <Link href='/recipes'>
          <Text className='text'>Recipes</Text>
        </Link>
        <Link href='/fridge'>
          <Text className='text'>Fridge</Text>
        </Link>
      </ButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 6rem;
    background-color: ${theme.palette.primary.main};
  `
)

const Title = styled(Typography)(
  ({ theme }) => `
    font-size: 60px;
    color: ${theme.palette.secondary.main};
    margin-left: 4rem;
    text-shadow: 0px 4px 4px rgba(0,0,0,0.45);
  `
)

const ButtonWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 4rem;
  column-gap: 2rem;
`

const Text = styled(Typography)`
  &:hover {
    text-decoration: underline;
  }
`

export default navbar
