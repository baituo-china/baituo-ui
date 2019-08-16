"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColumnGroup = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _tslib = require("tslib");

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobx = require("mobx");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ColumnGroup = exports.ColumnGroup = function () {
    function ColumnGroup(column, parent) {
        (0, _classCallCheck3["default"])(this, ColumnGroup);

        this.column = column;
        this.parent = parent;
        var children = column.children;

        if (children && children.length > 0) {
            this.children = new ColumnGroups(children);
        }
    }

    (0, _createClass3["default"])(ColumnGroup, [{
        key: "rowSpan",
        get: function get() {
            return this.parent.deep - this.deep + 1;
        }
    }, {
        key: "colSpan",
        get: function get() {
            return this.children ? this.children.wide : 1;
        }
    }, {
        key: "deep",
        get: function get() {
            return this.children ? this.children.deep + 1 : this.hidden ? 0 : 1;
        }
    }, {
        key: "hidden",
        get: function get() {
            return this.children ? this.children.hidden : !!this.column.hidden;
        }
    }, {
        key: "lastLeaf",
        get: function get() {
            return this.children ? this.children.lastLeaf : this.column;
        }
    }]);
    return ColumnGroup;
}();

tslib_1.__decorate([_mobx.computed], ColumnGroup.prototype, "rowSpan", null);
tslib_1.__decorate([_mobx.computed], ColumnGroup.prototype, "colSpan", null);
tslib_1.__decorate([_mobx.computed], ColumnGroup.prototype, "deep", null);
tslib_1.__decorate([_mobx.computed], ColumnGroup.prototype, "hidden", null);
tslib_1.__decorate([_mobx.computed], ColumnGroup.prototype, "lastLeaf", null);

var ColumnGroups = function () {
    function ColumnGroups(columns) {
        var _this = this;

        (0, _classCallCheck3["default"])(this, ColumnGroups);

        this.columns = columns.map(function (col) {
            return new ColumnGroup(col, _this);
        });
    }

    (0, _createClass3["default"])(ColumnGroups, [{
        key: "wide",
        get: function get() {
            return this.columns.reduce(function (sum, _ref) {
                var colSpan = _ref.colSpan,
                    hidden = _ref.hidden;
                return hidden ? sum : sum + colSpan;
            }, 0);
        }
    }, {
        key: "deep",
        get: function get() {
            return Math.max.apply(Math, (0, _toConsumableArray3["default"])(this.columns.map(function (_ref2) {
                var deep = _ref2.deep;
                return deep;
            })));
        }
    }, {
        key: "hidden",
        get: function get() {
            return this.columns.every(function (_ref3) {
                var hidden = _ref3.hidden;
                return hidden;
            });
        }
    }, {
        key: "lastLeaf",
        get: function get() {
            return this.columns[this.columns.length - 1].lastLeaf;
        }
    }]);
    return ColumnGroups;
}();

exports["default"] = ColumnGroups;

tslib_1.__decorate([_mobx.computed], ColumnGroups.prototype, "wide", null);
tslib_1.__decorate([_mobx.computed], ColumnGroups.prototype, "deep", null);
tslib_1.__decorate([_mobx.computed], ColumnGroups.prototype, "hidden", null);
tslib_1.__decorate([_mobx.computed], ColumnGroups.prototype, "lastLeaf", null);