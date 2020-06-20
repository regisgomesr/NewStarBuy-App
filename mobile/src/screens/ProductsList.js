import React from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_ALL_PRODUCTS } from '../graphql/requests.js';
import { Product } from '../components/Product.js';



export function ProductsList({ navigation }) {

  const {data, loading, error} = useQuery(GET_ALL_PRODUCTS);


  if (loading) {
    return <Text>Loading...</Text>
  } 
  if (error) {
    return <Text>{error.toString()}</Text>
  }

  function renderProduct({ item: product }) {
    return <Product product={product} onPress={() => {
      navigation.navigate('ProductDetails');
    }} />
  }

  return (
  
      <FlatList
        contentContainerStyle={styles.productsListContainer}
        data={data.products}
        renderItem={renderProduct}
      />
    
  )
}

const styles = StyleSheet.create({
  productsListContainer: {
    backgroundColor: '#f3f3f3'
  }
})