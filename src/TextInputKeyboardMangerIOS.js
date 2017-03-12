import ReactNative, {NativeModules} from 'react-native';

const CustomInputController = NativeModules.CustomInputController;

export default class TextInputKeyboardManagerIOS {

  static setInputComponent = (textInputRef, {component, initialProps}) => {
    if (!textInputRef || !CustomInputController) {
      return;
    }
    const reactTag = ReactNative.findNodeHandle(textInputRef);
    if (reactTag) {
      CustomInputController.presentCustomInputComponent(reactTag, {component, initialProps});
    }
  };

  static removeInputComponent = (textInputRef) => {
    if (!textInputRef || !CustomInputController) {
      return;
    }
    const reactTag = ReactNative.findNodeHandle(textInputRef);
    if (reactTag) {
      CustomInputController.resetInput(reactTag);
    }
  };
}
