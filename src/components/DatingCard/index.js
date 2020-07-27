import React from 'react';
import { Text, ImageBackground, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/svg/camera/Close';
import HeartIcon from 'assets/svg/dating/Heart';

const DatingCard = ({ name, age, photo, city, onDecline, onAccept }) => {
  const styling = styles();

  const renderCloseIcon = () => <CloseIcon fill="#CDCDCD" />;

  return (
    <ImageBackground
      testID="components/Dating/Card/photo"
      source={{ uri: photo }}
      style={styling.photo}
      imageStyle={{ borderRadius: 25 }}
    >
      <View style={styling.inner}>
        <Text style={styling.name}>
          {name}, {age}
        </Text>
        <Text style={styling.city}>{city}</Text>
        <View style={styling.actions}>
          <IconButton style={styling.button} accessibilityLabel="Decline" icon={renderCloseIcon} onPress={onDecline} />
          <IconButton style={styling.button} accessibilityLabel="Accept" icon={HeartIcon} onPress={onAccept} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = () =>
  StyleSheet.create({
    photo: {
      flex: 1,
      justifyContent: 'flex-end',
      resizeMode: 'cover',
    },
    inner: {
      padding: 30,
    },
    name: {
      fontSize: 30,
      fontWeight: '600',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 5,
    },
    city: {
      fontSize: 20,
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 20,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#ffffff',
      width: 70,
      height: 70,
      borderRadius: 70,
      marginLeft: 20,
      marginRight: 20,
    },
  });

DatingCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  onDecline: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default DatingCard;
