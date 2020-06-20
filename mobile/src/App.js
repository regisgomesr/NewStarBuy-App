import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import { ProductsList } from './screens/ProductsList';
import { ProductDetails } from './screens/ProductDetails';
import { GRAPHQL_URL } from './config/index.js';


const client = new ApolloClient({

  cache: new InMemoryCache(),
  uri: GRAPHQL_URL,
});

const Stack = createStackNavigator();


export default function() {
  return (

    <ApolloProvider client={client}>

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

    </ApolloProvider>
  )
}