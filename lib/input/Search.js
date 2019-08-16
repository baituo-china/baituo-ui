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

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Search = function (_Component) {
    (0, _inherits3['default'])(Search, _Component);

    function Search() {
        (0, _classCallCheck3['default'])(this, Search);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

        _this.onSearch = function () {
            var onSearch = _this.props.onSearch;

            if (onSearch) {
                onSearch(_this.input.input.value);
            }
            _this.input.focus();
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Search, [{
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('input-search', this.props.prefixCls);
        }
    }, {
        key: 'getButtonOrIcon',
        value: function getButtonOrIcon() {
            var _props = this.props,
                enterButton = _props.enterButton,
                size = _props.size;

            if (!enterButton) {
                return _react2['default'].createElement(_button2['default'], { type: 'primary', size: size, shape: 'circle', icon: 'search' });
            }
            var enterButtonAsElement = enterButton;
            if (enterButtonAsElement.type === _button2['default'] || enterButtonAsElement.type === 'button') {
                return (0, _react.cloneElement)(enterButtonAsElement, enterButtonAsElement.type === _button2['default'] ? {
                    className: this.getPrefixCls() + '-button',
                    size: size,
                    onClick: this.onSearch
                } : {
                    onClick: this.onSearch
                });
            }
            if (enterButton === true) {
                return _react2['default'].createElement(_button2['default'], { type: 'primary', size: size, shape: 'circle', onClick: this.onSearch, icon: 'search' });
            } else {
                return _react2['default'].createElement(
                    _button2['default'],
                    { type: 'primary', size: size, onClick: this.onSearch, key: 'enterButton' },
                    enterButton
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props2 = this.props,
                className = _props2.className,
                inputPrefixCls = _props2.inputPrefixCls,
                size = _props2.size,
                suffix = _props2.suffix,
                enterButton = _props2.enterButton,
                others = (0, _objectWithoutProperties3['default'])(_props2, ['className', 'inputPrefixCls', 'size', 'suffix', 'enterButton']);

            var prefixCls = this.getPrefixCls();
            delete others.onSearch;
            delete others.prefixCls;
            var buttonOrIcon = this.getButtonOrIcon();
            var searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
            var inputClassName = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-enter-button', !!enterButton), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + size, !!size), _classNames));
            return _react2['default'].createElement(_Input2['default'], (0, _extends3['default'])({ onPressEnter: this.onSearch }, others, { size: size, className: inputClassName, prefixCls: (0, _configure.getPrefixCls)('input', inputPrefixCls), suffix: searchSuffix, ref: this.saveInput }));
        }
    }]);
    return Search;
}(_react.Component);

exports['default'] = Search;

Search.displayName = 'Search';
Search.defaultProps = {
    enterButton: false,
    size: "small" /* small */
};
module.exports = exports['default'];