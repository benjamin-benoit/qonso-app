import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import { MapView, Location, Permissions } from "expo";
import Environment from "./../../Environment";
export default class Main extends Component {
  static navigationOptions = {
    title: "Main",
    header: null
  };

  constructor(props) {
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
      user: {},
      consumes: []
    };
  }

  componentWillMount() {
    this.setState({
      user: this.props.navigation.getParam("user", "defaultValue")
    });
    this.setState({
      forceRefresh: Math.floor(Math.random() * 100)
    })
    this._getLocationAsync();
    this._getProducts();
  }

  componentDidMount() {
    this.setState({
      forceRefresh: Math.floor(Math.random() * 100)
    })
    this._getLocationAsync();
    this._getProducts();
  }

  _getProducts = async () => {
    const response = await fetch(
      Environment.CLIENT_API + "/api/consume/getAll",
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

  goCamera() {
    const { navigate } = this.props.navigation;
    navigate("CameraScreen", {
      locationResult: this.state.locationResult,
      user: this.state.user
    });
  }

  goUserConsumption() {
    const { navigate } = this.props.navigation;
    navigate("UserConsumption", { user: this.state.user });
  }

  goUserSettings() {
    console.log("testSettings");
    const { navigate } = this.props.navigation;
    navigate("Settings", { user: this.state.user });
  }

  setUserLocation(coordinate) {
    console.log("move");
    this.setState({
      userLocation: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      }
    })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922 / 10,
        longitudeDelta: 0.0421 / 10
      },
      locationResult: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      location
    });
  };

  render() {
    const icons = require("./../../assets");

    const productTable = this.state.consumes.map((consume, index) => {
      const icon = icons.markerIcons[consume.Product.Type.name]
        ? icons.markerIcons[consume.Product.Type.name]
        : icons.markerIcons["Default"];

      return (
        <MapView.Marker
          coordinate={{
            latitude: consume.latitude,
            longitude: consume.longitude
          }}
          id={consume.id}
          title={consume.Product.name}
          description={consume.description}
          image={icon}
          key={`marker-${index}${Date.now()}`}
        />
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <MapView key={this.state.forceRefresh} showsUserLocation followsUserLocation style={{ flex: 1 }}
          onUserLocationChange={locationChangedResult => this.setUserLocation(locationChangedResult.nativeEvent.coordinate)}>
          {productTable}
        </MapView>

        <View
          style={{
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            bottom: 20,
            position: "absolute"
          }}
        >
          <TouchableOpacity onPress={() => this.goCamera()}>
            <Image
              style={{
                height: 65,
                width: 65
              }}
              source={require("./../../assets/qrcode.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            left: 30,
            bottom: 20,
            position: "absolute"
          }}
        >
          <TouchableOpacity onPress={() => this.goUserConsumption()}>
            <Image
              style={{
                height: 55,
                width: 55
              }}
              source={require("./../../assets/settings.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            left: 30,
            bottom: 20,
            position: "absolute"
          }}
        >
          <TouchableOpacity onPress={() => this.goUserSettings()}>
            <Image
              style={{
                height: 55,
                width: 55
              }}
              source={require("./../../assets/settings.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            right: 30,
            bottom: 20,
            position: "absolute"
          }}
        >
          <TouchableOpacity onPress={() => this.goUserConsumption()}>
            <Image
              style={{
                height: 55,
                width: 55
              }}
              source={require("./../../assets/list.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
