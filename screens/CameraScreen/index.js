import * as React from 'react';
import { Text, View, StyleSheet, Alert, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    product: {
      name: "",
      barcode: 0,
      type: ""
    }
  };

  static navigationOptions = {
        title: "CameraScreen",
        header : null
      };  
  
  async componentDidMount() {
    this.getPermissionsAsync();
    this.getProductFromApiAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

    async getProductFromApiAsync() {
    try {
        const response = await fetch('https://fr.openfoodfacts.org/api/v0/produit/8024884500403.json');
        const responseJson = await response.json();
        // console.log(responseJson);
        this.setState({
          product:{
            name: responseJson.product.generic_name_fr,
            barcode: responseJson.code,
            type: responseJson.product.categories[0]
          }
        })
        // console.log(this.state.product.name)
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
  }

  addProduct = async (spawnId) => {
    const response = await fetch(Environment.CLIENT_API + "/api/consume/create", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        key: this.state.product.barcode,
        title: this.state.product.name,
        description: this.state.product.type,
        longitude: 2.363148,
        latitude: 48.788703,
        UserId: this.state.user.id,
        productName: this.state.product.name,
        productBarCode: this.state.product.barcode,
        typeName: this.state.product.type
      })
    });
  }

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
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    console.log("ok")
    console.log(this.state.product.name)
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`,
      this.state.product.name,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add',
          // onPress: () => this._killZombie(spawnId),
          //onPress: () => this.addProduct(zombie)
        }
      ],
      { cancelable: true }
    );
  };
}


//data.product.generic_name_fr
//data.product.code.keywords.
//data.product.packaging_tags
