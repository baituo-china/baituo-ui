'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _switch = require('../rc-components/switch');

var _switch2 = _interopRequireDefault(_switch);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Switch = function (_Component) {
    (0, _inherits3['default'])(Switch, _Component);

    function Switch() {
        (0, _classCallCheck3['default'])(this, Switch);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));

        _this.saveSwitch = function (node) {
            _this.rcSwitch = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Switch, [{
        key: 'focus',
        value: function focus() {
            this.rcSwitch.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcSwitch.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                customizePrefixCls = _props.prefixCls,
                size = _props.size,
                loading = _props.loading,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className;

            var prefixCls = (0, _configure.getPrefixCls)('switch', customizePrefixCls);
            var classes = (0, _classnames2['default'])(className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-small', size === "small"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-loading', loading), _classNames));
            return _react2['default'].createElement(_switch2['default'], (0, _extends3['default'])({}, (0, _omit2['default'])(this.props, ['loading']), { prefixCls: prefixCls, className: classes, ref: this.saveSwitch }));
        }
    }]);
    return Switch;
}(_react.Component);

exports['default'] = Switch;

Switch.displayName = 'Switch';
Switch.propTypes = {
    prefixCls: _propTypes2['default'].string,
    // size=default and size=large are the same
    size: _propTypes2['default'].oneOf(["small" /* small */, "default" /* default */, "large" /* large */]),
    className: _propTypes2['default'].string
};
module.exports = exports['default'];