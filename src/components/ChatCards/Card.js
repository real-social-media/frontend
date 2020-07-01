import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import CloseIcon from 'assets/svg/post/Close'
import { Text } from 'react-native-paper'
import CacheComponent from 'components/Cache'
import uniq from 'ramda/src/uniq'

const ChatCard = ({
  borderColor,
  backgroundColor,
  handleCardPress,
}) => ({ item: post }) => {
  const customStyle = {
    borderColor,
    backgroundColor,
  }

  const users = uniq(
    post.comments.items
    .reverse()
    .map(comment => comment.commentedBy.username)
  )

  return (
    <View style={[styles.root, customStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerTitle} onPress={() => handleCardPress({ post })}>
          <View style={styles.content}>
            <View style={styles.image}>
              <CacheComponent
                thread="default"
                images={[
                  [post.image.url64p, true],
                ]}
                fallback={post.image.url64p}
                priorityIndex={0}
                resizeMode="contain"
                hideLabel={true}
                hideProgress={true}
              />
            </View>

            <View style={styles.comments}>
              <Text>You have {post.commentsCount} comments</Text>
              {users.length > 3 ?
                <Text>From {users.slice(0, 3).join(', ')} and others</Text>
              : null}

              {users.length <= 3 ?
                <Text>From {users.join(', ')}</Text>
              : null}
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.headerIcon}>
          <CloseIcon fill="#ffffff" />
        </View>
      </View>
    </View>
  )
}

ChatCard.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 12,
    margin: 12,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
})

export default ChatCard
