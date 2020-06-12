import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider, ApolloClient, ApolloCache } from '@apollo/client';

import { ProductsList } from './screens/ProductsList';
import { ProductDetails } from './screens/ProductDetails';

const Stack = createStackNavigator();

export default function() {
  return (

    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: 'black'
        }}  
      >
        <Stack.Screen name={'ProductsList'} component={ProductsList} />
        <Stack.Screen name={'ProductDetails'} component={ProductDetails} />
      </Stack.Navigator>
    
    </NavigationContainer>
  )
}