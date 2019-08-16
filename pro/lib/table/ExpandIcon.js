'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ExpandIcon = function (_Component) {
    (0, _inherits3['default'])(ExpandIcon, _Component);

    function ExpandIcon() {
        (0, _classCallCheck3['default'])(this, ExpandIcon);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ExpandIcon.__proto__ || Object.getPrototypeOf(ExpandIcon)).apply(this, arguments));

        _this.handleClick = function (e) {
            e.stopPropagation();
            _this.props.onChange(e);
        };
        return _this;
    }

    (0, _createClass3['default'])(ExpandIcon, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return !(0, _isEqual2['default'])(nextProps, this.props);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                expanded = _props.expanded,
                expandable = _props.expandable;

            var iconPrefixCls = prefixCls + '-expand-icon';
            var classString = (0, _classnames2['default'])(iconPrefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, iconPrefixCls + '-expanded', expanded), (0, _defineProperty3['default'])(_classNames, iconPrefixCls + '-spaced', !expandable), _classNames));
            return _react2['default'].createElement(_icon2['default'], { type: 'baseline-arrow_right', className: classString, onClick: expandable ? this.handleClick : void 0, tabIndex: expandable ? 0 : -1 });
        }
    }]);
    return ExpandIcon;
}(_react.Component);

exports['default'] = ExpandIcon;

ExpandIcon.propTypes = {
    expandable: _propTypes2['default'].bool,
    expanded: _propTypes2['default'].bool,
    onChange: _propTypes2['default'].func.isRequired
};
module.exports = exports['default'];