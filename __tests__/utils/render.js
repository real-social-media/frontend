import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react-native'
import { ThemeContext } from 'services/providers/Theme'
import { Provider as PaperProvider } from 'react-native-paper'
import theme from 'tests/mocks/theme.mock'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}

AllTheProviders.propTypes = {
  children: PropTypes.element.isRequired,
}

export const renderWithProviders = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })
