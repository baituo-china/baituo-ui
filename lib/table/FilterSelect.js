'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VALUE_OR = undefined;

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

var _reactDom = require('react-dom');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _util = require('./util');

var _Checkbox = require('../checkbox/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Option = _select2['default'].Option,
    OptGroup = _select2['default'].OptGroup;

var PAIR_SPLIT = ':';
var VALUE_SPLIT = '、';
var OPTION_OR = 'option-or';
var VALUE_OR = exports.VALUE_OR = 'OR';
function pairValue(column) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var filters = column.filters;

    var found = filters && filters.find(function (filter) {
        return String(filter.value) === value;
    });
    return {
        key: '' + (0, _util.getColumnKey)(column) + PAIR_SPLIT + value,
        label: [column.filterTitle || column.title, PAIR_SPLIT, ' ', found ? found.text : value]
    };
}
function barPair(value, index) {
    return {
        key: '' + value + PAIR_SPLIT + index,
        label: [value]
    };
}
function removeDoubleOr(filters) {
    return filters.filter(function (_ref, index) {
        var label = _ref.label;
        return label !== VALUE_OR || label !== filters[index + 1];
    });
}

var FilterSelect = function (_Component) {
    (0, _inherits3['default'])(FilterSelect, _Component);

    function FilterSelect() {
        (0, _classCallCheck3['default'])(this, FilterSelect);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (FilterSelect.__proto__ || Object.getPrototypeOf(FilterSelect)).apply(this, arguments));

        _this.state = {
            columns: _this.getColumnsWidthFilters(),
            filters: _this.props.filters || [],
            columnFilters: _this.props.columnFilters || {},
            inputValue: '',
            selectColumn: undefined,
            checked: []
        };
        _this.columnRefs = {};
        _this.handleDropdownMouseDown = function (e) {
            e.preventDefault();
            _this.rcSelect.focus();
        };
        _this.saveRef = function (node) {
            if (node) {
                _this.rcSelect = node.rcSelect;
            }
        };
        _this.saveColumnRef = function (key, node) {
            if (node) {
                _this.columnRefs[key] = node;
            }
        };
        _this.handleInputKeyDown = function (e) {
            var value = e.target.value;

            if (e.keyCode === 13 && !e.isDefaultPrevented() && value) {
                var _this$state = _this.state,
                    filters = _this$state.filters,
                    columnFilters = _this$state.columnFilters,
                    selectColumn = _this$state.selectColumn;

                if (selectColumn) {
                    var key = (0, _util.getColumnKey)(selectColumn);
                    if (key) {
                        var columFilters = selectColumn.filters;

                        var filterText = columnFilters[key] = value.split(_this.getColumnTitle(selectColumn)).slice(1);
                        var found = columFilters && columFilters.find(function (filter) {
                            return filter.text === filterText[0];
                        });
                        var filterValue = found ? String(found.value) : filterText[0];
                        _this.fireColumnFilterChange(key, [filterValue]);
                    }
                } else {
                    filters.push(value);
                    _this.fireChange(filters);
                }
                _this.setState({
                    inputValue: '',
                    filters: filters,
                    columnFilters: columnFilters,
                    selectColumn: undefined
                });
                _this.rcSelect.setState({
                    inputValue: ''
                });
            }
        };
        _this.handleInput = function (value) {
            var selectColumn = _this.state.selectColumn;

            if (selectColumn) {
                if (value.indexOf(_this.getColumnTitle(selectColumn)) === -1) {
                    selectColumn = undefined;
                }
            }
            _this.setState({
                selectColumn: selectColumn,
                inputValue: value
            });
        };
        _this.handleChoiceItemClick = function (_ref2) {
            var key = _ref2.key;

            var pair = key.split(PAIR_SPLIT);
            if (pair.length > 1) {
                var columnKey = pair.shift();
                var selectColumn = _this.findColumn(columnKey);
                if (selectColumn && selectColumn.filterMultiple) {
                    var filters = selectColumn.filters;

                    var checked = pair.join(PAIR_SPLIT).split(VALUE_SPLIT).map(function (text) {
                        var found = filters && filters.find(function (filter) {
                            return filter.text === text;
                        });
                        return found ? found.value : text;
                    });
                    _this.setState({
                        selectColumn: selectColumn,
                        checked: checked
                    });
                }
            }
        };
        _this.handleSelect = function (_ref3) {
            var key = _ref3.key;
            var _this$state2 = _this.state,
                checked = _this$state2.checked,
                selectColumn = _this$state2.selectColumn;

            if (key === '__ok__') {
                _this.handleMultiCheckConfirm();
            } else if (key !== (selectColumn && selectColumn.title) + ':') {
                var index = checked.indexOf(key);
                if (index === -1) {
                    checked.push(key);
                } else {
                    checked.splice(index, 1);
                }
                _this.setState({
                    checked: checked
                }, function () {
                    if (selectColumn) {
                        var columnFilters = _this.state.columnFilters;

                        var columnKey = (0, _util.getColumnKey)(selectColumn);
                        if (columnKey) {
                            var filters = columnFilters[columnKey];
                            if (!filters || !filters.length) {
                                _this.rcSelect.setState({
                                    inputValue: _this.getColumnTitle(selectColumn)
                                });
                            }
                        }
                    }
                });
            }
            return false;
        };
        _this.handleMultiCheckConfirm = function () {
            var _this$state3 = _this.state,
                selectColumn = _this$state3.selectColumn,
                checked = _this$state3.checked;

            if (selectColumn) {
                var columnKey = (0, _util.getColumnKey)(selectColumn);
                if (columnKey) {
                    _this.fireColumnFilterChange(columnKey, checked);
                    _this.setState({
                        selectColumn: undefined,
                        checked: []
                    });
                    _this.rcSelect.setState({
                        inputValue: ''
                    });
                }
            }
        };
        _this.handleClear = function () {
            _this.setState({ selectColumn: undefined });
        };
        _this.handleChange = function (changedValue) {
            var state = _this.state,
                rcSelect = _this.rcSelect;
            var selectColumn = state.selectColumn,
                inputValue = state.inputValue;
            var filters = state.filters,
                columnFilters = state.columnFilters;

            var all = _this.getValue();
            var change = false;
            if (changedValue.length > all.length) {
                var value = changedValue.pop();
                if (inputValue) {
                    if (rcSelect.state.inputValue && value) {
                        change = true;
                        filters.push(value.label);
                    }
                    _this.setState({
                        selectColumn: undefined,
                        inputValue: '',
                        filters: filters
                    });
                } else if (value && value.label === OPTION_OR) {
                    filters.push(VALUE_OR);
                    change = true;
                    _this.setState({
                        filters: filters
                    });
                } else if (selectColumn) {
                    if (!selectColumn.filterMultiple) {
                        var columnKey = (0, _util.getColumnKey)(selectColumn);
                        if (rcSelect.state.inputValue && value && columnKey) {
                            _this.fireColumnFilterChange(columnKey, [value.key]);
                        }
                        _this.setState({
                            selectColumn: undefined
                        });
                    } else {
                        _this.setState({
                            selectColumn: undefined,
                            checked: []
                        });
                        rcSelect.setState({
                            inputValue: ''
                        });
                    }
                } else if (value) {
                    var column = _this.findColumn(value.key);
                    var columnFilter = columnFilters[value.key];
                    if (column && (!columnFilter || !columnFilter.length)) {
                        rcSelect.setState({
                            inputValue: _this.getColumnTitle(column)
                        });
                    }
                    _this.setState({
                        selectColumn: column
                    });
                }
            } else {
                filters = _this.changeValue(changedValue, rcSelect.state.value);
                if (_this.state.filters.length !== filters.length) {
                    change = true;
                }
                _this.setState({
                    inputValue: '',
                    filters: filters
                });
            }
            if (change) {
                _this.fireChange(filters);
            }
        };
        _this.toValueString = function (item) {
            var key = Object.keys(item)[0];
            var col = _this.findColumn(key);
            if (col) {
                return pairValue(col, item[key]);
            } else {
                return '';
            }
        };
        _this.getRootDomNode = function () {
            return (0, _reactDom.findDOMNode)(_this).querySelector('.' + (0, _configure.getPrefixCls)('select') + '-search__field');
        };
        return _this;
    }

    (0, _createClass3['default'])(FilterSelect, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                columns: this.getColumnsWidthFilters(nextProps)
            });
            if (nextProps.filters) {
                this.setState({
                    filters: nextProps.filters
                });
            }
            if (nextProps.columnFilters) {
                this.setState({
                    columnFilters: nextProps.columnFilters
                });
            }
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return this.props.prefixCls + '-filter-select';
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.getPrefixCls();
            var multiple = this.isMultiple();
            return _react2['default'].createElement(
                'div',
                { className: prefixCls },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-icon' },
                    _react2['default'].createElement(_icon2['default'], { type: 'filter_list' })
                ),
                _react2['default'].createElement(
                    _select2['default'],
                    { ref: this.saveRef, mode: "tags" /* tags */, filterOption: false, onChange: this.handleChange, onSelect: multiple ? this.handleSelect : undefined, onInput: this.handleInput, onInputKeyDown: this.handleInputKeyDown, onClear: this.handleClear, value: this.getValue(), placeholder: this.props.placeholder, notFoundContent: false, showNotFindInputItem: false, showNotFindSelectedItem: false, dropdownMatchSelectWidth: false, defaultActiveFirstOption: !this.state.inputValue, dropdownStyle: { minWidth: 256 }, onDropdownMouseDown: this.handleDropdownMouseDown, dropdownClassName: prefixCls + '-dropdown', getRootDomNode: this.getRootDomNode, showCheckAll: false, onChoiceItemClick: this.handleChoiceItemClick, getPopupContainer: this.props.getPopupContainer, allowClear: true, labelInValue: true, blurChange: false, border: false },
                    this.getOptions()
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-columns' },
                    this.renderColumnsTitle()
                )
            );
        }
    }, {
        key: 'renderColumnsTitle',
        value: function renderColumnsTitle() {
            var _this2 = this;

            this.columnRefs = {};
            return this.state.columns.map(function (col) {
                var key = (0, _util.getColumnKey)(col);
                return _react2['default'].createElement(
                    'span',
                    { ref: _this2.saveColumnRef.bind(_this2, key), key: key },
                    col.filterTitle || col.title
                );
            });
        }
    }, {
        key: 'isMultiple',
        value: function isMultiple() {
            var selectColumn = this.state.selectColumn;

            if (selectColumn) {
                return selectColumn.filterMultiple;
            }
            return false;
        }
    }, {
        key: 'fireChange',
        value: function fireChange(filters) {
            var onChange = this.props.onChange;

            if (typeof onChange === 'function') {
                onChange(filters);
            }
        }
    }, {
        key: 'fireColumnFilterChange',
        value: function fireColumnFilterChange(columnKey, value) {
            var col = this.findColumn(columnKey);
            var onFilter = this.props.onFilter;

            if (col && onFilter) {
                onFilter(col, value || null);
            }
        }
    }, {
        key: 'changeValue',
        value: function changeValue(changedValue, oldValue) {
            var _this3 = this;

            var state = this.state;

            var changedColumnKeys = [];
            var changedColumnFilters = state.columnFilters;
            var columnFiltersValues = this.getColumnFiltersValues();
            if (changedValue.length) {
                var len = columnFiltersValues.length;
                if (len > 0) {
                    var index = oldValue.findIndex(function (item, i) {
                        return item !== (changedValue[i] && changedValue[i].key);
                    });
                    if (index < columnFiltersValues.length) {
                        var deleted = changedValue.splice(0, len - 1);
                        if (deleted.length < 2 && changedValue[0] && changedValue[0].label === VALUE_OR) {
                            changedValue.shift();
                        }
                        var value = columnFiltersValues[index];
                        if (value === VALUE_OR) {
                            value = columnFiltersValues[index + 1];
                        }
                        var columnKey = Object.keys(value)[0];
                        var columnFilters = changedColumnFilters[columnKey].slice();
                        var column = this.findColumn(columnKey);
                        if (column) {
                            var filters = column.filters;

                            value[columnKey].split(VALUE_SPLIT).forEach(function (text) {
                                var found = filters && filters.find(function (filter) {
                                    return filter.text === text;
                                });
                                var filterIndex = columnFilters.indexOf(found ? found.value : text);
                                if (filterIndex !== -1) {
                                    columnFilters.splice(filterIndex, 1);
                                    changedColumnFilters[columnKey] = columnFilters;
                                    if (changedColumnKeys.indexOf(columnKey) === -1) {
                                        changedColumnKeys.push(columnKey);
                                    }
                                }
                            });
                        }
                    } else {
                        changedValue.splice(0, len);
                    }
                }
                changedColumnKeys.forEach(function (key) {
                    _this3.fireColumnFilterChange(key, changedColumnFilters[key]);
                });
            } else {
                var onClear = this.props.onClear;

                if (onClear) {
                    onClear();
                }
            }
            return removeDoubleOr(changedValue).map(function (item) {
                var label = item.label;
                if (label.constructor === Array) {
                    return label && label[0];
                }
                return label;
            });
        }
    }, {
        key: 'getColumnFiltersValues',
        value: function getColumnFiltersValues() {
            var _this4 = this;

            var values = [];
            var columnFilters = this.state.columnFilters;

            Object.keys(columnFilters).forEach(function (c) {
                var filteredValue = columnFilters[c];
                var column = _this4.findColumn(c);
                if (filteredValue && filteredValue.length && column) {
                    var filters = column.filters;

                    values.push((0, _defineProperty3['default'])({}, c, filteredValue.map(function (value) {
                        var found = filters && filters.find(function (filter) {
                            return String(filter.value) === String(value);
                        });
                        return found ? found.text : value;
                    }).join(VALUE_SPLIT)));
                }
            });
            return values;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var filters = this.state.filters;

            return this.getColumnFiltersValues().map(this.toValueString).concat(filters.map(barPair));
        }
    }, {
        key: 'getInputFilterOptions',
        value: function getInputFilterOptions(inputValue) {
            var _props = this.props,
                columns = _props.columns,
                dataSource = _props.dataSource;

            var options = [];
            if (dataSource && columns) {
                var values = {};
                (0, _util.filterByInputValue)(dataSource, columns, inputValue, function (record, column) {
                    var dataIndex = column.dataIndex;

                    if (dataIndex) {
                        var value = record[dataIndex].toString();
                        if (!values[value]) {
                            values[value] = true;
                            options.push(_react2['default'].createElement(
                                Option,
                                { key: value, value: value },
                                value
                            ));
                        }
                    }
                });
            }
            return options;
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            var _this5 = this;

            var _state = this.state,
                selectColumn = _state.selectColumn,
                inputValue = _state.inputValue,
                columns = _state.columns,
                checked = _state.checked,
                columnFilters = _state.columnFilters;

            if (selectColumn) {
                if (inputValue && inputValue.split(PAIR_SPLIT)[1]) {
                    return null;
                }
                var filters = selectColumn.filters,
                    filterMultiple = selectColumn.filterMultiple;

                var columnKey = (0, _util.getColumnKey)(selectColumn);
                if (filters) {
                    return filters.filter(function (filter) {
                        return !filter.children;
                    }).map(function (filter, i) {
                        var value = String(filter.value);
                        var text = filter.text;
                        if (filterMultiple && columnKey) {
                            var _checked = columnFilters[columnKey];
                            if (_checked && !checked.length) {
                                _this5.state.checked = _checked.slice();
                            } else {
                                _checked = checked;
                            }
                            text = [_react2['default'].createElement(_Checkbox2['default'], { key: 'ck', className: 'multiple', checked: _checked.indexOf(value) !== -1 }), text];
                        }
                        return _react2['default'].createElement(
                            Option,
                            { key: 'filter-' + i, value: value },
                            text
                        );
                    }).concat(filterMultiple ? _react2['default'].createElement(
                        OptGroup,
                        { key: 'ok' },
                        _react2['default'].createElement(
                            Option,
                            { value: '__ok__', className: this.getPrefixCls() + '-ok-btn' },
                            '\u786E\u8BA4'
                        )
                    ) : []);
                }
            } else if (inputValue) {
                return this.getInputFilterOptions(inputValue);
            } else {
                var _filters = this.state.filters;
                var length = _filters.length;

                var value = this.getColumnFiltersValues();
                var keys = value.map(function (item) {
                    return Object.keys(item)[0];
                });
                var options = columns.reduce(function (opts, column, i) {
                    var key = (0, _util.getColumnKey)(column, i);
                    if (keys.indexOf(key) === -1 || column.filterMultiple) {
                        opts.push(_react2['default'].createElement(
                            Option,
                            { key: 'column-' + key, value: key },
                            _react2['default'].createElement(
                                'span',
                                null,
                                column.filterTitle || column.title
                            )
                        ));
                    }
                    return opts;
                }, []);
                if (this.props.multiple && (length ? _filters[length - 1] !== VALUE_OR : value.length)) {
                    return [_react2['default'].createElement(
                        OptGroup,
                        { key: 'or' },
                        _react2['default'].createElement(
                            Option,
                            { value: OPTION_OR },
                            'OR'
                        )
                    ), _react2['default'].createElement(
                        OptGroup,
                        { key: 'all' },
                        options
                    )];
                }
                return options;
            }
        }
    }, {
        key: 'getColumnsWidthFilters',
        value: function getColumnsWidthFilters() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            return (props.columns || []).filter(function (column) {
                return column.filters instanceof Array;
            });
        }
    }, {
        key: 'findColumn',
        value: function findColumn(myKey) {
            return this.state.columns.find(function (c) {
                return (0, _util.getColumnKey)(c) === myKey;
            });
        }
    }, {
        key: 'getColumnTitle',
        value: function getColumnTitle(column) {
            var columnKey = (0, _util.getColumnKey)(column);
            if (columnKey) {
                return '' + this.columnRefs[columnKey].textContent + PAIR_SPLIT;
            } else {
                return '';
            }
        }
    }]);
    return FilterSelect;
}(_react.Component);

exports['default'] = FilterSelect;

;