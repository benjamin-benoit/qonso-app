import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Alert } from "react-native";
import Environment from "./../../Environment";

export default class UserConsumption extends Component {
  static navigationOptions = {
    title: "My Consumptions",
    headerStyle: {
      backgroundColor: "#ffffff"
    },
    headerTintColor: "#CC4122",
    headerTitleStyle: {
      fontWeight: "bold"
    }
    // headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      errorMessage: null,
      user: {},
      consumes: []
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  componentWillMount() {
    this.setState({
      user: this.props.navigation.getParam("user", "defaultValue")
    });
  }

  componentDidMount() {
    this._getConsumptions();
  }

  _getConsumptions = async () => {
    const response = await fetch(
      Environment.CLIENT_API + "/api/consume/getByUserId/" + this.state.user.id,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      }
    );

    const json = await response.json();
    this.setState({ consumes: json.consumes });
  };

  deleteConsumption = async (item) => {
    Alert.alert(
      "Do you really want to delete this item ?",
      item.Product.name,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => this.deleteConfirmation(item)
        }
      ],
      { cancelable: true }
    );
  }

  deleteConfirmation = async (item) => {
    const response = await fetch(Environment.CLIENT_API + "/api/consume/delete", {
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.user.token
      },
      method: "DELETE",
      body: JSON.stringify({
        id: item.id
      })
    });
    const json = await response.json();
    if (response.status === 400) {
      console.log(json.err);
    } else {
      alert("Consumption is deleted");
      this._getConsumptions();
      this._onRefresh
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.consumes.reverse()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.deleteConsumption(item)}>
              <Text style={styles.list}>{item.Product.name}</Text>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#FF6766"
  },
  list: {
    margin: 15,
    backgroundColor: "white",
    justifyContent: "space-around",
    padding: 10,
    elevation: 1
  }
});
