import {AppRegistry} from 'react-native';
import _ from 'lodash';

export default class KeyboardRegistry {
  static registeredKeyboards = {};

  static registerComponent = (conponentID, generator, params = {}) => {
    KeyboardRegistry.registeredKeyboards[conponentID] = {generator, params, conponentID};
    AppRegistry.registerComponent(conponentID, generator);
  }

  static getComponent = (conponentID) => {
    const {generator} = KeyboardRegistry.registeredKeyboards[conponentID];
    if (!generator) {
      console.error(`KeyboardRegistry.getComponent: ${conponentID} used but not yet registered`);
      return undefined;
    }
    return generator();
  }

  static getAllKeyboards = () => {
    return _.values(_.mapValues(KeyboardRegistry.registeredKeyboards, 'params'));
  }
}
