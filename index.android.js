import AwesomeProject from './demo/demoScreen';

import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('screens.star', () => AwesomeProject);
Navigation.registerComponent('screens.settings', () => AwesomeProject);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Key',
      screen: 'screens.star',
      icon: require('./demo/res/star.png')
    },
    // {
    //   label: 'Board',
    //   screen: 'screens.settings',
    //   icon: require('./demo/res/settings.png')
    // }
  ]
});
