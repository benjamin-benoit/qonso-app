import React, { Component } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import Environment from "../../Environment";
import { Snackbar, Button, TextInput, Text } from "react-native-paper";

export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
    headerStyle: {
      backgroundColor: "#ffffff"
    },
    headerTintColor: "#CC4122",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      isButtonDisabled: false,
      visible: false,
      id: "",
      nickname: "",
      isLoggingIn: false,
      message: ""
    };
  }

  login = async () => {
    this.setState({
      isButtonDisabled: true
    });
    const { navigate } = this.props.navigation;

    const response = await fetch(Environment.CLIENT_API + "/api/auth/login", {
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
      this.setState({
        isButtonDisabled: false,
        visible: true
      });
    } else {
      this.setState({
        id: json.data.user.id,
        isLoggingIn: true,
        token: json.meta.token
      });
      navigate("Main", { user: this.state });
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
          autoCapitalize="none"
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
        {this.state.isLoggingIn && <ActivityIndicator />}
        <Button
          mode="contained"
          block
          disabled={
            this.state.isLoggingIn ||
            !this.state.nickname ||
            !this.state.password ||
            this.state.isButtonDisabled
          }
          style={{
            marginTop: 10
          }}
          onPress={this.login}
        >
          <Text>Login</Text>
        </Button>
        <Button
          mode="contained"
          bordered
          block
          style={{
            marginTop: 10
          }}
          onPress={() => navigate("Register", {})}
        >
          <Text>Not registered yet ?</Text>
        </Button>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: "Undo",
            onPress: () => {
              // Do something
            }
          }}
          style={{
            position: "absolute"
          }}
        >
          {this.state.message}
        </Snackbar>
      </ScrollView>
    );
  }
}
