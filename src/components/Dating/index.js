import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import CardDesk from './CardDesk'

const Dating = ({
  theme,
  datingGetPartners,
  partnersInfo,
  partners
}) => {
  const styling = styles(theme)

  const [cards, setCards] = useState(partners || [])

  useEffect(() => {
    const newCards = cards.concat(partners)
    setCards(newCards)
  }, [partners])

  const appendCards = () => {
    // TODO: maybe call with multiple parameters
    datingGetPartners({page: (partnersInfo?.page || 0) + 1})
  }

  return (
    <View style={styling.root}>
    <CardDesk cards={cards} appendCards={appendCards} />

    {/* temp button to test fetch */}
    {/* <TouchableOpacity  style={{
      borderColor: 'red',
      borderWidth: 3
    }} onPress={appendCards}>
      <Text>OK OK</Text>
    </TouchableOpacity> */}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    textAlign: 'center',
    maxWidth: 280,
  },
})

Dating.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  datingGetPartners: PropTypes.func.isRequired,
  partnersInfo: PropTypes.shape({page: PropTypes.number}),
  partners: PropTypes.arrayOf(PropTypes.shape({}))
}

export default withTranslation()(withTheme(Dating))
