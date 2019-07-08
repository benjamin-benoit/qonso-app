import React, { Component } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import Environment from "../../Environment";
import { Button, TextInput, Text } from "react-native-paper";

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
      id: "",
      nickname: "",
      isLoggingIn: false,
      message: ""
    };
  }

  componentWillMount() {
    this.setState({
      user: this.props.navigation.getParam("user", "defaultValue")
    });
  }

  _changePassword = async () => {
    const response = await fetch(
      Environment.CLIENT_API + "/api/user/changePassword",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.user.token
        },
        method: "PUT",
        body: JSON.stringify({
          id: this.state.user.id,
          nickname: this.state.user.nickname,
          password: this.state.user.password,
          newPassword: this.state.newPassword,
          newPassword_confirmation: this.state.newPassword_confirmation
        })
      }
    );

    const json = await response.json();
    if (response.status === 400) {
      this.setState({ message: json.err });
    } else {
      this.setState({ message: "Pasword updated" });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ backgroundColor: "#FF6766" }}>
          <TextInput
            placeholder="New password"
            onChangeText={newPassword => this.setState({ newPassword })}
            autoFocus={true}
            autoCapitalize="none"
            onFocus={this.clearNewPassword}
          />
          <TextInput
            placeholder="New password confirmation"
            onChangeText={newPassword_confirmation =>
              this.setState({ newPassword_confirmation })
            }
            onFocus={this.clearNewPassword_confirmation}
            autoCapitalize="none"
            onSubmitEditing={this._userLogin}
          />
        <Button
          mode="contained"
          bordered
          block
          style={{
            marginTop: 10
          }}
          onPress={() => navigate("Register", {})}
          disabled={
            !this.state.newPassword || !this.state.newPassword_confirmation
          }
          onPress={() => this._changePassword()}
        >
          <Text>Update new password</Text>
        </Button>
        {!!this.state.message && (
          <Text style={{ fontSize: 14, color: "green", padding: 5 }}>
            {this.state.message}
          </Text>
        )}
      </ScrollView>
    );
  }
}
