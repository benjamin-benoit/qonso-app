import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './screens/Login'
import Register from './screens/Register'
import UserConsumption from './screens/UserConsumption'
import Main from './screens/Main'
import CameraScreen from './screens/CameraScreen'

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
    },
    UserConsumption: {
        screen: UserConsumption,
    },
    Main: {
        screen: Main,
    },
    CameraScreen: {
        screen: CameraScreen,
    }
}, {
    initialRouteName: 'Main',
  });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;