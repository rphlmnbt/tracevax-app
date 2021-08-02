import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarCodeScanner } from 'expo-barcode-scanner';
import background from '../assets/tracevax-bg.png'
import Flatbutton from '../shared/button'

export default function QrScannerScreen( { navigation } ) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('PLEASE SCAN QR');
  
  const askForCameraPermission = () => {
    (async () =>{
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }
  const pressHandler = () => {
    navigation.navigate('QrLogs')
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
  if(!hasPermission){
    return(
      <View style={styles.container}>
      <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if(!hasPermission){
    return (
      <View style={styles.container}>
        <Text style={{margin: 10}}>No Access to Camera </Text>
        <Button title={'Allow Camera'} onPress={()=> askForCameraPermission()}></Button>
      </View>
    );
  }
  return (
    <ImageBackground
  source={background}
  style={{width: '100%', height: '100%'}}
> 
    
    <View style={styles.container}>
      
      <View style={styles.barcodebox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
        style={{height: 400, width: 400}} />
      </View>
      <Text style={styles.maintext}>{text}</Text>
     <Input placeholder= "Input Location"/>


      <Flatbutton text="Submit"/>

      <Flatbutton  text="Show Logs" style={styles.button} onPress={pressHandler}  />
      {scanned && <Flatbutton  text="Scan Again?" onPress={() => setScanned(false)} />}
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: '3px',
    backgroundColor: "green"

  },

  
});
