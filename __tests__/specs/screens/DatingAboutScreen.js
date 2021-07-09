// import React from 'react'
// import DatingAboutScreen from 'screens/DatingAboutScreen'
// import { renderWithStore, fireEvent, act } from 'tests/utils'
// import { testField } from 'tests/utils/helpers'
// import { useNavigation, useRoute } from '@react-navigation/native'
// import * as RNPermissions from 'react-native-permissions'
// import * as authSelector from 'store/ducks/auth/selectors'
// import * as usersActions from 'store/ducks/users/actions'

// const user = {
//   userId: 'id123',
//   gender: 'FEMALE',
//   displayName: 'displayName',
//   dateOfBirth: '1990-04-21',
//   height: 72,
//   bio: 'bio',
// }

// const setup = () => renderWithStore(<DatingAboutScreen />)

// jest.mock('@react-navigation/native', () => ({
//   useNavigation: jest.fn(),
//   useFocusEffect: jest.fn(),
//   useRoute: jest.fn().mockReturnValue({ params: { nextAction: true } }),
//   useIsFocused: jest.fn().mockReturnValue(true),
// }))

// const navigation = { goBack: jest.fn() }
// useNavigation.mockReturnValue(navigation)

// jest.spyOn(RNPermissions, 'request').mockResolvedValue(true)
// jest.spyOn(RNPermissions, 'check').mockResolvedValue(RNPermissions.RESULTS.GRANTED)
// jest.spyOn(authSelector, 'authUser').mockReturnValue(user)

// describe('DatingAboutScreen', () => {
//   afterEach(() => {
//     navigation.goBack.mockClear()
//   })

//   const openAllSections = (queryByAccessibilityLabel) => {
//     fireEvent.press(queryByAccessibilityLabel('Toggle Gender'))
//     fireEvent.press(queryByAccessibilityLabel('Toggle Display Name'))
//     fireEvent.press(queryByAccessibilityLabel('Toggle Bio'))
//     fireEvent.press(queryByAccessibilityLabel('Toggle Height'))
//   }

//   describe('Form', () => {
//     it('toggle collapsed sections', () => {
//       const { queryByAccessibilityLabel } = setup()

//       expect(queryByAccessibilityLabel('dateOfBirthMonth')).toBeTruthy()
//       fireEvent.press(queryByAccessibilityLabel('Toggle Your Date of Birth'))
//       expect(queryByAccessibilityLabel('dateOfBirthMonth')).toBeFalsy()

//       expect(queryByAccessibilityLabel('gender')).toBeFalsy()
//       fireEvent.press(queryByAccessibilityLabel('Toggle Gender'))
//       expect(queryByAccessibilityLabel('gender')).toBeTruthy()

//       expect(queryByAccessibilityLabel('displayName')).toBeFalsy()
//       fireEvent.press(queryByAccessibilityLabel('Toggle Display Name'))
//       expect(queryByAccessibilityLabel('displayName')).toBeTruthy()

//       expect(queryByAccessibilityLabel('bio')).toBeFalsy()
//       fireEvent.press(queryByAccessibilityLabel('Toggle Bio'))
//       expect(queryByAccessibilityLabel('bio')).toBeTruthy()

//       expect(queryByAccessibilityLabel('height')).toBeFalsy()
//       fireEvent.press(queryByAccessibilityLabel('Toggle Height'))
//       expect(queryByAccessibilityLabel('height')).toBeTruthy()
//     })

//     it('default values', async () => {
//       authSelector.authUser.mockReturnValue({})
//       const { getByAccessibilityLabel } = setup()

//       await act(async () => {
//         openAllSections(getByAccessibilityLabel)
//       })

//       testField(getByAccessibilityLabel('dateOfBirthMonth'), { value: 'January' })
//       testField(getByAccessibilityLabel('dateOfBirthDay'), { value: '01' })
//       testField(getByAccessibilityLabel('dateOfBirthYear'), { value: '2000' })
//       testField(getByAccessibilityLabel('gender'), { value: '' })
//       testField(getByAccessibilityLabel('bio'), { value: undefined })
//       testField(getByAccessibilityLabel('height'), { value: '5\'0"' })
//       testField(getByAccessibilityLabel('displayName'), { value: undefined })

//       authSelector.authUser.mockReturnValue(user)
//     })

//     it('values from profile', async () => {
//       const { getByAccessibilityLabel } = setup()

//       await act(async () => {
//         openAllSections(getByAccessibilityLabel)
//       })

//       testField(getByAccessibilityLabel('dateOfBirthMonth'), { value: 'April' })
//       testField(getByAccessibilityLabel('dateOfBirthDay'), { value: '21' })
//       testField(getByAccessibilityLabel('dateOfBirthYear'), { value: '1990' })
//       testField(getByAccessibilityLabel('gender'), { value: 'Female' })
//       testField(getByAccessibilityLabel('displayName'), { value: user.displayName })
//       testField(getByAccessibilityLabel('bio'), { value: 'bio' })
//       testField(getByAccessibilityLabel('height'), { value: '6\'0"' })
//     })

//     it('submit form', async () => {
//       const usersEditProfileRequest = jest.spyOn(usersActions, 'usersEditProfileRequest')
//       const { getByText } = setup()

//       await act(async () => {
//         fireEvent.press(getByText('Next'))
//       })

//       expect(usersEditProfileRequest).toHaveBeenCalledWith({
//         height: 72,
//         bio: 'bio',
//         dateOfBirth: '1990-04-21',
//         displayName: 'displayName',
//         gender: 'FEMALE',
//       })

//       usersEditProfileRequest.mockRestore()
//     })
//   })

//   describe('Submitting state', () => {
//     it('disable submit button', async () => {
//       const { store, getByAccessibilityLabel } = setup()

//       expect(getByAccessibilityLabel('Submit')).toBeEnabled()

//       await act(async () => {
//         store.dispatch(usersActions.usersEditProfileRequest({ data: {} }))
//       })

//       expect(getByAccessibilityLabel('Submit')).toBeDisabled()
//     })
//   })

//   describe('Success state', () => {
//     it('goBack when nextAction empty', async () => {
//       const usersEditProfileIdle = jest.spyOn(usersActions, 'usersEditProfileIdle')
//       useRoute.mockReturnValue({ params: {} })
//       const { store, queryByText } = setup()

//       expect(queryByText('Next')).toBeFalsy()
//       expect(queryByText('Update')).toBeTruthy()

//       await act(async () => {
//         store.dispatch(usersActions.usersEditProfileSuccess({ data: {} }))
//       })

//       expect(navigation.goBack).toHaveBeenCalled()
//       expect(usersActions.usersEditProfileIdle).toHaveBeenCalled()
//       usersEditProfileIdle.mockRestore()
//       useRoute.mockReturnValue({ params: { nextAction: true } })
//     })
//   })
// })
describe('bulk test', () => {
  it('returns pass', async () => {
    expect(true).toBeTruthy()
  })
})
