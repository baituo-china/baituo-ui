import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Component } from 'react';
import classNames from 'classnames';
import Input from './Input';
import Button from '../button';
import { getPrefixCls as _getPrefixCls } from '../configure';

var Search = function (_Component) {
    _inherits(Search, _Component);

    function Search() {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

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

    _createClass(Search, [{
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
            return _getPrefixCls('input-search', this.props.prefixCls);
        }
    }, {
        key: 'getButtonOrIcon',
        value: function getButtonOrIcon() {
            var _props = this.props,
                enterButton = _props.enterButton,
                size = _props.size;

            if (!enterButton) {
                return React.createElement(Button, { type: 'primary', size: size, shape: 'circle', icon: 'search' });
            }
            var enterButtonAsElement = enterButton;
            if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
                return cloneElement(enterButtonAsElement, enterButtonAsElement.type === Button ? {
                    className: this.getPrefixCls() + '-button',
                    size: size,
                    onClick: this.onSearch
                } : {
                    onClick: this.onSearch
                });
            }
            if (enterButton === true) {
                return React.createElement(Button, { type: 'primary', size: size, shape: 'circle', onClick: this.onSearch, icon: 'search' });
            } else {
                return React.createElement(
                    Button,
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
                others = _objectWithoutProperties(_props2, ['className', 'inputPrefixCls', 'size', 'suffix', 'enterButton']);

            var prefixCls = this.getPrefixCls();
            delete others.onSearch;
            delete others.prefixCls;
            var buttonOrIcon = this.getButtonOrIcon();
            var searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
            var inputClassName = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-enter-button', !!enterButton), _defineProperty(_classNames, prefixCls + '-' + size, !!size), _classNames));
            return React.createElement(Input, _extends({ onPressEnter: this.onSearch }, others, { size: size, className: inputClassName, prefixCls: _getPrefixCls('input', inputPrefixCls), suffix: searchSuffix, ref: this.saveInput }));
        }
    }]);

    return Search;
}(Component);

export default Search;

Search.displayName = 'Search';
Search.defaultProps = {
    enterButton: false,
    size: "small" /* small */
};