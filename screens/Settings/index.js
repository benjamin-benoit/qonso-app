import React, { Component, useState, useEffect } from "react";
import { Text } from "react-native";
import Environment from "./../../Environment";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { StackActions, NavigationActions } from "react-navigation";

export default class Settings extends Component {
  static navigationOptions = {
    title: "Settings",
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
      locationResult: { latitude: 0, longitude: 0 },
      errorMessage: null,
      user: {}
    };
  }

  disconnect() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  changePassword() {
    const { navigate } = this.props.navigation;
    navigate("ChangePassword", { user: this.state.user });
  }

  componentWillMount() {
    this.setState({
      user: this.props.navigation.getParam("user", "defaultValue")
    });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#FF6766" }}>
        <Button
          mode="contained"
          bordered
          block
          style={{
            marginTop: 10
          }}
          onPress={() => this.changePassword()}
        >
          <Text>Change my password</Text>
        </Button>
        <Button
          mode="contained"
          bordered
          block
          style={{
            marginTop: 10
          }}
          onPress={() => this.disconnect()}
        >
          <Text>Disconnect</Text>
        </Button>
      </ScrollView>
    );
  }
}
