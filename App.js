import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './screens/Login'

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  }
}, {
    initialRouteName: 'Login',
  });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;