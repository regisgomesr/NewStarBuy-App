/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Reactotron from 'reactotron-react-native';
import App from './src/App';

import {name as appName} from './app.json';
import AsyncStorage from '@react-native-community/async-storage';

Reactotron.log('hello rendering world');

Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ host: '192.168.56.1' })
  .useReactNative()
  .connect()

AppRegistry.registerComponent(appName, () => App);
