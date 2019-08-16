'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _miniStore = require('mini-store');

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _warning = require('../../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _addEventListener = require('../../_util/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _ColumnManager = require('./ColumnManager');

var _ColumnManager2 = _interopRequireDefault(_ColumnManager);

var _HeadTable = require('./HeadTable');

var _HeadTable2 = _interopRequireDefault(_HeadTable);

var _BodyTable = require('./BodyTable');

var _BodyTable2 = _interopRequireDefault(_BodyTable);

var _FootTable = require('./FootTable');

var _FootTable2 = _interopRequireDefault(_FootTable);

var _ExpandableTable = require('./ExpandableTable');

var _ExpandableTable2 = _interopRequireDefault(_ExpandableTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Table = function (_Component) {
  (0, _inherits3['default'])(Table, _Component);

  function Table(props) {
    (0, _classCallCheck3['default'])(this, Table);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.getRowKey = function (record, index) {
      var rowKey = _this.props.rowKey;
      var key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
      (0, _warning2['default'])(key !== undefined, 'Each record in table should have a unique `key` prop,' + 'or set `rowKey` to an unique primary key.');
      return key === undefined ? index : key;
    };

    _this.handleWindowResize = function () {
      _this.syncFixedTableRowHeight();
      _this.setScrollPositionClassName();
    };

    _this.syncFixedTableRowHeight = function () {
      var tableRect = _this.tableNode.getBoundingClientRect();
      // If tableNode's height less than 0, suppose it is hidden and don't recalculate rowHeight.
      if (tableRect.height !== undefined && tableRect.height <= 0) {
        return;
      }
      var prefixCls = _this.props.prefixCls;

      var headRows = _this.headTable ? _this.headTable.querySelectorAll('thead') : _this.bodyTable.querySelectorAll('thead');
      var footRows = _this.footTable ? _this.footTable.querySelectorAll('tfoot') : _this.bodyTable.querySelectorAll('tfoot');
      var bodyRows = _this.bodyTable.querySelectorAll('.' + prefixCls + '-row') || [];
      var fixedColumnsHeadRowsHeight = [].map.call(headRows, function (row) {
        return row.getBoundingClientRect().height || 'auto';
      });
      var fixedColumnsFootRowsHeight = [].map.call(footRows, function (row) {
        return row.getBoundingClientRect().height || 'auto';
      });
      var fixedColumnsBodyRowsHeight = [].map.call(bodyRows, function (row) {
        return row.getBoundingClientRect().height || 'auto';
      });
      var state = _this.store.getState();
      if ((0, _isEqual2['default'])(state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) && (0, _isEqual2['default'])(state.fixedColumnsFootRowsHeight, fixedColumnsFootRowsHeight) && (0, _isEqual2['default'])(state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)) {
        return;
      }

      _this.store.setState({
        fixedColumnsHeadRowsHeight: fixedColumnsHeadRowsHeight,
        fixedColumnsFootRowsHeight: fixedColumnsFootRowsHeight,
        fixedColumnsBodyRowsHeight: fixedColumnsBodyRowsHeight
      });
    };

    _this.handleBodyScrollLeft = function (e) {
      if (e.currentTarget !== e.target) {
        return;
      }
      var target = e.target;
      var _this$props$scroll = _this.props.scroll,
          scroll = _this$props$scroll === undefined ? {} : _this$props$scroll;
      var headTable = _this.headTable,
          bodyTable = _this.bodyTable,
          footTable = _this.footTable;

      if (target.scrollLeft !== _this.lastScrollLeft && scroll.x) {
        if (target === bodyTable) {
          if (headTable) headTable.scrollLeft = target.scrollLeft;
          if (footTable) footTable.scrollLeft = target.scrollLeft;
        } else if (target === headTable) {
          if (bodyTable) bodyTable.scrollLeft = target.scrollLeft;
          if (footTable) footTable.scrollLeft = target.scrollLeft;
        } else if (target === footTable) {
          if (bodyTable) bodyTable.scrollLeft = target.scrollLeft;
          if (headTable) headTable.scrollLeft = target.scrollLeft;
        }
        _this.setScrollPositionClassName();
      }
      // Remember last scrollLeft for scroll direction detecting.
      _this.lastScrollLeft = target.scrollLeft;
    };

    _this.handleBodyScrollTop = function (e) {
      var target = e.target;
      var _this$props$scroll2 = _this.props.scroll,
          scroll = _this$props$scroll2 === undefined ? {} : _this$props$scroll2;
      var headTable = _this.headTable,
          bodyTable = _this.bodyTable,
          fixedColumnsBodyLeft = _this.fixedColumnsBodyLeft,
          fixedColumnsBodyRight = _this.fixedColumnsBodyRight;

      if (target.scrollTop !== _this.lastScrollTop && scroll.y && target !== headTable) {
        var scrollTop = target.scrollTop;
        if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
          fixedColumnsBodyLeft.scrollTop = scrollTop;
        }
        if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
          fixedColumnsBodyRight.scrollTop = scrollTop;
        }
        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      }
      // Remember last scrollTop for scroll direction detecting.
      _this.lastScrollTop = target.scrollTop;
    };

    _this.handleBodyScroll = function (e) {
      _this.handleBodyScrollLeft(e);
      _this.handleBodyScrollTop(e);
    };

    _this.saveRef = function (name) {
      return function (node) {
        _this[name] = node;
      };
    };

    ['onRowClick', 'onRowDoubleClick', 'onRowContextMenu', 'onRowMouseEnter', 'onRowMouseLeave'].forEach(function (name) {
      (0, _warning2['default'])(props[name] === undefined, name + ' is deprecated, please use onRow instead.');
    });

    (0, _warning2['default'])(props.getBodyWrapper === undefined, 'getBodyWrapper is deprecated, please use custom components instead.');

    _this.columnManager = new _ColumnManager2['default'](props.columns, props.children);

    _this.store = (0, _miniStore.create)({
      currentHoverKey: null,
      fixedColumnsHeadRowsHeight: [],
      fixedColumnsFootRowsHeight: [],
      fixedColumnsBodyRowsHeight: []
    });

    _this.setScrollPosition('left');

    _this.debouncedWindowResize = (0, _debounce2['default'])(_this.handleWindowResize, 150);
    return _this;
  }

  (0, _createClass3['default'])(Table, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        table: {
          props: this.props,
          columnManager: this.columnManager,
          saveRef: this.saveRef,
          components: (0, _merge2['default'])({
            table: 'table',
            header: {
              wrapper: 'thead',
              row: 'tr',
              cell: 'th'
            },
            body: {
              wrapper: 'tbody',
              row: 'tr',
              cell: 'td'
            },
            footer: {
              wrapper: 'tfoot',
              row: 'tr',
              cell: 'td'
            }
          }, this.props.components)
        }
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.columnManager.isAnyColumnsFixed()) {
        this.handleWindowResize();
        this.resizeEvent = (0, _addEventListener2['default'])(window, 'resize', this.debouncedWindowResize);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.columns && nextProps.columns !== this.props.columns) {
        this.columnManager.reset(nextProps.columns);
      } else if (nextProps.children !== this.props.children) {
        this.columnManager.reset(null, nextProps.children);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.columnManager.isAnyColumnsFixed()) {
        this.handleWindowResize();
        if (!this.resizeEvent) {
          this.resizeEvent = (0, _addEventListener2['default'])(window, 'resize', this.debouncedWindowResize);
        }
      }
      // when table changes to empty, reset scrollLeft
      if (prevProps.data.length > 0 && this.props.data.length === 0 && this.hasScrollX()) {
        this.resetScrollX();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.resizeEvent) {
        this.resizeEvent.remove();
      }
      if (this.debouncedWindowResize) {
        this.debouncedWindowResize.cancel();
      }
    }
  }, {
    key: 'setScrollPosition',
    value: function setScrollPosition(position) {
      this.scrollPosition = position;
      if (this.tableNode) {
        var prefixCls = this.props.prefixCls;

        if (position === 'both') {
          (0, _componentClasses2['default'])(this.tableNode).remove(new RegExp('^' + prefixCls + '-scroll-position-.+$')).add(prefixCls + '-scroll-position-left').add(prefixCls + '-scroll-position-right');
        } else {
          (0, _componentClasses2['default'])(this.tableNode).remove(new RegExp('^' + prefixCls + '-scroll-position-.+$')).add(prefixCls + '-scroll-position-' + position);
        }
      }
    }
  }, {
    key: 'setScrollPositionClassName',
    value: function setScrollPositionClassName() {
      var node = this.bodyTable;
      var scrollToLeft = node.scrollLeft === 0;
      var scrollToRight = node.scrollLeft + 1 >= node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width;
      if (scrollToLeft && scrollToRight) {
        this.setScrollPosition('both');
      } else if (scrollToLeft) {
        this.setScrollPosition('left');
      } else if (scrollToRight) {
        this.setScrollPosition('right');
      } else if (this.scrollPosition !== 'middle') {
        this.setScrollPosition('middle');
      }
    }
  }, {
    key: 'resetScrollX',
    value: function resetScrollX() {
      if (this.headTable) {
        this.headTable.scrollLeft = 0;
      }
      if (this.bodyTable) {
        this.bodyTable.scrollLeft = 0;
      }
      if (this.footTable) {
        this.footTable.scrollLeft = 0;
      }
    }
  }, {
    key: 'hasScrollX',
    value: function hasScrollX() {
      var _props$scroll = this.props.scroll,
          scroll = _props$scroll === undefined ? {} : _props$scroll;

      return 'x' in scroll;
    }
  }, {
    key: 'renderMainTable',
    value: function renderMainTable() {
      var _props = this.props,
          scroll = _props.scroll,
          prefixCls = _props.prefixCls;

      var isAnyColumnsFixed = this.columnManager.isAnyColumnsFixed();
      var scrollable = isAnyColumnsFixed || scroll.x || scroll.y;

      var table = [this.renderTable({
        columns: this.columnManager.groupedColumns(),
        isAnyColumnsFixed: isAnyColumnsFixed
      }), this.renderEmptyText(), this.renderFooter()];

      return scrollable ? _react2['default'].createElement(
        'div',
        { className: prefixCls + '-scroll' },
        table
      ) : table;
    }
  }, {
    key: 'renderLeftFixedTable',
    value: function renderLeftFixedTable() {
      var prefixCls = this.props.prefixCls;


      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-fixed-left' },
        this.renderTable({
          columns: this.columnManager.leftColumns(),
          fixed: 'left'
        })
      );
    }
  }, {
    key: 'renderRightFixedTable',
    value: function renderRightFixedTable() {
      var prefixCls = this.props.prefixCls;


      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-fixed-right' },
        this.renderTable({
          columns: this.columnManager.rightColumns(),
          fixed: 'right'
        })
      );
    }
  }, {
    key: 'renderTable',
    value: function renderTable(options) {
      var columns = options.columns,
          fixed = options.fixed,
          isAnyColumnsFixed = options.isAnyColumnsFixed;
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          _props2$scroll = _props2.scroll,
          scroll = _props2$scroll === undefined ? {} : _props2$scroll;

      var tableClassName = scroll.x || fixed ? prefixCls + '-fixed' : '';

      var headTable = _react2['default'].createElement(_HeadTable2['default'], {
        key: 'head',
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        handleBodyScrollLeft: this.handleBodyScrollLeft,
        expander: this.expander
      });

      var bodyTable = _react2['default'].createElement(_BodyTable2['default'], {
        key: 'body',
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        getRowKey: this.getRowKey,
        handleBodyScroll: this.handleBodyScroll,
        expander: this.expander,
        isAnyColumnsFixed: isAnyColumnsFixed
      });

      var footTable = _react2['default'].createElement(_FootTable2['default'], {
        key: 'foot',
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        handleBodyScrollLeft: this.handleBodyScrollLeft,
        expander: this.expander
      });

      return [headTable, bodyTable, footTable];
    }
  }, {
    key: 'renderTitle',
    value: function renderTitle() {
      var _props3 = this.props,
          title = _props3.title,
          prefixCls = _props3.prefixCls;

      return title ? _react2['default'].createElement(
        'div',
        { className: prefixCls + '-title', key: 'title' },
        title(this.props.data)
      ) : null;
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      var _props4 = this.props,
          footer = _props4.footer,
          prefixCls = _props4.prefixCls;

      return footer ? _react2['default'].createElement(
        'div',
        { className: prefixCls + '-footer', key: 'footer' },
        footer(this.props.data)
      ) : null;
    }
  }, {
    key: 'renderEmptyText',
    value: function renderEmptyText() {
      var _props5 = this.props,
          emptyText = _props5.emptyText,
          prefixCls = _props5.prefixCls,
          data = _props5.data;

      if (data.length) {
        return null;
      }
      var emptyClassName = prefixCls + '-placeholder';
      return _react2['default'].createElement(
        'div',
        { className: emptyClassName, key: 'emptyText' },
        typeof emptyText === 'function' ? emptyText() : emptyText
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var prefixCls = props.prefixCls;

      var className = props.prefixCls;
      if (props.className) {
        className += ' ' + props.className;
      }
      if (props.useFixedHeader || props.scroll && props.scroll.y) {
        className += ' ' + prefixCls + '-fixed-header';
      }
      if (this.scrollPosition === 'both') {
        className += ' ' + prefixCls + '-scroll-position-left ' + prefixCls + '-scroll-position-right';
      } else {
        className += ' ' + prefixCls + '-scroll-position-' + this.scrollPosition;
      }
      var hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
      var hasRightFixed = this.columnManager.isAnyColumnsRightFixed();

      return _react2['default'].createElement(
        _miniStore.Provider,
        { store: this.store },
        _react2['default'].createElement(
          _ExpandableTable2['default'],
          (0, _extends3['default'])({}, props, {
            columnManager: this.columnManager,
            getRowKey: this.getRowKey
          }),
          function (expander) {
            _this2.expander = expander;
            return _react2['default'].createElement(
              'div',
              {
                ref: _this2.saveRef('tableNode'),
                className: className,
                style: props.style,
                id: props.id
              },
              _this2.renderTitle(),
              _react2['default'].createElement(
                'div',
                { className: prefixCls + '-content' },
                _this2.renderMainTable(),
                hasLeftFixed && _this2.renderLeftFixedTable(),
                hasRightFixed && _this2.renderRightFixedTable()
              )
            );
          }
        )
      );
    }
  }]);
  return Table;
}(_react.Component);

