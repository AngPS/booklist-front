import { useIsFocused } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, } from 'react-native';

export default function Book({ route, navigation }:any) {
    const { _id, title, author, summary } = route.params;

    const isFocused = useIsFocused();
    const [stat, setStatus] = useState(true)
    const [saved, setSaved] = useState(false)
    const [saveLabel, setSaveLabel] = useState("Saved")

    const fetchStatus = async (bookID:string) => {
        const getStatus = await fetch("http://10.0.2.2:3000/graphql", {
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                },
                body: JSON.stringify({
                query: `
                    query {
                        findByBookID(input:{bookID: "${bookID}"}){
                            _id
                            status
                        }
                    }
                `,
                }),
            })
            .then(res => res.json())
            .then(data => {
                setSaved(() => true)
                return data.data.Status})
            .catch(() => {
                setSaved(()=>false)
                setSaveLabel(() => "Save")
            })
        return getStatus
    }

    const createStatus = async (bookID:string) => {
        const addStatus = await fetch ("http://10.0.2.2:3000/graphql", {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            query: `
                mutation{
                createStatus(input: {bookID: "${bookID}"}){
                    _id
                    status
              }
            }
            `,
            }),
        })
        .then(res => res.json())
        .then(data => {
            setSaved(()=>true)
            setSaveLabel(() => "Saved")
            return data})
        .catch(()=>console.log("ok"))
        return addStatus
    }

    
    useEffect(() => {
        const fetchStat = async (bookID:string) => {
            const response = await fetchStatus(bookID);
        };
        fetchStat(_id);
    }, [])

      useEffect(() => {
        const fetchStat = async (bookID:string) => {
            const response = await fetchStatus(bookID);

        };
        navigation.setOptions({ title:title })
        if(isFocused) fetchStat(_id);
            
        }, [isFocused])



    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.header}>Title:</Text>
                <Text style={styles.body}>{ title }</Text>
            </View>
            <View style={styles.authorArea}>
                <Text style={styles.header}>Author:</Text>
                <Text style={styles.body}>{ author }</Text>
            </View>
            <View style={styles.titleArea}>
                <Text style={styles.header}>Summary:</Text>
                <Text style={styles.body}>{ summary }</Text>
            </View>
            <View style={styles.buttonView}>
                <Button onPress={()=>createStatus(_id)} title={saveLabel} disabled={saved} />
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