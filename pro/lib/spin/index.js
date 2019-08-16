'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _spin = require('../../../lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _DataSetComponent2 = require('../data-set/DataSetComponent');

var _DataSetComponent3 = _interopRequireDefault(_DataSetComponent2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Spin = function (_DataSetComponent) {
    (0, _inherits3['default'])(Spin, _DataSetComponent);

    function Spin() {
        (0, _classCallCheck3['default'])(this, Spin);
        return (0, _possibleConstructorReturn3['default'])(this, (Spin.__proto__ || Object.getPrototypeOf(Spin)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Spin, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dataSet = _props.dataSet,
                otherProps = (0, _objectWithoutProperties3['default'])(_props, ['dataSet']);

            var props = {};
            if (dataSet) {
                props.spinning = dataSet.status !== "ready" /* ready */;
            }
            return _react2['default'].createElement(_spin2['default'], (0, _extends3['default'])({}, otherProps, props));
        }
    }]);
    return Spin;
}(_DataSetComponent3['default']);
Spin.displayName = 'Spin';
Spin = tslib_1.__decorate([_mobxReact.observer], Spin);
exports['default'] = Spin;
module.exports = exports['default'];