import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./screens/Login";
import Register from "./screens/Register";
import UserConsumption from "./screens/UserConsumption";
import Settings from "./screens/Settings";
import ChangePassword from "./screens/ChangePassword";
import Main from "./screens/Main";
import CameraScreen from "./screens/CameraScreen";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    },
    Settings: {
      screen: Settings
    },
    ChangePassword: {
      screen: ChangePassword
    },
    UserConsumption: {
      screen: UserConsumption
    },
    Main: {
      screen: Main
    },
    CameraScreen: {
      screen: CameraScreen
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
