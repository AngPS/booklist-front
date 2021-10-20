import React from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';

export default function Card (props:any) {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const cardWidth = Dimensions.get('window').width * 0.85;
const cardHeight = Dimensions.get('window').height * 0.68

const styles = StyleSheet.create({
    card: {
        marginLeft: 17,
        marginRight: 25,
        width: cardWidth,
        height:cardHeight,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#eee',
        shadowOffset: { width: 2, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        marginHorizontal: 15,
        marginVertical: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContent: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 200,
        marginHorizontal: 10,

    }
})