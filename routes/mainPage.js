import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import  QrPage  from '../Screens/QrScannerScreen';
import QrLogs from '../Screens/QrLogsScreen';

import React from 'react';

import Header from '../shared/Header';



const screens = {
    QrPage: {
        screen: QrPage,
         navigationOptions: ({  }) => {
      return {
        headerTitle: () => <Header title='' />
      }
    }
    },
    QrLogs: {
        screen: QrLogs
    }
    
}

const MainPage = createStackNavigator(screens);

export default createAppContainer(MainPage);
