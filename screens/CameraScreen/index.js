import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  static navigationOptions = {
        title: "CameraScreen",
        header : null
      };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

    async getMoviesFromApiAsync() {
    try {
            const response = await fetch('https://fr.openfoodfacts.org/api/v0/produit/8024884500403.json');
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson.movies;
        }
        catch (error) {
            console.error(error);
        }
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.getMoviesFromApiAsync();
  };
}


//data.product.generic_name_fr
//data.product.code.keywords.
//data.product.packaging_tags