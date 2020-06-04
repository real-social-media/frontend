import reduce from 'ramda/src/reduce'
import compose from 'ramda/src/compose'
import pathOr from 'ramda/src/pathOr'
import assocPath from 'ramda/src/assocPath'

export const getPosts = (data) => {
	const schema = {
		items: [],
		posts: [],
		users: [],
		comments: [],
	}

	const nextItems = reduce((schemaAcc, post) => {
		const nextSchema = compose(
			/**
			 * Transforming posts array of objects into array of id's only
			 * [{ postId, postedBy }] -> [postId]
			 */
			assocPath(
				['items'],
				schemaAcc.items.concat(post.postId)
			),

			/**
			 * Transforming post.postedBy object into id
			 * [{ postId, postedBy: { userId } }] -> [{ postId, postedBy: userId }]
			 */
			assocPath(
				['posts', post.postId],

				/**
				 *
				 */
				compose(
					/**
					 *
					 */
					assocPath(
						['postedBy'],
						post.postedBy.userId
					),

					/**
					 *
					 */
					assocPath(
						['comments', 'items'],
						post.comments.items.map(comment => comment.commentId)
					)
				)(post)
			),

			/**
			 * Extracting post.postedBy object into users array
			 * [{ userId }]
			 */
			assocPath(
				['users', post.postedBy.userId],
				post.postedBy
			),

			/**
			 * Extracting post.postedBy object into users array
			 * [{ userId }]
			 */
			assocPath(
				['users', post.originalPost.postedBy.userId],
				post.originalPost.postedBy
			)
		)(schemaAcc)

		/**
		 *
		 */
		return post.comments.items.reduce((acc, comment) => {
			return compose(
				/**
				 *
				 */
				assocPath(
					['comments', comment.commentId],
					
					assocPath(
						['commentedBy'],
						comment.commentedBy.userId,
						comment
					)
				),

				/**
				 *
				 */
				assocPath(
					['users', comment.commentedBy.commentId],
					comment.commentedBy
				)
			)(acc)
		}, nextSchema)

	}, schema)(data.items)

	console.log(JSON.stringify(nextItems, null, 2))

	return nextItems
}
