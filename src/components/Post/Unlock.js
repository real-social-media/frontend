import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Text, StyleSheet, Platform } from 'react-native'
import { withTranslation } from 'react-i18next'
import EyeIcon from 'assets/svg/post/Eye'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { BlurView } from '@react-native-community/blur'
import * as postsActions from 'store/ducks/posts/actions'

export const a11y = {
  unlock: 'Paid Content',
}

const PostUnlock = ({ t, postId, payment }) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const handlePay = () => {
    setLoading(true)
    dispatch(postsActions.postsPayRequest({ postId }))
  }

  return (
    <BlurView accessibilityLabel={a11y.unlock} style={styles.overlay} blurType="xlight">
      <EyeIcon style={styles.icon} fill="#000000" />
      <Text style={styles.title}>{t('Paid Content')}</Text>
      <Text style={styles.subtitle}>{t('This post costs ${{payment}} REAL Coins', { payment })}</Text>
      <DefaultButton
        onPress={handlePay}
        style={styles.btn}
        label={t('Pay & Continue')}
        mode="outlined"
        size="compact"
        loading={isLoading}
      />
    </BlurView>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
})

PostUnlock.propTypes = {
  t: PropTypes.any,
  postId: PropTypes.string.isRequired,
  payment: PropTypes.number.isRequired,
}

export default withTranslation()(PostUnlock)
