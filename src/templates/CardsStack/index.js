import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";

class CardsStack extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, onSwipedAll, onSwipedLeft, onSwipedRight, children } = this.props;
    const styling = styles();

    const api = {
      swipeLeft: () => {
        this.swiper.swipeLeft();
      },
      swipeRight: () => {
        this.swiper.swipeRight();
      },
    };

    return (
      <CardStack
        ref={(swiper) => {
          this.swiper = swiper;
        }}
        style={styling.content}
        cardContainerStyle={styling.cardContainer}
        onSwipedLeft={onSwipedLeft}
        onSwipedRight={onSwipedRight}
        onSwipedAll={onSwipedAll}
      >
        {items.map((item, key) => (
          <Card key={key} style={styling.card}>
            {children({ item, api })}
          </Card>
        ))}
      </CardStack>
    );
  }
}

const styles = () =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    cardContainer: {
      width: "100%",
      height: "100%",
    },
    card: {
      flex: 1,
    },
  });

CardsStack.propTypes = {
  items: PropTypes.array,
  onSwipedAll: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  onSwipedRight: PropTypes.func,
  children: PropTypes.func,
};

CardsStack.defaultProps = {
  items: [],
};

export default CardsStack;
