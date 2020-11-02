import React from 'react'
import { Alert } from 'react-native'
import { renderWithProviders, fireEvent, within } from 'tests/utils'
import Avatar from 'templates/Avatar'
import InviteFriendsComponent from 'components/InviteFriends'
import testIDs from 'components/InviteFriends/test-ids'

jest.spyOn(Alert, 'alert')
jest.mock('templates/Avatar', () => jest.fn().mockReturnValue(null))

const emails = ['text0@email.com', 'text1@email.com', 'text2@email.com']
const phones = ['+199999999', '+299999999', '+399999999']

const items = [
  { contactId: '1', fullName: 'fullName1', thumbnailPath: 'thumbnailPath' },
  { contactId: '2', fullName: 'fullName2', thumbnailPath: 'thumbnailPath' },
  { contactId: '3', fullName: 'fullName3', thumbnailPath: 'thumbnailPath' },
  { contactId: '4', fullName: 'fullName4', thumbnailPath: 'thumbnailPath' },
].map((item) => ({ ...item, emails, phones }))

const contactsInvite = { invited: { 1: true, 3: true } }

const contactsGetRequest = jest.fn()
const requiredProps = {
  contactsGetRequest,
  contactsGet: { status: 'idle', error: '', items: [] },
  contactsInvite: { invited: {} },
}

const setup = (props) => renderWithProviders(<InviteFriendsComponent {...requiredProps} {...props} />)

