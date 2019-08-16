import _typeof from 'babel-runtime/helpers/typeof';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, Component, isValidElement } from 'react';
import classNames from 'classnames';
import Select from '../select';
import Input from '../input';
import InputElement from './InputElement';
import { OptGroup, Option } from '../rc-components/select';
import { getPrefixCls } from '../configure';
function isSelectOptionOrSelectOptGroup(child) {
    return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

var AutoComplete = function (_Component) {
    _inherits(AutoComplete, _Component);

    function AutoComplete() {
        _classCallCheck(this, AutoComplete);

        var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).apply(this, arguments));

        _this.getInputElement = function () {
            var children = _this.props.children;

            var element = children && isValidElement(children) && children.type !== Option ? Children.only(_this.props.children) : React.createElement(Input, { border: false });
            var elementProps = _extends({}, element.props);
            delete elementProps.children;
            return React.createElement(
                InputElement,
                elementProps,
                element
            );
        };
        _this.saveSelect = function (node) {
            _this.select = node;
        };
        return _this;
    }

    _createClass(AutoComplete, [{
        key: 'focus',
        value: function focus() {
            this.select.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.select.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                size = _props.size,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                notFoundContent = _props.notFoundContent,
                customizePrefixCls = _props.prefixCls,
                optionLabelProp = _props.optionLabelProp,
                dataSource = _props.dataSource,
                children = _props.children;

            var prefixCls = getPrefixCls('select', customizePrefixCls);
            var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === "large"), _defineProperty(_classNames, prefixCls + '-sm', size === "small"), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-show-search', true), _defineProperty(_classNames, prefixCls + '-auto-complete', true), _classNames));
            var options = void 0;
            var childArray = Children.toArray(children);
            if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
                options = children;
            } else {
                options = dataSource ? dataSource.map(function (item) {
                    if (isValidElement(item)) {
                        return item;
                    }
                    switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
                        case 'string':
                            return React.createElement(
                                Option,
                                { key: item },
                                item
                            );
                        case 'object':
                            return React.createElement(
                                Option,
                                { key: item.value },
                                item.text
                            );
                        default:
                            throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
                    }
                }) : [];
            }
            return React.createElement(
                Select,
                _extends({}, this.props, { prefixCls: prefixCls, className: cls, mode: "combobox" /* combobox */, optionLabelProp: optionLabelProp, getInputElement: this.getInputElement, notFoundContent: notFoundContent, ref: this.saveSelect }),
                options
            );
        }
    }]);

    return AutoComplete;
}(Component);

export default AutoComplete;

AutoComplete.displayName = 'AutoComplete';
AutoComplete.Option = Option;
AutoComplete.OptGroup = OptGroup;
AutoComplete.defaultProps = {
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
    filterOption: false
};