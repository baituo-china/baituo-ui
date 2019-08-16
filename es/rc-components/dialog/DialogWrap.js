import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';
import ContainerRender from '../util/ContainerRender';
import Portal from '../util/Portal';
var IS_REACT_16 = 'createPortal' in ReactDOM;

var DialogWrap = function (_Component) {
    _inherits(DialogWrap, _Component);

    function DialogWrap() {
        _classCallCheck(this, DialogWrap);

        var _this = _possibleConstructorReturn(this, (DialogWrap.__proto__ || Object.getPrototypeOf(DialogWrap)).apply(this, arguments));

        _this.saveDialog = function (node) {
            _this._component = node;
        };
        _this.getComponent = function () {
            var extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return React.createElement(Dialog, _extends({ ref: _this.saveDialog }, _this.props, extra, { key: 'dialog' }));
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

    _createClass(DialogWrap, [{
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
                return React.createElement(
                    ContainerRender,
                    { parent: this, visible: visible, autoDestroy: false, getComponent: this.getComponent, getContainer: this.getContainer },
                    container
                );
            }
            if (visible || this._component) {
                portal = React.createElement(
                    Portal,
                    { getContainer: this.getContainer },
                    this.getComponent()
                );
            }
            return portal;
        }
    }]);

    return DialogWrap;
}(Component);

DialogWrap.defaultProps = {
    visible: false
};
export default DialogWrap;