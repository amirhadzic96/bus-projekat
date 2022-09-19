import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Header } from 'react-native-elements';
import { Camera } from 'expo-camera';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: 0,
      buttonState: 'normal',
      credit:100,
      button:false
    };
  }

  componentDidMount() {
    console.log(this.state.credit)
  }
  componentDidUpdate() {
    console.log(this.state.credit)
  }

  setCredit = () => 
    {

      this.setState({
          credit:this.state.credit - this.state.scannedData,
          scannedData:this.state.scannedData -this.state.scannedData,
          button:false
                      })
    }

  getCameraPermissions = async () => {
   // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status } = await Camera.requestCameraPermissionsAsync();

    this.setState({
      button: true,
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
      credit:this.state.credit
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    
    this.setState({
      scanned: true,
      scannedData: data==100 || this.state.credit==0 ? 0 :data,
      buttonState: 'normal',
      credit: data ==100 ? this.state.credit +100 : this.state.credit!=0 ?  (this.state.credit - this.state.scannedData) : this.state.credit
    });

  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <Camera
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <Image
            source={require('./assets/BarrCode.png')}
            style={{ width: 150, height: 150, marginBottom: 50 }}
          />

          <Text> Credit: 
          <Text style={styles.displayText}>
            {
              this.state.credit
             }
          </Text>
          </Text>

          <Text> Amount
          <Text style={styles.displayText}>
            {this.state.scannedData}
          </Text>
          </Text>

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}
            title="Bar Code Scanner"
            >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>

           <TouchableOpacity
            onPress={this.setCredit}
            style={styles.scanButton1}
            disabled = {this.state.button==false}
          
            >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 20,
  },
  scanButton: {
    backgroundColor: '#ff0066',
    padding: 10,
    margin: 10,
    borderRadius:15
  },
  scanButton1: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius:15
  },
  buttonText: {
    fontSize: 22,
  },
});
