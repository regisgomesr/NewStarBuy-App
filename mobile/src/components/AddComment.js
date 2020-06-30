import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useMutation, ApolloCache } from '@apollo/client';
import { CREATE_COMMENT, GET_PRODUCT, GET_COMMENTS_BY_PRODUCT } from '../graphql/requests';


export function AddComment({productId}) {

  const [comment, setComment] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, {data }) {
      //const { comment } = data.createComment;
      const { comments } = cache.readQuery({
        query: GET_COMMENTS_BY_PRODUCT,
        variables: {
          productId,
        }
      });
      cache.writeQuery({
        query: GET_COMMENTS_BY_PRODUCT,
        variables: {
          productId
        },
        data: {
          comments: [data.createComment.comment, ...comments],
        },
      });
    },
  });

  return(
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder={'Adicionar comentário'} 
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity 
        style={styles.sendButton}
        disabled={!comment}
        onPress={async () => {
          await createComment({
            variables: {
              comment,
              productId
            }
          })
          setComment('');
        }}
      >
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="prefix__feather prefix__feather-send"
        >

        <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />

        </Svg>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  sendButton: {
    backgroundColor:'orange',
    width: 60,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});