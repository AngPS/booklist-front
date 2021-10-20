import React from 'react';
import { StyleSheet, View, Text, Button, } from 'react-native';

export default function Home({ navigation }:any) {
    const onAyy = ():void => {
        navigation.navigate('HomeTab');
    }
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Ayy" onPress={onAyy}/>
        </View>
    );
}
