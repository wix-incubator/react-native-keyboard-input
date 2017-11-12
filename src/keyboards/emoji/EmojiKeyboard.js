import React, {PureComponent, PropTypes} from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import KeyboardRegistry from './../../KeyboardsRegistry';
import {getDataForFlatList, getCategories} from './EmojisData';

const EMOJIS_PER_COLUMN = 5;

class EmojiKeyboard extends PureComponent {

  static KeyboardName = 'EmojiKeyboard';

  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);

    this.state = {
      data: getDataForFlatList(EMOJIS_PER_COLUMN),
    };
  }

  onEmojiPress(emoji) {
    KeyboardRegistry.onItemSelected(EmojiKeyboard.KeyboardName, {
      emojiText: emoji.value,
    });
  }

  renderItem({item}) {
    const style = [styles.emojiButton, item.lastColumnInCategory && {marginRight: 20}];
    return item.data.map(emoji => {
      return (
        <TouchableOpacity style={style} key={emoji.value} onPress={() => this.onEmojiPress(emoji)}>
          <Text style={styles.emojiText}>{emoji.value}</Text>
        </TouchableOpacity>
      );
    });
  }

  renderCategoriesToolbar() {
    return (
      <View style={styles.bottomToolbar}>
        {
          getCategories(EMOJIS_PER_COLUMN).map((category) => {
            return (
              <TouchableOpacity
                style={{height: 30, alignItems: 'center', justifyContent: 'center'}}
                key={category.representingEmoji}
                onPress={() => {
                  const scrollIndex = Math.min(category.index, this.state.data.length - 1);
                  this.listRef.scrollToIndex({animated: false, index: scrollIndex});
                }}
              >
                <Text style={{paddingLeft: 10, paddingRight: 10}}>{category.representingEmoji}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  render() {
    return (
      <View style={styles.topContainer}>
        <FlatList
          ref={(ref) => {
            this.listRef = ref;
          }}
          removeClippedSubviews
          contentContainerStyle={styles.listContentContainer}
          renderItem={this.renderItem}
          data={this.state.data}
          horizontal
          keyExtractor={item => item.data[0].value}
          showsHorizontalScrollIndicator={false}
        />
        {this.renderCategoriesToolbar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  listContentContainer: {
    backgroundColor: 'white',
    marginLeft: 10,
    paddingBottom: 5,
  },
  emojiButton: {
    flexShrink: 1,
    width: 40,
    marginRight: 5,
    marginLeft: 2,
  },
  emojiText: {
    fontSize: 32,
  },
  bottomToolbar: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: 'rgb(245, 245, 245)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default EmojiKeyboard;
