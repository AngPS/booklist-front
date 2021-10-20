import React from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';

export default function Row (props:any) {
    return(
        <View style={styles.row}>
            { props.children }
        </View>
    )
}

const styles  = StyleSheet.create({
    row:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 18,
    }
})