import React from "react";
import { View, StyleSheet } from "react-native";
import CardsStack from "templates/CardsStack";
import DatingCard from "components/DatingCard";

const Dating = ({ items }) => {
  const styling = styles();

  return (
    <View style={styling.content}>
      <CardsStack items={items}>
        {({ item, api }) => <DatingCard {...item} onAccept={api.swipeRight} onDecline={api.swipeLeft} />}
      </CardsStack>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    content: {
      flex: 1,
      padding: 15,
    },
  });

export default Dating;
