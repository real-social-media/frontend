import React from 'react'
import { Linking } from 'react-native'
import compose from 'ramda/src/compose'
import reactStringReplace from 'react-string-replace'
import * as navigationActions from 'navigation/actions'
import Link from 'components/Link'

const URL_REGEX = /(https?:\/\/\S+)/g
const MENTION_REGEX = /@(\w+)/g

const linkifyText = ({ text, textTaggedUsers = [], navigation }) => {
  const renderExternalLink = (match) => <Link key={match} title={match} onPress={() => Linking.openURL(match)} />

  const renderMentionLink = (match) => {
    const tag = `@${match}`
    const tagged = textTaggedUsers.find((textTag) => textTag.tag === tag)
    const onPress = () => navigationActions.navigateProfile(navigation, { userId: tagged.user.userId })

    return tagged ? <Link key={match} title={tag} onPress={onPress} /> : tag
  }

  const replacer = compose(
    (text) => reactStringReplace(text, URL_REGEX, renderExternalLink),
    (text) => reactStringReplace(text, MENTION_REGEX, renderMentionLink),
  )

  return replacer(text)
}

export default linkifyText
