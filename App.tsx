import React, { useState } from 'react';
import Navigator from './routes/homeStack';
import { View, Text, SafeAreaView, StyleSheet, LogBox, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './routes/homeTab';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

LogBox.ignoreAllLogs();




// const errorLink = onError(({ graphqlErrors, networkError }:any) => {
//   if (graphqlErrors) {
//     graphqlErrors.map(({ message, location, path }:any) => {
//       alert(`Graphql error ${message}`);
//     });
//   }
// });

// const link = from([
//   errorLink,
//   new HttpLink({ uri: "http://10.0.2.2:3000/graphql" }),
// ]);

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: link,
// });

function App() {
  
  if (true) {
    return (

      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <HomeTab />
        </NavigationContainer>
      </SafeAreaView>

    );
  }
}


AppRegistry.registerComponent('MyApp', () => App);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});