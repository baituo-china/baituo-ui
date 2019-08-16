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

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = require('../table/Table');

var _Table2 = _interopRequireDefault(_Table);

var _mobx = require('mobx');

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LovView = function (_Component) {
    (0, _inherits3['default'])(LovView, _Component);

    function LovView() {
        (0, _classCallCheck3['default'])(this, LovView);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (LovView.__proto__ || Object.getPrototypeOf(LovView)).apply(this, arguments));

        _this.handleKeyDown = function (e) {
            if (e.keyCode === _KeyCode2['default'].ENTER) {
                var onEnterDown = _this.props.onEnterDown;

                onEnterDown();
            }
        };
        _this.handleRow = function () {
            return {
                onDoubleClick: _this.props.onDoubleClick
            };
        };
        return _this;
    }

    (0, _createClass3['default'])(LovView, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                dataSet = _props.dataSet,
                selection = _props.dataSet.selection,
                multiple = _props.multiple;

            this.selection = selection;
            dataSet.selection = multiple ? "multiple" /* multiple */ : "single" /* single */;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.dataSet.selection = this.selection;
        }
    }, {
        key: 'getColumns',
        value: function getColumns() {
            var lovItems = this.props.config.lovItems;

            return lovItems ? lovItems.filter(function (_ref) {
                var gridField = _ref.gridField;
                return gridField === 'Y';
            }).sort(function (_ref2, _ref3) {
                var seq1 = _ref2.gridFieldSequence;
                var seq2 = _ref3.gridFieldSequence;
                return seq1 - seq2;
            }).map(function (_ref4) {
                var display = _ref4.display,
                    gridFieldName = _ref4.gridFieldName,
                    gridFieldWidth = _ref4.gridFieldWidth,
                    gridFieldAlign = _ref4.gridFieldAlign;
                return {
                    key: gridFieldName,
                    header: display,
                    name: gridFieldName,
                    width: gridFieldWidth,
                    align: gridFieldAlign
                };
            }) : void 0;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                dataSet = _props2.dataSet,
                _props2$config = _props2.config,
                height = _props2$config.height,
                treeFlag = _props2$config.treeFlag,
                queryColumns = _props2$config.queryColumns,
                multiple = _props2.multiple;

            var tableProps = {
                autoFocus: true,
                mode: treeFlag === 'Y' ? "tree" /* tree */ : "list" /* list */
                , onKeyDown: this.handleKeyDown,
                dataSet: dataSet,
                columns: this.getColumns(),
                queryFieldsLimit: queryColumns
            };
            if (multiple) {
                tableProps.selectionMode = "rowbox" /* rowbox */;
            } else {
                tableProps.selectionMode = "none" /* none */;
                tableProps.onRow = this.handleRow;
            }
            if (height) {
                tableProps.style = { height: height };
            }
            return _react2['default'].createElement(_Table2['default'], tableProps);
        }
    }]);
    return LovView;
}(_react.Component);

exports['default'] = LovView;

LovView.propTypes = {
    dataSet: _propTypes2['default'].object.isRequired,
    config: _propTypes2['default'].object.isRequired,
    onDoubleClick: _propTypes2['default'].func.isRequired,
    onEnterDown: _propTypes2['default'].func.isRequired
};
tslib_1.__decorate([_mobx.action], LovView.prototype, "componentWillMount", null);
tslib_1.__decorate([_mobx.action], LovView.prototype, "componentWillUnmount", null);
module.exports = exports['default'];