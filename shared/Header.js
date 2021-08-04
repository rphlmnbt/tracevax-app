import React from 'react';
import { StyleSheet, Text, View, Image, Div} from 'react-native';
import  logo  from '../assets/tracevax.png';

export default function Header({title }) {



    return (
        <View style={styles.header}> 
            
            <Image source={logo} style={styles.image} />

        </View>
      );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 0.5,
    aspectRatio: 1.75, 
    resizeMode: 'contain',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',

  },

 
});