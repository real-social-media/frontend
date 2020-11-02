import React, { useRef, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DatingCard from 'components/Dating/Card'
import DatingActions from 'components/Dating/Actions'
import DatingPlaceholder from 'components/Dating/Placeholder'
import LoadingComponent from 'components/Loading'
import Swiper from 'react-native-deck-swiper'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Dating = ({
  theme,
  datingMatchedUsersRequest,
  datingMatchedUsersIdle,
  datingMatchedUsers,
  handleSwipedLeft,
  handleSwipedRight,
}) => {
  const styling = styles(theme)
  const swiperRef = useRef(null)
  const renderCard = useCallback((datingUser) => <DatingCard user={datingUser} />, [])

  const loadingVisibility = useMemo(() =>
    path(['status'], datingMatchedUsers) === 'loading'
  , [datingMatchedUsers])

  const placeholderVisibility = useMemo(() =>
    path(['status'], datingMatchedUsers) !== 'loading' && !path(['data', 'length'], datingMatchedUsers)
  , [datingMatchedUsers])

  const matchesVisibility = useMemo(() =>
    path(['status'], datingMatchedUsers) === 'success' && path(['data', 'length'], datingMatchedUsers)
  , [datingMatchedUsers])

  const actionsVisibility = useMemo(() =>
    path(['status'], datingMatchedUsers) === 'success' && path(['data', 'length'], datingMatchedUsers)
  , [datingMatchedUsers])

  return (
    <View style={styling.root}>
      <View style={styling.carousel}>
        {loadingVisibility ?
          <LoadingComponent />
        : null}

        {placeholderVisibility ?
          <DatingPlaceholder
            datingMatchedUsersRequest={datingMatchedUsersRequest}
          />
        : null}

        {matchesVisibility ?
          <Swiper
            ref={swiperRef}
            cards={datingMatchedUsers.data}
            onSwipedLeft={handleSwipedLeft}
            onSwipedRight={handleSwipedRight}
            onSwipedAll={datingMatchedUsersIdle}
            renderCard={renderCard}
            cardIndex={0}
            stackSize={3}
            verticalSwipe={false}
            cardVerticalMargin={theme.spacing.base}
            cardHorizontalMargin={theme.spacing.base}
            backgroundColor={theme.colors.backgroundPrimary}
            cardStyle={styling.card}
          />
        : null}
      </View>

      {actionsVisibility ?
        <View style={styling.actions}>
          <DatingActions swiperRef={swiperRef} />
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  carousel: {
    flex: 1,
  },
  actions: {
    height: 120,
    marginTop: theme.spacing.base,
  },
  card: {
    height: '100%',
  },
  placeholder: {
    padding: theme.spacing.base,
  },
})

Dating.propTypes = {
  theme: PropTypes.any,
  datingMatchedUsersRequest: PropTypes.func,
  datingMatchedUsersIdle: PropTypes.func,
  datingMatchedUsers: PropTypes.any,
  handleSwipedLeft: PropTypes.func,
  handleSwipedRight: PropTypes.func,
}

export default withTranslation()(withTheme(Dating))
