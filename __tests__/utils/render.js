import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react-native'
import { ThemesContext } from 'navigation/context'
import { Provider as PaperProvider } from 'react-native-paper'
import theme from 'tests/mocks/theme.mock'

const AllTheProviders = ({ children }) => {
  return (
    <ThemesContext.Provider value={{ theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemesContext.Provider>
  )
}

AllTheProviders.propTypes = {
  children: PropTypes.element.isRequired,
}

export const renderWithProviders = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })
