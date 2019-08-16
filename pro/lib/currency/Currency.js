'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobxReact = require('mobx-react');

var _NumberField2 = require('../number-field/NumberField');

var _utils = require('../number-field/utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Currency = function (_NumberField) {
    (0, _inherits3['default'])(Currency, _NumberField);

    function Currency() {
        (0, _classCallCheck3['default'])(this, Currency);
        return (0, _possibleConstructorReturn3['default'])(this, (Currency.__proto__ || Object.getPrototypeOf(Currency)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Currency, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "currency" /* currency */;
        }
    }, {
        key: 'getFormatter',
        value: function getFormatter() {
            return _utils.formatCurrency;
        }
    }, {
        key: 'getFormatOptions',
        value: function getFormatOptions() {
            return {
                currency: this.getProp('currency')
            };
        }
    }]);
    return Currency;
}(_NumberField2.NumberField);
Currency.displayName = 'Currency';
Currency.format = _utils.formatCurrency;
Currency = tslib_1.__decorate([_mobxReact.observer], Currency);
exports['default'] = Currency;
module.exports = exports['default'];