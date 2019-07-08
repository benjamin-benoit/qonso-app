import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Environment from "./../../Environment";

export default class UserConsumption extends Component {

    static navigationOptions = {
        title: "My Consumptions",
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#CC4122',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
        // headerLeft: null
      };



      constructor(props){
        super(props);
        this.state = {
          locationResult: { latitude: 0, longitude: 0 },
          errorMessage: null,
          hasLocationPermissions: false,
          region: null,
          location: null,
          userLocation: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null
          },
          user:{},
          consumes:[],
          dataSource: null
        }
      }

  // _fetchData(callback) {
  //   const params = this.state._dataAfter !== ''
  //     ? `&after=${this.state._dataAfter}`
  //     : '';
  //   //Limits fetches to 15 so there's lesser items from the get go
  //   fetch(Environment.CLIENT_API + "/api/consume/getByUserId/" + user.id)
  //     .then(response => response.json())
  //     .then(callback)
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   }


  componentWillMount() {
    this.setState({ user: this.props.navigation.getParam('user', 'defaultValue') });
  }

  componentDidMount(){
    this._getConsumptions();
    console.log(this.state.consumes)
  }

  _getConsumptions = async () => {
    console.log(this.state.user.id)
    const response = await fetch(Environment.CLIENT_API + "/api/consume/getByUserId/" + this.state.user.id, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });

    const json = await response.json();
    console.log(json)
    this.setState({ consumes: json.consumes });
  };

    render() {
      return (
      <FlatList
        data={this.state.consumes}
        renderItem={({item}) => <Text style={styles.item}>{item.Product.name}</Text>}
      />
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22,
     backgroundColor: "#FF6766",
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })
