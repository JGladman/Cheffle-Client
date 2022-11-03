import React, {useState} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 5rem 3rem 5rem;
  width: auto;
  height: 500px;
`

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 10px;
`

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 50px;
  background-color: ${props => props.selected ? "#F7C244" : "#FFEBBD"};
  border-radius: 15px 15px 0px 0px;
  box-shadow: ${props => props.selected ? null : "4px 0px 4px rgba(0,0,0,0.45)"};
  &:hover {
    box-shadow: 0px 0px 0px black;
    background-color: #F7C244; 
  }
`

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #F7C244;
  width: 100%;
  height: 100%;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.45);
  border-radius: 0px 15px 15px 15px;
  padding-top: 1.5rem;
  padding-left: 3rem;
`

const SwitcherHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #FFEBBD;
    border-radius: 10px;
    width:34rem;
    height: 4rem;
    padding-left: 2rem;
`

const recipeHolder = () => {
  const [selected, setSelected] = useState(0)
  return (
    <Wrapper>
      <Tabs>
        <Tab selected={selected == 0} onClick={() => setSelected(0)}>
          <p className="text">My Recipes</p>
        </Tab>
        <Tab selected={selected == 1} onClick={() => setSelected(1)}>
        <p className="text">Saved Recipes</p>
        </Tab>
      </Tabs>
      <Holder>
        <SwitcherHolder>
          <p className="text">Ingredients in Fridge:</p>
        </SwitcherHolder>
      </Holder>
    </Wrapper>
  )
}

export default recipeHolder