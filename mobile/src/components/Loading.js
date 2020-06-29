import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';


export function Loading() {
  return <ActivityIndicator />
}


const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa'
  },
});