import React from 'react'
import { render, fireEvent } from 'tests/utils'
import { Linking, Text } from 'react-native'
import linkifyText from 'services/helpers/linkifyText'

/**
 * Mock Functions
 */
const navigation = { push: jest.fn() }

jest.spyOn(Linking, 'openURL')

describe('linkifyText', () => {
  afterEach(() => {
    Linking.openURL.mockClear()
    navigation.push.mockClear()
  })

  it('render plain text', () => {
    const text = 'Just text without links'
    const { getByText } = render(<Text>{linkifyText({ text, navigation })}</Text>)

    expect(getByText(text)).toBeTruthy()
  })

  it('render text with links', () => {
    const httpLink = 'http://link.com'
    const httpsLink = 'https://link.com'
    const text = `Text with ${httpLink} and ${httpsLink}`
    const { getByText } = render(<Text>{linkifyText({ text, navigation })}</Text>)

    fireEvent.press(getByText(httpLink))
    expect(Linking.openURL).toHaveBeenCalledWith(httpLink)
    Linking.openURL.mockClear()

    fireEvent.press(getByText(httpsLink))
    expect(Linking.openURL).toHaveBeenCalledWith(httpsLink)
  })

  it('render mentions links', () => {
    const user1 = '@user1'
    const user2 = '@user2'
    const user3 = '@user3'
    const text = `Text with ${user1} and ${user2} and ${user3}`
    const textTaggedUsers = [
      { tag: user1, user: { userId: '1' } },
      { tag: user2, user: { userId: '2' } },
    ]
    const { getByText } = render(<Text>{linkifyText({ text, navigation, textTaggedUsers })}</Text>)

    fireEvent.press(getByText(user1))
    expect(navigation.push).toHaveBeenCalledWith('Profile', { userId: '1' })
    navigation.push.mockClear()

    fireEvent.press(getByText(user2))
    expect(navigation.push).toHaveBeenCalledWith('Profile', { userId: '2' })
  })
})
