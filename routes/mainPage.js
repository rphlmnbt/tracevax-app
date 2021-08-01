import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import  QrPage  from '../Screens/QrScannerScreen';


const screens = {
    QrPage: {
        screen: QrPage
    },
    
}

const MainPage = createStackNavigator(screens);

export default createAppContainer(MainPage);
