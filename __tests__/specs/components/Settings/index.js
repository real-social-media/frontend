import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import SettingsComponent from 'components/Settings'
import { testNavigate } from 'tests/utils/helpers'

jest.mock('components/ActionSheet', () => jest.fn().mockReturnValue(null))
jest.mock('components/Alert', () => ({  confirm: jest.fn() }))
jest.mock('templates/Avatar', () => () => null)
jest.mock('templates/SettingsAvatar', () => () => null)

const navigation = { navigate: jest.fn() }
const setup = (props) => renderWithProviders(<SettingsComponent navigation={navigation} {...props} />)

describe('Settings component', () => {
  afterEach(() => {
    navigation.navigate.mockClear()
  })

  it('Edit Profile', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Edit Profile'))

    testNavigate(navigation, 'App.Root.Home.Profile.ProfileEdit')
  })

  it('Change Profile Picture', () => {
    const openUploadAvatarMenu = jest.fn()
    const { getByText } = setup({ openUploadAvatarMenu })

    fireEvent.press(getByText('Change Profile Picture'))

    expect(openUploadAvatarMenu).toHaveBeenCalled()
  })

  it('Choose Theme', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Choose Theme'))

    testNavigate(navigation, 'App.Root.Home.Profile.Theme')
  })

  it('Archived Photos', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Archived Photos'))

    testNavigate(navigation, 'App.Root.Home.Profile.Archived')
  })

  it('Mental Health & Privacy Settings', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Mental Health & Privacy Settings'))

    testNavigate(navigation, 'App.Root.Home.Profile.Privacy')
  })

  it('Follow & Invite Friends', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Follow & Invite Friends'))

    testNavigate(navigation, 'App.Root.Home.Profile.InviteFriends')
  })

  it('Signout', () => {
    const authSignoutRequest = jest.fn()
    const { getByText } = setup({ authSignoutRequest })

    fireEvent.press(getByText('Signout'))

    expect(authSignoutRequest).toHaveBeenCalled()
  })
})
