import React from 'react'
import {renderWithProviders} from 'utils/tests'
import FormAlbums from './FormAlbums'
import testIDs from './test-ids'

jest.mock('@react-navigation/native', () => ({useNavigation: jest.fn()}))

const albums = [
  {
    createdAt: '2020-06-25T08:39:16.916487Z',
    albumId: '1',
    name: 'Name 1',
  },
  {
    createdAt: '2020-07-25T08:39:16.916487Z',
    albumId: '2',
    name: 'Name 2',
  },
  {
    createdAt: '2020-08-25T08:39:16.916487Z',
    albumId: '3',
    name: 'Name 3',
  },
]

const setup = (props) => renderWithProviders(<FormAlbums setFieldValue={jest.fn()} {...props} />)

describe('FormAlbums', () => {
  it('should represents only New Album button when albums list empty', () => {
    const {getByTestId, queryAllByTestId} = setup()

    expect(getByTestId(testIDs.albums.newAlbumBtn)).toBeTruthy()
    expect(queryAllByTestId(testIDs.albums.item)).toHaveLength(0)
  })

  it('should represent albums list', () => {
    const {getByTestId, queryAllByTestId} = setup({albumsGet: {data: albums}})

    const albumsEls = queryAllByTestId(testIDs.albums.item)

    expect(getByTestId(testIDs.albums.newAlbumBtn)).toBeTruthy()
    expect(albumsEls).toHaveLength(albums.length)

    albums.forEach((item, index) => {
      expect(albumsEls[index]).toHaveTextContent(item.name)
    })
  })
})
