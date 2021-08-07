import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { TextInput, StyleSheet, Text, View, ImageBackground, Animated, Dimensions  } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarCodeScanner } from 'expo-barcode-scanner';
import background from '../assets/tracevax-bg.png'
import Flatbutton from '../shared/button';

export default function QrScannerScreen( { navigation } ) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('PLEASE SCAN QR');
  
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const {height} = Dimensions.get('window');
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const [location, setLocation] = useState('');

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
    modalTrigger();
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


  const color = animation.interpolate({
    inputRange: [0, 0.2, 1.8, 2],
    outputRange: [
      'rgba(255, 255, 255, 0.0)',
      'rgba(45, 57, 82, 0.5)',
      'rgba(45, 57, 82, 0.5)',
      'rgba(255, 255, 255, 0.0)'
    ],
  });
  const openModal = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const saveModal = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, -height],
    extrapolate: 'clamp',
  });


  const modalTrigger = () => {
    Animated.timing(animation, {
      toValue:1,
      duration:500,
      useNativeDriver:false
    }).start();
  };
  const close = () => {
    Animated.timing(animation, {
      toValue:0,
      duration:500,
      useNativeDriver:false
      
    }).start();
    setScanned(false);
  };
  
  const save=()=>{

    Animated.timing(animation,{
      toValue:2,
      duration: 500,
      useNativeDriver:false
    }).start(() =>{
      animation.setValue(0)
    });
    setScanned(false);
  };

  const open = {
    transform: [
      {scale:openModal},
      {translateY:saveModal}
    ]
  };
  

  


  return (
    <ImageBackground
      source={background}
      style={{width: '100%', height: '100%'}}
    > 
    
      <View style={styles.container}>
        <View style={styles.container, styles.center}>
          <Animated.View style={[styles.background, open]}>
            <View style={[styles.wrap,  styles.center]}>
            <Text style={styles.maintext }>QR Code: {text} {'\n'} Location: {location} {'\n'}</Text>
                <TouchableOpacity onPress={save} style={ styles.center}>
                  <Flatbutton text="Submit" />
                </TouchableOpacity>
                {scanned &&<TouchableOpacity onPress={close} style={ styles.center}>
                  <Flatbutton  text="Scan Again?" />
                </TouchableOpacity>}
               
              </View>
            </Animated.View>
        </View>
        <View style={styles.barcodebox}>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
          style={{height: 400, width: 400}} />
        </View>
        
        <TextInput 
          style={styles.input}
          placeholder= "Input Location"
          onChangeText={(val) => setLocation(val)}
        />
        
        <Flatbutton  text="Show Logs" style={styles.button} onPress={pressHandler}  />
        {/* {scanned && <Flatbutton  text="Scan Again?" onPress={() => setScanned(false)} />} */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  maintext: {
    textAlign: 'center', 
    fontSize: 16,
    margin: 10,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#338DCD',
  },
  barcodebox: {
    marginTop: -90,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#fff',
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
  wrap: {
    height: 300,
    width: 300,
    padding: 10,
    marginBottom: 300,
    borderRadius: 8,
    shadowColor: '#40488F',
    shadowOffset:{
      width: 8.4,
      height: 8.4
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation:10,
    zIndex: 2,
    backgroundColor: "white",
  }
  ,
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 250,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 2
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#41AD49',
    padding: 8,
    margin: 10,
    width: '75%',
    borderRadius: 8,
  }

  
});
