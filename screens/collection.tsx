import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';


export default function Collection({ navigation }:any) {
    const fetchStatus = async () => {
        const getStatus = await fetch("http://10.0.2.2:3000/graphql", {
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                },
                body: JSON.stringify({
                query: `
                    query {
                        Status{
                            _id
                            bookID{
                                _id
                                title
                                author
                                summary
                            }
                            status
                        }
                    }
                `,
                }),
            })
            .then(res => res.json())
            .then(data => data.data.Status)
        return getStatus
    }

    let isFocused = useIsFocused();
    const [ status, setStatus ] = useState<any[]>([])

    useEffect(() => {
        const fetchStat = async () => {
            const response = await fetchStatus();
            setStatus(response);
        };
        fetchStat();
      }, [])

      useEffect(() => {
        const fetchStat = async () => {
            const response = await fetchStatus();
            setStatus(response);
        };
        if(isFocused) fetchStat();
      }, [isFocused])

      const deleteStatus = async (statusID:string) => {
        const delStatus = await fetch ("http://10.0.2.2:3000/graphql", {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            query: `
                mutation{
                deleteStatus(input:{statusID: "${statusID}"}){
                    _id
              }
            }
            `,
            }),
        })
        .then(()=> fetchStatus())
        .then(data => setStatus(data))
        return delStatus
    }

    const handleHold = (item:any) => {
        Alert.alert('Delete Book', `Do you sure you want to delete ${item.bookID.title} from collection?`,[
            {text: 'No'},
            {text: 'Yes', onPress: () => deleteStatus(item._id)}
        ])
    }

    return (
        <View>
            <FlatList data={ status } 
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ marginLeft: 0, backgroundColor: 'grey', padding:0.5 }}/>}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Book2', item)}
                        onLongPress={() => handleHold(item)}>
                        <View  style={styles.row}>
                            <View style={styles.title}>
                                <Text >{ item.bookID.title }</Text>
                            </View>
                            <View style={styles.status}>
                                <Text>{item.status}</Text> 
                            </View>
                        </View>
                    </TouchableOpacity>
                )}/>
        </View>
    );
}

const styles = StyleSheet.create({
    row:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 18,
    },
    title: {
        width: '85%'
    },
    status: {
        width: '15%',
        alignSelf: 'flex-end'
    },
})
