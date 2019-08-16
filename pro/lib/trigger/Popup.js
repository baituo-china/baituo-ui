'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _align = require('../../../lib/align');

var _align2 = _interopRequireDefault(_align);

var _configure = require('../../../lib/configure');

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _ViewComponent2 = require('../core/ViewComponent');

var _ViewComponent3 = _interopRequireDefault(_ViewComponent2);

var _PopupInner = require('./PopupInner');

var _PopupInner2 = _interopRequireDefault(_PopupInner);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var popupContainer = void 0;
function getContainer() {
    if (!popupContainer && typeof window !== 'undefined') {
        var doc = window.document;
        popupContainer = doc.createElement('div');
        popupContainer.className = (0, _configure.getProPrefixCls)('popup-container');
        doc.body.appendChild(popupContainer);
    }
    return popupContainer;
}
/**
 * 记录ID生成器
 */
var PopupKeyGen = /*#__PURE__*/_regenerator2['default'].mark(function _callee(start) {
    return _regenerator2['default'].wrap(function _callee$(_context) {
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
    (0, _inherits3['default'])(Popup, _ViewComponent);

    function Popup() {
        (0, _classCallCheck3['default'])(this, Popup);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));

        _this.contentRendered = false;
        _this.popupKey = PopupKeyGen.next().value;
        _this.saveRef = function (align) {
            return _this.align = align;
        };
        return _this;
    }

    (0, _createClass3['default'])(Popup, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get3['default'])(Popup.prototype.__proto__ || Object.getPrototypeOf(Popup.prototype), 'getOtherProps', this).call(this), ['align', 'transitionName', 'getRootDomNode', 'getClassNameFromAlign', 'getStyleFromAlign', 'onAlign', 'onAnimateAppear', 'onAnimateEnter', 'onAnimateLeave', 'onAnimateEnd']);
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
                onAnimateAppear = _props$onAnimateAppea === undefined ? _noop2['default'] : _props$onAnimateAppea,
                _props$onAnimateEnter = _props.onAnimateEnter,
                onAnimateEnter = _props$onAnimateEnter === undefined ? _noop2['default'] : _props$onAnimateEnter,
                _props$onAnimateLeave = _props.onAnimateLeave,
                onAnimateLeave = _props$onAnimateLeave === undefined ? _noop2['default'] : _props$onAnimateLeave,
                _props$onAnimateEnd = _props.onAnimateEnd,
                onAnimateEnd = _props$onAnimateEnd === undefined ? _noop2['default'] : _props$onAnimateEnd;

            if (!hidden) {
                this.contentRendered = true;
            }
            var container = getContainer();
            return container && this.contentRendered ? (0, _reactDom.createPortal)(_react2['default'].createElement(
                _animate2['default'],
                { component: '', exclusive: true, transitionAppear: true, transitionName: transitionName, hiddenProp: 'hidden', onAppear: onAnimateAppear, onEnter: onAnimateEnter, onLeave: onAnimateLeave, onEnd: onAnimateEnd },
                _react2['default'].createElement(
                    _align2['default'],
                    { ref: this.saveRef, key: 'align', childrenProps: { hidden: 'hidden' }, align: align, onAlign: this.onAlign, target: getRootDomNode, hidden: hidden, monitorWindowResize: true },
                    _react2['default'].createElement(
                        _PopupInner2['default'],
                        (0, _omit2['default'])(this.getMergedProps(), ['ref']),
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
                getClassNameFromAlign = _props2$getClassNameF === undefined ? _noop2['default'] : _props2$getClassNameF,
                _props2$getStyleFromA = _props2.getStyleFromAlign,
                getStyleFromAlign = _props2$getStyleFromA === undefined ? _noop2['default'] : _props2$getStyleFromA,
                _props2$onAlign = _props2.onAlign,
                onAlign = _props2$onAlign === undefined ? _noop2['default'] : _props2$onAlign;

            var currentAlignClassName = getClassNameFromAlign(align);
            if (this.currentAlignClassName !== currentAlignClassName) {
                this.currentAlignClassName = currentAlignClassName;
                source.className = this.getMergedClassNames(currentAlignClassName);
            }
            var currentAlignStyle = getStyleFromAlign(target, align);
            if (!(0, _isEqual2['default'])(this.currentAlignStyle, currentAlignStyle)) {
                this.currentAlignStyle = currentAlignStyle;
                (0, _extends3['default'])(source.style, currentAlignStyle);
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
}(_ViewComponent3['default']);

exports['default'] = Popup;

Popup.displayName = 'Popup';
Popup.propTypes = (0, _extends3['default'])({
    align: _propTypes2['default'].object,
    onAlign: _propTypes2['default'].func,
    getRootDomNode: _propTypes2['default'].func,
    transitionName: _propTypes2['default'].string,
    onAnimateAppear: _propTypes2['default'].func,
    onAnimateEnter: _propTypes2['default'].func,
    onAnimateLeave: _propTypes2['default'].func,
    onAnimateEnd: _propTypes2['default'].func,
    getStyleFromAlign: _propTypes2['default'].func,
    getClassNameFromAlign: _propTypes2['default'].func
}, _ViewComponent3['default'].propTypes);
Popup.defaultProps = {
    suffixCls: 'popup',
    transitionName: 'zoom'
};
tslib_1.__decorate([_autobind2['default']], Popup.prototype, "onAlign", null);
module.exports = exports['default'];