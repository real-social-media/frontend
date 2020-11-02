import React from 'react'
import PropTypes from 'prop-types'
import { StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import * as authSelector from 'store/ducks/auth/selectors'

export const ThemeContext = React.createContext({})

/**
 * 
 */
export const ThemeProvider = ({
  children,
}) => {
  const theme = useSelector(authSelector.themeSelector)
  
  return (
    <PaperProvider theme={theme}>
      <ThemeContext.Provider value={{ theme }}>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        {children}
      </ThemeContext.Provider>
    </PaperProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.any,
}
