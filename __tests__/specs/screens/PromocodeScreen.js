import React from 'react'
import PromocodeScreen from 'screens/PromocodeScreen'
import { renderWithStore, fireEvent, act } from 'tests/utils'
import * as actions from 'store/ducks/promocodes/actions'
import { testField, testNavigate } from 'tests/utils/helpers'
import * as Validation from 'services/Validation'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'

const code = '12345678'
const user = { subscriptionLevel: undefined }
const navigation = { navigate: jest.fn() }

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn(), useRoute: jest.fn() }))
useNavigation.mockReturnValue(navigation)

jest.spyOn(authSelector, 'authUser').mockReturnValue(user)

const setup = () => renderWithStore(<PromocodeScreen />)

describe('PromocodeScreen', () => {
  it('header', () => {
    const { getByText } = setup()

    expect(getByText('Promocodes')).toBeTruthy()
    expect(getByText('Redeem promocode to get \n REAL Diamond FREE for life!')).toBeTruthy()

    fireEvent.press(getByText('REAL Diamond'))
    testNavigate(navigation, 'Membership')
  })

  it('footer', () => {
    const { getByText } = setup()

    fireEvent.press(getByText('Follow & Invite Friends'))
    testNavigate(navigation, 'InviteFriends')
  })

  it('form', () => {
    const { getByLabelText, getByText } = setup()

    testField(getByLabelText('promocode'), {
      name: 'code',
      value: '',
      ...Validation.getInputTypeProps('promocode'),
    })

    expect(getByText('Redeem')).toBeEnabled()
  })

  it('submit form with valid values', async () => {
    const promoCodesRedeemRequest = jest.spyOn(actions, 'promoCodesRedeemRequest')
    const { getByText, getByLabelText } = setup()

    await act(async () => fireEvent.changeText(getByLabelText('promocode'), code))
    await act(async () => fireEvent.press(getByText('Redeem')))
    expect(promoCodesRedeemRequest).toHaveBeenCalledWith({ code })

    promoCodesRedeemRequest.mockRestore()
  })

  it('loading state', async () => {
    const { store, getByText } = setup()

    await act(async () => {
      store.dispatch(actions.promoCodesRedeemRequest({ code }))
    })

    expect(getByText('Redeem')).toBeDisabled()
  })

  it('diamond user', () => {
    authSelector.authUser.mockReturnValue({ subscriptionLevel: 'DIAMOND' })
    const { getByText, queryByText } = setup()

    expect(getByText('Promocodes')).toBeTruthy()
    expect(getByText('Redeem your promocode')).toBeTruthy()
    expect(queryByText('Follow & Invite Friends')).toBeFalsy()
    expect(queryByText('Redeem promocode to get \n REAL Diamond FREE for life!')).toBeFalsy()
    authSelector.authUser.mockReturnValue({ subscriptionLevel: undefined })
  })
})