describe('Invite Friends Component', () => {
  afterEach(() => {
    contactsGetRequest.mockClear()
    Alert.alert.mockClear()
    Avatar.mockClear()
  })

  describe('header', () => {
    it('by default', () => {
      const { getByText } = setup()

      getByText('Earn Free REAL Diamond')
      getByText('Follow or Invite 10 friends & get REAL Diamond FREE for 2 months!')
    })

    it('less than 10', () => {
      const { getByText } = setup({ contactsInvite })

      getByText('Earn Free REAL Diamond')
      getByText('Follow or Invite 8 friends & get REAL Diamond FREE for 2 months!')
    })

    it('equal or more than 10', () => {
      const { getByText } = setup({
        contactsInvite: {
          invited: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
          },
        },
      })

      getByText('Connect Your Contacts')
      getByText('Find people you know on REAL and choose who to follow or invite')
    })
  })

  it('idle state', () => {
    const { queryByText } = setup()

    expect(queryByText('Open Settings')).toBeFalsy()

    fireEvent.press(queryByText('Check Contacts'))
    expect(contactsGetRequest).toHaveBeenCalled()
  })

  it('error state', () => {
    const error = 'Error'
    const contactsGet = { status: 'failure', error, items: [] }
    const openSettings = jest.fn()
    const { queryByText } = setup({ contactsGet, openSettings })

    expect(queryByText(error)).toBeTruthy()
    expect(queryByText('Check Contacts')).toBeFalsy()
    fireEvent.press(queryByText('Open Settings'))
    expect(openSettings).toHaveBeenCalled()
  })

  it('loading state', () => {
    const contactsGet = { status: 'loading', error: '', items: [] }
    const { queryByText } = setup({ contactsGet })

    expect(queryByText('Check Contacts')).toBeDisabled()
    expect(queryByText('Open Settings')).toBeFalsy()
  })

  it('empty state', () => {
    const contactsGet = { status: 'success', error: '', items: [] }
    const { queryByText } = setup({ contactsGet })

    expect(queryByText('Open Settings')).toBeFalsy()
    expect(queryByText('Check Contacts"')).toBeFalsy()
    expect(queryByText('We couldn\'t find any contacts on your device. Pull down to refresh.')).toBeTruthy()
  })

  describe('success state', () => {
    it('render rows', () => {
      const contactsGet = { status: 'success', error: '', items }
      const { queryByText, queryAllByTestId } = setup({ contactsGet })

      expect(queryByText('Open Settings')).toBeFalsy()
      expect(queryByText('Check Contacts"')).toBeFalsy()
      expect(queryByText('We couldn\'t find any contacts on your device. Pull down to refresh.')).toBeFalsy()

      const $rows = queryAllByTestId(testIDs.row)

      $rows.forEach(($row, index) => {
        const item = items[index]
        const $title = within($row).queryByText(item.fullName)

        expect($title).toBeTruthy()
        expect($title.props.numberOfLines).toBe(1)
        expect($title.props.ellipsizeMode).toBe('tail')
      })

      expect(Avatar).toHaveBeenCalledTimes(items.length)
      expect($rows).toHaveLength(items.length)
    })

    describe('Invite a contact', () => {
      it('invite callback', () => {
        const contactsInviteRequest = jest.fn()
        const contactsGet = { status: 'success', error: '', items }
        const { queryAllByTestId } = setup({ contactsGet, contactsInviteRequest })
        const $rows = queryAllByTestId(testIDs.row)

        contactsInviteRequest.mockClear()
        fireEvent.press(within($rows[0]).getByText('Invite'))

        expect(Alert.alert).toHaveBeenCalled()
        const [title, message, buttons, options] = Alert.alert.mock.calls[0]
        expect(title).toBe('Invite fullName1')
        expect(message).toBe('Сhoose a contact')
        expect(options).toEqual({ cancelable: true })

        expect(buttons.map((item) => item.text)).toEqual([
          'text0@email.com',
          'text1@email.com',
          'text2@email.com',
          '+199999999',
          '+299999999',
          '+399999999',
          'Cancel',
        ])

        buttons.forEach((btn) => {
          if (btn.text === 'Cancel') return

          contactsInviteRequest.mockClear()
          btn.onPress()
          expect(contactsInviteRequest).toHaveBeenCalled()
        })

        contactsInviteRequest.mockClear()
        buttons[0].onPress()
        expect(contactsInviteRequest).toHaveBeenCalledWith({
          contact: {
            type: 'email',
            value: 'text0@email.com',
          },
          user: items[0],
        })
      })

      it('direct callback when only one contact number', () => {
        const contactsInviteRequest = jest.fn()
        const user = {
          ...items[0],
          emails: ['test@email.com'],
          phones: [],
        }
        const contactsGet = { status: 'success', error: '', items: [user] }
        const { getByText } = setup({ contactsGet, contactsInviteRequest })

        contactsInviteRequest.mockClear()
        fireEvent.press(getByText('Invite'))

        expect(Alert.alert).not.toHaveBeenCalled()
        expect(contactsInviteRequest).toHaveBeenCalledWith({
          contact: {
            type: 'email',
            value: 'test@email.com',
          },
          user,
        })
      })

      it('invited items', () => {
        const contactsGet = { status: 'success', error: '', items }
        const { queryAllByTestId } = setup({ contactsGet, contactsInvite })
        const $rows = queryAllByTestId(testIDs.row)

        expect(within($rows[0]).getByText('Invited')).toBeTruthy()
        expect(within($rows[1]).getByText('Invite')).toBeTruthy()
        expect(within($rows[2]).getByText('Invited')).toBeTruthy()
        expect(within($rows[3]).getByText('Invite')).toBeTruthy()
      })
    })

    describe('Follow an existed user', () => {
      it('render rows', () => {
        const contactsGet = {
          status: 'success',
          error: '',
          items: [
            {
              contactId: '1',
              fullName: 'fullName1',
              user: { userId: '1', username: 'username1', photo: { url64p: 'url64p' }, followedStatus: 'FOLLOWING' },
            },
            {
              contactId: '2',
              fullName: 'fullName2',
              user: { userId: '2', username: 'username2', photo: { url64p: '' }, followedStatus: 'NOT_FOLLOWING' },
            },
            {
              contactId: '3',
              fullName: 'fullName3',
              user: { userId: '3', username: 'username3', photo: { url64p: '' }, followedStatus: 'NOT_FOLLOWING' },
            },
          ],
        }

        const contactsInvite = {
          invited: { 1: true, 3: true },
          requested: { 3: true },
        }
        const navigation = { push: jest.fn() }

        const { queryAllByTestId } = setup({ contactsGet, contactsInvite, navigation })

        const $rows = queryAllByTestId(testIDs.row)
        expect($rows).toHaveLength(3)

        // Followed row
        expect(within($rows[0]).getByText(contactsGet.items[0].fullName)).toBeTruthy()
        expect(within($rows[0]).getByText(contactsGet.items[0].user.username)).toBeTruthy()
        expect(within($rows[0]).getByText('Followed')).toBeTruthy()

        // Follow
        expect(within($rows[1]).getByText('Follow')).toBeTruthy()
        const $fullName = within($rows[1]).getByText(contactsGet.items[1].fullName)
        const $username = within($rows[1]).getByText(contactsGet.items[1].user.username)

        expect($fullName).toBeTruthy()
        expect($username).toBeTruthy()
        fireEvent.press($username)
        expect(navigation.push).toHaveBeenCalledWith('Profile', { userId: '2' })

        // Invited
        expect(within($rows[2]).getByText('Invited')).toBeTruthy()
      })
    })
  })
})
