'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var KeyCode = function () {
  function KeyCode() {
    (0, _classCallCheck3['default'])(this, KeyCode);
  }

  (0, _createClass3['default'])(KeyCode, null, [{
    key: 'isTextModifyingKeyEvent',

    /*
     whether text and modified key is entered at the same time.
     */
    value: function isTextModifyingKeyEvent(e) {
      var keyCode = e.keyCode;
      if (e.altKey && !e.ctrlKey || e.metaKey ||
      // Function keys don't generate text
      keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
        return false;
      }
      // The following keys are quite harmless, even in combination with
      // CTRL, ALT or SHIFT.
      switch (keyCode) {
        case KeyCode.ALT:
        case KeyCode.CAPS_LOCK:
        case KeyCode.CONTEXT_MENU:
        case KeyCode.CTRL:
        case KeyCode.DOWN:
        case KeyCode.END:
        case KeyCode.ESC:
        case KeyCode.HOME:
        case KeyCode.INSERT:
        case KeyCode.LEFT:
        case KeyCode.MAC_FF_META:
        case KeyCode.META:
        case KeyCode.NUMLOCK:
        case KeyCode.NUM_CENTER:
        case KeyCode.PAGE_DOWN:
        case KeyCode.PAGE_UP:
        case KeyCode.PAUSE:
        case KeyCode.PRINT_SCREEN:
        case KeyCode.RIGHT:
        case KeyCode.SHIFT:
        case KeyCode.UP:
        case KeyCode.WIN_KEY:
        case KeyCode.WIN_KEY_RIGHT:
          return false;
        default:
          return true;
      }
    }
  }, {
    key: 'isCharacterKey',

    /*
     whether character is entered.
     */
    value: function isCharacterKey(keyCode) {
      if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
        return true;
      }
      if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
        return true;
      }
      if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
        return true;
      }
      // Safari sends zero key code for non-latin characters.
      if (keyCode === 0 && typeof window !== 'undefined' && window.navigator.userAgent.indexOf('WebKit') !== -1) {
        return true;
      }
      switch (keyCode) {
        case KeyCode.SPACE:
        case KeyCode.QUESTION_MARK:
        case KeyCode.NUM_PLUS:
        case KeyCode.NUM_MINUS:
        case KeyCode.NUM_PERIOD:
        case KeyCode.NUM_DIVISION:
        case KeyCode.SEMICOLON:
        case KeyCode.DASH:
        case KeyCode.EQUALS:
        case KeyCode.COMMA:
        case KeyCode.PERIOD:
        case KeyCode.SLASH:
        case KeyCode.APOSTROPHE:
        case KeyCode.SINGLE_QUOTE:
        case KeyCode.OPEN_SQUARE_BRACKET:
        case KeyCode.BACKSLASH:
        case KeyCode.CLOSE_SQUARE_BRACKET:
          return true;
        default:
          return false;
      }
    }
  }]);
  return KeyCode;
}();
/**
 * MAC_ENTER
 */


exports['default'] = KeyCode;
KeyCode.MAC_ENTER = 3;
/**
 * BACKSPACE
 */
KeyCode.BACKSPACE = 8;
/**
 * TAB
 */
KeyCode.TAB = 9;
/**
 * NUMLOCK on FF/Safari Mac
 */
KeyCode.NUM_CENTER = 12; // NUMLOCK on FF/Safari Mac
/**
 * ENTER
 */
KeyCode.ENTER = 13;
/**
 * SHIFT
 */
KeyCode.SHIFT = 16;
/**
 * CTRL
 */
KeyCode.CTRL = 17;
/**
 * ALT
 */
KeyCode.ALT = 18;
/**
 * PAUSE
 */
KeyCode.PAUSE = 19;
/**
 * CAPS_LOCK
 */
KeyCode.CAPS_LOCK = 20;
/**
 * ESC
 */
KeyCode.ESC = 27;
/**
 * SPACE
 */
KeyCode.SPACE = 32;
/**
 * PAGE_UP
 */
KeyCode.PAGE_UP = 33; // also NUM_NORTH_EAST
/**
 * PAGE_DOWN
 */
KeyCode.PAGE_DOWN = 34; // also NUM_SOUTH_EAST
/**
 * END
 */
KeyCode.END = 35; // also NUM_SOUTH_WEST
/**
 * HOME
 */
KeyCode.HOME = 36; // also NUM_NORTH_WEST
/**
 * LEFT
 */
KeyCode.LEFT = 37; // also NUM_WEST
/**
 * UP
 */
KeyCode.UP = 38; // also NUM_NORTH
/**
 * RIGHT
 */
KeyCode.RIGHT = 39; // also NUM_EAST
/**
 * DOWN
 */
KeyCode.DOWN = 40; // also NUM_SOUTH
/**
 * PRINT_SCREEN
 */
KeyCode.PRINT_SCREEN = 44;
/**
 * INSERT
 */
KeyCode.INSERT = 45; // also NUM_INSERT
/**
 * DELETE
 */
KeyCode.DELETE = 46; // also NUM_DELETE
/**
 * ZERO
 */
KeyCode.ZERO = 48;
/**
 * ONE
 */
KeyCode.ONE = 49;
/**
 * TWO
 */
KeyCode.TWO = 50;
/**
 * THREE
 */
KeyCode.THREE = 51;
/**
 * FOUR
 */
KeyCode.FOUR = 52;
/**
 * FIVE
 */
KeyCode.FIVE = 53;
/**
 * SIX
 */
KeyCode.SIX = 54;
/**
 * SEVEN
 */
KeyCode.SEVEN = 55;
/**
 * EIGHT
 */
