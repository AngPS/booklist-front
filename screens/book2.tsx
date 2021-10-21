import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Book({ route, navigation }:any) {
    const pr = route.params;
    let isFocused = useIsFocused();
    useEffect(() => {
        navigation.setOptions({ title: pr.bookID.title })
        }, [isFocused])
    const [stat, setStat] = useState(pr.status == "Saved")
    const updateStatus = async (statusID:string, stat:string) => {
        const updateStat = await fetch ("http://10.0.2.2:3000/graphql", {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            query: `
                mutation{
                updateStatus(input: {statusID: "${statusID}", status: "${stat}"}){
                    _id
                    status
              }
            }
            `,
            }),
        })
        .then(res => res.json())
        .then(data => data)
        return updateStat
    }

    const readingButton = <Button onPress={() => {
        updateStatus(pr._id, "Reading")
        setStat(() => !stat)}} 
        title="Reading" color='maroon'/> 
    const saveButton = <Button onPress={() => {
        updateStatus(pr._id, "Saved")
        setStat(() => !stat)}} title="Save"/>
    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.header}>Title:</Text>
                <Text style={styles.body}>{ pr.bookID.title }</Text>
            </View>
            <View style={styles.authorArea}>
                <Text style={styles.header}>Author:</Text>
                <Text style={styles.body}>{ pr.bookID.author }</Text>
            </View>
            <View style={styles.titleArea}>
                <Text style={styles.header}>Summary:</Text>
                <Text style={styles.body}>{ pr.bookID.summary }</Text>
            </View>
            <View style={styles.buttonView}>
                {stat ? readingButton:
                saveButton}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',

    },
    titleArea: {
        width: '100%',
        padding: 50,
        alignSelf: 'center',
        alignItems: 'center',
        
    },
    authorArea: {
        width: '100%',
        alignItems: 'center',

    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body:{
        fontSize: 16,
        textAlign: 'center'
    },
    buttonView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})