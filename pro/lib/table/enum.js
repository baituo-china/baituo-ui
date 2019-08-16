"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TableButtonType = exports.TableButtonType = undefined;
(function (TableButtonType) {
    TableButtonType["add"] = "add";
    TableButtonType["delete"] = "delete";
    TableButtonType["remove"] = "remove";
    TableButtonType["save"] = "save";
    TableButtonType["query"] = "query";
    TableButtonType["reset"] = "reset";
    TableButtonType["expandAll"] = "expandAll";
    TableButtonType["collapseAll"] = "collapseAll";
    TableButtonType["export"] = "export";
})(TableButtonType || (exports.TableButtonType = TableButtonType = {}));
var TableCommandType = exports.TableCommandType = undefined;
(function (TableCommandType) {
    TableCommandType["edit"] = "edit";
    TableCommandType["delete"] = "delete";
})(TableCommandType || (exports.TableCommandType = TableCommandType = {}));