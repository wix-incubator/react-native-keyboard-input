import ReactNative, {NativeModules} from 'react-native';

const CustomKeyboardInput = NativeModules.CustomKeyboardInput;

export default class TextInputKeyboardManagerAndroid {

  static enterCustomKeyboardMode() {
      CustomKeyboardInput.enterCustomKeyboardMode();
  };

  static getKeyboardHeight() {
    return CustomKeyboardInput.getKeyboardHeight();
  }

  // static removeInputComponent = (textInputRef) => {
  //   if (!textInputRef || !CustomInputController) {
  //     return;
  //   }
  //   const reactTag = ReactNative.findNodeHandle(textInputRef);
  //   if (reactTag) {
  //     CustomInputController.resetInput(reactTag);
  //   }
  // };
}
