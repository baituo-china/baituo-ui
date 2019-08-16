import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Tooltip from '../tooltip';
import warning from '../_util/warning';
import { getPrefixCls as _getPrefixCls } from '../configure';

var Popover = function (_Component) {
    _inherits(Popover, _Component);

    function Popover() {
        _classCallCheck(this, Popover);

        var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).apply(this, arguments));

        _this.saveTooltip = function (node) {
            _this.tooltip = node;
        };
        return _this;
    }

    _createClass(Popover, [{
        key: 'getPopupDomNode',
        value: function getPopupDomNode() {
            return this.tooltip.getPopupDomNode();
        }
    }, {
        key: 'getOverlay',
        value: function getOverlay() {
            var _props = this.props,
                title = _props.title,
                content = _props.content;

            var prefixCls = this.getPrefixCls();
            warning(!('overlay' in this.props), 'Popover[overlay] is removed, please use Popover[content] instead');
            return React.createElement(
                'div',
                null,
                title && React.createElement(
                    'div',
                    { className: prefixCls + '-title' },
                    title
                ),
                React.createElement(
                    'div',
                    { className: prefixCls + '-inner-content' },
                    content
                )
            );
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return _getPrefixCls('popover', this.props.prefixCls);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = _extends({}, this.props);
            delete props.title;
            return React.createElement(Tooltip, _extends({}, props, { prefixCls: this.getPrefixCls(), ref: this.saveTooltip, overlay: this.getOverlay() }));
        }
    }]);

    return Popover;
}(Component);

export default Popover;

Popover.displayName = 'Popover';
Popover.defaultProps = {
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {}
};