import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProPrefixCls } from '../../../es/configure';
import Trigger from '../trigger/Trigger';
import getPlacements from './placements';

var Tooltip = function (_Component) {
    _inherits(Tooltip, _Component);

    function Tooltip() {
        _classCallCheck(this, Tooltip);

        var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));

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

    _createClass(Tooltip, [{
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

            return React.createElement(
                Trigger,
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

            return getProPrefixCls(suffixCls, prefixCls);
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
            return React.createElement(
                'div',
                null,
                React.createElement('div', { className: arrowCls + ' ' + arrowCls + '-' + theme, key: 'arrow' }),
                React.createElement(
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

            return builtinPlacements || getPlacements({
                arrowPointAtCenter: arrowPointAtCenter,
                verticalArrowShift: 8,
                autoAdjustOverflow: autoAdjustOverflow
            });
        }
    }]);

    return Tooltip;
}(Component);

export default Tooltip;

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
    title: PropTypes.any,
    arrowPointAtCenter: PropTypes.bool,
    autoAdjustOverflow: PropTypes.bool,
    defaultHidden: PropTypes.bool,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    placement: PropTypes.oneOf(['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom']),
    trigger: PropTypes.arrayOf(PropTypes.oneOf(["click" /* click */
    , "hover" /* hover */
    , "contextMenu" /* contextMenu */
    , "focus" /* focus */
    ])),
    hidden: PropTypes.bool,
    onHiddenChange: PropTypes.func
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