'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _pagination = require('../pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Option = _select2['default'].Option;
var icons = _icon2['default'].icons;

var IconSelect = function (_Component) {
    (0, _inherits3['default'])(IconSelect, _Component);

    function IconSelect(props) {
        (0, _classCallCheck3['default'])(this, IconSelect);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (IconSelect.__proto__ || Object.getPrototypeOf(IconSelect)).call(this, props));

        _this.handleRender = function (label) {
            if (typeof label === 'string' && label) {
                return _react2['default'].createElement(
                    'span',
                    null,
                    _react2['default'].createElement(_icon2['default'], { type: label }),
                    ' ',
                    label
                );
            } else if ((typeof label === 'undefined' ? 'undefined' : (0, _typeof3['default'])(label)) === 'object' && label.props) {
                var children = label.props.children;

                return children ? _react2['default'].createElement(
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

    (0, _createClass3['default'])(IconSelect, [{
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
                return _react2['default'].createElement(
                    Option,
                    { key: icon, value: icon },
                    _react2['default'].createElement(
                        _tooltip2['default'],
                        { placement: 'bottomLeft', title: icon },
                        _react2['default'].createElement(_icon2['default'], { type: icon }),
                        _react2['default'].createElement(
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

            return _react2['default'].createElement(_pagination2['default'], { total: total, onChange: this.handlePageChange, pageSizeOptions: ['20', '40', '80'], pageSize: pageSize, onShowSizeChange: this.handlePageChange, current: current });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                customizePrefixCls = _props.prefixCls,
                dropdownClassName = _props.dropdownClassName;

            var prefixCls = (0, _configure.getPrefixCls)('icon-select', customizePrefixCls);
            var selectCls = (0, _classnames2['default'])(className, prefixCls);
            var dropDownCls = (0, _classnames2['default'])(dropdownClassName, prefixCls + '-dropdown');
            var selectProps = (0, _extends3['default'])({}, this.props, {
                className: selectCls,
                dropdownClassName: dropDownCls
            });
            var otherProps = (0, _omit2['default'])(selectProps, ['prefixCls']);
            return _react2['default'].createElement(
                _select2['default'],
                (0, _extends3['default'])({}, otherProps, { footer: this.renderFooter(), onFilterChange: this.handleFilter, filterValue: this.state.filterValue, choiceRender: this.handleRender, filter: true, ref: this.saveRef }),
                this.renderOption()
            );
        }
    }]);
    return IconSelect;
}(_react.Component);

exports['default'] = IconSelect;

IconSelect.displayName = 'IconSelect';
IconSelect.defaultProps = {
    filter: true,
    showArrow: false,
    showCheckAll: false,
    showAll: false
};
module.exports = exports['default'];