"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DataSetSnapshot = function DataSetSnapshot(_ref) {
    var data = _ref.data,
        originalData = _ref.originalData,
        totalCount = _ref.totalCount,
        currentPage = _ref.currentPage,
        pageSize = _ref.pageSize,
        destroyed = _ref.destroyed,
        cachedSelected = _ref.cachedSelected;
    (0, _classCallCheck3["default"])(this, DataSetSnapshot);

    this.data = data;
    this.destroyed = destroyed;
    this.originalData = originalData;
    this.totalCount = totalCount;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.cachedSelected = cachedSelected;
};

exports["default"] = DataSetSnapshot;
module.exports = exports["default"];