import ReactNative, {NativeModules} from 'react-native';

const CustomKeyboardInput = NativeModules.CustomKeyboardInput;

export default class TextInputKeyboardManagerAndroid {
  static reset() {
    CustomKeyboardInput.reset();
  }
}
