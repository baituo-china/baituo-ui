import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import RcSelect, { OptGroup, Option } from '../rc-components/select';
import { getPrefixCls } from '../configure';
var SelectPropTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(["default" /* default */, "large" /* large */, "small" /* small */]),
    combobox: PropTypes.bool,
    notFoundContent: PropTypes.any,
    showSearch: PropTypes.bool,
    optionLabelProp: PropTypes.string,
    transitionName: PropTypes.string,
    choiceTransitionName: PropTypes.string,
    showNotFindInputItem: PropTypes.bool,
    showNotFindSelectedItem: PropTypes.bool,
    filter: PropTypes.bool,
    showCheckAll: PropTypes.bool,
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    choiceRender: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    filterValue: PropTypes.string,
    onFilterChange: PropTypes.func,
    choiceRemove: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    onChoiceRemove: PropTypes.func,
    onClear: PropTypes.func
};
// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select() {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));

        _this.saveSelect = function (node) {
            _this.rcSelect = node;
        };
        _this.renderSelect = function (locale) {
            var _classNames;

            var _this$props = _this.props,
                customizePrefixCls = _this$props.prefixCls,
                _this$props$className = _this$props.className,
                className = _this$props$className === undefined ? '' : _this$props$className,
                size = _this$props.size,
                mode = _this$props.mode,
                restProps = _objectWithoutProperties(_this$props, ['prefixCls', 'className', 'size', 'mode']);

            var prefixCls = getPrefixCls('select', customizePrefixCls);
            var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === "large"), _defineProperty(_classNames, prefixCls + '-sm', size === "small"), _classNames), className);
            var optionLabelProp = _this.props.optionLabelProp;

            var isCombobox = mode === "combobox" /* combobox */;
            if (isCombobox) {
                // children 带 dom 结构时，无法填入输入框
                optionLabelProp = optionLabelProp || 'value';
            }
            var modeConfig = {
                multiple: mode === "multiple" /* multiple */
                , tags: mode === "tags" /* tags */
                , combobox: isCombobox
            };
            return React.createElement(RcSelect, _extends({}, restProps, modeConfig, { prefixCls: prefixCls, className: cls, optionLabelProp: optionLabelProp || 'children', filterPlaceholder: locale.filterPlaceholder, notFoundContent: _this.getNotFoundContent(locale), ref: _this.saveSelect }));
        };
        return _this;
    }

    _createClass(Select, [{
        key: 'focus',
        value: function focus() {
            this.rcSelect.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcSelect.blur();
        }
    }, {
        key: 'getNotFoundContent',
        value: function getNotFoundContent(locale) {
            var _props = this.props,
                notFoundContent = _props.notFoundContent,
                mode = _props.mode;

            var isCombobox = mode === "combobox" /* combobox */;
            if (isCombobox) {
                // AutoComplete don't have notFoundContent defaultly
                return notFoundContent === undefined ? null : notFoundContent;
            }
            return notFoundContent === undefined ? locale.notFoundContent : notFoundContent;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                LocaleReceiver,
                { componentName: 'Select', defaultLocale: defaultLocale.Select },
                this.renderSelect
            );
        }
    }]);

    return Select;
}(Component);

export default Select;

Select.displayName = 'Select';
Select.Option = Option;
Select.OptGroup = OptGroup;
Select.defaultProps = {
    blurChange: true,
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    filter: false,
    showCheckAll: true,
    choiceRemove: true,
    border: true
};
Select.propTypes = SelectPropTypes;