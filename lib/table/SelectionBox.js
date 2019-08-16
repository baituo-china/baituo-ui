'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SelectionBox = function (_Component) {
    (0, _inherits3['default'])(SelectionBox, _Component);

    function SelectionBox(props) {
        (0, _classCallCheck3['default'])(this, SelectionBox);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (SelectionBox.__proto__ || Object.getPrototypeOf(SelectionBox)).call(this, props));

        _this.state = {
            checked: _this.getCheckState(props)
        };
        return _this;
    }

    (0, _createClass3['default'])(SelectionBox, [{
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
                rest = (0, _objectWithoutProperties3['default'])(_props, ['type', 'rowIndex']);
            var checked = this.state.checked;

            if (type === 'radio') {
                return _react2['default'].createElement(_radio2['default'], (0, _extends3['default'])({ checked: checked, value: rowIndex }, rest));
            } else {
                return _react2['default'].createElement(_checkbox2['default'], (0, _extends3['default'])({ checked: checked }, rest));
            }
        }
    }]);
    return SelectionBox;
}(_react.Component);

exports['default'] = SelectionBox;
module.exports = exports['default'];