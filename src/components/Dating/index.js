import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native'
import { Title } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import Swiper from 'react-native-deck-swiper'

const Dating = ({
  t,
  theme,
  datingGet = {},
}) => {
  const styling = styles(theme);
  const { data, status } = datingGet;
  const dataLength = data.length;
  const isLoading = (status === 'loading');
  const displaySwiper = (!isLoading && (dataLength > 0));

  return (
    <View style={styling.root}>
      {!displaySwiper && (
        <Title style={styling.title}>{t(status)}</Title>
      )}

      {displaySwiper && (
      <Swiper
          cards={data}
          renderCard={({ picture, name }) => {
            const { large } = picture;
            const { first, last } = name;

            return (
              <ImageBackground
                source={{ uri: large }}
                resizeMode="cover"
                style={styling.sliderImage}
              >
                <Text style={styling.sliderImageTitle}>{`${first} ${last}`}</Text>
              </ImageBackground>
            )
          }}
          infinite
          cardIndex={0}
          cardStyle={styling.sliderCardStyle}
          backgroundColor={'transparent'}
          stackSize= {3}
        >
      </Swiper>
      )}
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
  sliderImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sliderImageTitle: {
    color: 'green',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
  },
  sliderCardStyle: {
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
    width: 'auto',
    height: 'auto'
  },
})

Dating.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  datingGet: PropTypes.object,
}

export default withTranslation()(withTheme(Dating))
