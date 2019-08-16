import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Checkbox from '../checkbox';
import Radio from '../radio';

var SelectionBox = function (_Component) {
    _inherits(SelectionBox, _Component);

    function SelectionBox(props) {
        _classCallCheck(this, SelectionBox);

        var _this = _possibleConstructorReturn(this, (SelectionBox.__proto__ || Object.getPrototypeOf(SelectionBox)).call(this, props));

        _this.state = {
            checked: _this.getCheckState(props)
        };
        return _this;
    }

    _createClass(SelectionBox, [{
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

            var store = this.props.store;

            this.unsubscribe = store.subscribe(function () {
                var checked = _this2.getCheckState(_this2.props);
                _this2.setState({ checked: checked });
            });
        }
    }, {
        key: 'getCheckState',
        value: function getCheckState(props) {
            var store = props.store,
                defaultSelection = props.defaultSelection,
                rowIndex = props.rowIndex;

            var checked = false;
            if (store.getState().selectionDirty) {
                checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
            } else {
                checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 || defaultSelection.indexOf(rowIndex) >= 0;
            }
            return checked;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                type = _props.type,
                rowIndex = _props.rowIndex,
                rest = _objectWithoutProperties(_props, ['type', 'rowIndex']);

            var checked = this.state.checked;

            if (type === 'radio') {
                return React.createElement(Radio, _extends({ checked: checked, value: rowIndex }, rest));
            } else {
                return React.createElement(Checkbox, _extends({ checked: checked }, rest));
            }
        }
    }]);

    return SelectionBox;
}(Component);

export default SelectionBox;