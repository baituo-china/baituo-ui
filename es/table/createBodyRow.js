import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
export default function createTableRow() {
    var Cmp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tr';

    var BodyRow = function (_Component) {
        _inherits(BodyRow, _Component);

        function BodyRow(props) {
            _classCallCheck(this, BodyRow);

            var _this = _possibleConstructorReturn(this, (BodyRow.__proto__ || Object.getPrototypeOf(BodyRow)).call(this, props));

            _this.store = props.store;

            var _this$store$getState = _this.store.getState(),
                selectedRowKeys = _this$store$getState.selectedRowKeys;

            _this.state = {
                selected: selectedRowKeys.indexOf(props.rowKey) >= 0
            };
            return _this;
        }

        _createClass(BodyRow, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.subscribe();
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.unsubscribe) {
                    this.unsubscribe();
                }
            }
        }, {
            key: 'subscribe',
            value: function subscribe() {
                var _this2 = this;

                var _props = this.props,
                    store = _props.store,
                    rowKey = _props.rowKey;

                this.unsubscribe = store.subscribe(function () {
                    var _store$getState = _this2.store.getState(),
                        selectedRowKeys = _store$getState.selectedRowKeys;

                    var selected = selectedRowKeys.indexOf(rowKey) >= 0;
                    if (selected !== _this2.state.selected) {
                        _this2.setState({ selected: selected });
                    }
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var otherProps = omit(this.props, ['prefixCls', 'rowKey', 'store', 'children']);
                var className = classnames(this.props.className, _defineProperty({}, this.props.prefixCls + '-row-selected', this.state.selected));
                return React.createElement(
                    Cmp,
                    _extends({}, otherProps, { className: className }),
                    this.props.children
                );
            }
        }]);

        return BodyRow;
    }(Component);

    return BodyRow;
}