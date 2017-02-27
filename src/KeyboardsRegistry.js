import {AppRegistry} from 'react-native';

export default class KeyboardRegistry {
  static registeredKeyboards = {};

  static registerComponent = (conponentID, generator) => {
    KeyboardRegistry.registeredKeyboards[conponentID] = generator;
    AppRegistry.registerComponent(conponentID, generator);
  }

  static getComponent = (conponentID) => {
    const generator = KeyboardRegistry.registeredKeyboards[conponentID];
    if (!generator) {
      console.error(`KeyboardRegistry.getComponent: ${conponentID} used but not yet registered`);
      return undefined;
    }
    return generator();
  }
}
