import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'


export function ProductsList({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo ao NewStarBuy App</Text>
      
      <Button 
        title={'Abrir detalhe do produto'}
        onPress={() => {
          navigation.navigate('ProductDetails');
        }}
      />
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