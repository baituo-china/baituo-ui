'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _progress = require('../../../lib/progress');

var _progress2 = _interopRequireDefault(_progress);

var _FormField2 = require('../field/FormField');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Progress = function (_FormField) {
    (0, _inherits3['default'])(Progress, _FormField);

    function Progress() {
        (0, _classCallCheck3['default'])(this, Progress);
        return (0, _possibleConstructorReturn3['default'])(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Progress, [{
        key: 'getValue',
        value: function getValue() {
            var value = (0, _get3['default'])(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), 'getValue', this).call(this);
            if ((0, _isNumber2['default'])(value)) {
                return value;
            }
            return this.props.percent;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(_progress2['default'], (0, _extends3['default'])({}, (0, _omit2['default'])(this.props, ['dataSet', 'showHelp', 'renderer']), { percent: this.getValue() }));
        }
    }]);
    return Progress;
}(_FormField2.FormField);
Progress.displayName = 'Progress';
Progress = tslib_1.__decorate([_mobxReact.observer], Progress);
exports['default'] = Progress;
module.exports = exports['default'];