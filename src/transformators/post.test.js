import getPostsMock from './mocks/getPosts'
import * as postsTransformators from './posts'

// {
// 	items
//  posts
//  users
//  comments
// }

test('getPost query response', () => {
	const transform = postsTransformators.getPosts(getPostsMock)
  expect(Object.keys(transform)).toEqual(['items', 'posts', 'users', 'comments'])
  expect(transform.items[0].postedBy).toEqual(getPostsMock.items[0].postedBy.userId)
})