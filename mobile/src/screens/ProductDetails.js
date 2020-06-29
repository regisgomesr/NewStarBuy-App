import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { GET_PRODUCT } from '../graphql/requests';
import { useQuery } from '@apollo/client';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { Product } from '../components/Product';


export function ProductDetails({ route }) {
  const { productId } = route.params;

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
  });

  if(loading) {
    return <Loading />
  }

  if(error) {
    return <Error error={error} />
  }


  return (
    <Product product={data.product} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})