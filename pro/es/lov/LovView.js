import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../table/Table';
import { action } from 'mobx';
import KeyCode from '../../../es/_util/KeyCode';

var LovView = function (_Component) {
    _inherits(LovView, _Component);

    function LovView() {
        _classCallCheck(this, LovView);

        var _this = _possibleConstructorReturn(this, (LovView.__proto__ || Object.getPrototypeOf(LovView)).apply(this, arguments));

        _this.handleKeyDown = function (e) {
            if (e.keyCode === KeyCode.ENTER) {
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

    _createClass(LovView, [{
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
            return React.createElement(Table, tableProps);
        }
    }]);

    return LovView;
}(Component);

export default LovView;

LovView.propTypes = {
    dataSet: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onEnterDown: PropTypes.func.isRequired
};
tslib_1.__decorate([action], LovView.prototype, "componentWillMount", null);
tslib_1.__decorate([action], LovView.prototype, "componentWillUnmount", null);