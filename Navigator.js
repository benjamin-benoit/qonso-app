import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './screens/Login'
import Register from './screens/Register'

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
    }
}, {
    initialRouteName: 'Login',
  });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;