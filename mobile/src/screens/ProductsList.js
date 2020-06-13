import React from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_ALL_PRODUCTS } from '../graphql/requests.js';



export function ProductsList({ navigation }) {

  const {data, loading, error} = useQuery(GET_ALL_PRODUCTS);

  if(loading || error) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.products} 
        renderItem={({item}) => <Text style={styles.nameProduct}>{item.name}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameProduct: {
    top: 200,
    color: '#13131a'
  }
})