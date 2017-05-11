import ReactNative, {Keyboard, Platform, LayoutAnimation, NativeModules} from 'react-native';
import TextInputKeyboardMangerIOS from '../TextInputKeyboardMangerIOS';
import TextInputKeyboardManagerAndroid from '../TextInputKeyboardManagerAndroid';

const IsIOS = Platform.OS === 'ios';
let CustomInputController = null;

export default class KeyboardUtils {
  static dismiss = () => {
    Keyboard.dismiss();
    if (IsIOS) {
      TextInputKeyboardMangerIOS.dismissKeyboard();
    } else {
      TextInputKeyboardManagerAndroid.dismissKeyboard();
    }
  };

  static expandKeyboardForInput = (textInputRef, expand) => {
    if (IsIOS && textInputRef) {
      if (CustomInputController === null) {
        CustomInputController = NativeModules.CustomInputController;
      }
      const reactTag = ReactNative.findNodeHandle(textInputRef);
      LayoutAnimation.configureNext(springAnimation);
      if (expand) {
        CustomInputController.expandFullScreenForInput(reactTag);
      } else {
        CustomInputController.resetSizeForInput(reactTag);
      }
    }
  };
}

const springAnimation = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 1.0,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};
