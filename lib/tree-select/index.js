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

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _treeSelect = require('../rc-components/tree-select');

var _treeSelect2 = _interopRequireDefault(_treeSelect);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TreeSelect = function (_Component) {
    (0, _inherits3['default'])(TreeSelect, _Component);

    function TreeSelect(props) {
        (0, _classCallCheck3['default'])(this, TreeSelect);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TreeSelect.__proto__ || Object.getPrototypeOf(TreeSelect)).call(this, props));

        _this.saveTreeSelect = function (node) {
            _this.rcTreeSelect = node;
        };
        _this.renderTreeSelect = function (locale) {
            var _classNames;

            var _this$props = _this.props,
                customizePrefixCls = _this$props.prefixCls,
                className = _this$props.className,
                size = _this$props.size,
                notFoundContent = _this$props.notFoundContent,
                dropdownStyle = _this$props.dropdownStyle,
                dropdownClassName = _this$props.dropdownClassName,
                restProps = (0, _objectWithoutProperties3['default'])(_this$props, ['prefixCls', 'className', 'size', 'notFoundContent', 'dropdownStyle', 'dropdownClassName']);

            var prefixCls = (0, _configure.getPrefixCls)('select', customizePrefixCls);
            var cls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === "large"), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === "small"), _classNames), className);
            var checkable = restProps.treeCheckable;
            if (checkable) {
                checkable = _react2['default'].createElement('span', { className: prefixCls + '-tree-checkbox-inner' });
            }
            return _react2['default'].createElement(_treeSelect2['default'], (0, _extends3['default'])({}, restProps, { dropdownClassName: (0, _classnames2['default'])(dropdownClassName, prefixCls + '-tree-dropdown'), prefixCls: prefixCls, className: cls, dropdownStyle: (0, _extends3['default'])({ maxHeight: '100vh', overflow: 'auto' }, dropdownStyle), treeCheckable: checkable, notFoundContent: notFoundContent || locale.notFoundContent, ref: _this.saveTreeSelect }));
        };
        (0, _warning2['default'])(props.multiple !== false || !props.treeCheckable, '`multiple` will alway be `true` when `treeCheckable` is true');
        return _this;
    }

    (0, _createClass3['default'])(TreeSelect, [{
        key: 'focus',
        value: function focus() {
            this.rcTreeSelect.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.rcTreeSelect.blur();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _LocaleReceiver2['default'],
                { componentName: 'Select', defaultLocale: {} },
                this.renderTreeSelect
            );
        }
    }]);
    return TreeSelect;
}(_react.Component);

exports['default'] = TreeSelect;

TreeSelect.displayName = 'TreeSelect';
TreeSelect.TreeNode = _treeSelect.TreeNode;
TreeSelect.SHOW_ALL = _treeSelect.SHOW_ALL;
TreeSelect.SHOW_PARENT = _treeSelect.SHOW_PARENT;
TreeSelect.SHOW_CHILD = _treeSelect.SHOW_CHILD;
TreeSelect.defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false
};
module.exports = exports['default'];