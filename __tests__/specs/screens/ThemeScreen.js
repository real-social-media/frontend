import React from 'react'
import ThemeScreen from 'screens/ThemeScreen'
import { renderWithStore, act, fireEvent } from 'tests/utils'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as themesActions from 'store/ducks/themes/actions'
import themesJson from 'assets/themes.json'

const user = {
  userId: 'id123',
  gender: 'FEMALE',
  fullName: 'fullName',
  dateOfBirth: '1990-04-21',
  height: 170,
  bio: 'bio',
}

jest.spyOn(authSelector, 'authUser').mockReturnValue(user)
jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn(), useFocusEffect: jest.fn() }))
jest.mock('screens/FeedScreen', () => jest.fn().mockReturnValue(null))

const navigation = { navigate: jest.fn() }
useNavigation.mockReturnValue(navigation)

const setup = () => renderWithStore(<ThemeScreen />)

describe('ThemeScreen', () => {
  it('themes buttons', () => {
    const { getByText, queryAllByText } = setup()

    themesJson.forEach(({ label }) => {
      expect(getByText(label)).toBeTruthy()
    })

    expect(themesJson).toHaveLength(7)
    expect(queryAllByText('Enable')).toHaveLength(7)
  })

  it('theme modal hidden by default', () => {
    const { queryByAccessibilityLabel } = setup()

    expect(queryByAccessibilityLabel('Theme Modal')).toBeFalsy()
  })

  it('toggle theme modal', async () => {
    const { queryByAccessibilityLabel, queryAllByAccessibilityLabel } = setup()

    expect(queryByAccessibilityLabel('Theme Modal')).toBeFalsy()

    await act(async () => fireEvent.press(queryAllByAccessibilityLabel('Enable Theme')[0]))
    expect(queryByAccessibilityLabel('Theme Modal')).toBeTruthy()

    await act(async () => fireEvent.press(queryAllByAccessibilityLabel('Discard Theme')[0]))
    expect(queryByAccessibilityLabel('Theme Modal')).toBeFalsy()
  })

  it('enable theme', async () => {
    jest.spyOn(themesActions, 'themesEditRequest')
    const theme = themesJson[0]
    const { queryAllByAccessibilityLabel } = setup()
    await act(async () => fireEvent.press(queryAllByAccessibilityLabel('Enable Theme')[0]))
    await act(async () => fireEvent.press(queryAllByAccessibilityLabel('Apply Theme')[0]))

    expect(themesActions.themesEditRequest).toHaveBeenCalledWith({ themeCode: theme.key })
    themesActions.themesEditRequest.mockRestore()
  })
})