Table.propTypes = (0, _extends3['default'])({
  data: _propTypes2['default'].array,
  useFixedHeader: _propTypes2['default'].bool,
  columns: _propTypes2['default'].array,
  prefixCls: _propTypes2['default'].string,
  bodyStyle: _propTypes2['default'].object,
  style: _propTypes2['default'].object,
  rowKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
  rowClassName: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
  onRow: _propTypes2['default'].func,
  onHeaderRow: _propTypes2['default'].func,
  onRowClick: _propTypes2['default'].func,
  onRowDoubleClick: _propTypes2['default'].func,
  onRowContextMenu: _propTypes2['default'].func,
  onRowMouseEnter: _propTypes2['default'].func,
  onRowMouseLeave: _propTypes2['default'].func,
  showHeader: _propTypes2['default'].bool,
  title: _propTypes2['default'].func,
  id: _propTypes2['default'].string,
  footer: _propTypes2['default'].func,
  emptyText: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func]),
  scroll: _propTypes2['default'].object,
  rowRef: _propTypes2['default'].func,
  getBodyWrapper: _propTypes2['default'].func,
  children: _propTypes2['default'].node,
  components: _propTypes2['default'].shape({
    table: _propTypes2['default'].any,
    header: _propTypes2['default'].shape({
      wrapper: _propTypes2['default'].any,
      row: _propTypes2['default'].any,
      cell: _propTypes2['default'].any
    }),
    body: _propTypes2['default'].shape({
      wrapper: _propTypes2['default'].any,
      row: _propTypes2['default'].any,
      cell: _propTypes2['default'].any
    }),
    footer: _propTypes2['default'].shape({
      wrapper: _propTypes2['default'].any,
      row: _propTypes2['default'].any,
      cell: _propTypes2['default'].any
    })
  })
}, _ExpandableTable2['default'].PropTypes);
Table.childContextTypes = {
  table: _propTypes2['default'].any,
  components: _propTypes2['default'].any
};
Table.defaultProps = {
  data: [],
  useFixedHeader: false,
  rowKey: 'key',
  rowClassName: function rowClassName() {
    return '';
  },
  onRow: function onRow() {},
  onHeaderRow: function onHeaderRow() {},

  prefixCls: 'rc-table',
  bodyStyle: {},
  style: {},
  showHeader: true,
  scroll: {},
  rowRef: function rowRef() {
    return null;
  },
  emptyText: function emptyText() {
    return 'No Data';
  }
};
exports['default'] = Table;
module.exports = exports['default'];