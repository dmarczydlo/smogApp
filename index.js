import { AppRegistry } from 'react-native';
import App from './App';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Remote debugger is in a background']);

if (__DEV__) {
    require('react-devtools');
}

AppRegistry.registerComponent('smogApp', () => App);
