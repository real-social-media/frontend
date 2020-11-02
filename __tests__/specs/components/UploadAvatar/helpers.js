import { isAvatarEmpty } from 'components/UploadAvatar/helpers'

describe('Avatar helpers', () => {
  it('isAvatarEmpty', () => {
    const placeholder = 'https://d3dclx0mrf3ube.cloudfront.net/placeholder-photos/black-white-example/native.jpg'

    expect(isAvatarEmpty()).toBeFalsy()
    expect(isAvatarEmpty({})).toBeFalsy()
    expect(isAvatarEmpty({ photo: {} })).toBeFalsy()
    expect(isAvatarEmpty({ photo: { url: undefined } })).toBeFalsy()
    expect(isAvatarEmpty({ photo: { url: null } })).toBeFalsy()
    expect(isAvatarEmpty({ photo: { url: 'not_empty.jpg' } })).toBeFalsy()
    expect(isAvatarEmpty({ photo: { url: placeholder } })).toBeTruthy()
  })
})
