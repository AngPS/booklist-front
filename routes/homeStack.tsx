import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/login';
import Booklist from '../screens/booklist';


const screens = {
    Home:{
        screen: Home,
        navigationOptions: {
            title: 'Home',
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { 
            backgroundColor: '#eee', 
            height: 80,
            },
        headerTitleStyle: {
            textAlign: 'center',
            flex: 1,
            marginTop: 30
        },
    },
    navigationOptions: {
        headerMode: 'screen'
    }
});

export default createAppContainer(HomeStack);