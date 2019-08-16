'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LazyRenderBox = function (_Component) {
    (0, _inherits3['default'])(LazyRenderBox, _Component);

    function LazyRenderBox() {
        (0, _classCallCheck3['default'])(this, LazyRenderBox);
        return (0, _possibleConstructorReturn3['default'])(this, (LazyRenderBox.__proto__ || Object.getPrototypeOf(LazyRenderBox)).apply(this, arguments));
    }

    (0, _createClass3['default'])(LazyRenderBox, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return !!nextProps.hiddenClassName || !nextProps.hidden;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                hiddenClassName = _props.hiddenClassName,
                hidden = _props.hidden,
                className = _props.className,
                otherProps = (0, _objectWithoutProperties3['default'])(_props, ['hiddenClassName', 'hidden', 'className']);

            var classString = (0, _classnames2['default'])(className, (0, _defineProperty3['default'])({}, hiddenClassName, hiddenClassName && hidden));
            return _react2['default'].createElement('div', (0, _extends3['default'])({ className: classString }, otherProps));
        }
    }]);
    return LazyRenderBox;
}(_react.Component);

exports['default'] = LazyRenderBox;
module.exports = exports['default'];