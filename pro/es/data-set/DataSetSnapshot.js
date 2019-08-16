import _classCallCheck from "babel-runtime/helpers/classCallCheck";

var DataSetSnapshot = function DataSetSnapshot(_ref) {
    var data = _ref.data,
        originalData = _ref.originalData,
        totalCount = _ref.totalCount,
        currentPage = _ref.currentPage,
        pageSize = _ref.pageSize,
        destroyed = _ref.destroyed,
        cachedSelected = _ref.cachedSelected;

    _classCallCheck(this, DataSetSnapshot);

    this.data = data;
    this.destroyed = destroyed;
    this.originalData = originalData;
    this.totalCount = totalCount;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.cachedSelected = cachedSelected;
};

export default DataSetSnapshot;