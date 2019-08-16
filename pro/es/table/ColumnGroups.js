import _toConsumableArray from "babel-runtime/helpers/toConsumableArray";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import * as tslib_1 from "tslib";
import { computed } from 'mobx';
export var ColumnGroup = function () {
    function ColumnGroup(column, parent) {
        _classCallCheck(this, ColumnGroup);

        this.column = column;
        this.parent = parent;
        var children = column.children;

        if (children && children.length > 0) {
            this.children = new ColumnGroups(children);
        }
    }

    _createClass(ColumnGroup, [{
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
tslib_1.__decorate([computed], ColumnGroup.prototype, "rowSpan", null);
tslib_1.__decorate([computed], ColumnGroup.prototype, "colSpan", null);
tslib_1.__decorate([computed], ColumnGroup.prototype, "deep", null);
tslib_1.__decorate([computed], ColumnGroup.prototype, "hidden", null);
tslib_1.__decorate([computed], ColumnGroup.prototype, "lastLeaf", null);

var ColumnGroups = function () {
    function ColumnGroups(columns) {
        var _this = this;

        _classCallCheck(this, ColumnGroups);

        this.columns = columns.map(function (col) {
            return new ColumnGroup(col, _this);
        });
    }

    _createClass(ColumnGroups, [{
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
            return Math.max.apply(Math, _toConsumableArray(this.columns.map(function (_ref2) {
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

export default ColumnGroups;

tslib_1.__decorate([computed], ColumnGroups.prototype, "wide", null);
tslib_1.__decorate([computed], ColumnGroups.prototype, "deep", null);
tslib_1.__decorate([computed], ColumnGroups.prototype, "hidden", null);
tslib_1.__decorate([computed], ColumnGroups.prototype, "lastLeaf", null);