import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {

    static navigationOptions = {
        title: "My Consumption",
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#CC4122',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
        // headerLeft: null
      };

    render() {
      return (
        <View style={styles.container}>
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View>
      );
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
