import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Environment from "./../../Environment";

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



  componentDidMount(){
    this._getConsumptions();
    console.log(this.state.consumes)
  }

  _getConsumptions = async () => {
    const response = await fetch(Environment.CLIENT_API + "/api/consume/getByUserId/" + this.state.user.id, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });

    const json = await response.json();
    this.setState({ consumes: json.consumes });
  };

    render() {
      // if (this.state.isLoading) {
      //   return (
      //     <View style={styles.container}>
      //       <ActivityIndicator size="large" />
      //     </View>
      //   );
      // } else {
        return (
          <FlatList
          data={this.state.consumes}
            renderRow={rowData => {
              return (
                <View style={styles.listItem}>
                  {/* <View style={styles.imageWrapper}>
                    <Image
                      style={{ width: 70, height: 70 }}
                      source={{
                        uri: rowData.data.icon_img === '' ||
                          rowData.data.icon_img === null
                          ? 'https://via.placeholder.com/70x70.jpg'
                          : rowData.data.icon_img,
                      }}
                    />
                  </View> */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                      {rowData.data.display_name}
                    </Text>
                    {/* <TouchableOpacity
                      onPress={() => Linking.openURL('https://www.google.com')}>
                      <Text style={styles.subtitle}>
                        {rowData.data.public_description}
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              );
            }}
            // onEndReached={() =>
            //   this.setState({ isLoadingMore: true }, () => this.fetchMore())}
            // renderFooter={() => {
            //   return (
            //     this.state.isLoadingMore &&
            //     <View style={{ flex: 1, padding: 10 }}>
            //       <ActivityIndicator size="small" />
            //     </View>
            //   );
            // }}
          />
        );
      // }
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
