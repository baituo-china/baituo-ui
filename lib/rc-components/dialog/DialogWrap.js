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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _ContainerRender = require('../util/ContainerRender');

var _ContainerRender2 = _interopRequireDefault(_ContainerRender);

var _Portal = require('../util/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var IS_REACT_16 = 'createPortal' in _reactDom2['default'];

var DialogWrap = function (_Component) {
    (0, _inherits3['default'])(DialogWrap, _Component);

    function DialogWrap() {
        (0, _classCallCheck3['default'])(this, DialogWrap);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (DialogWrap.__proto__ || Object.getPrototypeOf(DialogWrap)).apply(this, arguments));

        _this.saveDialog = function (node) {
            _this._component = node;
        };
        _this.getComponent = function () {
            var extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return _react2['default'].createElement(_Dialog2['default'], (0, _extends3['default'])({ ref: _this.saveDialog }, _this.props, extra, { key: 'dialog' }));
        };
        _this.getContainer = function () {
            if (_this.props.getContainer) {
                return _this.props.getContainer(_this);
            }
            var container = document.createElement('div');
            document.body.appendChild(container);
            return container;
        };
        return _this;
    }

    (0, _createClass3['default'])(DialogWrap, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(_ref) {
            var visible = _ref.visible;

            return !!(this.props.visible || visible);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (IS_REACT_16) {
                return;
            }
            if (this.props.visible) {
                this.renderComponent({
                    afterClose: this.removeContainer,
                    onClose: function onClose() {},

                    visible: false
                });
            } else {
                this.removeContainer();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var visible = this.props.visible;

            var portal = null;
            if (!IS_REACT_16) {
                var container = function container(_ref2) {
                    var renderComponent = _ref2.renderComponent,
                        removeContainer = _ref2.removeContainer;

                    _this2.renderComponent = renderComponent;
                    _this2.removeContainer = removeContainer;
                    return null;
                };
                return _react2['default'].createElement(
                    _ContainerRender2['default'],
                    { parent: this, visible: visible, autoDestroy: false, getComponent: this.getComponent, getContainer: this.getContainer },
                    container
                );
            }
            if (visible || this._component) {
                portal = _react2['default'].createElement(
                    _Portal2['default'],
                    { getContainer: this.getContainer },
                    this.getComponent()
                );
            }
            return portal;
        }
    }]);
    return DialogWrap;
}(_react.Component);

DialogWrap.defaultProps = {
    visible: false
};
exports['default'] = DialogWrap;
module.exports = exports['default'];