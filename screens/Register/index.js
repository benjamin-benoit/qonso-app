import React, { Component } from "react";
import { ScrollView } from "react-native";
import Environment from "../../Environment";
import { Button, TextInput, Text, Snackbar } from "react-native-paper";

export default class Register extends Component {
  static navigationOptions = {
    title: "Register",
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
      visible: false,
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
      message: ""
    };
  }

  register = async () => {
    const { navigate } = this.props.navigation;

    const response = await fetch(
      Environment.CLIENT_API + "/api/auth/register",
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          nickname: this.state.nickname,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation
        })
      }
    );

    const json = await response.json();
    if (response.status === 400) {
      this.setState({ message: json.err });
      this.setState({
        visible: true
      });
    } else {
      console.log(json.data);
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
          ref={component => (this._email = component)}
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          autoFocus={true}
          onFocus={this.clearEmail}
          autoCapitalize="none"
        />
        <TextInput
          ref={component => (this._nickname = component)}
          placeholder="Nickname"
          onChangeText={nickname => this.setState({ nickname })}
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
        <TextInput
          ref={component => (this._password = component)}
          placeholder="Password confirmation"
          onChangeText={passwordConfirmation =>
            this.setState({ passwordConfirmation })
          }
          secureTextEntry={true}
          onFocus={this.clearPasswordConfirmation}
          onSubmitEditing={this._userLogin}
        />
        <Button
          mode="contained"
          block
          style={{
            marginTop: 10
          }}
          disabled={
            !this.state.nickname ||
            !this.state.email ||
            !this.state.password ||
            !this.state.passwordConfirmation
          }
          onPress={this.register}
        >
          <Text>Register</Text>
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
