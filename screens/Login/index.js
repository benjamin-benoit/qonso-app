import React, { Component } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import {
  Container,
  
  
  Content,
  Form,
  Item
} from "native-base";
import { Button, Text, TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Environment from "../../Environment";

// const theme = {
//     ...DefaultTheme,
//     roundness: 2,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: '#3498db',
//       accent: '#f1c40f',
      
//     },
//     Provider: {
//         background: '#FF6766',
//     },
//     Button: {
//         background: '#FFFFFF',
//     }
//   };

export default class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nickname: "",
      isLoggingIn: false,
      message: ""
    };
  }

  login = async () => {
    const { navigate } = this.props.navigation;

    const response = await fetch(Environment.CLIENT_API + "/api/user/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        nickname: this.state.nickname,
        password: this.state.password
      })
    });

    const json = await response.json();
    if (response.status === 400) {
      this.setState({ message: json.err });
    } else {
      this.setState({ id: json.data.user.id, isLoggingIn: true, score: json.data.user.score, lifePoints: json.data.user.lifePoints, attackPoints: json.data.user.attackPoints, weapon: {} });
      navigate("Game", { user: this.state });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
            <ScrollView style={{ backgroundColor: "#FF6766" }}>
                <TextInput
                  ref={component => (this._nickname = component)}
                  placeholder="Nickname"
                  onChangeText={nickname => this.setState({ nickname })}
                  autoFocus={true}
                  autoCapitalize='none'
                  onFocus={this.clearNickname}
                />
                <TextInput
                  ref={component => (this._password = component)}
                  placeholder="Password"
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry={true}
                  onFocus={this.clearPassword}
                  onSubmitEditing={this._userLogin}
                />
              {!!this.state.message && (
                <Text style={{ fontSize: 14, color: "red", padding: 5 }}>
                  {this.state.message}
                </Text>
              )}
              {this.state.isLoggingIn && <ActivityIndicator />}
              <View style={{ margin: 7 }} />
              <Button mode="contained"
                block
                disabled={
                  this.state.isLoggingIn ||
                  !this.state.nickname ||
                  !this.state.password
                }
                onPress={this.login}
              >
                <Text>Login</Text>
              </Button>
              <Button mode="contained"
                bordered
                block
                style={{
                  marginTop: 10
                }}
                onPress={() => navigate("Register", {})}
              >
                <Text>Not registered yet ?</Text>
              </Button>
            </ScrollView>
    );
  }
}