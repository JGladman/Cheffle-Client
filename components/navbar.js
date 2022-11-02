import React from 'react'
import styled from 'styled-components'
import Link from "next/link"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8.75rem;
  background-color: #37ebca;
`

const Title = styled.p`
  font-size: 96px;
  color: #FFDE92;
  margin-left: 4rem;
  text-shadow: 0px 4px 4px rgba(0,0,0,0.45);
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 4rem;
  column-gap: 2rem;
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 4rem;
  background-color: #FFE29D;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  &:hover {
    box-shadow: 0px 0px 0px black;
    background-color: #F4B111;
  }
`

const navbar = () => {
  return (
    <Wrapper>
      <Link href="/">
        <Title className="title">Cheffle</Title>
      </Link>
      <ButtonWrapper>
        <Link href="/recipes">
          <Button>
            <p className="text">Recipes</p>
          </Button>
        </Link>
        <Link href="/fridge">
          <Button>
            <p className="text">Fridge</p>
          </Button>
        </Link>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default navbar