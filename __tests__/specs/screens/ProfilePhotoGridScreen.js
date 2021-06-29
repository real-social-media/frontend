import React from 'react'
import ProfilePhotoGridScreen from 'screens/ProfilePhotoGridScreen'
import { renderWithStore, fireEvent, act } from 'tests/utils'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersActions from 'store/ducks/users/actions'
import * as ReactRedux from 'react-redux'

const user = {
  userId: 'id123',
  gender: 'FEMALE',
  fullName: 'fullName',
  dateOfBirth: '1990-04-21',
  height: 170,
  bio: 'bio',
}

const setup = () => renderWithStore(<ProfilePhotoGridScreen />)

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  useIsFocused: jest.fn().mockReturnValue(true),
}))

const navigation = { navigate: jest.fn(), setOptions: jest.fn(), goBack: jest.fn() }
useNavigation.mockReturnValue(navigation)

jest.spyOn(authSelector, 'authUser').mockReturnValue(user)

describe('ProfilePhotoGridScreen', () => {
  afterEach(() => {
    navigation.navigate.mockClear()
    navigation.goBack.mockClear()
  })

  it('request verified posts onmount', () => {
    const dispatch = jest.fn()
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch)

    setup()

    expect(dispatch).toHaveBeenCalledWith({
      type: 'USERS_IMAGE_POSTS_GET_REQUEST',
      payload: { isVerified: true, userId: user.userId },
    })

    ReactRedux.useDispatch.mockRestore()
  })

  it('Verification posts message', () => {
    const { getByText } = setup()

    expect(getByText('Only Authenticated Posts Can Be Set as a Profile Picture')).toBeTruthy()

    fireEvent.press(getByText('Trending Tips'))
    expect(navigation.navigate).toHaveBeenCalledWith('Verification', { actionType: 'BACK' })
  })

  describe('Success state', () => {
    beforeAll(() => {
      jest.spyOn(usersActions, 'usersChangeAvatarIdle')
    })

    afterAll(() => {
      usersActions.usersChangeAvatarIdle.mockRestore()
    })

    it('goBack on success', async () => {
      const { store } = setup()

      await act(async () => {
        store.dispatch(usersActions.usersChangeAvatarSuccess())
      })

      expect(navigation.goBack).toHaveBeenCalled()
      expect(usersActions.usersChangeAvatarIdle).toHaveBeenCalled()
    })

    it('redirect on back route', async () => {
      const backRoute = 'backRoute'
      useRoute.mockReturnValue({ params: { backRoute } })
      const { store } = setup()

      await act(async () => {
        store.dispatch(usersActions.usersChangeAvatarSuccess())
      })

      expect(navigation.navigate).toHaveBeenCalledWith(backRoute)
      expect(usersActions.usersChangeAvatarIdle).toHaveBeenCalled()
      useRoute.mockReset()
    })
  })
})
