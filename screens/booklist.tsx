import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../components/card';
import { MaterialIcons } from '@expo/vector-icons';
import BookForm from './addForm';
import { useQuery, gql } from '@apollo/client';
import { LOAD_BOOKS } from '../graphql/queries';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../components/loading';

export default function Booklist({ navigation }:any) {
    // const query = useQuery(LOAD_BOOKS);

    const fetchBooks = async () => {
        const getBooks = await fetch("http://10.0.2.2:3000/graphql", {
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                },
                body: JSON.stringify({
                query: `
                    query {
                    books{
                        _id
                        title
                        author
                        summary
                        }
                    }
                `,
                }),
            })
            .then(res => res.json())
            .then(data => data.data.books)
        return getBooks
    }

    const newBook = async ({ title, author, summary }:any) => {
        const addBook = await fetch ("http://10.0.2.2:3000/graphql", {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            query: `
                mutation{
                createBook(input: {title: "${title}", author: "${author}", summary: "${summary}"}){
                    _id
                    title
                    author
                    summary
              }
            }
            `,
            }),
        })
        .then(res => res.json())
        .then(data => data)
        return addBook
    }
    
    const [ books, setBooks ] = useState<any[]>([])
    const [ modelOpen, setModelOpen ] = useState(false);

    React.useLayoutEffect(() => { 
        navigation.setOptions({headerRight: () => (
        <Button onPress={() => setModelOpen(() => true)} title=" + " />
            ),    
        });  
    }, [navigation]);

    useEffect(() => {
        const fetchBook = async () => {
          const response = await fetchBooks();
          setBooks(response);
        };
        if(!modelOpen) fetchBook();
      }, [modelOpen])
    
      useEffect(() => {
        const fetchBook = async () => {
            const response = await fetchBooks();
            setBooks(response);
        };
        fetchBook();
      }, [])
    

    return (
        <View style={styles.container}>
            <Modal visible={modelOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modelContent}>
                        <MaterialIcons 
                            name='close'
                            size={24} 
                            style={{...styles.modelToggle, ...styles.modelClose}} 
                            onPress={() => setModelOpen(false)} 
                        />
                        <BookForm addBook={newBook} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <FlatList data={ books } 
                    pagingEnabled
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Book', item)}>
                            <Card>
                                <Text style={styles.bookTitle}>{ item.title }</Text>
                            </Card>
                        </TouchableOpacity>            
                    )}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 30
    },
    bookTitle: {
        flex: 1,
        
    },
    modelToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modelClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modelContent: {
        flex: 1,
    }
})
