import React, { Component } from "react";
import { Text, View, StatusBar, Alert, TouchableOpacity, Image } from "react-native";
import { MapView, Location, Permissions } from "expo";
import Camera from 'react-native-camera';
import Svg, {
    Use,
  } from 'react-native-svg';

export default class Main extends Component {

  static navigationOptions = {
    title: "Main",
    header: null
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
        }
      }
    }
  
    goCamera(){
      const { navigate } = this.props.navigation;
      navigate("CameraScreen",{})
    }
  
    goUserConsumption(){
      const { navigate } = this.props.navigation;
      navigate("UserConsumption",{})
    }

  render() {
      return(
        <View style={{ flex: 1 }}>
        <MapView 
        showsUserLocation
        followsUserLocation
        style={{flex: 1}} />
        <View style={{ 
          left: 30,
          bottom: 20,
          position: 'absolute'
          }}>
        
        <TouchableOpacity onPress={()=>this.goUserConsumption()}>
          <Image  style= {{
          height: 55, width: 55}}
          source={require("./../../assets/settings.png")} />
        </TouchableOpacity>
        </View>

        <View style={{
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
          bottom: 20,
          position: 'absolute',
          }}>
        
        <TouchableOpacity onPress={()=>this.goCamera()}>
          <Image style= {{
          height: 65, width: 65}}
          source={require("./../../assets/qrcode.png")} />
        </TouchableOpacity>
        </View>
        
        <View style={{ 
          right: 30,
          bottom: 20,
          position: 'absolute'
          }}>
        
        <TouchableOpacity onPress={()=>this.goUserConsumption()}>
          <Image  style= {{
          height: 55, width: 55}}
          source={require("./../../assets/list.png")} />
        </TouchableOpacity>
        </View>
        </View>
      );
  }
}