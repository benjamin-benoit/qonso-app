import * as React from "react";
import { Text, View, StyleSheet, Alert, Button } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Environment from "../../Environment";

import { BarCodeScanner } from "expo-barcode-scanner";

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    product: {
      name: "",
      barcode: 0,
      type: ""
    },
    user: {},
    locationResult: {}
  };

  static navigationOptions = {
    title: "CameraScreen",
    header: null
  };

  componentWillMount() {
    this.setState({
      user: this.props.navigation.getParam("user", "defaultValue"),
      locationResult: this.props.navigation.getParam(
        "locationResult",
        "defaultValue"
      )
    });
  }

  async componentDidMount() {
    this.getPermissionsAsync();
    // this.getProductFromApiAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  async getProductFromApiAsync(data) {
    try {
      console.log(data);
      const response = await fetch(
        "https://fr.openfoodfacts.org/api/v0/produit/" + data + ".json"
      );
      const responseJson = await response.json();
      console.log(responseJson.product.categories.split(",", 1));
      this.setState({
        product: {
          name: responseJson.product.product_name,
          barcode: responseJson.code,
          type: responseJson.product.categories.split(",", 1)[0]
        }
      });
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  addProduct = async () => {
    const response = await fetch(
      Environment.CLIENT_API + "/api/consume/createRecursive",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.user.token
        },
        method: "POST",
        body: JSON.stringify({
          longitude: this.state.locationResult.longitude,
          latitude: this.state.locationResult.latitude,
          userId: this.state.user.id,
          productName: this.state.product.name,
          productBarCode: this.state.product.barcode,
          typeName: this.state.product.type
        })
      }
    );
    const json = await response.json();
    if (response.status === 400) {
      console.log(json.err);
    } else {
      const { navigate } = this.props.navigation;
      navigate("Main", { user: this.state.user });
    }
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    // console.log(this.state.product.name)
    await this.getProductFromApiAsync(data);
    Alert.alert(
      this.state.product.name,
      this.state.product.type,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Add",
          onPress: () => this.addProduct()
        }
      ],
      { cancelable: true }
    );
  };
}

//data.product.generic_name_fr
//data.product.code.keywords.
//data.product.packaging_tags
