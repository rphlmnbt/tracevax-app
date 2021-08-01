import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { logo } from '../assets/tracevax.png';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('PLEASE SCAN QR');
  
  const askForCameraPermission = () => {
    (async () =>{
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }
  // Request Camera Permission
  useEffect(() =>{
    askForCameraPermission();
  }, []);

  //What happens when we scan the bar code
  const handleQRCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data)
  } 

  //Check Permission and return the screens
  if(hasPermission === null){
    return(
      <View style={styles.container}>
      <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if(hasPermission === false){
    return (
      <View style={styles.container}>
        <Text style={{margin: 10}}>No Access to Camera </Text>
        <Button title={'Allow Camera'} onPress={()=> askForCameraPermission()}></Button>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/tracevax.png')} style={styles.image} />
      <View style={styles.barcodebox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
        style={{height: 400, width: 400}} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button style={styles.button} title="Scan Again?" onPress={() => setScanned(false)} color='#338DCD' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#338DCD',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#fff'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    aspectRatio: 1.25, 
    resizeMode: 'contain',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
  
});
