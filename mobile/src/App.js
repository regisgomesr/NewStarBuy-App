import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';

import { ProductsList } from './screens/ProductsList';
import { ProductDetails } from './screens/ProductDetails';
import { GRAPHQL_URL } from './config/index.js';
import { FAVORITE_PRODUCT_FRAGMENT } from './graphql/requests';
import { cache } from './graphql/cache';
import { resolvers } from './graphql/resolvers';
import { HeaderFavoriteProductsCount } from './components/HeaderFavoriteProductsCount';
import { Loading } from './components/Loading';


const Stack = createStackNavigator();


export default function() {

  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
      trigger: 'background'
    }).then(() => {
      setClient( new ApolloClient({

        uri: 'http://192.168.56.1:1337/graphql',
        cache: cache,
        resolvers: resolvers
        }),);
    });
  }, []);

  if(!client) {
    return <Loading />
  }

  return (

    <ApolloProvider client={client}>

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: 'black'
          }}  
        >
          <Stack.Screen 
            name={'ProductsList'} 
            component={ProductsList} 
            options={{
              headerRight: () => <HeaderFavoriteProductsCount />,
            }}
          />
          <Stack.Screen 
            name={'ProductDetails'} 
            component={ProductDetails} 
            options={{
              headerRight: () => <HeaderFavoriteProductsCount />
            }}  
          />
        </Stack.Navigator>
      </NavigationContainer>

    </ApolloProvider>
  )
}