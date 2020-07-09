import React from 'react'
import { View, StyleSheet, Text, Button, FlatList } from 'react-native'
import { GET_PRODUCT, GET_COMMENTS_BY_PRODUCT } from '../graphql/requests';
import { useQuery } from '@apollo/client';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { Product } from '../components/Product';
import { Card } from '../components/Card';
import { AddComment } from '../components/AddComment';


export function ProductDetails({ route }) {
  const { productId } = route.params;

  const { 
    loading: productLoading, 
    error: productError, 
    data: productData,
    } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-first',
  });

  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData
  } = useQuery(GET_COMMENTS_BY_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-and-network',
  });

  if(Loading) {
    return <Loading hasBackground />
  }

  if(productError) {
    return <Error error={productError} />
  }

  function renderComment({ item: comment }) {
    return (
      <Card id={comment.id} style={styles.commentCard}>
        <Text>{comment.comment}</Text>
      </Card>
    )
  }

  function renderNumberOfComments() {
    return (
      <Text style={styles.title}>
        {commentsData && commentsData.comments.length > 0
          ? `Comentários [${commentsData.comments.length}]`
          : 'Nenhum coméntario'}
      </Text>
    )
  }

  function renderHeader() {
    const {product} = productData;

    return (
      <>
        <Product product={product} />

        <AddComment productId={product.id} />

        {commentsLoading && <Loading />}
        {commentsError && <Error error={commentsError} />}

        {renderNumberOfComments()}

      </>
    )
  }

  return (
    <FlatList
      data={commentsData ? commentsData.comments : []}
      renderItem={renderComment}
      ListHeaderComponent={renderHeader()}
      contentContainerStyle={styles.commentsContainer}
    />
  )
}

const styles = StyleSheet.create({
  commentsContainer: {

  },
  commentCard: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8
  },
  title: {
    marginVertical: 8,
    marginHorizontal: 8,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  }
})