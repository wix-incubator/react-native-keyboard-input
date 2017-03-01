import {AppRegistry} from 'react-native';
import _ from 'lodash';

/*
* Tech debt: how to deal with multiple registries in the app?
 */
export default class KeyboardRegistry {
  static registeredKeyboards = {};

  static registerComponent = (componentID, generator, params = {}) => {
    KeyboardRegistry.registeredKeyboards[componentID] = {generator, params, componentID};
    AppRegistry.registerComponent(componentID, generator);
  };

  static getComponent = (componentID) => {
    const {generator} = KeyboardRegistry.registeredKeyboards[componentID];
    if (!generator) {
      console.error(`KeyboardRegistry.getComponent: ${componentID} used but not yet registered`);//eslint-disable-line
      return undefined;
    }
    return generator();
  };

  static getAllKeyboards = () => {
    return _.values(_.mapValues(KeyboardRegistry.registeredKeyboards, 'params'));
  }
}
