import React from 'react'
import { omit, prop } from 'ramda'
import { render } from 'tests/utils'
import ActionSheet from 'components/ActionSheet'
import RNActionSheet from 'react-native-actionsheet'

jest.mock('react-native-actionsheet', () => jest.fn().mockReturnValue(null))

const options = [
  { name: 'Action 1', onPress: jest.fn() },
  { name: 'Action 2', onPress: jest.fn() },
]

const optionsWithActions = [
  ...options,
  { name: 'Action 3', onPress: jest.fn(), isCancel: true },
  { name: 'Action 4', onPress: jest.fn(), isDestructive: true },
]

const getProps = (mockFn) => omit(['onPress'], mockFn.mock.calls[0][0])

const setup = (props) => render(<ActionSheet {...props} />)

describe('ActionSheet component', () => {
  afterEach(() => {
    RNActionSheet.mockClear()
  })

  it('testID', () => {
    const testID = 'testID'
    setup({ testID })

    expect(RNActionSheet).toHaveBeenCalled()
    expect(RNActionSheet.mock.calls[0][0].testID).toBe(testID)
  })

  it('default options', () => {
    setup()

    expect(RNActionSheet).toHaveBeenCalled()
    expect(getProps(RNActionSheet)).toEqual({
      cancelButtonIndex: undefined,
      destructiveButtonIndex: undefined,
      options: [],
    })
  })

  it('all options visible by default', () => {
    setup({ options })

    expect(getProps(RNActionSheet)).toEqual({
      cancelButtonIndex: undefined,
      destructiveButtonIndex: undefined,
      options: options.map(prop('name')),
    })
  })

  it('destructive and cancel actions', () => {
    setup({ options: optionsWithActions })

    expect(getProps(RNActionSheet)).toEqual({
      cancelButtonIndex: 2,
      destructiveButtonIndex: 3,
      options: optionsWithActions.map(prop('name')),
    })
  })

  it('each actions should have callback on press', () => {
    setup({ options })

    const { onPress } = RNActionSheet.mock.calls[0][0]

    options.forEach((item, index) => {
      onPress(index)

      expect(item.onPress).toHaveBeenCalled()
    })
  })

  it('all options are hidden', () => {
    setup({ options: optionsWithActions.map((item) => ({ ...item, isVisible: false })) })

    expect(getProps(RNActionSheet)).toEqual({
      cancelButtonIndex: undefined,
      destructiveButtonIndex: undefined,
      options: [],
    })
  })

  it('all options are hidden when isVisible falsy', () => {
    setup({ options: optionsWithActions.map((item) => ({ ...item, isVisible: undefined })) })

    expect(getProps(RNActionSheet)).toEqual({
      cancelButtonIndex: undefined,
      destructiveButtonIndex: undefined,
      options: [],
    })
  })
})
