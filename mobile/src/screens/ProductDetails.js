import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'


export function ProductDetails() {
  return (
    <View style={styles.container}>
      <Text>Detalhe do Produto.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})