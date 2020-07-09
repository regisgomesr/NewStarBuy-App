import React from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_ALL_PRODUCTS } from '../graphql/requests.js';
import { Product } from '../components/Product.js';
import { Loading } from '../components/Loading.js';
import { Error } from '../components/Error.js';



export function ProductsList({ navigation }) {

  const {data, loading, error} = useQuery(GET_ALL_PRODUCTS, {
    options: {
      fetchPolicy: 'cache-first',
    }
  });

  console.log(data);


  if (loading) {
    return <Loading hasBackground />
  }

  if (error) {
    return <Error error={error} />
  }

  function renderProduct({ item: product }) {
    return (
      <Product 
        product={product} 
        onPress={() => {
          navigation.navigate('ProductDetails', {
            productId: product.id,
          });
        }} 
        
      />
    );
  }

  return (
  
      <FlatList
        style={styles.ProductsList}
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