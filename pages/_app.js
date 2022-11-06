import '../styles/globals.css'

import NextApp from 'next/app'
import React from 'react'
import { createTheme } from '@mui/material'
import { ThemeProvider } from 'styled-components'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F7C244',
      darker: '#D79700'
    },
    secondary: {
      main: '#FFEBBD',
      darker: '#EAD7AA'
    }
  }
})

export default class App extends NextApp {
  // remove it here
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles)
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
