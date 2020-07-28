import React from 'react'
import PropTypes from 'prop-types'
import { Text, Image, View } from 'react-native';
import { v4 as uuid } from 'uuid'
import CardStack, { Card } from 'react-native-card-stack-swiper';

import styles from './styles'

export default class CardDesk extends React.PureComponent {

  onLike = () => {

  }


  onDislike = () => {

  }

  onSwiped = (index) => {
    const {cards, appendCards} = this.props
    if (!Array.isArray(cards)) return null;
    if (index >= cards.length - 3) {
      appendCards()
    }
  }


  renderCards = (cards) => {
    if (!Array.isArray(cards)) return null;

    const renderedCards = cards.map(card => {
      const id = card?.id?.value || uuid()
    return <Card key={id} style={[styles.card]}>
      {card?.picture?.large && <Image source={{uri: card.picture.large}} style={styles.backgroundImages}/>}
      <View style={styles.cardInfo}>
        <Text style={styles.nameTxt}>{`${card?.name?.first|| ''} ${card?.name?.last|| ''}`}
          {' '}<Text style={styles.yearOldsTxt}>{card?.dob.age || ''}</Text>
        </Text>
      </View>
    </Card>
  })

  return renderedCards.filter(card => !!card)
  }


  render(){
    const {cards, appendCards} = this.props

    return (
      <CardStack
        onSwipedAll={() => {
          appendCards()
        }}
        onSwiped={this.onSwiped} style={styles.content} ref={this.setSwiperRef}>
        {this.renderCards(cards)}
      </CardStack>
    )
  }

  setSwiperRef = (swiper) => {this.swiper = swiper}
}

CardDesk.propTypes = {
  cards: PropTypes.array,
  appendCards: PropTypes.func.isRequired
}
