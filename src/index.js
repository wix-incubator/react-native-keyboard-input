import TextInputKeyboardMangerIOS from './TextInputKeyboardMangerIOS';
import CustomKeyboardView from './CustomKeyboardView';
import KeyboardAccessoryView from './KeyboardAccessoryView';
import KeyboardRegistry from './KeyboardsRegistry';
import KeyboardUtils from './utils/KeyboardUtils';
import registerKeyboards from './keyboards';

registerKeyboards();

export {TextInputKeyboardMangerIOS, CustomKeyboardView, KeyboardRegistry, KeyboardAccessoryView, KeyboardUtils};
