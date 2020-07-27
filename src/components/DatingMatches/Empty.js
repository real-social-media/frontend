import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { withTranslation } from 'react-i18next';
import EmptyIcon from 'assets/svg/dating/Empty';
import DefaultButton from 'components/Formik/Button/DefaultButton';

const DatingMatchesEmpty = ({ t, goBack }) => {
  const styling = styles();

  return (
    <View style={styling.root}>
      <View style={styling.image}>
        <EmptyIcon />
      </View>
      <Text style={styling.title}>{t('There’re no matches yet')}</Text>
      <DefaultButton label={t('Start searhing now')} onPress={goBack} />
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      color: '#ffffff',
      fontWeight: '600',
      marginBottom: 20,
    },
  });

DatingMatchesEmpty.propTypes = {
  t: PropTypes.any.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default withTranslation()(DatingMatchesEmpty);
