import React from 'react'
import { renderWithProviders, fireEvent } from 'tests/utils'
import SettingsComponent from 'components/Settings'
import { testNavigate } from 'tests/utils/helpers'

jest.mock('components/ActionSheet', () => jest.fn().mockReturnValue(null))
jest.mock('components/Alert', () => ({ confirm: jest.fn() }))
jest.mock('templates/Avatar', () => () => null)
jest.mock('templates/SettingsAvatar', () => () => null)

const usersDelete = { status: 'idle' }
const navigation = { navigate: jest.fn() }
const requiredProps = { usersDelete, navigation }

const setup = (props) => renderWithProviders(<SettingsComponent {...requiredProps} {...props} />)

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

  it('Dating', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Dating'))

    testNavigate(navigation, 'DatingSettings')
  })

  it('Follow & Invite Friends', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Follow & Invite Friends'))

    testNavigate(navigation, 'InviteFriends')
  })

  it('Enter Promo Code', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Enter Promo Code'))

    testNavigate(navigation, 'Promocodes')
  })

  it('Join Diamond', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Join Diamond'))

    testNavigate(navigation, 'Membership')
  })

  it('Manage Diamond', () => {
    const user = { subscriptionLevel: 'DIAMOND' }
    const { getByText } = setup({ user })

    fireEvent.press(getByText('Manage Diamond'))

    testNavigate(navigation, 'Membership')
  })

  it('Change Password', () => {
    const authForgotRequest = jest.fn()
    const { getByText } = setup({ authForgotRequest })

    fireEvent.press(getByText('Change Password'))

    expect(authForgotRequest).toHaveBeenCalled()
  })

  it('Signout', () => {
    const authSignoutRequest = jest.fn()
    const { getByText } = setup({ authSignoutRequest })

    fireEvent.press(getByText('Signout'))

    expect(authSignoutRequest).toHaveBeenCalled()
  })
})
