import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Book from '../screens/book';
import Book2 from '../screens/book2';
import Collection from '../screens/collection';

const Stack = createStackNavigator();

export default function CollectionStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Collection" component={Collection} />
            <Stack.Screen name="Book2" component={Book2} />
        </Stack.Navigator>
    )
}

