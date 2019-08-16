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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _default = require('../locale-provider/default');

var _default2 = _interopRequireDefault(_default);

var _select = require('../rc-components/select');

var _select2 = _interopRequireDefault(_select);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SelectPropTypes = {
    prefixCls: _propTypes2['default'].string,
    className: _propTypes2['default'].string,
    size: _propTypes2['default'].oneOf(["default" /* default */, "large" /* large */, "small" /* small */]),
    combobox: _propTypes2['default'].bool,
    notFoundContent: _propTypes2['default'].any,
    showSearch: _propTypes2['default'].bool,
    optionLabelProp: _propTypes2['default'].string,
    transitionName: _propTypes2['default'].string,
    choiceTransitionName: _propTypes2['default'].string,
    showNotFindInputItem: _propTypes2['default'].bool,
    showNotFindSelectedItem: _propTypes2['default'].bool,
    filter: _propTypes2['default'].bool,
    showCheckAll: _propTypes2['default'].bool,
    footer: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].string]),
    choiceRender: _propTypes2['default'].func,
    loading: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
    filterValue: _propTypes2['default'].string,
    onFilterChange: _propTypes2['default'].func,
    choiceRemove: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].func]),
    onChoiceRemove: _propTypes2['default'].func,
    onClear: _propTypes2['default'].func
};
// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

var Select = function (_Component) {
    (0, _inherits3['default'])(Select, _Component);

    function Select() {
        (0, _classCallCheck3['default'])(this, Select);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));

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
                restProps = (0, _objectWithoutProperties3['default'])(_this$props, ['prefixCls', 'className', 'size', 'mode']);

            var prefixCls = (0, _configure.getPrefixCls)('select', customizePrefixCls);
            var cls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === "large"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === "small"), _classNames), className);
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
            return _react2['default'].createElement(_select2['default'], (0, _extends3['default'])({}, restProps, modeConfig, { prefixCls: prefixCls, className: cls, optionLabelProp: optionLabelProp || 'children', filterPlaceholder: locale.filterPlaceholder, notFoundContent: _this.getNotFoundContent(locale), ref: _this.saveSelect }));
        };
        return _this;
    }

    (0, _createClass3['default'])(Select, [{
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
            return _react2['default'].createElement(
                _LocaleReceiver2['default'],
                { componentName: 'Select', defaultLocale: _default2['default'].Select },
                this.renderSelect
            );
        }
    }]);
    return Select;
}(_react.Component);

exports['default'] = Select;

Select.displayName = 'Select';
Select.Option = _select.Option;
Select.OptGroup = _select.OptGroup;
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
module.exports = exports['default'];