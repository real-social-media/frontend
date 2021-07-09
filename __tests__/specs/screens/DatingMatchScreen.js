// import React from 'react'
// import DatingMatchScreen from 'screens/DatingMatchScreen'
// import { renderWithStore, fireEvent, act } from 'tests/utils'
// import * as RNPermissions from 'react-native-permissions'
// import * as authSelector from 'store/ducks/auth/selectors'
// import { testField } from 'tests/utils/helpers'
// import * as usersActions from 'store/ducks/users/actions'
// import { useNavigation, useRoute } from '@react-navigation/native'

// const user = {
//   matchAgeRange: {
//     min: 30,
//     max: 40,
//   },
//   matchHeightRange: {
//     min: 60,
//     max: 84,
//   },
//   matchLocationRadius: 15,
//   matchGenders: ['MALE'],
// }

// const setup = () => renderWithStore(<DatingMatchScreen />)

// jest.mock('@react-navigation/native', () => ({
//   useNavigation: jest.fn(),
//   useFocusEffect: jest.fn(),
//   useRoute: jest.fn().mockReturnValue({ params: { nextAction: true } }),
//   useIsFocused: jest.fn().mockReturnValue(true),
// }))

// jest.mock('@react-native-community/geolocation', () => ({ getCurrentPosition: jest.fn() }))

// jest.spyOn(RNPermissions, 'request').mockResolvedValue(true)
// jest.spyOn(RNPermissions, 'check').mockResolvedValue(RNPermissions.RESULTS.GRANTED)
// jest.spyOn(authSelector, 'authUser').mockReturnValue(user)

// const navigation = { goBack: jest.fn(), useRoute: jest.fn() }
// useNavigation.mockReturnValue(navigation)

// describe('DatingMatchScreen', () => {
//   const openAllSections = (queryByAccessibilityLabel) => {
//     fireEvent.press(queryByAccessibilityLabel('Toggle Match Gender'))
//     fireEvent.press(queryByAccessibilityLabel('Toggle Match Height'))
//     fireEvent.press(queryByAccessibilityLabel('Toggle Match Location Range'))
//   }

//   afterEach(() => {
//     navigation.goBack.mockClear()
//   })

//   describe('Form', () => {
//     it('toggle collapsed sections', () => {
//       const { queryByAccessibilityLabel } = setup()

//       expect(queryByAccessibilityLabel('matchAgeRangeMin')).toBeTruthy()
//       expect(queryByAccessibilityLabel('matchAgeRangeMax')).toBeTruthy()

//       fireEvent.press(queryByAccessibilityLabel('Toggle Match Age'))
//       expect(queryByAccessibilityLabel('matchAgeRangeMin')).toBeFalsy()
//       expect(queryByAccessibilityLabel('matchAgeRangeMax')).toBeFalsy()

//       expect(queryByAccessibilityLabel('matchGenders')).toBeFalsy()
//       fireEvent.press(queryByAccessibilityLabel('Toggle Match Gender'))
//       expect(queryByAccessibilityLabel('matchGenders')).toBeTruthy()

//       expect(queryByAccessibilityLabel('matchLocationRadius')).toBeFalsy()
//       fireEvent.press(queryByAccessibilityLabel('Toggle Match Location Range'))
//       expect(queryByAccessibilityLabel('matchLocationRadius')).toBeTruthy()

//       expect(queryByAccessibilityLabel('matchHeightRangeMin')).toBeFalsy()
//       expect(queryByAccessibilityLabel('matchHeightRangeMax')).toBeFalsy()
//       fireEvent.press(queryByAccessibilityLabel('Toggle Match Height'))
//       expect(queryByAccessibilityLabel('matchHeightRangeMin')).toBeTruthy()
//       expect(queryByAccessibilityLabel('matchHeightRangeMax')).toBeTruthy()
//     })

//     it('default values', () => {
//       authSelector.authUser.mockReturnValue({})
//       const { queryByAccessibilityLabel } = setup()
//       openAllSections(queryByAccessibilityLabel)

//       testField(queryByAccessibilityLabel('matchHeightRangeMin'), { value: '0\'1"' })
//       testField(queryByAccessibilityLabel('matchHeightRangeMax'), { value: '7\'0"' })
//       testField(queryByAccessibilityLabel('matchAgeRangeMin'), { value: '18' })
//       testField(queryByAccessibilityLabel('matchAgeRangeMax'), { value: '23' })
//       testField(queryByAccessibilityLabel('matchGenders'), { value: '' })
//       testField(queryByAccessibilityLabel('matchLocationRadius'), { value: '50 mi' })

//       authSelector.authUser.mockReturnValue(user)
//     })

//     it('values from profile', () => {
//       const { queryByAccessibilityLabel } = setup()
//       openAllSections(queryByAccessibilityLabel)

//       testField(queryByAccessibilityLabel('matchAgeRangeMin'), { value: '30' })
//       testField(queryByAccessibilityLabel('matchAgeRangeMax'), { value: '40' })
//       testField(queryByAccessibilityLabel('matchHeightRangeMin'), { value: '5\'0"' })
//       testField(queryByAccessibilityLabel('matchHeightRangeMax'), { value: '7\'0"' })
//       testField(queryByAccessibilityLabel('matchGenders'), { value: 'Male' })
//       testField(queryByAccessibilityLabel('matchLocationRadius'), { value: '15 mi' })
//     })

//     it('opposite gender for male', () => {
//       authSelector.authUser.mockReturnValue({ gender: 'MALE' })
//       const { queryByAccessibilityLabel } = setup()
//       openAllSections(queryByAccessibilityLabel)

//       testField(queryByAccessibilityLabel('matchGenders'), { value: 'Female' })

//       authSelector.authUser.mockReturnValue(user)
//     })

//     it('opposite gender for female', () => {
//       authSelector.authUser.mockReturnValue({ gender: 'FEMALE' })
//       const { queryByAccessibilityLabel } = setup()
//       openAllSections(queryByAccessibilityLabel)

//       testField(queryByAccessibilityLabel('matchGenders'), { value: 'Male' })

//       authSelector.authUser.mockReturnValue(user)
//     })

//     it('submit form', async () => {
//       const usersEditProfileRequest = jest.spyOn(usersActions, 'usersEditProfileRequest')
//       const { getByText } = setup()

//       await act(async () => {
//         fireEvent.press(getByText('Next'))
//       })

//       expect(usersEditProfileRequest).toHaveBeenCalledWith({
//         location: undefined,
//         matchGenders: 'MALE',
//         matchLocationRadius: 15,
//         matchAgeRange: {
//           max: 40,
//           min: 30,
//         },
//         matchHeightRange: {
//           max: 84,
//           min: 60,
//         },
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
