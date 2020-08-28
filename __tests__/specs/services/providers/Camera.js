import * as RN from 'react-native'
import { renderHook } from '@testing-library/react-hooks'
import useCamera from 'services/providers/Camera'

const handleProcessedPhoto = jest.fn()

const setup = () => renderHook(() => useCamera({ handleProcessedPhoto }))

describe('Camera provider', () => {
  it('automatically close keyboard after crop', () => {
    const dismiss = jest.spyOn(RN.Keyboard, 'dismiss')
    const addListener = jest.spyOn(RN.Keyboard, 'addListener')
    const listener = { remove: jest.fn() }

    addListener.mockReturnValueOnce(listener)

    const { unmount } = setup()

    expect(addListener).toHaveBeenCalled()

    const calledWith = addListener.mock.calls[0]
    const eventName = calledWith[0]
    const closeKeyboard = calledWith[1]

    expect(eventName).toBe('keyboardWillShow')
    expect(closeKeyboard).toBeTruthy()

    closeKeyboard()
    expect(dismiss).toHaveBeenCalled()

    unmount()
    expect(listener.remove).toHaveBeenCalled()
  })
})
