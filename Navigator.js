import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './screens/Login'
import Register from './screens/Register'
import UserConsumption from './screens/UserConsumption'

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
    },
    UserConsumption: {
        screen: UserConsumption,
    }
}, {
    initialRouteName: 'Login',
  });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;