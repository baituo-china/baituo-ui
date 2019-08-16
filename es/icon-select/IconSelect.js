import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Icon from '../icon';
import Select from '../select';
import Pagination from '../pagination';
import Tooltip from '../tooltip';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { getPrefixCls } from '../configure';
var Option = Select.Option;
var icons = Icon.icons;

var IconSelect = function (_Component) {
    _inherits(IconSelect, _Component);

    function IconSelect(props) {
        _classCallCheck(this, IconSelect);

        var _this = _possibleConstructorReturn(this, (IconSelect.__proto__ || Object.getPrototypeOf(IconSelect)).call(this, props));

        _this.handleRender = function (label) {
            if (typeof label === 'string' && label) {
                return React.createElement(
                    'span',
                    null,
                    React.createElement(Icon, { type: label }),
                    ' ',
                    label
                );
            } else if ((typeof label === 'undefined' ? 'undefined' : _typeof(label)) === 'object' && label.props) {
                var children = label.props.children;

                return children ? React.createElement(
                    'span',
                    null,
                    children
                ) : null;
            } else {
                return null;
            }
        };
        _this.handlePageChange = function (current, pageSize) {
            var filterValue = _this.state.filterValue;

            _this.initIcon(current, pageSize, filterValue);
        };
        _this.handleFilter = function (value) {
            _this.initIcon(1, 20, value);
        };
        _this.saveRef = function (node) {
            if (node) {
                _this.rcSelect = node;
            }
        };
        _this.state = {
            current: 1,
            total: 0,
            pageSize: 20,
            filterValue: '',
            data: []
        };
        return _this;
    }

    _createClass(IconSelect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initIcon();
        }
    }, {
        key: 'initIcon',
        value: function initIcon() {
            var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
            var filterValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var showAll = this.props.showAll;

            var minIndex = (current - 1) * pageSize;
            var maxIndex = current * pageSize;
            var items = void 0;
            if (showAll) {
                items = icons['default'];
                if (filterValue) {
                    items = icons.favorite.filter(function (name) {
                        return name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
                    });
                }
            } else {
                items = icons.favorite;
                if (filterValue) {
                    items = icons.favorite.filter(function (name) {
                        return name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
                    });
                }
            }
            var total = items.length || 0;
            var currentData = items.filter(function (name, index) {
                return name && index >= minIndex && index < maxIndex;
            });
            this.setState({
                data: currentData,
                total: total,
                pageSize: pageSize,
                current: current,
                filterValue: filterValue
            });
        }
    }, {
        key: 'renderOption',
        value: function renderOption() {
            var data = this.state.data;

            return data.map(function (icon) {
                return React.createElement(
                    Option,
                    { key: icon, value: icon },
                    React.createElement(
                        Tooltip,
                        { placement: 'bottomLeft', title: icon },
                        React.createElement(Icon, { type: icon }),
                        React.createElement(
                            'span',
                            { className: 'text' },
                            icon
                        )
                    )
                );
            });
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var _state = this.state,
                total = _state.total,
                pageSize = _state.pageSize,
                current = _state.current;

            return React.createElement(Pagination, { total: total, onChange: this.handlePageChange, pageSizeOptions: ['20', '40', '80'], pageSize: pageSize, onShowSizeChange: this.handlePageChange, current: current });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                customizePrefixCls = _props.prefixCls,
                dropdownClassName = _props.dropdownClassName;

            var prefixCls = getPrefixCls('icon-select', customizePrefixCls);
            var selectCls = classNames(className, prefixCls);
            var dropDownCls = classNames(dropdownClassName, prefixCls + '-dropdown');
            var selectProps = _extends({}, this.props, {
                className: selectCls,
                dropdownClassName: dropDownCls
            });
            var otherProps = omit(selectProps, ['prefixCls']);
            return React.createElement(
                Select,
                _extends({}, otherProps, { footer: this.renderFooter(), onFilterChange: this.handleFilter, filterValue: this.state.filterValue, choiceRender: this.handleRender, filter: true, ref: this.saveRef }),
                this.renderOption()
            );
        }
    }]);

    return IconSelect;
}(Component);

export default IconSelect;

IconSelect.displayName = 'IconSelect';
IconSelect.defaultProps = {
    filter: true,
    showArrow: false,
    showCheckAll: false,
    showAll: false
};