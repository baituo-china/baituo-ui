import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import { create, Provider } from 'mini-store';
import classes from 'component-classes';
import warning from '../../_util/warning';
import addEventListener from '../../_util/addEventListener';
import ColumnManager from './ColumnManager';
import HeadTable from './HeadTable';
import BodyTable from './BodyTable';
import FootTable from './FootTable';
import ExpandableTable from './ExpandableTable';

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.getRowKey = function (record, index) {
      var rowKey = _this.props.rowKey;
      var key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
      warning(key !== undefined, 'Each record in table should have a unique `key` prop,' + 'or set `rowKey` to an unique primary key.');
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
      if (isEqual(state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) && isEqual(state.fixedColumnsFootRowsHeight, fixedColumnsFootRowsHeight) && isEqual(state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)) {
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
      warning(props[name] === undefined, name + ' is deprecated, please use onRow instead.');
    });

    warning(props.getBodyWrapper === undefined, 'getBodyWrapper is deprecated, please use custom components instead.');

    _this.columnManager = new ColumnManager(props.columns, props.children);

    _this.store = create({
      currentHoverKey: null,
      fixedColumnsHeadRowsHeight: [],
      fixedColumnsFootRowsHeight: [],
      fixedColumnsBodyRowsHeight: []
    });

    _this.setScrollPosition('left');

    _this.debouncedWindowResize = debounce(_this.handleWindowResize, 150);
    return _this;
  }

  _createClass(Table, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        table: {
          props: this.props,
          columnManager: this.columnManager,
          saveRef: this.saveRef,
          components: merge({
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
        this.resizeEvent = addEventListener(window, 'resize', this.debouncedWindowResize);
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
          this.resizeEvent = addEventListener(window, 'resize', this.debouncedWindowResize);
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
          classes(this.tableNode).remove(new RegExp('^' + prefixCls + '-scroll-position-.+$')).add(prefixCls + '-scroll-position-left').add(prefixCls + '-scroll-position-right');
        } else {
          classes(this.tableNode).remove(new RegExp('^' + prefixCls + '-scroll-position-.+$')).add(prefixCls + '-scroll-position-' + position);
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

      return scrollable ? React.createElement(
        'div',
        { className: prefixCls + '-scroll' },
        table
      ) : table;
    }
  }, {
    key: 'renderLeftFixedTable',
    value: function renderLeftFixedTable() {
      var prefixCls = this.props.prefixCls;


      return React.createElement(
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


      return React.createElement(
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

      var headTable = React.createElement(HeadTable, {
        key: 'head',
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        handleBodyScrollLeft: this.handleBodyScrollLeft,
        expander: this.expander
      });

      var bodyTable = React.createElement(BodyTable, {
        key: 'body',
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        getRowKey: this.getRowKey,
        handleBodyScroll: this.handleBodyScroll,
        expander: this.expander,
        isAnyColumnsFixed: isAnyColumnsFixed
      });

      var footTable = React.createElement(FootTable, {
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

      return title ? React.createElement(
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

      return footer ? React.createElement(
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
      return React.createElement(
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

      return React.createElement(
        Provider,
        { store: this.store },
        React.createElement(
          ExpandableTable,
          _extends({}, props, {
            columnManager: this.columnManager,
            getRowKey: this.getRowKey
          }),
          function (expander) {
            _this2.expander = expander;
            return React.createElement(
              'div',
              {
                ref: _this2.saveRef('tableNode'),
                className: className,
                style: props.style,
                id: props.id
              },
              _this2.renderTitle(),
              React.createElement(
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
}(Component);

Table.propTypes = _extends({
  data: PropTypes.array,
  useFixedHeader: PropTypes.bool,
  columns: PropTypes.array,
  prefixCls: PropTypes.string,
  bodyStyle: PropTypes.object,
  style: PropTypes.object,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onRow: PropTypes.func,
  onHeaderRow: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  onRowContextMenu: PropTypes.func,
  onRowMouseEnter: PropTypes.func,
  onRowMouseLeave: PropTypes.func,
  showHeader: PropTypes.bool,
  title: PropTypes.func,
  id: PropTypes.string,
  footer: PropTypes.func,
  emptyText: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  scroll: PropTypes.object,
  rowRef: PropTypes.func,
  getBodyWrapper: PropTypes.func,
  children: PropTypes.node,
  components: PropTypes.shape({
    table: PropTypes.any,
    header: PropTypes.shape({
      wrapper: PropTypes.any,
      row: PropTypes.any,
      cell: PropTypes.any
    }),
    body: PropTypes.shape({
      wrapper: PropTypes.any,
      row: PropTypes.any,
      cell: PropTypes.any
    }),
    footer: PropTypes.shape({
      wrapper: PropTypes.any,
      row: PropTypes.any,
      cell: PropTypes.any
    })
  })
}, ExpandableTable.PropTypes);
Table.childContextTypes = {
  table: PropTypes.any,
  components: PropTypes.any
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
export default Table;