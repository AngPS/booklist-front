import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ListStack from './listStack';
import CollectionStack from './collectionStack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function HomeTab() {
    return(
        <Tab.Navigator>
            <Tab.Screen options={{headerShown: false, 
                    title: "Booklist",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="notebook" size={24} color="blue" />
                    ),
                }} 
                name='List' 
                component={ListStack} 
                
                />
            <Tab.Screen options={{headerShown: false, 
                    title: "Collection",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="notebook-multiple" size={24} color="blue" />
                    ),
                }} 
                name='CollectionStack' 
                component={CollectionStack} />
        </Tab.Navigator>
    )
}