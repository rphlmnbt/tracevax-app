import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import  QrPage  from '../Screens/QrScannerScreen';
import QrLogs from '../Screens/QrLogsScreen';

import React from 'react';

import Header from '../shared/Header';

import SubHeader from '../shared/subHeader';


const screens = {
    QrPage: {
        screen: QrPage,
         navigationOptions: ({  }) => {
      return {
        headerTitle: () => <Header/>
      }
    }
    },
    QrLogs: {
        screen: QrLogs,
        navigationOptions: ({  }) => {
          return {
            headerTitle: () => <SubHeader />
          }
        }
    }
    
}

const MainPage = createStackNavigator(screens);

export default createAppContainer(MainPage);
