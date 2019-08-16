'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _CheckBox = require('../check-box/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _localeContext = require('../locale-context');

var _TextField = require('../text-field/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _Select2 = require('../select/Select');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _EventManager = require('../_util/EventManager');

var _ViewComponent = require('../core/ViewComponent');

var _ViewComponent2 = _interopRequireDefault(_ViewComponent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TransferList = function (_Select) {
    (0, _inherits3['default'])(TransferList, _Select);

    function TransferList() {
        (0, _classCallCheck3['default'])(this, TransferList);
        return (0, _possibleConstructorReturn3['default'])(this, (TransferList.__proto__ || Object.getPrototypeOf(TransferList)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TransferList, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(TransferList.prototype.__proto__ || Object.getPrototypeOf(TransferList.prototype), 'getOtherProps', this).call(this), ['type', 'autoComplete', 'ref', 'body', 'footer', 'header', 'selected', 'onChange', 'onSelect', 'onSelectAll', 'onKeyDown']);
        }
    }, {
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return (0, _extends3['default'])({}, (0, _get3['default'])(TransferList.prototype.__proto__ || Object.getPrototypeOf(TransferList.prototype), 'getObservableProps', this).call(this, props, context), {
                header: props.header,
                footer: props.footer
            });
        }
    }, {
        key: 'getMenuPrefixCls',
        value: function getMenuPrefixCls() {
            return this.prefixCls + '-content';
        }
    }, {
        key: 'handleSelectAllChange',
        value: function handleSelectAllChange(value) {
            var onSelectAll = this.props.onSelectAll;

            if (onSelectAll) {
                onSelectAll(value ? this.filteredOptions : []);
            }
        }
    }, {
        key: 'handleClear',
        value: function handleClear() {
            this.setText(void 0);
        }
    }, {
        key: 'getHeaderSelected',
        value: function getHeaderSelected() {
            var length = this.filteredOptions.length,
                multiple = this.multiple,
                prefixCls = this.prefixCls,
                selectedLength = this.props.selected.length;

            var selectedText = selectedLength ? selectedLength + '/' : '';
            if (multiple) {
                return _react2['default'].createElement(
                    _CheckBox2['default'],
                    { disabled: this.isDisabled(), onChange: this.handleSelectAllChange, onFocus: _EventManager.stopPropagation, checked: !!length && length === selectedLength, indeterminate: !!selectedLength && length !== selectedLength },
                    _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-header-selected' },
                        '' + selectedText + length + (0, _localeContext.$l)('Transfer', 'items')
                    )
                );
            }
        }
    }, {
        key: 'getSearchField',
        value: function getSearchField() {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-body-search-wrapper' },
                _react2['default'].createElement(_TextField2['default'], { ref: this.elementReference, onInput: this.handleChange, onClear: this.handleClear, onKeyDown: this.handleKeyDown, suffix: _react2['default'].createElement(_icon2['default'], { type: 'search' }), clearButton: true })
            );
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var prefixCls = this.prefixCls,
                searchable = this.searchable,
                textField = this.textField,
                valueField = this.valueField,
                _props = this.props,
                selected = _props.selected,
                onSelect = _props.onSelect;

            var searchField = searchable && this.getSearchField();
            var classString = (0, _classnames2['default'])(prefixCls + '-body', (0, _defineProperty3['default'])({}, prefixCls + '-body-with-search', searchable));
            var selectedKeys = selected.map(function (record) {
                return (0, _Select2.getItemKey)(record, record.get(textField), record.get(valueField));
            });
            return _react2['default'].createElement(
                'div',
                { className: classString },
                searchField,
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-content-wrapper', onFocus: searchable ? _EventManager.stopPropagation : void 0 },
                    this.getMenu({ selectedKeys: selectedKeys, onClick: onSelect, focusable: !this.searchable })
                )
            );
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var _get$call;

            var prefixCls = this.prefixCls,
                header = this.header,
                footer = this.footer;

            return (0, _get3['default'])(TransferList.prototype.__proto__ || Object.getPrototypeOf(TransferList.prototype), 'getClassName', this).call(this, (_get$call = {}, (0, _defineProperty3['default'])(_get$call, prefixCls + '-with-header', header), (0, _defineProperty3['default'])(_get$call, prefixCls + '-with-footer', footer), _get$call));
        }
    }, {
        key: 'removeLastValue',
        value: function removeLastValue() {}
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            _ViewComponent2['default'].prototype.handleBlur.call(this, e);
        }
    }, {
        key: 'render',
        value: function render() {
            var header = this.header,
                footer = this.footer;

            return _react2['default'].createElement(
                'div',
                this.getOtherProps(),
                header,
                this.renderBody(),
                footer
            );
        }
    }, {
        key: 'popup',
        get: function get() {
            return true;
        }
    }, {
        key: 'header',
        get: function get() {
            var prefixCls = this.prefixCls,
                multiple = this.multiple,
                header = this.observableProps.header;

            if (multiple || header) {
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    this.getHeaderSelected(),
                    header && _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-header-title' },
                        header
                    )
                );
            }
        }
    }, {
        key: 'footer',
        get: function get() {
            var prefixCls = this.prefixCls,
                filteredOptions = this.filteredOptions,
                footer = this.observableProps.footer;

            if (footer) {
                return _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    footer(filteredOptions)
                );
            }
        }
    }]);
    return TransferList;
}(_Select2.Select);
tslib_1.__decorate([_mobx.computed], TransferList.prototype, "popup", null);
tslib_1.__decorate([_mobx.computed], TransferList.prototype, "header", null);
tslib_1.__decorate([_mobx.computed], TransferList.prototype, "footer", null);
tslib_1.__decorate([_autobind2['default']], TransferList.prototype, "handleSelectAllChange", null);
tslib_1.__decorate([_autobind2['default']], TransferList.prototype, "handleClear", null);
tslib_1.__decorate([_autobind2['default']], TransferList.prototype, "handleBlur", null);
TransferList = tslib_1.__decorate([_mobxReact.observer], TransferList);
exports['default'] = TransferList;
module.exports = exports['default'];