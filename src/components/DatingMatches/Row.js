import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { withTranslation } from 'react-i18next';
import { Text, Image, View, StyleSheet } from 'react-native';
import UserRowComponent from 'templates/UserRow';
import { Button } from 'react-native-paper';
import DefaultButton from 'components/Formik/Button/DefaultButton';
import CloseIcon from 'assets/svg/header/Close';

const DatingMatchesRow = ({ t, photo, name, age, matchedDate }) => {
  const styling = styles();

  const renderAvatar = () => (
    <View style={styling.avatar}>
      <Image style={styling.photo} source={{ uri: photo }} />
    </View>
  );

  const renderContent = () => (
    <View>
      <Text style={styling.name}>
        {name}, {age}
      </Text>
      <Text style={styling.date}>{dayjs(matchedDate).from(dayjs())}</Text>
    </View>
  );

  const renderActions = () => (
    <View style={styling.actions}>
      <View style={styling.hideBtn}>
        <DefaultButton label={t('Hide')} onPress={() => {}} mode="outlined" />
      </View>
      <DefaultButton label={t('Message')} onPress={() => {}} />
    </View>
  );

  return <UserRowComponent avatar={renderAvatar()} content={renderContent()} action={renderActions()} />;
};

const styles = () =>
  StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderColor: '#353535',
      borderWidth: 2,
      borderRadius: 2,
      padding: 2,
    },
    photo: {
      width: 42,
      height: 42,
    },
    name: {
      color: '#ffffff',
      fontWeight: '500',
      fontSize: 14,
      marginBottom: 4,
    },
    date: {
      color: '#838383',
      fontSize: 14,
    },
    actions: {
      flexDirection: 'row',
    },
    hideBtn: {
      marginRight: 15,
    },
  });

DatingMatchesRow.propTypes = {
  t: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  matchedDate: PropTypes.string.isRequired,
};

export default withTranslation()(DatingMatchesRow);
