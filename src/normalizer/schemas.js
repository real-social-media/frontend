import { normalize, denormalize, schema } from 'normalizr'

const imageSchema = new schema.Entity(
	/**
	 * Key
	 */
	'images',
	/**
	 * Definition
	 */
	undefined,
	/**
	 * Options
	 */
	{
		idAttribute: (value) => {
			try { return value.url.split('?')[0] }
			catch (err) { return value }
		}
	}
)

const storyUsersSchema = new schema.Entity(
	/**
	 * Key
	 */
	'users',
	/**
	 * Definition
	 */
	{
		photo: imageSchema,
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'userId',
	}
)

const storyCommentsSchema = new schema.Entity(
	/**
	 * Key
	 */
	'comments',
	/**
	 * Definition
	 */
	undefined,
	/**
	 * Options
	 */
	{
		idAttribute: 'commentId',
	}
)

const storySchema = new schema.Entity(
	/**
	 * Key
	 */
	'posts',
	/**
	 * Definition
	 */
	{
		image: imageSchema,
		postedBy: storyUsersSchema,
		textTaggedUsers: [{
			user: storyUsersSchema,
		}],
		comments: {
			items: [storyCommentsSchema],
		},
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'postId'
	}
)

const usersSchema = new schema.Entity(
	/**
	 * Key
	 */
	'users',
	/**
	 * Definition
	 */
	{
		photo: imageSchema,
		stories: {
			items: [storySchema],
		},
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'userId',
	}
)

const commentsSchema = new schema.Entity(
	/**
	 * Key
	 */
	'comments',
	/**
	 * Definition
	 */
	{
		commentedBy: usersSchema,
		textTaggedUsers: [{
			user: usersSchema,
		}],
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'commentId',
	}
)

const albumPostsSchema = new schema.Entity(
	/**
	 * Key
	 */
	'posts',
	/**
	 * Definition
	 */
	{
		image: imageSchema,
		postedBy: usersSchema,
		textTaggedUsers: [{
			user: usersSchema,
		}],
		comments: {
			items: [commentsSchema],
		},
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'postId'
	}
)

const albumSchema = new schema.Entity(
	/**
	 * Key
	 */
	'albums',
	/**
	 * Definition
	 */
	{
		art: imageSchema,
		ownedBy: usersSchema,
		posts: {
			items: [albumPostsSchema],
		},
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'albumId'
	}
)

const messageSchema = new schema.Entity(
	/**
	 * Key
	 */
	'messages',
	/**
	 * Definition
	 */
	{
		textTaggedUsers: [{
			user: usersSchema,
		}],
		author: usersSchema,
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'messageId'
	}
)

const chatSchema = new schema.Entity(
	/**
	 * Key
	 */
	'chats',
	/**
	 * Definition
	 */
	{
		users: {
			items: [usersSchema],
		},
		messages: {
			items: [messageSchema],
		},
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'chatId'
	}
)

const originalPostSchema = new schema.Entity(
	/**
	 * Key
	 */
	'posts',
	/**
	 * Definition
	 */
	{
		image: imageSchema,
		album: albumSchema,
		postedBy: usersSchema,
		textTaggedUsers: [{
			user: usersSchema,
		}],
		comments: {
			items: [commentsSchema],
		},
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'postId'
	}
)

const postSchema = new schema.Entity(
	/**
	 * Key
	 */
	'posts',
	/**
	 * Definition
	 */
	{
		image: imageSchema,
		album: albumSchema,
		postedBy: usersSchema,
		textTaggedUsers: [{
			user: usersSchema,
		}],
		comments: {
			items: [commentsSchema],
		},
		originalPost: originalPostSchema,
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'postId'
	}
)

const datingSchema = new schema.Entity(
	/**
	 * Key
	 */
	'dating',
	/**
	 * Definition
	 */
	{
	},
	/**
	 * Options
	 */
	{
		idAttribute: 'datingId'
	}
)

/**
 *
 */
export function normalizePostsGet(payload) {
	return normalize(payload, [postSchema])
}

export function denormalizePostsGet(payload, entities) {
	return denormalize(payload, [postSchema], entities)
}

export function normalizePostGet(payload) {
	return normalize(payload, postSchema)
}

export function denormalizePostGet(payload, entities) {
	return denormalize(payload, postSchema, entities)
}

/**
 *
 */
export function normalizeCommentsGet(payload) {
	return normalize(payload, [commentsSchema])
}

export function denormalizeCommentsGet(payload, entities) {
	return denormalize(payload, [commentsSchema], entities)
}

export function normalizeCommentGet(payload) {
	return normalize(payload, commentsSchema)
}

export function denormalizeCommentGet(payload, entities) {
	return denormalize(payload, commentsSchema, entities)
}

/**
 *
 */
export function normalizeUsersGet(payload) {
	return normalize(payload, [usersSchema])
}

export function denormalizeUsersGet(payload, entities) {
	return denormalize(payload, [usersSchema], entities)
}

export function normalizeUserGet(payload) {
	return normalize(payload, usersSchema)
}

export function denormalizeUserGet(payload, entities) {
	return denormalize(payload, usersSchema, entities)
}

/**
 *
 */
export function normalizeAlbumsGet(payload) {
	return normalize(payload, [albumSchema])
}

export function denormalizeAlbumsGet(payload, entities) {
	return denormalize(payload, [albumSchema], entities)
}

export function normalizeAlbumGet(payload) {
	return normalize(payload, albumSchema)
}

export function denormalizeAlbumGet(payload, entities) {
	return denormalize(payload, albumSchema, entities)
}

/**
 *
 */
export function normalizeChatsGet(payload) {
	return normalize(payload, [chatSchema])
}

export function denormalizeChatsGet(payload, entities) {
	return denormalize(payload, [chatSchema], entities)
}

export function normalizeChatGet(payload) {
	return normalize(payload, chatSchema)
}

export function denormalizeChatGet(payload, entities) {
	return denormalize(payload, chatSchema, entities)
}

/**
 *
 */
export function normalizeDatingGet(payload) {
	return normalize(payload, [datingSchema])
}

export function denormalizeDatingGet(payload, entities) {
	return denormalize(payload, [datingSchema], entities)
}
