import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import * as tslib_1 from "tslib";
import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import shallowEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import Align from '../../../es/align';
import { getProPrefixCls } from '../../../es/configure';
import Animate from '../animate';
import ViewComponent from '../core/ViewComponent';
import PopupInner from './PopupInner';
import autobind from '../_util/autobind';
var popupContainer = void 0;
function getContainer() {
    if (!popupContainer && typeof window !== 'undefined') {
        var doc = window.document;
        popupContainer = doc.createElement('div');
        popupContainer.className = getProPrefixCls('popup-container');
        doc.body.appendChild(popupContainer);
    }
    return popupContainer;
}
/**
 * 记录ID生成器
 */
var PopupKeyGen = /*#__PURE__*/_regeneratorRuntime.mark(function _callee(start) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!true) {
                        _context.next = 5;
                        break;
                    }

                    _context.next = 3;
                    return 'popup-key-' + ++start;

                case 3:
                    _context.next = 0;
                    break;

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})(1);

var Popup = function (_ViewComponent) {
    _inherits(Popup, _ViewComponent);

    function Popup() {
        _classCallCheck(this, Popup);

        var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));

        _this.contentRendered = false;
        _this.popupKey = PopupKeyGen.next().value;
        _this.saveRef = function (align) {
            return _this.align = align;
        };
        return _this;
    }

    _createClass(Popup, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(Popup.prototype.__proto__ || Object.getPrototypeOf(Popup.prototype), 'getOtherProps', this).call(this), ['align', 'transitionName', 'getRootDomNode', 'getClassNameFromAlign', 'getStyleFromAlign', 'onAlign', 'onAnimateAppear', 'onAnimateEnter', 'onAnimateLeave', 'onAnimateEnd']);
            return otherProps;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                hidden = _props.hidden,
                align = _props.align,
                transitionName = _props.transitionName,
                getRootDomNode = _props.getRootDomNode,
                children = _props.children,
                _props$onAnimateAppea = _props.onAnimateAppear,
                onAnimateAppear = _props$onAnimateAppea === undefined ? noop : _props$onAnimateAppea,
                _props$onAnimateEnter = _props.onAnimateEnter,
                onAnimateEnter = _props$onAnimateEnter === undefined ? noop : _props$onAnimateEnter,
                _props$onAnimateLeave = _props.onAnimateLeave,
                onAnimateLeave = _props$onAnimateLeave === undefined ? noop : _props$onAnimateLeave,
                _props$onAnimateEnd = _props.onAnimateEnd,
                onAnimateEnd = _props$onAnimateEnd === undefined ? noop : _props$onAnimateEnd;

            if (!hidden) {
                this.contentRendered = true;
            }
            var container = getContainer();
            return container && this.contentRendered ? createPortal(React.createElement(
                Animate,
                { component: '', exclusive: true, transitionAppear: true, transitionName: transitionName, hiddenProp: 'hidden', onAppear: onAnimateAppear, onEnter: onAnimateEnter, onLeave: onAnimateLeave, onEnd: onAnimateEnd },
                React.createElement(
                    Align,
                    { ref: this.saveRef, key: 'align', childrenProps: { hidden: 'hidden' }, align: align, onAlign: this.onAlign, target: getRootDomNode, hidden: hidden, monitorWindowResize: true },
                    React.createElement(
                        PopupInner,
                        omit(this.getMergedProps(), ['ref']),
                        children
                    )
                )
            ), container, this.popupKey) : null;
        }
    }, {
        key: 'onAlign',
        value: function onAlign(source, align, target) {
            var _props2 = this.props,
                _props2$getClassNameF = _props2.getClassNameFromAlign,
                getClassNameFromAlign = _props2$getClassNameF === undefined ? noop : _props2$getClassNameF,
                _props2$getStyleFromA = _props2.getStyleFromAlign,
                getStyleFromAlign = _props2$getStyleFromA === undefined ? noop : _props2$getStyleFromA,
                _props2$onAlign = _props2.onAlign,
                onAlign = _props2$onAlign === undefined ? noop : _props2$onAlign;

            var currentAlignClassName = getClassNameFromAlign(align);
            if (this.currentAlignClassName !== currentAlignClassName) {
                this.currentAlignClassName = currentAlignClassName;
                source.className = this.getMergedClassNames(currentAlignClassName);
            }
            var currentAlignStyle = getStyleFromAlign(target, align);
            if (!shallowEqual(this.currentAlignStyle, currentAlignStyle)) {
                this.currentAlignStyle = currentAlignStyle;
                _extends(source.style, currentAlignStyle);
            }
            onAlign(source, align, target);
        }
    }, {
        key: 'forceAlign',
        value: function forceAlign() {
            if (this.align) {
                this.align.forceAlign();
            }
        }
    }]);

    return Popup;
}(ViewComponent);

export default Popup;

Popup.displayName = 'Popup';
Popup.propTypes = _extends({
    align: PropTypes.object,
    onAlign: PropTypes.func,
    getRootDomNode: PropTypes.func,
    transitionName: PropTypes.string,
    onAnimateAppear: PropTypes.func,
    onAnimateEnter: PropTypes.func,
    onAnimateLeave: PropTypes.func,
    onAnimateEnd: PropTypes.func,
    getStyleFromAlign: PropTypes.func,
    getClassNameFromAlign: PropTypes.func
}, ViewComponent.propTypes);
Popup.defaultProps = {
    suffixCls: 'popup',
    transitionName: 'zoom'
};
tslib_1.__decorate([autobind], Popup.prototype, "onAlign", null);