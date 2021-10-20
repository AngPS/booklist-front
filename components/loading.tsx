import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default function Loading({hasBackground}:any) {
  return (
    <ActivityIndicator
      style={[
        styles.loadingIndicator,
        {
          backgroundColor: hasBackground ? '#fafafa' : 'none',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});