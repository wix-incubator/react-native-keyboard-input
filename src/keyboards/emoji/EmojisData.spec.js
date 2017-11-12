import {numOfEmojis, getCategories} from './EmojisData';

describe('EmojisData', () => {
  it('should get the total number of emojis', () => {
    expect(numOfEmojis()).toEqual(478);
  });

  it('should get the categories', () => {
    expect(getCategories(5)).toEqual([
        {index: 0, representingEmoji: '😀', title: 'Smileys & People'},
        {index: 26, representingEmoji: '🐶', title: 'Animals & Nature'},
        {index: 58, representingEmoji: '🍏', title: 'Food & Drink'},
        {index: 76, representingEmoji: '⚽', title: 'Activity'},
        {index: 88, representingEmoji: '🚗', title: 'Travel & Places'},
        {index: 98, representingEmoji: '⌚', title: 'Objects'},
        {index: 118, representingEmoji: '❤️', title: 'Symbols'},
        {index: 121, representingEmoji: '🏴', title: 'Flags'},
    ]);
  });
});
