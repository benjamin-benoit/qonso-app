import React, { Component } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import Environment from "../../Environment";
import { Button, TextInput, Text } from 'react-native-paper';

export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
    headerStyle: {
      backgroundColor: '#ffffff',
    },
    headerTintColor: '#CC4122',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
      navigate("UserConsumption", { user: this.state });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView 
      style={{ backgroundColor: "#FF6766" }}
      >
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
        <Button mode="contained"
          block
          disabled={
            this.state.isLoggingIn ||
            !this.state.nickname ||
            !this.state.password
          }
          style={{
            marginTop: 10
          }}
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