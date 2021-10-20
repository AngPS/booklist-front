import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Booklist from '../screens/booklist';
import Book from '../screens/book';

const Stack = createStackNavigator();

export default function ListStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: true}} name="Bookist" component={Booklist} />
            <Stack.Screen name="Book" component={Book} />
        </Stack.Navigator>
    )
}

