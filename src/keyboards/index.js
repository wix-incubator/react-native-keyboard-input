import KeyboardRegistry from './../KeyboardsRegistry';
import EmojiKeyboard from './emoji/EmojiKeyboard';

export default function registerKeyboards() {
  KeyboardRegistry.registerKeyboard(EmojiKeyboard.KeyboardName, () => EmojiKeyboard);
}
