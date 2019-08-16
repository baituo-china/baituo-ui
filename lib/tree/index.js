'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeNode = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _openAnimation = require('../_util/openAnimation');

var _openAnimation2 = _interopRequireDefault(_openAnimation);

var _tree = require('../rc-components/tree');

var _tree2 = _interopRequireDefault(_tree);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _progress = require('../progress');

var _progress2 = _interopRequireDefault(_progress);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.TreeNode = _tree.TreeNode;

var Tree = function (_Component) {
    (0, _inherits3['default'])(Tree, _Component);

    function Tree() {
        (0, _classCallCheck3['default'])(this, Tree);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).apply(this, arguments));

        _this.renderSwitcherIcon = function (_ref) {
            var isLeaf = _ref.isLeaf,
                loading = _ref.loading;
            var _this$props = _this.props,
                showLine = _this$props.showLine,
                switcherIcon = _this$props.switcherIcon;

            var prefixCls = _this.getPrefixCls();
            if (loading) {
                return _react2['default'].createElement(_progress2['default'], { type: "loading" /* loading */, className: prefixCls + '-switcher-loading-icon', size: "small" /* small */ });
            }
            var switcherCls = prefixCls + '-switcher-icon';
            if (showLine) {
                if (isLeaf) {
                    return _react2['default'].createElement(_icon2['default'], { type: 'note', className: prefixCls + '-switcher-line-icon' });
                }
                return _react2['default'].createElement(_icon2['default'], { type: 'arrow_drop_down', className: switcherCls });
            } else {
                if (isLeaf) {
                    return null;
                } else if (switcherIcon) {
                    var switcherOriginCls = switcherIcon.props.className || '';
                    return (0, _react.cloneElement)(switcherIcon, {
                        className: [switcherOriginCls, switcherCls]
                    });
                } else {
                    return _react2['default'].createElement(_icon2['default'], { type: 'arrow_drop_down', className: switcherCls });
                }
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(Tree, [{
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('tree', this.props.prefixCls);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var className = props.className,
                showIcon = props.showIcon,
                checkable = props.checkable;

            var prefixCls = this.getPrefixCls();
            return _react2['default'].createElement(
                _tree2['default'],
                (0, _extends3['default'])({}, props, { className: (0, _classnames2['default'])(!showIcon && prefixCls + '-icon-hide', className), checkable: checkable ? _react2['default'].createElement('span', { className: prefixCls + '-checkbox-inner' }) : checkable, switcherIcon: this.renderSwitcherIcon, prefixCls: prefixCls }),
                this.props.children
            );
        }
    }]);
    return Tree;
}(_react.Component);

exports['default'] = Tree;

Tree.displayName = 'Tree';
Tree.TreeNode = _tree.TreeNode;
Tree.defaultProps = {
    checkable: false,
    showIcon: false,
    openAnimation: _openAnimation2['default']
};