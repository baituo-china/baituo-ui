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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _choerodonUiFont = require('choerodon-ui-font');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Icon = function (_Component) {
    (0, _inherits3['default'])(Icon, _Component);

    function Icon() {
        (0, _classCallCheck3['default'])(this, Icon);
        return (0, _possibleConstructorReturn3['default'])(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Icon, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                type = _props.type,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className;

            var classString = (0, _classnames2['default'])('icon', 'icon-' + type, className);
            return _react2['default'].createElement('i', (0, _extends3['default'])({}, (0, _omit2['default'])(this.props, ['type', 'spin']), { className: classString }));
        }
    }]);
    return Icon;
}(_react.Component);

exports['default'] = Icon;

Icon.displayName = 'Icon';
Icon.icons = _choerodonUiFont.icons;
Icon.categories = _choerodonUiFont.categories;
module.exports = exports['default'];