import styled from 'styled-components'

import { Box, Button } from '@mui/material'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #c2e4ef;
`

export const Tabs = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 10px;
`

export const Tab = styled(Button)`
  display: flex;
  justify-content: center;
  text-transform: none;
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

export const MainBox = styled(Box)`
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f7c244;
  width: 100%;
  height: auto;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
  border-radius: 0px 15px 15px 15px;
  padding-top: 1.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 2rem;
  gap: 2rem;
`

export const TwoButtonHolder = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0 0 11rem;
`

export const NormalButton = styled(Button)(
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

export const RoundButton = styled(Button)(
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