KeyCode.EIGHT = 56;
/**
 * NINE
 */
KeyCode.NINE = 57;
/**
 * QUESTION_MARK
 */
KeyCode.QUESTION_MARK = 63; // needs localization
/**
 * A
 */
KeyCode.A = 65;
/**
 * B
 */
KeyCode.B = 66;
/**
 * C
 */
KeyCode.C = 67;
/**
 * D
 */
KeyCode.D = 68;
/**
 * E
 */
KeyCode.E = 69;
/**
 * F
 */
KeyCode.F = 70;
/**
 * G
 */
KeyCode.G = 71;
/**
 * H
 */
KeyCode.H = 72;
/**
 * I
 */
KeyCode.I = 73;
/**
 * J
 */
KeyCode.J = 74;
/**
 * K
 */
KeyCode.K = 75;
/**
 * L
 */
KeyCode.L = 76;
/**
 * M
 */
KeyCode.M = 77;
/**
 * N
 */
KeyCode.N = 78;
/**
 * O
 */
KeyCode.O = 79;
/**
 * P
 */
KeyCode.P = 80;
/**
 * Q
 */
KeyCode.Q = 81;
/**
 * R
 */
KeyCode.R = 82;
/**
 * S
 */
KeyCode.S = 83;
/**
 * T
 */
KeyCode.T = 84;
/**
 * U
 */
KeyCode.U = 85;
/**
 * V
 */
KeyCode.V = 86;
/**
 * W
 */
KeyCode.W = 87;
/**
 * X
 */
KeyCode.X = 88;
/**
 * Y
 */
KeyCode.Y = 89;
/**
 * Z
 */
KeyCode.Z = 90;
/**
 * META
 */
KeyCode.META = 91; // WIN_KEY_LEFT
/**
 * WIN_KEY_RIGHT
 */
KeyCode.WIN_KEY_RIGHT = 92;
/**
 * CONTEXT_MENU
 */
KeyCode.CONTEXT_MENU = 93;
/**
 * NUM_ZERO
 */
KeyCode.NUM_ZERO = 96;
/**
 * NUM_ONE
 */
KeyCode.NUM_ONE = 97;
/**
 * NUM_TWO
 */
KeyCode.NUM_TWO = 98;
/**
 * NUM_THREE
 */
KeyCode.NUM_THREE = 99;
/**
 * NUM_FOUR
 */
KeyCode.NUM_FOUR = 100;
/**
 * NUM_FIVE
 */
KeyCode.NUM_FIVE = 101;
/**
 * NUM_SIX
 */
KeyCode.NUM_SIX = 102;
/**
 * NUM_SEVEN
 */
KeyCode.NUM_SEVEN = 103;
/**
 * NUM_EIGHT
 */
KeyCode.NUM_EIGHT = 104;
/**
 * NUM_NINE
 */
KeyCode.NUM_NINE = 105;
/**
 * NUM_MULTIPLY
 */
KeyCode.NUM_MULTIPLY = 106;
/**
 * NUM_PLUS
 */
KeyCode.NUM_PLUS = 107;
/**
 * NUM_MINUS
 */
KeyCode.NUM_MINUS = 109;
/**
 * NUM_PERIOD
 */
KeyCode.NUM_PERIOD = 110;
/**
 * NUM_DIVISION
 */
KeyCode.NUM_DIVISION = 111;
/**
 * F1
 */
KeyCode.F1 = 112;
/**
 * F2
 */
KeyCode.F2 = 113;
/**
 * F3
 */
KeyCode.F3 = 114;
/**
 * F4
 */
KeyCode.F4 = 115;
/**
 * F5
 */
KeyCode.F5 = 116;
/**
 * F6
 */
KeyCode.F6 = 117;
/**
 * F7
 */
KeyCode.F7 = 118;
/**
 * F8
 */
KeyCode.F8 = 119;
/**
 * F9
 */
KeyCode.F9 = 120;
/**
 * F10
 */
KeyCode.F10 = 121;
/**
 * F11
 */
KeyCode.F11 = 122;
/**
 * F12
 */
KeyCode.F12 = 123;
/**
 * NUMLOCK
 */
KeyCode.NUMLOCK = 144;
/**
 * SEMICOLON
 */
KeyCode.SEMICOLON = 186; // needs localization
/**
 * DASH
 */
KeyCode.DASH = 189; // needs localization
/**
 * EQUALS
 */
KeyCode.EQUALS = 187; // needs localization
/**
 * COMMA
 */
KeyCode.COMMA = 188; // needs localization
/**
 * PERIOD
 */
KeyCode.PERIOD = 190; // needs localization
/**
 * SLASH
 */
KeyCode.SLASH = 191; // needs localization
/**
 * APOSTROPHE
 */
KeyCode.APOSTROPHE = 192; // needs localization
/**
 * SINGLE_QUOTE
 */
KeyCode.SINGLE_QUOTE = 222; // needs localization
/**
 * OPEN_SQUARE_BRACKET
 */
KeyCode.OPEN_SQUARE_BRACKET = 219; // needs localization
/**
 * BACKSLASH
 */
KeyCode.BACKSLASH = 220; // needs localization
/**
 * CLOSE_SQUARE_BRACKET
 */
KeyCode.CLOSE_SQUARE_BRACKET = 221; // needs localization
/**
 * WIN_KEY
 */
KeyCode.WIN_KEY = 224;
/**
 * MAC_FF_META
 */
KeyCode.MAC_FF_META = 224; // Firefox (Gecko) fires this for the meta key instead of 91
/**
 * WIN_IME
 */
KeyCode.WIN_IME = 229;
module.exports = exports['default'];