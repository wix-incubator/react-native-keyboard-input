import _ from 'lodash';

const emojiData = [
  {
    title: 'Smileys & People',
    key: 'smileys_people',
    representingEmoji: '😀',
    data: [
      {
        name: 'grinning face',
        value: '😀',
      },
      {
        name: 'grinning face with open mouth',
        value: '😃',
      },
      {
        name: 'grinning face with squinting eyes',
        value: '😄',
      },
      {
        name: 'grinning face with smiling eyes',
        value: '😁',
      },
      {
        name: 'grinning face with tightly closed eyes',
        value: '😆',
      },
      {
        name: 'grinning face with squinting eyes and sweat drop',
        value: '😅',
      },
      {
        name: 'tears of joy',
        value: '😂',
      },
      {
        name: 'rolling on the floor laughing',
        value: '🤣',
      },
      {
        name: 'smiling face',
        value: '☺️',
      },
      {
        name: '😊️smiling face with squinting eyes',
        value: '😊',
      },
      {
        name: '😊️smiling face with halo',
        value: '😇',
      },
      {
        name: '😊️slightly smiling face',
        value: '🙂',
      },
      {
        name: 'upside down face',
        value: '🙃',
      },
      {
        name: 'winking face',
        value: '😉',
      },
      {
        name: 'relieved face',
        value: '😌',
      },
      {
        name: 'smiling face with heart-shaped eyes',
        value: '😍',
      },
      {
        name: 'face blowing a kiss',
        value: '😘',
      },
      {
        name: 'kissing face',
        value: '😗',
      },
      {
        name: 'kissing face with squinting eyes',
        value: '😙',
      },
      {
        name: 'kissing face with closed eyes',
        value: '😚',
      },
      {
        name: 'smiling face licking lips',
        value: '😋',
      },
      {
        name: 'winking face with stuck-out tongue',
        value: '😜',
      },
      {
        name: 'face with stuck out tongue and tightly-closed eyes',
        value: '😝',
      },
      {
        name: 'face with stuck-out tongue',
        value: '😛',
      },
      {
        name: 'money-mouth face',
        value: '🤑',
      },
      {
        name: 'happy face with hugging hands',
        value: '🤗',
      },
      {
        name: 'nerdy face',
        value: '🤓',
      },
      {
        name: 'smiling face with sunglasses',
        value: '😎',
      },
      {
        name: 'clown face',
        value: '🤡',
      },
      {
        name: 'cowboy face',
        value: '🤠',
      },
      {
        name: 'smirking face',
        value: '😏',
      },
      {
        name: 'unamused face',
        value: '😒',
      },
      {
        name: 'disappointed face',
        value: '😞',
      },
      {
        name: 'sad pensive face',
        value: '😔',
      },
      {
        name: 'worried face',
        value: '😟',
      },
      {
        name: 'confused face',
        value: '😕',
      },
      {
        name: 'slightly frowning face',
        value: '🙁',
      },
      {
        name: 'frowning face',
        value: '☹️',
      },
      {
        name: 'persevering face',
        value: '😣',
      },
      {
        name: 'confounded face',
        value: '😖',
      },
      {
        name: 'distraught face',
        value: '😫',
      },
      {
        name: 'weary face',
        value: '😩',
      },
      {
        name: 'huffing with anger face',
        value: '😤',
      },
      {
        name: 'angry face',
        value: '😠',
      },
      {
        name: 'pouting face',
        value: '😡',
      },
      {
        name: 'face without mouth',
        value: '😶',
      },
      {
        name: 'neutral face',
        value: '😐',
      },
      {
        name: 'expressionless face',
        value: '😑',
      },
      {
        name: 'surprised face',
        value: '😯',
      },
      {
        name: 'frowning face with open mouth',
        value: '😦',
      },
      {
        name: 'anguished face',
        value: '😧',
      },
      {
        name: 'surprised face with open mouth',
        value: '😮',
      },
      {
        name: 'astonished face',
        value: '😲',
      },
      {
        name: 'dizzy face',
        value: '😵',
      },
      {
        name: 'flushed face',
        value: '😳',
      },
      {
        name: 'face screaming in fear',
        value: '😱',
      },
      {
        name: 'fearful face',
        value: '😨',
      },
      {
        name: 'face with open mouth and cold sweat',
        value: '😰',
      },
      {
        name: 'crying face',
        value: '😢',
      },
      {
        name: 'disappointed but relieved face',
        value: '😥',
      },
      {
        name: 'drooling face',
        value: '🤤',
      },
      {
        name: 'loudly crying face',
        value: '😭',
      },
      {
        name: 'face with cold sweat',
        value: '😓',
      },
      {
        name: 'sleepy face',
        value: '😪',
      },
      {
        name: 'sleeping face',
        value: '😴',
      },
      {
        name: 'face with rolling eyes',
        value: '🙄',
      },
      {
        name: 'thinking face',
        value: '🤔',
      },
      {
        name: 'lying face',
        value: '🤥',
      },
      {
        name: 'grimacing face',
        value: '😬',
      },
      {
        name: 'face with a zipper mouth',
        value: '🤐',
      },
      {
        name: 'nauseated face',
        value: '🤢',
      },
      {
        name: 'sneezing face',
        value: '🤧',
      },
      {
        name: 'face with medical mask',
        value: '😷',
      },
      {
        name: 'face with thermometer',
        value: '🤒',
      },
      {
        name: 'face with head-bandage',
        value: '🤕',
      },
      {
        name: 'smiling face with horns',
        value: '😈',
      },
      {
        name: 'angry face with horns',
        value: '👿',
      },
      {
        name: 'ogre',
        value: '👹',
      },
      {
        name: 'goblin',
        value: '👺',
      },
      {
        name: 'pile of poop',
        value: '💩',
      },
      {
        name: 'ghost',
        value: '👻',
      },
      {
        name: 'skull',
        value: '💀',
      },
      {
        name: 'skull and crossbones',
        value: '☠️',
      },
      {
        name: 'alien',
        value: '👽',
      },
      {
        name: 'alien monster',
        value: '👾',
      },
      {
        name: 'robot face',
        value: '🤖',
      },
      {
        name: 'jack-o-lantern',
        value: '🎃',
      },
      {
        name: 'happy cat face',
        value: '😺',
      },
      {
        name: 'grinning cat face',
        value: '😸',
      },
      {
        name: 'cat face with tears of joy',
        value: '😹',
      },
      {
        name: 'smiling cat face with heart-shaped eyes',
        value: '😻',
      },
      {
        name: 'smirking cat face',
        value: '😼',
      },
      {
        name: 'kissing cat face',
        value: '😽',
      },
      {
        name: 'cat face screaming in fear',
        value: '🙀',
      },
      {
        name: 'crying cat face',
        value: '😿',
      },
      {
        name: 'pouting cat face',
        value: '😾',
      },
      {
        name: 'open hands',
        value: '👐',
      },
      {
        name: 'hands raised in celebration',
        value: '🙌',
      },
      {
        name: 'clapping hands',
        value: '👏',
      },
      {
        name: 'hands pressed together',
        value: '🙏',
      },
      {
        name: 'handshake',
        value: '🤝',
      },
      {
        name: 'thumbs up',
        value: '👍',
      },
      {
        name: 'thumbs down',
        value: '👎',
      },
      {
        name: 'closed fist',
        value: '👊',
      },
      {
        name: 'raised fist',
        value: '✊',
      },
      {
        name: 'left-facing fist',
        value: '🤛',
      },
      {
        name: 'right-facing fist',
        value: '🤜',
      },
      {
        name: 'fingers crossed',
        value: '🤞',
      },
      {
        name: 'victory hand',
        value: '✌️',
      },
      {
        name: 'sing of the horns',
        value: '🤘',
      },
      {
        name: 'OK hand sign',
        value: '👌',
      },
      {
        name: 'backhand index finger pointing left',
        value: '👈',
      },
      {
        name: 'backhand index finger pointing right',
        value: '👉',
      },
      {
        name: 'backhand index finger pointing up',
        value: '👆',
      },
      {
        name: 'backhand index finger pointing down',
        value: '👇',
      },
      {
        name: 'index finger pointing up',
        value: '☝️',
      },
      {
        name: 'raised hand',
        value: '✋',
      },
      {
        name: 'back of hand',
        value: '🤚',
      },
      {
        name: 'raised hand with fingers splayed',
        value: '🖐',
      },
      {
        name: 'hand with fingers split between middle and ring fingers',
        value: '🖖',
      },
      {
        name: 'waving hand',
        value: '👋',
      },
      {
        name: 'call me hand sign',
        value: '🤙',
      },
      {
        name: 'flexed bicep',
        value: '💪',
      },
      {
        name: 'middle finger',
        value: '🖕',
      },
      {
        name: 'writing hand',
        value: '✍️',
      },
      {
        name: 'selfie',
        value: '🤳',
      },
    ],
  },
  {
    title: 'Animals & Nature',
    key: 'animals_nature',
    representingEmoji: '🐶',
    data: [
      {
        name: 'dog face',
        value: '🐶',
      },
      {
        name: 'cat face',
        value: '🐱',
      },
      {
        name: 'mouse face',
        value: '🐭',
      },
      {
        name: 'hamster face',
        value: '🐹',
      },
      {
        name: 'rabbit face',
        value: '🐰',
      },
      {
        name: 'fox face',
        value: '🦊',
      },
      {
        name: 'bear face',
        value: '🐻',
      },
      {
        name: 'panda face',
        value: '🐼',
      },
      {
        name: 'koala face',
        value: '🐨',
      },
      {
        name: 'tiger face',
        value: '🐯',
      },
      {
        name: 'lion face',
        value: '🦁',
      },
      {
        name: 'cow face',
        value: '🐮',
      },
      {
        name: 'pig face',
        value: '🐷',
      },
      {
        name: 'pig nose',
        value: '🐽',
      },
      {
        name: 'frog face',
        value: '🐸',
      },
      {
        name: 'monkey face',
        value: '🐵',
      },
      {
        name: 'see-no-evil monkey',
        value: '🙈',
      },
      {
        name: 'hear-no-evil monkey',
        value: '🙉',
      },
      {
        name: 'speak-no-evil monkey',
        value: '🙊',
      },
      {
        name: 'monkey',
        value: '🐒',
      },
      {
        name: 'chicken',
        value: '🐔',
      },
      {
        name: 'penguin',
        value: '🐧',
      },
      {
        name: 'bird',
        value: '🐦',
      },
      {
        name: 'baby chick',
        value: '🐤',
      },
      {
        name: 'hatching chick',
        value: '🐣',
      },
      {
        name: 'standing chick',
        value: '🐥',
      },
      {
        name: 'duck',
        value: '🦆',
      },
      {
        name: 'eagle',
        value: '🦅',
      },
      {
        name: 'owl',
        value: '🦉',
      },
      {
        name: 'bat',
        value: '🦇',
      },
      {
        name: 'wolf',
        value: '🐺',
      },
      {
        name: 'boar',
        value: '🐗',
      },
      {
        name: 'horse head',
        value: '🐴',
      },
      {
        name: 'unicorn',
        value: '🦄',
      },
      {
        name: 'bee',
        value: '🐝',
      },
      {
        name: 'bug',
        value: '🐛',
      },
      {
        name: 'butterfly',
        value: '🦋',
      },
      {
        name: 'snail',
        value: '🐌',
      },
      {
        name: 'sea shell',
        value: '🐚',
      },
      {
        name: 'ladybug',
        value: '🐞',
      },
      {
        name: 'ant',
        value: '🐜',
      },
      {
        name: 'spider',
        value: '🕷',
      },
      {
        name: 'spiderweb',
        value: '🕸',
      },
      {
        name: 'turtle',
        value: '🐢',
      },
      {
        name: 'snake',
        value: '🐍',
      },
      {
        name: 'lizard',
        value: '🦎',
      },
      {
        name: 'scorpion',
        value: '🦂',
      },
      {
        name: 'crab',
        value: '🦀',
      },
      {
        name: 'squid',
        value: '🦑',
      },
      {
        name: 'octopus',
        value: '🐙',
      },
      {
        name: 'shrimp',
        value: '🦐',
      },
      {
        name: 'tropical fish',
        value: '🐠',
      },
      {
        name: 'fish',
        value: '🐟',
      },
      {
        name: 'blowfish',
        value: '🐡',
      },
      {
        name: 'dolphin',
        value: '🐬',
      },
      {
        name: 'shark',
        value: '🦈',
      },
      {
        name: 'spouting whale',
        value: '🐳',
      },
      {
        name: 'whale',
        value: '🐋',
      },
      {
        name: 'crocodile',
        value: '🐊',
      },
      {
        name: 'leopard',
        value: '🐆',
      },
      {
        name: 'tiger',
        value: '🐅',
      },
      {
        name: 'water buffalo',
        value: '🐃',
      },
      {
        name: 'ox',
        value: '🐂',
      },
      {
        name: 'cow',
        value: '🐄',
      },
      {
        name: 'deer',
        value: '🦌',
      },
      {
        name: 'camel',
        value: '🐪',
      },
      {
        name: 'two-hump camel',
        value: '🐫',
      },
      {
        name: 'elephant',
        value: '🐘',
      },
      {
        name: 'rhinoceros',
        value: '🦏',
      },
      {
        name: 'gorilla',
        value: '🦍',
      },
      {
        name: 'horse',
        value: '🐎',
      },
      {
        name: 'pig',
        value: '🐖',
      },
      {
        name: 'goat',
        value: '🐐',
      },
      {
        name: 'ram',
        value: '🐏',
      },
      {
        name: 'sheep',
        value: '🐑',
      },
      {
        name: 'dog',
        value: '🐕',
      },
      {
        name: 'poodle',
        value: '🐩',
      },
      {
        name: 'cat',
        value: '🐈',
      },
      {
        name: 'rooster',
        value: '🐓',
      },
      {
        name: 'turkey',
        value: '🦃',
      },
      {
        name: 'dove',
        value: '🕊',
      },
      {
        name: 'rabbit',
        value: '🐇',
      },
      {
        name: 'mouse',
        value: '🐁',
      },
      {
        name: 'rat',
        value: '🐀',
      },
      {
        name: 'chipmunk',
        value: '🐿',
      },
      {
        name: 'paw prints',
        value: '🐾',
      },
      {
        name: 'dragon',
        value: '🐉',
      },
      {
        name: 'dragon head',
        value: '🐲',
      },
      {
        name: 'cactus',
        value: '🌵',
      },
      {
        name: 'Christmas tree',
        value: '🎄',
      },
      {
        name: 'evergreen tree',
        value: '🌲',
      },
      {
        name: 'tree',
        value: '🌳',
      },
      {
        name: 'palm tree',
        value: '🌴',
      },
      {
        name: 'seedling',
        value: '🌱',
      },
      {
        name: 'herb',
        value: '🌿',
      },
      {
        name: 'shamrock',
        value: '☘️',
      },
      {
        name: 'four leaf clover',
        value: '🍀',
      },
      {
        name: 'pine decoration',
        value: '🎍',
      },
      {
        name: 'tanabata tree',
        value: '🎋',
      },
      {
        name: 'leaves fluttering in wind',
        value: '🍃',
      },
      {
        name: 'fallen leaves',
        value: '🍂',
      },
      {
        name: 'maple leaf',
        value: '🍁',
      },
      {
        name: 'mushroom',
        value: '🍄',
      },
      {
        name: 'ear of rice',
        value: '🌾',
      },
      {
        name: 'bouquet',
        value: '💐',
      },
      {
        name: 'tulip',
        value: '🌷',
      },
      {
        name: 'rose',
        value: '🌹',
      },
      {
        name: 'wilted rose',
        value: '🥀',
      },
      {
        name: 'sunflower',
        value: '🌻',
      },
      {
        name: 'flower',
        value: '🌼',
      },
      {
        name: 'cherry blossom',
        value: '🌸',
      },
      {
        name: 'hibiscus',
        value: '🌺',
      },
      {
        name: 'globe showing Americas',
        value: '🌎',
      },
      {
        name: 'globe showing Europe and Africa',
        value: '🌍',
      },
      {
        name: 'globe showing Asia and Australia',
        value: '🌏',
      },
      {
        name: 'full moon',
        value: '🌕',
      },
      {
        name: 'waning gibbous moon',
        value: '🌖',
      },
      {
        name: 'last quarter moon',
        value: '🌗',
      },
      {
        name: 'waning crescent moon',
        value: '🌘',
      },
      {
        name: 'new moon',
        value: '🌑',
      },
      {
        name: 'waxing crescent moon',
        value: '🌒',
      },
      {
        name: 'first quarter moon',
        value: '🌓',
      },
      {
        name: 'waxing gibbous moon',
        value: '🌔',
      },
      {
        name: 'new moon with face',
        value: '🌚',
      },
      {
        name: 'full moon with face',
        value: '🌝',
      },
      {
        name: 'sun with face',
        value: '🌞',
      },
      {
        name: 'first quarter moon with face',
        value: '🌛',
      },
      {
        name: 'last quarter moon with face',
        value: '🌜',
      },
      {
        name: 'crescent shape moon',
        value: '🌙',
      },
      {
        name: 'dizzy symbol',
        value: '💫',
      },
      {
        name: 'white medium star',
        value: '⭐️',
      },
      {
        name: 'glowing star',
        value: '🌟',
      },
      {
        name: 'sparkles',
        value: '✨',
      },
      {
        name: 'high voltage',
        value: '⚡️',
      },
      {
        name: 'fire',
        value: '🔥',
      },
      {
        name: 'collision',
        value: '💥',
      },
      {
        name: 'comet',
        value: '☄️',
      },
      {
        name: 'sun',
        value: '☀️',
      },
      {
        name: 'sun behind small cloud',
        value: '🌤',
      },
      {
        name: 'sun behind cloud',
        value: '⛅️',
      },
      {
        name: 'sun behind large cloud',
        value: '🌥',
      },
      {
        name: 'sun behind rain cloud',
        value: '🌦',
      },
      {
        name: 'rainbow',
        value: '🌈',
      },
      {
        name: 'cloud',
        value: '☁️',
      },
      {
        name: 'cloud with rain',
        value: '🌧',
      },
      {
        name: 'cloud with lightning and rain',
        value: '⛈',
      },
      {
        name: 'cloud with lightning',
        value: '🌩',
      },
      {
        name: 'cloud with snow',
        value: '🌨',
      },
      {
        name: 'snowman with snowflakes',
        value: '☃️',
      },
      {
        name: 'snowman',
        value: '⛄️',
      },
      {
        name: 'snowflake',
        value: '❄️',
      },
      {
        name: 'wind blowing face',
        value: '🌬',
      },
      {
        name: 'gust of wind',
        value: '💨',
      },
      {
        name: 'tornado',
        value: '🌪',
      },
      {
        name: 'fog',
        value: '🌫',
      },
      {
        name: 'wave',
        value: '🌊',
      },
      {
        name: 'droplet',
        value: '💧',
      },
      {
        name: 'sweat droplets',
        value: '💦',
      },
      {
        name: 'umbrella with rain drops',
        value: '☔️',
      },
    ],
  },
  {
    title: 'Food & Drink',
    key: 'food_drink',
    representingEmoji: '🍏',
    data: [
      {
        name: 'green apple',
        value: '🍏',
      },
      {
        name: 'red apple',
        value: '🍎',
      },
      {
        name: 'pear',
        value: '🍐',
      },
      {
        name: 'tangerine',
        value: '🍊',
      },
      {
        name: 'lemon',
        value: '🍋',
      },
      {
        name: 'banana',
        value: '🍌',
      },
      {
        name: 'watermelon',
        value: '🍉',
      },
      {
        name: 'grapes',
        value: '🍇',
      },
      {
        name: 'strawberry',
        value: '🍓',
      },
      {
        name: 'melon',
        value: '🍈',
      },
      {
        name: 'cherries',
        value: '🍒',
      },
      {
        name: 'peach',
        value: '🍑',
      },
      {
        name: 'pineapple',
        value: '🍍',
      },
      {
        name: 'kiwi',
        value: '🥝',
      },
      {
        name: 'avocado',
        value: '🥑',
      },
      {
        name: 'tomato',
        value: '🍅',
      },
      {
        name: 'eggplant',
        value: '🍆',
      },
      {
        name: 'cucumber',
        value: '🥒',
      },
      {
        name: 'carrot',
        value: '🥕',
      },
      {
        name: 'ear of corn',
        value: '🌽',
      },
      {
        name: 'hot pepper',
        value: '🌶',
      },
      {
        name: 'potato',
        value: '🥔',
      },
      {
        name: 'roasted sweet potato',
        value: '🍠',
      },
      {
        name: 'chestnut',
        value: '🌰',
      },
      {
        name: 'peanuts',
        value: '🥜',
      },
      {
        name: 'honey pot',
        value: '🍯',
      },
      {
        name: 'croissant',
        value: '🥐',
      },
      {
        name: 'bread',
        value: '🍞',
      },
      {
        name: 'baguette',
        value: '🥖',
      },
      {
        name: 'cheese wedge',
        value: '🧀',
      },
      {
        name: 'egg',
        value: '🥚',
      },
      {
        name: 'cooking',
        value: '🍳',
      },
      {
        name: 'bacon',
        value: '🥓',
      },
      {
        name: 'pancakes',
        value: '🥞',
      },
      {
        name: 'fried shrimp',
        value: '🍤',
      },
      {
        name: 'poultry leg',
        value: '🍗',
      },
      {
        name: 'meat on bone',
        value: '🍖',
      },
      {
        name: 'pizza',
        value: '🍕',
      },
      {
        name: 'hot dog',
        value: '🌭',
      },
      {
        name: 'hamburger',
        value: '🍔',
      },
      {
        name: 'french fries',
        value: '🍟',
      },
      {
        name: 'pita sandwich',
        value: '🥙',
      },
      {
        name: 'taco',
        value: '🌮',
      },
      {
        name: 'burrito',
        value: '🌯',
      },
      {
        name: 'green salad',
        value: '🥗',
      },
      {
        name: 'pan of food',
        value: '🥘',
      },
      {
        name: 'spaghetti',
        value: '🍝',
      },
      {
        name: 'steaming bowl',
        value: '🍜',
      },
      {
        name: 'pot of food',
        value: '🍲',
      },
      {
        name: 'fish cake with swirl design',
        value: '🍥',
      },
      {
        name: 'sushi',
        value: '🍣',
      },
      {
        name: 'bento box',
        value: '🍱',
      },
      {
        name: 'curry and rice',
        value: '🍛',
      },
      {
        name: 'cooked rice',
        value: '🍚',
      },
      {
        name: 'rice ball',
        value: '🍙',
      },
      {
        name: 'rice cracker',
        value: '🍘',
      },
      {
        name: 'oden',
        value: '🍢',
      },
      {
        name: 'dango',
        value: '🍡',
      },
      {
        name: 'shaved ice',
        value: '🍧',
      },
      {
        name: 'ice cream',
        value: '🍨',
      },
      {
        name: 'soft ice cream',
        value: '🍦',
      },
      {
        name: 'shortcake',
        value: '🍰',
      },
      {
        name: 'birthday cake',
        value: '🎂',
      },
      {
        name: 'custard',
        value: '🍮',
      },
      {
        name: 'lollipop',
        value: '🍭',
      },
      {
        name: 'candy',
        value: '🍬',
      },
      {
        name: 'chocolate bar',
        value: '🍫',
      },
      {
        name: 'popcorn',
        value: '🍿',
      },
      {
        name: 'doughnut',
        value: '🍩',
      },
      {
        name: 'cookie',
        value: '🍪',
      },
      {
        name: 'glass of milk',
        value: '🥛',
      },
      {
        name: 'baby bottle',
        value: '🍼',
      },
      {
        name: 'hot beverage',
        value: '☕️',
      },
      {
        name: 'teacup without handle',
        value: '🍵',
      },
      {
        name: 'sake bottle and cup',
        value: '🍶',
      },
      {
        name: 'beer mug',
        value: '🍺',
      },
      {
        name: 'clinking beer mugs',
        value: '🍻',
      },
      {
        name: 'clinking glasses',
        value: '🥂',
      },
      {
        name: 'wine glass',
        value: '🍷',
      },
      {
        name: 'tumbler glass',
        value: '🥃',
      },
      {
        name: 'cocktail glass',
        value: '🍸',
      },
      {
        name: 'tropical drink',
        value: '🍹',
      },
      {
        name: 'bottle with popping cork',
        value: '🍾',
      },
      {
        name: 'spoon',
        value: '🥄',
      },
      {
        name: 'fork and knife',
        value: '🍴',
      },
      {
        name: 'fork and knife with plate',
        value: '🍽',
      },
    ],
  },
  {
    title: 'Activity',
    key: 'activity',
    representingEmoji: '⚽',
    data: [
      {
        name: 'soccer ball',
        value: '⚽️',
      },
      {
        name: 'basketball',
        value: '🏀',
      },
      {
        name: 'american football',
        value: '🏈',
      },
      {
        name: 'baseball',
        value: '⚾️',
      },
      {
        name: 'tennis ball',
        value: '🎾',
      },
      {
        name: 'volleyball',
        value: '🏐',
      },
      {
        name: 'rugby football',
        value: '🏉',
      },
      {
        name: 'billiards',
        value: '🎱',
      },
      {
        name: 'table tennis paddle and ball',
        value: '🏓',
      },
      {
        name: 'badminton racquet and shuttlecock',
        value: '🏸',
      },
      {
        name: 'goal net',
        value: '🥅',
      },
      {
        name: 'ice hockey stick and puck',
        value: '🏒',
      },
      {
        name: 'field hockey stick and ball',
        value: '🏑',
      },
      {
        name: 'cricket bat and ball',
        value: '🏏',
      },
      {
        name: 'golf hole with flag',
        value: '⛳️',
      },
      {
        name: 'bow and arrow',
        value: '🏹',
      },
      {
        name: 'fishing pole and fish',
        value: '🎣',
      },
      {
        name: 'boxing glove',
        value: '🥊',
      },
      {
        name: 'martial arts uniform',
        value: '🥋',
      },
      {
        name: 'ice skate',
        value: '⛸',
      },
      {
        name: 'skis',
        value: '🎿',
      },
      {
        name: 'skier',
        value: '⛷',
      },
      {
        name: 'snowboarder',
        value: '🏂',
      },
      {
        name: 'weightlifter',
        value: '🏋️🏋‍',
      },
      {
        name: 'fencer',
        value: '🤺',
      },
      {
        name: 'women',
        value: '🤼',
      },
      {
        name: 'cartwheel',
        value: '🤸🏻️',
      },
      {
        name: 'running shirt',
        value: '🎽',
      },
      {
        name: 'sports medal',
        value: '🏅',
      },
      {
        name: 'military medal',
        value: '🎖',
      },
      {
        name: 'gold medal',
        value: '🥇',
      },
      {
        name: 'silver medal',
        value: '🥈',
      },
      {
        name: 'bronze medal',
        value: '🥉',
      },
      {
        name: 'trophy',
        value: '🏆',
      },
      {
        name: 'rosette',
        value: '🏵',
      },
      {
        name: 'reminder ribbon',
        value: '🎗',
      },
      {
        name: 'ticket',
        value: '🎫',
      },
      {
        name: 'admission ticket',
        value: '🎟',
      },
      {
        name: 'circus tent',
        value: '🎪',
      },
      {
        name: 'performing arts',
        value: '🎭',
      },
      {
        name: 'artist palette',
        value: '🎨',
      },
      {
        name: 'clapper board',
        value: '🎬',
      },
      {
        name: 'microphone',
        value: '🎤',
      },
      {
        name: 'headphone',
        value: '🎧',
      },
      {
        name: 'musical score',
        value: '🎼',
      },
      {
        name: 'musical keyboard',
        value: '🎹',
      },
      {
        name: 'drum',
        value: '🥁',
      },
      {
        name: 'saxophone',
        value: '🎷',
      },
      {
        name: 'trumpet',
        value: '🎺',
      },
      {
        name: 'guitar',
        value: '🎸',
      },
      {
        name: 'violin',
        value: '🎻',
      },
      {
        name: 'game die',
        value: '🎲',
      },
      {
        name: 'bulls eye',
        value: '🎯',
      },
      {
        name: 'bowling ball and pins',
        value: '🎳',
      },
      {
        name: 'video game controller',
        value: '🎮',
      },
      {
        name: 'slot machine',
        value: '🎰',
      },
    ],
  },
  {
    title: 'Travel & Places',
    key: 'travel_places',
    representingEmoji: '🚗',
    data: [
      {
        name: 'car',
        value: '🚗',
      },
      {
        name: 'taxi',
        value: '🚕',
      },
      {
        name: 'sport utility vehicle',
        value: '🚙',
      },
      {
        name: 'bus',
        value: '🚌',
      },
      {
        name: 'trolleybus',
        value: '🚎',
      },
      {
        name: 'racing car',
        value: '🏎',
      },
      {
        name: 'police car',
        value: '🚓',
      },
      {
        name: 'ambulance',
        value: '🚑',
      },
      {
        name: 'fire engine',
        value: '🚒',
      },
      {
        name: 'minibus',
        value: '🚐',
      },
      {
        name: 'delivery truck',
        value: '🚚',
      },
      {
        name: 'articulated lorry',
        value: '🚛',
      },
      {
        name: 'tractor',
        value: '🚜',
      },
      {
        name: 'scooter',
        value: '🛴',
      },
      {
        name: 'bicycle',
        value: '🚲',
      },
      {
        name: 'motor scooter',
        value: '🛵',
      },
      {
        name: 'motorcycle',
        value: '🏍',
      },
      {
        name: 'police car’s light',
        value: '🚨',
      },
      {
        name: 'oncoming police car',
        value: '🚔',
      },
      {
        name: 'oncoming bus',
        value: '🚍',
      },
      {
        name: 'oncoming car',
        value: '🚘',
      },
      {
        name: 'oncoming taxi',
        value: '🚖',
      },
      {
        name: 'aerial tramway',
        value: '🚡',
      },
      {
        name: 'mountain cableway',
        value: '🚠',
      },
      {
        name: 'suspension railway',
        value: '🚟',
      },
      {
        name: 'railway car',
        value: '🚃',
      },
      {
        name: 'tram car',
        value: '🚋',
      },
      {
        name: 'mountain railway',
        value: '🚞',
      },
      {
        name: 'monorail',
        value: '🚝',
      },
      {
        name: 'high-speed train',
        value: '🚄',
      },
      {
        name: 'high-speed train with bullet nose',
        value: '🚅',
      },
      {
        name: 'light rail',
        value: '🚈',
      },
      {
        name: 'steam locomotive',
        value: '🚂',
      },
      {
        name: 'train',
        value: '🚆',
      },
      {
        name: 'metro',
        value: '🚇',
      },
      {
        name: 'tram',
        value: '🚊',
      },
      {
        name: 'station',
        value: '🚉',
      },
      {
        name: 'helicopter',
        value: '🚁',
      },
      {
        name: 'small airplane',
        value: '🛩',
      },
      {
        name: 'airplane',
        value: '✈️',
      },
      {
        name: 'airplane taking off',
        value: '🛫',
      },
      {
        name: 'airplane landing',
        value: '🛬',
      },
      {
        name: 'rocket',
        value: '🚀',
      },
      {
        name: 'satellite',
        value: '🛰',
      },
      {
        name: 'seat',
        value: '💺',
      },
      {
        name: 'canoe',
        value: '🛶',
      },
      {
        name: 'sailboat',
        value: '⛵️',
      },
      {
        name: 'motor boat',
        value: '🛥',
      },
    ],
  },
  {
    title: 'Objects',
    key: 'objects',
    representingEmoji: '⌚',
    data: [
      {
        name: 'watch',
        value: '⌚️',
      },
      {
        name: 'mobile phone',
        value: '📱',
      },
      {
        name: 'phone with arrow',
        value: '📲',
      },
      {
        name: 'laptop',
        value: '💻',
      },
      {
        name: 'keyboard',
        value: '⌨️',
      },
      {
        name: 'desktop computer',
        value: '🖥',
      },
      {
        name: 'printer',
        value: '🖨',
      },
      {
        name: 'computer mouse',
        value: '🖱',
      },
      {
        name: 'trackball',
        value: '🖲',
      },
      {
        name: 'joystick',
        value: '🕹',
      },
      {
        name: 'clamp',
        value: '🗜',
      },
      {
        name: 'minidisc',
        value: '💽',
      },
      {
        name: 'floppy disk',
        value: '💾',
      },
      {
        name: 'cd',
        value: '💿',
      },
      {
        name: 'dvd',
        value: '📀',
      },
      {
        name: 'videocassette',
        value: '📼',
      },
      {
        name: 'camera',
        value: '📷',
      },
      {
        name: 'camera with flash',
        value: '📸',
      },
      {
        name: 'video camera',
        value: '📹',
      },
      {
        name: 'movie camera',
        value: '🎥',
      },
      {
        name: 'film projector',
        value: '📽',
      },
      {
        name: 'film frames',
        value: '🎞',
      },
      {
        name: 'telephone receiver',
        value: '📞',
      },
      {
        name: 'telephone',
        value: '☎️',
      },
      {
        name: 'pager',
        value: '📟',
      },
      {
        name: 'fax',
        value: '📠',
      },
      {
        name: 'television',
        value: '📺',
      },
      {
        name: 'radio',
        value: '📻',
      },
      {
        name: 'studio microphone',
        value: '🎙',
      },
      {
        name: 'level slider',
        value: '🎚',
      },
      {
        name: 'control knobs',
        value: '🎛',
      },
      {
        name: 'stopwatch',
        value: '⏱',
      },
      {
        name: 'timer clock',
        value: '⏲',
      },
      {
        name: 'alarm clock',
        value: '⏰',
      },
      {
        name: 'mantelpiece clock',
        value: '🕰',
      },
      {
        name: 'hourglass',
        value: '⌛️',
      },
      {
        name: 'hourglass with flowing sand',
        value: '⏳',
      },
      {
        name: 'satellite antenna',
        value: '📡',
      },
      {
        name: 'battery',
        value: '🔋',
      },
      {
        name: 'electric plug',
        value: '🔌',
      },
      {
        name: 'light bulb',
        value: '💡',
      },
      {
        name: 'flashlight',
        value: '🔦',
      },
      {
        name: 'candle',
        value: '🕯',
      },
      {
        name: 'wastebasket',
        value: '🗑',
      },
      {
        name: 'oil drum',
        value: '🛢',
      },
      {
        name: 'money with wings',
        value: '💸',
      },
      {
        name: 'dollar banknotes',
        value: '💵',
      },
      {
        name: 'yen banknotes',
        value: '💴',
      },
      {
        name: 'euro banknotes',
        value: '💶',
      },
      {
        name: 'pound banknotes',
        value: '💷',
      },
      {
        name: 'money bag',
        value: '💰',
      },
      {
        name: 'credit card',
        value: '💳',
      },
      {
        name: 'gem stone',
        value: '💎',
      },
      {
        name: 'scales',
        value: '⚖️',
      },
      {
        name: 'wrench',
        value: '🔧',
      },
      {
        name: 'hammer',
        value: '🔨',
      },
      {
        name: 'hammer and pick',
        value: '⚒',
      },
      {
        name: 'hammer and wrench',
        value: '🛠',
      },
      {
        name: 'pick',
        value: '⛏',
      },
      {
        name: 'nut and bolt',
        value: '🔩',
      },
      {
        name: 'gear',
        value: '⚙️',
      },
      {
        name: 'chains',
        value: '⛓',
      },
      {
        name: 'water pistol',
        value: '🔫',
      },
      {
        name: 'bomb',
        value: '💣',
      },
      {
        name: 'knife',
        value: '🔪',
      },
      {
        name: 'dagger',
        value: '🗡',
      },
      {
        name: 'crossed swords',
        value: '⚔️',
      },
      {
        name: 'shield',
        value: '🛡',
      },
      {
        name: 'cigarette',
        value: '🚬',
      },
      {
        name: 'coffin',
        value: '⚰️',
      },
      {
        name: 'funeral urn',
        value: '⚱️',
      },
      {
        name: 'amphora',
        value: '🏺',
      },
      {
        name: 'crystal ball',
        value: '🔮',
      },
      {
        name: 'prayer beads',
        value: '📿',
      },
      {
        name: 'barber pole',
        value: '💈',
      },
      {
        name: 'alembic',
        value: '⚗️',
      },
      {
        name: 'telescope',
        value: '🔭',
      },
      {
        name: 'microscope',
        value: '🔬',
      },
      {
        name: 'hole',
        value: '🕳',
      },
      {
        name: 'pill',
        value: '💊',
      },
      {
        name: 'syringe',
        value: '💉',
      },
      {
        name: 'thermometer',
        value: '🌡',
      },
      {
        name: 'toilet',
        value: '🚽',
      },
      {
        name: 'water faucet',
        value: '🚰',
      },
      {
        name: 'shower',
        value: '🚿',
      },
      {
        name: 'bathtub',
        value: '🛁',
      },
      {
        name: 'bellhop bell',
        value: '🛎',
      },
      {
        name: 'key',
        value: '🔑',
      },
      {
        name: 'old key',
        value: '🗝',
      },
      {
        name: 'door',
        value: '🚪',
      },
      {
        name: 'couch and lamp',
        value: '🛋',
      },
      {
        name: 'bed',
        value: '🛏',
      },
      {
        name: 'person sleeping',
        value: '🛌',
      },
      {
        name: 'frame with picture',
        value: '🖼',
      },
      {
        name: 'shopping bags',
        value: '🛍',
      },
      {
        name: 'shopping cart',
        value: '🛒',
      },
      {
        name: 'present',
        value: '🎁',
      },
      {
        name: 'balloon',
        value: '🎈',
      },
    ],
  },
  {
    title: 'Symbols',
    key: 'symbols',
    representingEmoji: '❤️',
    data: [
      {
        name: 'red heart',
        value: '❤️',
      },
      {
        name: 'yellow heart',
        value: '💛',
      },
      {
        name: 'green heart',
        value: '💚',
      },
      {
        name: 'blue heart',
        value: '💙',
      },
      {
        name: 'purple heart',
        value: '💜',
      },
      {
        name: 'black heart',
        value: '🖤',
      },
      {
        name: 'broken heart',
        value: '💔',
      },
      {
        name: 'red heart as an exclamation mark',
        value: '❣️️',
      },
      {
        name: 'two hearts',
        value: '️💕',
      },
      {
        name: 'revolving hearts',
        value: '💞',
      },
      {
        name: 'beating heart',
        value: '️💓',
      },
      {
        name: 'growing heart',
        value: '💗',
      },
      {
        name: 'sparkling heart',
        value: '💖',
      },
      {
        name: 'heart with arrow',
        value: '💘',
      },
      {
        name: 'heart with ribbon',
        value: '💝',
      },
    ],
  },
  {
    title: 'Flags',
    key: 'flags',
    representingEmoji: '🏴',
    data: [
      {
        name: 'white flag',
        value: '🏳',
      },
      {
        name: 'black flag',
        value: '🏴',
      },
      {
        name: 'chequered flag',
        value: '🏁',
      },
      {
        name: 'triangular flag on post',
        value: '️🚩',
      },
      {
        name: 'rainbow flag',
        value: '️🏳️‍🌈',
      },
      {
        name: 'flag of Afghanistan',
        value: '️🇦🇫',
      },
      {
        name: 'flag of Åland Islands',
        value: '️🇦🇽',
      },
      {
        name: 'flag of Albania',
        value: '️🇦🇱',
      },
      {
        name: 'flag of Algeria',
        value: '️🇩🇿',
      },
      {
        name: 'flag of American Samoa',
        value: '️🇦🇸',
      },
      {
        name: 'flag of Andorra',
        value: '️🇦🇩',
      },
      {
        name: 'flag of Angola',
        value: '🇦🇴️',
      },
      {
        name: 'flag of Anguilla',
        value: '🇦🇮️',
      },
    ],
  },
];

const numOfEmojis = () => _.sum(_.map(emojiData, value => value.data.length));

let cachedCategories = null;
const getCategories = (emojisPerColumn = 1) => {
  if (cachedCategories === null) {
    let categoryIndex = 0;
    cachedCategories = _.map(emojiData, (category) => {
      const retCategoty = {
        title: category.title,
        representingEmoji: category.representingEmoji,
        index: categoryIndex,
      };
      categoryIndex += Math.ceil(category.data.length / emojisPerColumn);
      return retCategoty;
    });
  }
  return cachedCategories;
};

const getDataForFlatList = (emojisPerColumn = 1) => {
  const newData = [];
  _.map(emojiData, (category) => {
    let emojiColumn = {data: []};
    _.map(category.data, (emoji, index) => {
      emojiColumn.data.push({...emoji, title: category.title, key: category.key});
      const categoryEnd = index + 1 === category.data.length;
      if (emojiColumn.data.length === emojisPerColumn || categoryEnd) {
        emojiColumn.lastColumnInCategory = categoryEnd;
        newData.push(emojiColumn);
        emojiColumn = {data: []};
      }
    });
  });
  return newData;
};

module.exports = {
  numOfEmojis,
  getDataForFlatList,
  getCategories,
};
