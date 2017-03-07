import {AppRegistry} from 'react-native';
import _ from 'lodash';
import EventEmitterManager from './utils/EventEmitterManager';

/*
* Tech debt: how to deal with multiple registries in the app?
 */
export default class KeyboardRegistry {
  static registeredKeyboards = {};
  static eventEmitter = new EventEmitterManager();

  static registerComponent = (componentID, generator, params = {}) => {
    if (!_.isFunction(generator)) {
      console.error(`KeyboardRegistry.registerComponent: ${componentID} you must register a generator function`);//eslint-disable-line
      return;
    }
    KeyboardRegistry.registeredKeyboards[componentID] = {generator, params, componentID};
    AppRegistry.registerComponent(componentID, generator);
  };

  static getComponent = (componentID) => {
    const res = KeyboardRegistry.registeredKeyboards[componentID];
    if (!res || !res.generator) {
      console.error(`KeyboardRegistry.getComponent: ${componentID} used but not yet registered`);//eslint-disable-line
      return undefined;
    }
    return res.generator();
  };

  static getAllKeyboards = () => {
    return _.values(_.mapValues(KeyboardRegistry.registeredKeyboards, 'params'));
  };

  static addListener = (globalID, callback) => {
    KeyboardRegistry.eventEmitter.listenOn(globalID, callback);
  };

  static notifyListeners = (globalID, args) => {
    KeyboardRegistry.eventEmitter.emitEvent(globalID, args);
  };

  static removeListeners = (globalID) => {
    KeyboardRegistry.eventEmitter.removeListeners(globalID);
  };
}
