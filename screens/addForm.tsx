import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';

export default function BookForm({ addBook }:any) {

  return (
    
    <View>
        <Formik
            initialValues={{ title: '', author: '' , summary:''}}
            onSubmit={(values, actions) => {
            actions.resetForm(); 
            addBook(values); //API calls or add to array

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
                <Text>Book Title: </Text>
                <TextInput
                    placeholder='Book Title'
                    onChangeText={handleChange('title')}
                    value={values.title}
                    style={styles.input}
                />

                <Text>Author: </Text>
                <TextInput

                    placeholder='Author'
                    onChangeText={handleChange('author')}
                    value={values.author}
                    style={styles.input}
                />

                <Text>Summary: </Text>
                <TextInput 
                    multiline
                    placeholder='Summary'
                    onChangeText={handleChange('summary')}
                    value={values.summary}
                    style={styles.input}
                />
                
                <Button onPress={(e) => handleSubmit(e as any)} title="Submit" color='maroon'/>
            </View>
        )}
        </Formik>
    </View>
    
  );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    largeInput: {

    }
})