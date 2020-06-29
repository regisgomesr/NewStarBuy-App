import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { BASE_URL, GRAPHQL_URL } from '../config';

import { FavoriteIcon } from './FavoriteIcon.js';
import { useMutation } from '@apollo/client';
import {Card} from './Card';
import { ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE } from '../graphql/requests';

export function Product({ product, onPress }) {

  const [addOrRemoveProductFromFavorite] = useMutation(ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE, {
    variables: {
      productId: product.id,
    },
  });

  return (
    <Card style={styles.card} onPress={onPress}>

      <Image 
        style={styles.thumb}
        source={{uri: `${BASE_URL}/uploads/arroz_tio_joao_7799475426.jpeg` }} // BASE_URL + product.thumb.url ${BASE_URL}/uploads/arroz_tio_joao_7799475426.jpeg
      />

      <View style={styles.infoContainer}>
        <View style={styles.namePriceContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>R$ {product.price}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>
      </View>

      <FavoriteIcon 
        favorite={product.favorite} 
        onPress={async () => {
          await addOrRemoveProductFromFavorite();
        }} 
      />

    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 15
  },
  thumb: {
    height: 260,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  infoContainer: {
    padding: 16
  },
  namePriceContainer: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 8
  }, 
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 18,
    fontWeight: '600'
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878'
  }
})