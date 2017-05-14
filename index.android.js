import KeyboardAppScreen from './demo/demoScreen';
import DemoRootScreen from './demo/demoRoot';

import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('screens.star', () => KeyboardAppScreen);
Navigation.registerComponent('screens.settings', () => DemoRootScreen);
Navigation.registerComponent('screens.innerScreen', () => KeyboardAppScreen);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Main Tab',
      screen: 'screens.star',
      icon: require('./demo/res/star.png'),
      title: 'Main Tab'
    },
    {
      label: 'Second Tab',
      screen: 'screens.settings',
      icon: require('./demo/res/settings.png'),
      title: 'Secondary Tab'
    }
  ]
});
