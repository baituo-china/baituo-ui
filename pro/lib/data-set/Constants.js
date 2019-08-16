'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// 常量
var Constants = function Constants() {
  (0, _classCallCheck3['default'])(this, Constants);
};

exports['default'] = Constants;

Constants.DATE_JSON_FORMAT = 'YYYY-MM-DD HH:mm:ss';
Constants.DATE_FORMAT = 'YYYY-MM-DD';
Constants.DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
Constants.TIME_FORMAT = 'HH:mm:ss';
Constants.WEEK_FORMAT = 'YYYY-Wo';
Constants.MONTH_FORMAT = 'YYYY-MM';
Constants.YEAR_FORMAT = 'YYYY';
module.exports = exports['default'];