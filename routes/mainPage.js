import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import  QrPage  from '../Screens/QrScannerScreen';
import QrLogs from '../Screens/QrLogsScreen';

const screens = {
    QrPage: {
        screen: QrPage
    },
    QrLogs: {
        screen: QrLogs
    }
    
}

const MainPage = createStackNavigator(screens);

export default createAppContainer(MainPage);
