'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _configure = require('../../../lib/configure');

var _Trigger = require('../trigger/Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _placements = require('./placements');

var _placements2 = _interopRequireDefault(_placements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Tooltip = function (_Component) {
    (0, _inherits3['default'])(Tooltip, _Component);

    function Tooltip() {
        (0, _classCallCheck3['default'])(this, Tooltip);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));

        _this.state = {
            hidden: true
        };
        _this.handlePopupHiddenChange = function (hidden) {
            var onHiddenChange = _this.props.onHiddenChange;

            _this.setState({
                hidden: hidden
            });
            if (onHiddenChange) {
                onHiddenChange(hidden);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(Tooltip, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                hidden = _props.hidden,
                defaultHidden = _props.defaultHidden;

            var initialHidden = defaultHidden;
            if (hidden !== undefined) {
                initialHidden = hidden;
            }
            if (initialHidden !== this.state.hidden) {
                this.setState({
                    hidden: initialHidden
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var hidden = nextProps.hidden;

            if (hidden !== undefined) {
                this.setState({
                    hidden: hidden
                });
            }
        }
    }, {
        key: 'render',

        /**
         * FIXME: Tooltip首次渲染错位
         * placement === 'bottom* / right*'时没有错位，其他情况有
         *
         * @returns
         * @memberof Tooltip
         */
        value: function render() {
            var prefixCls = this.prefixCls,
                popupContent = this.popupContent,
                _props2 = this.props,
                children = _props2.children,
                placement = _props2.placement,
                mouseEnterDelay = _props2.mouseEnterDelay,
                mouseLeaveDelay = _props2.mouseLeaveDelay,
                transitionName = _props2.transitionName,
                trigger = _props2.trigger,
                hidden = this.state.hidden;

            return _react2['default'].createElement(
                _Trigger2['default'],
                { prefixCls: prefixCls, popupStyle: { backgroundColor: 'transparent' }, action: trigger, builtinPlacements: this.placements, popupPlacement: placement, popupContent: popupContent, onPopupHiddenChange: this.handlePopupHiddenChange, mouseEnterDelay: mouseEnterDelay, mouseLeaveDelay: mouseLeaveDelay, popupHidden: hidden || !popupContent, transitionName: transitionName },
                children
            );
        }
    }, {
        key: 'prefixCls',
        get: function get() {
            var _props3 = this.props,
                suffixCls = _props3.suffixCls,
                prefixCls = _props3.prefixCls;

            return (0, _configure.getProPrefixCls)(suffixCls, prefixCls);
        }
    }, {
        key: 'popupContent',
        get: function get() {
            var title = this.props.title;

            if (!title) {
                return null;
            }
            var prefixCls = this.prefixCls,
                _props4 = this.props,
                overlay = _props4.overlay,
                theme = _props4.theme;

            var content = '';
            if (typeof overlay === 'function') {
                content = overlay();
            } else if (overlay) {
                content = overlay;
            } else {
                content = title || '';
            }
            var arrowCls = prefixCls + '-popup-arrow';
            var contentCls = prefixCls + '-popup-inner';
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement('div', { className: arrowCls + ' ' + arrowCls + '-' + theme, key: 'arrow' }),
                _react2['default'].createElement(
                    'div',
                    { className: contentCls + ' ' + contentCls + '-' + theme, key: 'content' },
                    content
                )
            );
        }
    }, {
        key: 'placements',
        get: function get() {
            var _props5 = this.props,
                builtinPlacements = _props5.builtinPlacements,
                arrowPointAtCenter = _props5.arrowPointAtCenter,
                autoAdjustOverflow = _props5.autoAdjustOverflow;

            return builtinPlacements || (0, _placements2['default'])({
                arrowPointAtCenter: arrowPointAtCenter,
                verticalArrowShift: 8,
                autoAdjustOverflow: autoAdjustOverflow
            });
        }
    }]);
    return Tooltip;
}(_react.Component);

exports['default'] = Tooltip;

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
    title: _propTypes2['default'].any,
    arrowPointAtCenter: _propTypes2['default'].bool,
    autoAdjustOverflow: _propTypes2['default'].bool,
    defaultHidden: _propTypes2['default'].bool,
    mouseEnterDelay: _propTypes2['default'].number,
    mouseLeaveDelay: _propTypes2['default'].number,
    placement: _propTypes2['default'].oneOf(['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom']),
    trigger: _propTypes2['default'].arrayOf(_propTypes2['default'].oneOf(["click" /* click */
    , "hover" /* hover */
    , "contextMenu" /* contextMenu */
    , "focus" /* focus */
    ])),
    hidden: _propTypes2['default'].bool,
    onHiddenChange: _propTypes2['default'].func
};
Tooltip.defaultProps = {
    suffixCls: 'tooltip',
    placement: 'bottom',
    transitionName: 'zoom-big-fast',
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true,
    theme: 'dark',
    defaultHidden: true,
    trigger: ["hover" /* hover */]
};
module.exports = exports['default'];