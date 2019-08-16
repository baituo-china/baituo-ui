'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _set = require('core-js/library/fn/set');

var _set2 = _interopRequireDefault(_set);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _warning = require('../../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _KeyCode = require('../../_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _toArray = require('../util/Children/toArray');

var _toArray2 = _interopRequireDefault(_toArray);

var _menu = require('../menu');

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _ripple = require('../../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _util = require('./util');

var _SelectTrigger = require('./SelectTrigger');

var _SelectTrigger2 = _interopRequireDefault(_SelectTrigger);

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint func-names: 1 */
function chaining() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // eslint-disable-line
    // eslint-disable-line
    for (var i = 0; i < fns.length; i++) {
      if (fns[i] && typeof fns[i] === 'function') {
        fns[i].apply(this, args);
      }
    }
  };
}

var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'tl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'bl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'tr'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var BUILT_IN_PLACEMENTS_LABEL = {
  bottomLeft: {
    points: ['tl', 'tl'],
    offset: [0, 19],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'bl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'tr'],
    offset: [0, 19],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var Select = function (_Component) {
  (0, _inherits3['default'])(Select, _Component);

  function Select(props) {
    (0, _classCallCheck3['default'])(this, Select);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _initialiseProps.call(_this);

    var value = _this.getValueFromProps(props);
    var optionsInfo = _this.getOptionsInfoFromProps(props);
    var inputValue = '';
    if (props.combobox) {
      inputValue = value.length ? _this.getLabelBySingleValue(value[0], optionsInfo) : '';
    }
    var open = props.open;
    if (open === undefined) {
      open = props.defaultOpen;
    }
    var filterValue = props.filterValue || '';
    _this.state = {
      value: value,
      inputValue: inputValue,
      open: open,
      optionsInfo: optionsInfo,
      filterValue: filterValue
    };
    _this.adjustOpenState();
    return _this;
  }

  (0, _createClass3['default'])(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.focus();
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.props = nextProps;
      this.state = nextState;
      this.adjustOpenState();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if ((0, _util.isMultipleOrTags)(this.props)) {
        var inputNode = this.getInputDOMNode();
        var mirrorNode = this.getInputMirrorDOMNode();
        if (inputNode.value) {
          inputNode.style.width = '';
          inputNode.style.width = mirrorNode.clientWidth + 'px';
        } else {
          inputNode.style.width = '';
        }
        this.onChoiceAnimationLeave();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearFocusTime();
      this.clearBlurTime();
      this.clearAdjustTimer();
      if (this.dropdownContainer) {
        (0, _reactDom.unmountComponentAtNode)(this.dropdownContainer);
        document.body.removeChild(this.dropdownContainer);
        this.dropdownContainer = null;
      }
    }

    // combobox ignore

  }, {
    key: 'getBuiltinPlacements',
    value: function getBuiltinPlacements() {
      var _props = this.props,
          builtinPlacements = _props.builtinPlacements,
          label = _props.label;

      if (builtinPlacements) {
        return builtinPlacements;
      }
      if (!(0, _util.isTags)(this.props) && !(0, _util.isCombobox)(this.props)) {
        if (label) {
          return BUILT_IN_PLACEMENTS_LABEL;
        }
        return BUILT_IN_PLACEMENTS;
      }
    }
  }, {
    key: 'renderClear',
    value: function renderClear() {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          allowClear = _props2.allowClear;
      var _state = this.state,
          value = _state.value,
          inputValue = _state.inputValue;

      var clear = _react2['default'].createElement(_button2['default'], (0, _extends3['default'])({
        key: 'clear',
        className: prefixCls + '-clear',
        style: _util.UNSELECTABLE_STYLE
      }, _util.UNSELECTABLE_ATTRIBUTE, {
        shape: 'circle',
        icon: 'close',
        size: 'small',
        onClick: this.onClearSelection,
        onMouseDown: _util.preventDefaultEvent
      }));
      if (!allowClear) {
        return null;
      }
      if ((0, _util.isCombobox)(this.props)) {
        if (inputValue) {
          return clear;
        }
        return null;
      }
      if (inputValue || value.length) {
        return clear;
      }
      return null;
    }
  }, {
    key: 'getLabel',
    value: function getLabel() {
      var _props3 = this.props,
          placeholder = _props3.placeholder,
          label = _props3.label;

      if (!this.hasValue() && placeholder) {
        return placeholder;
      }
      return label;
    }
  }, {
    key: 'renderFloatLabel',
    value: function renderFloatLabel() {
      var label = this.getLabel();
      var _props4 = this.props,
          prefixCls = _props4.prefixCls,
          border = _props4.border;

      if (label && border) {
        return _react2['default'].createElement(
          'div',
          { className: prefixCls + '-label-wrapper' },
          _react2['default'].createElement(
            'div',
            { className: prefixCls + '-label' },
            label
          )
        );
      }
    }
  }, {
    key: 'hasValue',
    value: function hasValue() {
      var _state2 = this.state,
          value = _state2.value,
          inputValue = _state2.inputValue;

      return inputValue || value.length && value[0];
    }
  }, {
    key: 'render',
    value: function render() {
      var _rootCls;

      var props = this.props;
      var state = this.state;
      var className = props.className,
          disabled = props.disabled,
          prefixCls = props.prefixCls,
          label = props.label,
          loading = props.loading,
          border = props.border;
      var _state3 = this.state,
          open = _state3.open,
          value = _state3.value,
          inputValue = _state3.inputValue;

      var multiple = (0, _util.isMultipleOrTags)(props);
      var ctrlNode = this.renderTopControlNode();
      var extraSelectionProps = {};
      var options = this._options;
      if (!(0, _util.isMultipleOrTagsOrCombobox)(props)) {
        extraSelectionProps = (0, _extends3['default'])({}, extraSelectionProps, {
          onKeyDown: this.onKeyDown,
          tabIndex: disabled ? -1 : 0
        });
      }

      var rootCls = (_rootCls = {}, (0, _defineProperty3['default'])(_rootCls, className, !!className), (0, _defineProperty3['default'])(_rootCls, prefixCls, 1), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-open', open), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-focused', !(0, _util.isMultiple)(props) && this._focused), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-has-value', this.hasValue()), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-has-label', label), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-combobox', (0, _util.isCombobox)(props)), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-enabled', !disabled), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-allow-clear', !!props.allowClear), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-tags', (0, _util.isTags)(props)), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-multiple', (0, _util.isMultiple)(props)), (0, _defineProperty3['default'])(_rootCls, prefixCls + '-has-border', border), _rootCls);
      return _react2['default'].createElement(
        _SelectTrigger2['default'],
        {
          onPopupFocus: this.onPopupFocus,
          onMouseEnter: props.onMouseEnter,
          onMouseLeave: props.onMouseLeave,
          checkAll: props.showCheckAll ? this.checkAll : undefined,
          dropdownAlign: props.dropdownAlign,
          dropdownClassName: props.dropdownClassName,
          dropdownMatchSelectWidth: props.dropdownMatchSelectWidth,
          defaultActiveFirstOption: props.defaultActiveFirstOption,
          dropdownMenuStyle: props.dropdownMenuStyle,
          transitionName: props.transitionName,
          animation: props.animation,
          prefixCls: props.prefixCls,
          dropdownStyle: props.dropdownStyle,
          combobox: props.combobox,
          showSearch: props.showSearch,
          options: options,
          multiple: multiple,
          disabled: disabled,
          visible: open,
          inputValue: state.inputValue,
          value: state.value,
          loading: loading,
          filter: props.filter,
          filterValue: state.filterValue,
          backfillValue: state.backfillValue,
          firstActiveValue: props.firstActiveValue,
          onFilterChange: this.onFilterChange,
          onDropdownVisibleChange: this.onDropdownVisibleChange,
          onDropdownMouseDown: props.onDropdownMouseDown,
          getPopupContainer: props.getPopupContainer,
          getRootDomNode: props.getRootDomNode,
          onMenuSelect: this.onMenuSelect,
          onMenuDeselect: this.onMenuDeselect,
          onPopupScroll: props.onPopupScroll,
          onKeyDown: chaining(this.onInputKeyDown, this.props.onInputKeyDown),
          filterPlaceholder: props.filterPlaceholder,
          builtinPlacements: this.getBuiltinPlacements(),
          footer: props.footer,
          ref: (0, _util.saveRef)(this, 'selectTriggerRef')
        },
        _react2['default'].createElement(
          'div',
          {
            style: props.style,
            ref: (0, _util.saveRef)(this, 'rootRef'),
            onBlur: this.onOuterBlur,
            onFocus: this.onOuterFocus,
            className: (0, _classnames3['default'])(rootCls)
          },
          _react2['default'].createElement(
            'div',
            (0, _extends3['default'])({
              ref: (0, _util.saveRef)(this, 'selectionRef'),
              key: 'selection',
              className: prefixCls + '-selection\n            ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
              role: 'combobox',
              'aria-autocomplete': 'list',
              'aria-haspopup': 'true',
              'aria-expanded': open
            }, extraSelectionProps),
            ctrlNode,
            this.renderFloatLabel()
          )
        )
      );
    }
  }]);
  return Select;
}(_react.Component);

Select.propTypes = _PropTypes.SelectPropTypes;
Select.defaultProps = {
  blurChange: true,
  prefixCls: 'rc-select',
  defaultOpen: false,
  labelInValue: false,
  defaultActiveFirstOption: true,
  showSearch: true,
  allowClear: false,
  onInput: _noop2['default'],
  onChange: _noop2['default'],
  onFocus: _noop2['default'],
  onBlur: _noop2['default'],
  onSelect: _noop2['default'],
  onSearch: _noop2['default'],
  onDeselect: _noop2['default'],
  onInputKeyDown: _noop2['default'],
  onChoiceItemClick: _noop2['default'],
  onClear: _noop2['default'],
  showArrow: true,
  dropdownMatchSelectWidth: true,
  dropdownStyle: {},
  dropdownMenuStyle: {},
  optionFilterProp: 'value',
  optionLabelProp: 'value',
  notFoundContent: 'Not Found',
  backfill: false,
  tokenSeparators: [],
  showNotFindInputItem: true,
  showNotFindSelectedItem: true,
  placeholder: '',
  label: '',
  filterPlaceholder: 'Input for filter',
  showCheckAll: true,
  loading: false,
  border: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.needExpand = true;

  this.componentWillReceiveProps = function (nextProps) {
    var optionsInfo = _this2.getOptionsInfoFromProps(nextProps);
    _this2.setState({
      optionsInfo: optionsInfo
    });
    if ('value' in nextProps) {
      var value = _this2.getValueFromProps(nextProps);
      _this2.setState({
        value: value
      });
      if (nextProps.combobox) {
        _this2.setState({
          inputValue: value.length ? _this2.getLabelBySingleValue(value[0], optionsInfo) : ''
        });
      }
    }
    if ('filterValue' in nextProps) {
      _this2.setState({
        filterValue: nextProps.filterValue
      });
    }
  };

  this.onFilterChange = function () {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var onFilterChange = _this2.props.onFilterChange;

    _this2.onInputValueChange(val);
    _this2.setState({
      filterValue: val
    });
    if (onFilterChange) {
      onFilterChange(val);
    }
  };

  this.onInputValueChange = function (val) {
    var _props5 = _this2.props,
        tokenSeparators = _props5.tokenSeparators,
        onInput = _props5.onInput;

    onInput(val);
    if ((0, _util.isMultipleOrTags)(_this2.props) && tokenSeparators.length && (0, _util.includesSeparators)(val, tokenSeparators)) {
      var nextValue = _this2.getValueByInput(val);
      if (nextValue !== undefined) {
        _this2.fireChange(nextValue);
      }
      _this2.setOpenState(false, true);
      _this2.setInputValue('', false);
      return;
    }
    _this2.setInputValue(val);
    _this2.setState({
      open: true
    });
    if ((0, _util.isCombobox)(_this2.props)) {
      _this2.fireChange([val]);
    }
  };

  this.onInputChange = function (event) {
    var val = event.target.value;
    _this2.onInputValueChange(val);
  };

  this.onDropdownVisibleChange = function (open) {
    var filter = _this2.props.filter;

    if (_this2.needExpand) {
      if (open && !_this2._focused) {
        _this2.clearBlurTime();
        _this2.timeoutFocus();
        _this2._focused = true;
        _this2.updateFocusClassName();
      }
      if (filter) {
        _this2.onFilterChange('');
      }
      if (open && filter) {
        setTimeout(function () {
          var filterInput = _this2.selectTriggerRef.getFilterInput();
          filterInput && filterInput.focus();
        }, 20);
      }
      _this2.setOpenState(open);
    }
  };

  this.onKeyDown = function (event) {
    var props = _this2.props;
    if (props.disabled) {
      return;
    }
    var keyCode = event.keyCode;
    if (_this2.state.open && !_this2.getInputDOMNode()) {
      _this2.onInputKeyDown(event);
    } else if (keyCode === _KeyCode2['default'].ENTER || keyCode === _KeyCode2['default'].DOWN) {
      _this2.setOpenState(true);
      event.preventDefault();
    }
  };

  this.onInputKeyDown = function (event) {
    var props = _this2.props;
    if (props.disabled) {
      return;
    }
    var state = _this2.state;
    var keyCode = event.keyCode;
    if ((0, _util.isMultipleOrTags)(props) && !event.target.value && keyCode === _KeyCode2['default'].BACKSPACE) {
      event.preventDefault();
      var value = state.value;

      if (value.length) {
        _this2.removeSelected(value[value.length - 1], value.length - 1);
      }
      return;
    }
    if (keyCode === _KeyCode2['default'].DOWN) {
      if (!state.open) {
        _this2.openIfHasChildren();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } else if (keyCode === _KeyCode2['default'].ESC) {
      if (state.open) {
        _this2.setOpenState(false);
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }

    if (state.open) {
      var menu = _this2.selectTriggerRef.getInnerMenu();
      if (menu && menu.onKeyDown(event, _this2.handleBackfill)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  this.onMenuSelect = function (_ref) {
    var item = _ref.item;

    var value = _this2.state.value;
    var props = _this2.props;
    var selectedValue = (0, _util.getValuePropValue)(item);
    var lastValue = value[value.length - 1];
    if (_this2.fireSelect(selectedValue) === false) {
      return;
    }
    if ((0, _util.isMultipleOrTags)(props)) {
      if ((0, _util.findIndexInValueBySingleValue)(value, selectedValue) !== -1) {
        return;
      }
      value = value.concat([selectedValue]);
    } else {
      if ((0, _util.isCombobox)(props)) {
        _this2.skipAdjustOpen = true;
        _this2.clearAdjustTimer();
        _this2.skipAdjustOpenTimer = setTimeout(function () {
          _this2.skipAdjustOpen = false;
        }, 0);
      }
      if (lastValue && lastValue === selectedValue && selectedValue !== _this2.state.backfillValue) {
        _this2.setOpenState(false, true);
        return;
      }
      value = [selectedValue];
      _this2.setOpenState(false, true);
    }
    _this2.fireChange(value);
    var inputValue = void 0;
    if ((0, _util.isCombobox)(props)) {
      inputValue = (0, _util.getPropValue)(item, props.optionLabelProp);
    } else {
      inputValue = '';
    }
    if (!_this2.props.filter) {
      _this2.setInputValue(inputValue, true);
    }
  };

  this.onMenuDeselect = function (_ref2) {
    var item = _ref2.item,
        domEvent = _ref2.domEvent;

    if (domEvent.type === 'keydown' && domEvent.keyCode === _KeyCode2['default'].ENTER) {
      _this2.removeSelected((0, _util.getValuePropValue)(item), null);
      return;
    }
    if (domEvent.type === 'click') {
      _this2.removeSelected((0, _util.getValuePropValue)(item), null);
    }
    var props = _this2.props;

    if (props.autoClearSearchValue) {
      _this2.setInputValue('', false);
    }
  };

  this.onArrowClick = function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (!_this2.props.disabled) {
      _this2.onDropdownVisibleChange(!_this2.state.open);
    }
  };

  this.onOuterFocus = function (e) {
    if (_this2.props.disabled) {
      e.preventDefault();
      return;
    }
    _this2.clearBlurTime();
    if (!(0, _util.isMultipleOrTagsOrCombobox)(_this2.props) && e.target === _this2.getInputDOMNode()) {
      return;
    }
    if (_this2._focused) {
      return;
    }
    _this2._focused = true;
    _this2.updateFocusClassName();
    // only effect multiple or tag mode
    if (!(0, _util.isMultipleOrTags)(_this2.props) || !_this2._mouseDown) {
      _this2.timeoutFocus();
    }
  };

  this.onPopupFocus = function () {
    // fix ie scrollbar, focus element again
    _this2.maybeFocus(true, true);
  };

  this.onOuterBlur = function (e) {
    if (_this2.props.disabled) {
      e.preventDefault();
      return;
    }
    _this2.blurTimer = setTimeout(function () {
      _this2._focused = false;
      _this2.updateFocusClassName();
      var props = _this2.props;
      var value = _this2.state.value;
      var inputValue = _this2.state.inputValue;

      if ((0, _util.isSingleMode)(props) && props.showSearch && inputValue && props.defaultActiveFirstOption) {
        var options = _this2._options || [];
        if (options.length) {
          var firstOption = (0, _util.findFirstMenuItem)(options);
          if (firstOption) {
            value = [firstOption.key];
            _this2.fireChange(value);
          }
        }
      } else if ((0, _util.isMultipleOrTags)(props) && inputValue) {
        if (_this2.props.blurChange) {
          // why not use setState?
          _this2.state.inputValue = _this2.getInputDOMNode().value = '';
        }

        value = _this2.getValueByInput(inputValue);
        if (value !== undefined && _this2.props.blurChange) {
          _this2.fireChange(value);
        }
      }
      props.onBlur(_this2.getVLForOnChange(value));
    }, 10);
  };

  this.onClearSelection = function (event) {
    var props = _this2.props;
    var state = _this2.state;
    if (props.disabled) {
      return;
    }
    var inputValue = state.inputValue,
        value = state.value;

    event.stopPropagation();
    if (inputValue || value.length) {
      props.onClear();
      if (value.length) {
        _this2.fireChange([]);
      }
      _this2.setOpenState(false, true);
      if (inputValue) {
        _this2.setInputValue('');
      }
    }
  };

  this.onChoiceAnimationLeave = function () {
    _this2.selectTriggerRef.triggerRef.forcePopupAlign();
  };

  this.getValueFromProps = function (props) {
    var value = [];
    if ('value' in props) {
      value = (0, _util.toArray)(props.value);
    } else {
      value = (0, _util.toArray)(props.defaultValue);
    }
    if (props.labelInValue) {
      value = value.map(function (v) {
        return v.key;
      });
    }
    if ((0, _util.isMultiple)(props)) {
      value = value.filter(function (v) {
        return !!v;
      });
    }
    return value;
  };

  this.getOptionsInfoFromProps = function (props) {
    var options = _this2.getOptionsFromChildren(props.children);
    var oldOptionsInfo = _this2.state ? _this2.state.optionsInfo : {};
    var value = _this2.state ? _this2.state.value : [];
    var optionsInfo = {};
    options.forEach(function (option) {
      var singleValue = (0, _util.getValuePropValue)(option);
      optionsInfo[(0, _util.getMapKey)(singleValue)] = {
        option: option,
        value: singleValue,
        label: _this2.getLabelFromOption(option),
        title: option.props.title
      };
    });
    value.forEach(function (v) {
      var key = (0, _util.getMapKey)(v);
      if (!optionsInfo[key]) {
        optionsInfo[key] = oldOptionsInfo[key];
      }
    });
    return optionsInfo;
  };

  this.getOptionInfoBySingleValue = function (value, optionsInfo) {
    var info = void 0;
    optionsInfo = optionsInfo || _this2.state.optionsInfo;
    if (optionsInfo[(0, _util.getMapKey)(value)]) {
      info = optionsInfo[(0, _util.getMapKey)(value)];
    }
    if (info) {
      return info;
    }
    var defaultLabel = value;
    if (_this2.props.labelInValue) {
      var label = (0, _util.getLabelFromPropsValue)(_this2.props.value, value);
      if (label !== undefined) {
        defaultLabel = label;
      }
    }
    var defaultInfo = {
      option: _react2['default'].createElement(
        _Option2['default'],
        { value: value, key: value },
        value
      ),
      value: value,
      label: defaultLabel
    };
    return defaultInfo;
  };

  this.getOptionBySingleValue = function (value) {
    var _getOptionInfoBySingl = _this2.getOptionInfoBySingleValue(value),
        option = _getOptionInfoBySingl.option;

    return option;
  };

  this.getOptionsBySingleValue = function (values) {
    return values.map(function (value) {
      return _this2.getOptionBySingleValue(value);
    });
  };

  this.getOptionsFromChildren = function (children) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _react.Children.forEach(children, function (child) {
      if (!child) {
        return;
      }
      if (child.type.isSelectOptGroup) {
        _this2.getOptionsFromChildren(child.props.children, options);
      } else {
        options.push(child);
      }
    });
    return options;
  };

  this.getValueByLabel = function (label) {
    if (label === undefined) {
      return null;
    }
    var value = null;
    Object.keys(_this2.state.optionsInfo).forEach(function (key) {
      var info = _this2.state.optionsInfo[key];
      if ((0, _util.toArray)(info.label).join('') === label) {
        value = info.value;
      }
    });
    return value;
  };

  this.getLabelFromOption = function (option) {
    return (0, _util.getPropValue)(option, _this2.props.optionLabelProp);
  };

  this.getVLBySingleValue = function (value) {
    if (_this2.props.labelInValue) {
      return {
        key: value,
        label: _this2.getLabelBySingleValue(value)
      };
    }
    return value;
  };

  this.getVLForOnChange = function (vls_) {
    var vls = vls_;
    if (vls !== undefined) {
      if (!_this2.props.labelInValue) {
        vls = vls.map(function (v) {
          return v;
        });
      } else {
        vls = vls.map(function (vl) {
          return {
            key: vl,
            label: _this2.getLabelBySingleValue(vl)
          };
        });
      }
      return (0, _util.isMultipleOrTags)(_this2.props) ? vls : vls[0];
    }
    return vls;
  };

  this.getLabelBySingleValue = function (value, optionsInfo) {
    var _getOptionInfoBySingl2 = _this2.getOptionInfoBySingleValue(value, optionsInfo),
        label = _getOptionInfoBySingl2.label;

    return label;
  };

  this.getDropdownContainer = function () {
    if (!_this2.dropdownContainer) {
      _this2.dropdownContainer = document.createElement('div');
      document.body.appendChild(_this2.dropdownContainer);
    }
    return _this2.dropdownContainer;
  };

  this.getPlaceholderElement = function () {
    var _props6 = _this2.props,
        placeholder = _props6.placeholder,
        prefixCls = _props6.prefixCls,
        border = _props6.border;

    if (!border && placeholder) {
      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-selection__placeholder' },
        placeholder
      );
    }
    return null;
  };

  this.getInputElement = function () {
    var props = _this2.props;
    var inputElement = props.getInputElement ? props.getInputElement() : _react2['default'].createElement('input', { id: props.id, autoComplete: 'off' });
    var inputCls = (0, _classnames3['default'])(inputElement.props.className, (0, _defineProperty3['default'])({}, props.prefixCls + '-search__field', true));
    // Add space to the end of the inputValue as the width measurement tolerance
    return _react2['default'].createElement(
      'div',
      { className: props.prefixCls + '-search__field__wrap' },
      (0, _react.cloneElement)(inputElement, {
        ref: (0, _util.saveRef)(_this2, 'inputRef'),
        onChange: _this2.onInputChange,
        onKeyDown: chaining(_this2.onInputKeyDown, inputElement.props.onKeyDown, _this2.props.onInputKeyDown),
        value: _this2.state.inputValue,
        disabled: props.disabled,
        className: inputCls
      }),
      _react2['default'].createElement(
        'span',
        {
          ref: (0, _util.saveRef)(_this2, 'inputMirrorRef'),
          className: props.prefixCls + '-search__field__mirror'
        },
        _this2.state.inputValue,
        '\xA0'
      )
    );
  };

  this.getInputDOMNode = function () {
    return _this2.topCtrlRef ? _this2.topCtrlRef.querySelector('input,textarea,div[contentEditable]') : _this2.inputRef;
  };

  this.getInputMirrorDOMNode = function () {
    return _this2.inputMirrorRef;
  };

  this.getPopupDOMNode = function () {
    return _this2.selectTriggerRef.getPopupDOMNode();
  };

  this.getPopupMenuComponent = function () {
    return _this2.selectTriggerRef.getInnerMenu();
  };

  this.setOpenState = function (open, needFocus) {
    var props = _this2.props,
        state = _this2.state;

    if (state.open === open) {
      _this2.maybeFocus(open, needFocus);
      return;
    }
    var nextState = {
      open: open,
      backfillValue: undefined
    };
    // clear search input value when open is false in singleMode.
    if (!open && (0, _util.isSingleMode)(props) && props.showSearch) {
      _this2.setInputValue('');
    }
    if (!open) {
      _this2.maybeFocus(open, needFocus);
    }
    _this2.setState(nextState, function () {
      if (open) {
        _this2.maybeFocus(open, needFocus);
      }
    });
  };

  this.setInputValue = function (inputValue) {
    var fireSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (inputValue !== _this2.state.inputValue) {
      _this2.setState({
        inputValue: inputValue
      });
      if (fireSearch) {
        _this2.props.onSearch(inputValue);
      }
    }
  };

  this.getValueByInput = function (string) {
    var _props7 = _this2.props,
        multiple = _props7.multiple,
        tokenSeparators = _props7.tokenSeparators;

    var nextValue = _this2.state.value;
    var hasNewValue = false;
    (0, _util.splitBySeparators)(string, tokenSeparators).forEach(function (label) {
      var selectedValue = [label];
      if (multiple) {
        var value = _this2.getValueByLabel(label);
        if (value && (0, _util.findIndexInValueBySingleValue)(nextValue, value) === -1) {
          nextValue = nextValue.concat(value);
          hasNewValue = true;
          _this2.fireSelect(value);
        }
      } else {
        // tag
        if ((0, _util.findIndexInValueBySingleValue)(nextValue, label) === -1) {
          nextValue = nextValue.concat(selectedValue);
          hasNewValue = true;
          _this2.fireSelect(label);
        }
      }
    });
    return hasNewValue ? nextValue : undefined;
  };

  this.getRealOpenState = function (state) {
    var _open = _this2.props.open;

    if (typeof _open === 'boolean') {
      return _open;
    }
    var open = (state || _this2.state).open;
    var options = _this2._options || [];
    if ((0, _util.isMultipleOrTagsOrCombobox)(_this2.props) || !_this2.props.showSearch) {
      if (open && !options.length) {
        open = false;
      }
    }
    return open;
  };

  this.focus = function () {
    if ((0, _util.isSingleMode)(_this2.props)) {
      _this2.selectionRef.focus();
    } else {
      _this2.getInputDOMNode().focus();
    }
  };

  this.blur = function () {
    if ((0, _util.isSingleMode)(_this2.props)) {
      _this2.selectionRef.blur();
    } else {
      _this2.getInputDOMNode().blur();
    }
  };

  this.handleBackfill = function (item) {
    if (!_this2.props.backfill || !((0, _util.isSingleMode)(_this2.props) || (0, _util.isCombobox)(_this2.props))) {
      return;
    }

    var key = (0, _util.getValuePropValue)(item);

    if ((0, _util.isCombobox)(_this2.props)) {
      _this2.setInputValue(key, false);
    }

    _this2.setState({
      value: [key],
      backfillValue: key
    });
  };

  this.filterOption = function (input, child) {
    var defaultFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _util.defaultFilterFn;
    var value = _this2.state.value;

    var lastValue = value[value.length - 1];
    if (!input || lastValue && lastValue === _this2.state.backfillValue) {
      return true;
    }
    var filterFn = _this2.props.filterOption;
    if ('filterOption' in _this2.props) {
      if (_this2.props.filterOption === true) {
        filterFn = defaultFilter;
      }
    } else {
      filterFn = defaultFilter;
    }

    if (!filterFn) {
      return true;
    } else if (typeof filterFn === 'function') {
      return filterFn.call(_this2, input, child);
    } else if (child.props.disabled) {
      return false;
    }
    return true;
  };

  this.timeoutFocus = function () {
    if (_this2.focusTimer) {
      _this2.clearFocusTime();
    }
    _this2.focusTimer = setTimeout(function () {
      _this2.props.onFocus();
    }, 10);
  };

  this.clearFocusTime = function () {
    if (_this2.focusTimer) {
      clearTimeout(_this2.focusTimer);
      _this2.focusTimer = null;
    }
  };

  this.clearBlurTime = function () {
    if (_this2.blurTimer) {
      clearTimeout(_this2.blurTimer);
      _this2.blurTimer = null;
    }
  };

  this.clearAdjustTimer = function () {
    if (_this2.skipAdjustOpenTimer) {
      clearTimeout(_this2.skipAdjustOpenTimer);
      _this2.skipAdjustOpenTimer = null;
    }
  };

  this.updateFocusClassName = function () {
    var rootRef = _this2.rootRef,
        props = _this2.props;
    // avoid setState and its side effect

    if (_this2._focused) {
      (0, _componentClasses2['default'])(rootRef).add(props.prefixCls + '-focused');
    } else {
      (0, _componentClasses2['default'])(rootRef).remove(props.prefixCls + '-focused');
    }
  };

  this.maybeFocus = function (open, needFocus) {
    if (needFocus || open) {
      var input = _this2.getInputDOMNode();
      var _document = document,
          activeElement = _document.activeElement;

      if (input && (open || (0, _util.isMultipleOrTagsOrCombobox)(_this2.props))) {
        if (activeElement !== input) {
          input.focus();
          _this2._focused = true;
        }
      } else {
        if (activeElement !== _this2.selectionRef) {
          _this2.selectionRef.focus();
          _this2._focused = true;
        }
      }
    }
  };

  this.handleChoiceItemClick = function (selectedKey, e) {
    var props = _this2.props;
    if (props.disabled || _this2.isChildDisabled(selectedKey)) {
      return;
    }
    if (!e.isDefaultPrevented()) {
      props.onChoiceItemClick(_this2.getVLBySingleValue(selectedKey), _this2.getOptionBySingleValue(selectedKey));
    }
  };

  this.removeSelected = function (selectedKey, index, e) {
    _this2.needExpand = false;
    setTimeout(function () {
      _this2.needExpand = true;
    }, 100);
    if (e) {
      e.preventDefault();
    }
    var props = _this2.props;
    if (props.disabled || _this2.isChildDisabled(selectedKey)) {
      return;
    }
    var value = _this2.state.value.filter(function (singleValue, i) {
      return singleValue !== selectedKey || index !== null && i !== index;
    });
    var canMultiple = (0, _util.isMultipleOrTags)(props);

    if (canMultiple) {
      var event = selectedKey;
      if (props.labelInValue) {
        event = {
          key: selectedKey,
          label: _this2.getLabelBySingleValue(selectedKey)
        };
      }
      props.onDeselect(event, _this2.getOptionBySingleValue(selectedKey), index);
      if (typeof props.onChoiceRemove === 'function') {
        props.onChoiceRemove(selectedKey);
      }
    }
    _this2.fireChange(value);
  };

  this.openIfHasChildren = function () {
    var props = _this2.props;
    if (_react.Children.count(props.children) || (0, _util.isSingleMode)(props)) {
      _this2.setOpenState(true);
    }
  };

  this.fireSelect = function (value) {
    return _this2.props.onSelect(_this2.getVLBySingleValue(value), _this2.getOptionBySingleValue(value));
  };

  this.fireChange = function (value) {
    var props = _this2.props;
    if (!('value' in props)) {
      _this2.setState({
        value: value
      });
    }
    var vls = _this2.getVLForOnChange(value);
    var options = _this2.getOptionsBySingleValue(value);
    props.onChange(vls, (0, _util.isMultipleOrTags)(_this2.props) ? options : options[0]);
  };

  this.isChildDisabled = function (key) {
    return (0, _toArray2['default'])(_this2.props.children).some(function (child) {
      var childValue = (0, _util.getValuePropValue)(child);
      return childValue === key && child.props && child.props.disabled;
    });
  };

  this.adjustOpenState = function () {
    if (_this2.skipAdjustOpen) {
      return;
    }
    var open = _this2.state.open;

    var options = [];
    // If hidden menu due to no options, then it should be calculated again
    if (open || _this2.hiddenForNoOptions) {
      options = _this2.renderFilterOptions();
    }
    _this2._options = options;

    if ((0, _util.isMultipleOrTagsOrCombobox)(_this2.props) || !_this2.props.showSearch) {
      if (open && !options.length) {
        open = false;
        _this2.hiddenForNoOptions = true;
      }
      // Keep menu open if there are options and hidden for no options before
      if (_this2.hiddenForNoOptions && options.length) {
        open = true;
        _this2.hiddenForNoOptions = false;
      }
    }
    _this2.state.open = open;
  };

  this.renderFilterOptions = function () {
    var inputValue = _this2.state.inputValue;
    var _props8 = _this2.props,
        children = _props8.children,
        tags = _props8.tags,
        filterOption = _props8.filterOption,
        notFoundContent = _props8.notFoundContent,
        showNotFindInputItem = _props8.showNotFindInputItem,
        showNotFindSelectedItem = _props8.showNotFindSelectedItem;

    var menuItems = [];
    var childrenKeys = [];
    var options = _this2.renderFilterOptionsFromChildren(children, childrenKeys, menuItems);
    if (tags) {
      if (showNotFindSelectedItem) {
        // tags value must be string
        var value = _this2.state.value || [];
        value = value.filter(function (singleValue) {
          return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
        });
        value.forEach(function (singleValue) {
          var key = singleValue;
          var menuItem = _react2['default'].createElement(
            _menu.Item,
            {
              style: _util.UNSELECTABLE_STYLE,
              attribute: _util.UNSELECTABLE_ATTRIBUTE,
              value: key,
              key: key
            },
            key
          );
          options.push(menuItem);
          menuItems.push(menuItem);
        });
      }
      if (inputValue && showNotFindInputItem) {
        var notFindInputItem = menuItems.every(function (option) {
          // this.filterOption return true has two meaning,
          // 1, some one exists after filtering
          // 2, filterOption is set to false
          // condition 2 does not mean the option has same value with inputValue
          var filterFn = function filterFn() {
            return (0, _util.getValuePropValue)(option) === inputValue;
          };
          if (filterOption !== false) {
            return !_this2.filterOption.call(_this2, inputValue, option, filterFn);
          }
          return !filterFn();
        });
        if (notFindInputItem) {
          options.unshift(_react2['default'].createElement(
            _menu.Item,
            {
              style: _util.UNSELECTABLE_STYLE,
              attribute: _util.UNSELECTABLE_ATTRIBUTE,
              value: inputValue,
              onMouseDown: _util.preventDefaultEvent,
              key: inputValue
            },
            inputValue
          ));
        }
      }
    }
    var loading = _this2.props.loading;
    if (typeof loading === 'boolean') {
      loading = {
        spinning: loading
      };
    }
    if (!options.length && notFoundContent) {
      options = [_react2['default'].createElement(
        _menu.Item,
        {
          style: _util.UNSELECTABLE_STYLE,
          attribute: _util.UNSELECTABLE_ATTRIBUTE,
          disabled: true,
          value: 'NOT_FOUND',
          key: 'NOT_FOUND'
        },
        loading.spinning ? '' : notFoundContent
      )];
    }
    return options;
  };

  this.renderFilterOptionsFromChildren = function (children, childrenKeys, menuItems) {
    var sel = [];
    var props = _this2.props;
    var inputValue = _this2.state.inputValue;

    var tags = props.tags;
    _react.Children.forEach(children, function (child) {
      if (!child) {
        return;
      }
      if (child.type.isSelectOptGroup) {
        var innerItems = _this2.renderFilterOptionsFromChildren(child.props.children, childrenKeys, menuItems);
        if (innerItems.length) {
          var label = child.props.label;
          var key = child.key;
          // if (!key && typeof label === 'string') {
          //   key = label;
          // }
          // else if (!label && key) {
          //   label = key;
          // }
          sel.push(_react2['default'].createElement(
            _menu.ItemGroup,
            { key: key, title: label },
            innerItems
          ));
        }
        return;
      }

      (0, _warning2['default'])(child.type.isSelectOption, 'the children of `Select` should be `Select.Option` or `Select.OptGroup`, ' + ('instead of `' + (child.type.name || child.type.displayName || child.type) + '`.'));

      var childValue = (0, _util.getValuePropValue)(child);

      (0, _util.validateOptionValue)(childValue, _this2.props);

      if (_this2.filterOption(inputValue, child)) {
        var menuItem = _react2['default'].createElement(_menu.Item, (0, _extends3['default'])({
          style: _util.UNSELECTABLE_STYLE,
          attribute: _util.UNSELECTABLE_ATTRIBUTE,
          value: childValue,
          key: childValue
        }, child.props));
        sel.push(menuItem);
        menuItems.push(menuItem);
      }
      if (tags && !child.props.disabled) {
        childrenKeys.push(childValue);
      }
    });

    return sel;
  };

  this.isChoiceRemove = function (selectedKey) {
    var choiceRemove = _this2.props.choiceRemove;

    if (typeof choiceRemove === 'function') {
      return choiceRemove(selectedKey);
    }
    return choiceRemove;
  };

  this.renderTopControlNode = function () {
    var _state4 = _this2.state,
        value = _state4.value,
        open = _state4.open,
        inputValue = _state4.inputValue;

    var props = _this2.props;
    var tags = (0, _util.isTags)(props);
    var prefixCls = props.prefixCls,
        maxTagTextLength = props.maxTagTextLength,
        maxTagCount = props.maxTagCount,
        maxTagPlaceholder = props.maxTagPlaceholder,
        showSearch = props.showSearch,
        choiceRender = props.choiceRender;

    var className = prefixCls + '-selection__rendered';
    // search input is inside topControlNode in single, multiple & combobox. 2016/04/13
    var innerNode = null;
    if ((0, _util.isSingleMode)(props)) {
      var selectedValue = null;
      var opacity = 1;
      if (value.length) {
        var showSelectedValue = false;
        if (showSearch && open) {
          showSelectedValue = !inputValue;
          if (showSelectedValue) {
            opacity = 0.4;
          }
        }
      }
      var singleValue = value && value[0];

      var _getOptionInfoBySingl3 = _this2.getOptionInfoBySingleValue(singleValue),
          label = _getOptionInfoBySingl3.label,
          title = _getOptionInfoBySingl3.title;

      selectedValue = _react2['default'].createElement(
        'div',
        {
          key: 'value',
          className: prefixCls + '-selection-selected-value',
          title: title || label,
          style: {
            opacity: opacity
          }
        },
        choiceRender ? choiceRender(label) : label
      );
      innerNode = [selectedValue];
    } else {
      var selectedValueNodes = [];
      var limitedCountValue = value;
      var maxTagPlaceholderEl = void 0;
      if (maxTagCount !== undefined && value.length > maxTagCount) {
        limitedCountValue = limitedCountValue.slice(0, maxTagCount);
        var omittedValues = _this2.getVLForOnChange(value.slice(maxTagCount, value.length));
        var content = '+ ' + (value.length - maxTagCount) + ' ...';
        if (maxTagPlaceholder) {
          content = typeof maxTagPlaceholder === 'function' ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
        }
        maxTagPlaceholderEl = _react2['default'].createElement(
          'li',
          (0, _extends3['default'])({
            style: _util.UNSELECTABLE_STYLE
          }, _util.UNSELECTABLE_ATTRIBUTE, {
            onMouseDown: _util.preventDefaultEvent,
            className: prefixCls + '-selection__choice ' + prefixCls + '-selection__choice__disabled ' + prefixCls + '-selection__max',
            key: 'maxTagPlaceholder'
            // title={content}
          }),
          _react2['default'].createElement(
            'div',
            { className: prefixCls + '-selection__choice__content' },
            content
          )
        );
      }
      if ((0, _util.isMultipleOrTags)(props)) {
        selectedValueNodes = limitedCountValue.map(function (singleValue, index) {
          var info = _this2.getOptionInfoBySingleValue(singleValue);
          var content = info.label;
          var title = info.title || content;
          if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
            content = content.slice(0, maxTagTextLength) + '...';
          }
          var disabled = _this2.isChildDisabled(singleValue);
          var choiceClassName = disabled ? prefixCls + '-selection__choice ' + prefixCls + '-selection__choice__disabled' : prefixCls + '-selection__choice';
          var li = _react2['default'].createElement(
            'li',
            (0, _extends3['default'])({
              style: _util.UNSELECTABLE_STYLE
            }, _util.UNSELECTABLE_ATTRIBUTE, {
              onMouseDown: _util.preventDefaultEvent,
              onClick: _this2.handleChoiceItemClick.bind(_this2, singleValue),
              className: choiceClassName
              // title={title}
            }),
            _react2['default'].createElement(
              'div',
              { className: prefixCls + '-selection__choice__content' },
              content
            ),
            disabled || !_this2.isChoiceRemove(singleValue) ? null : _react2['default'].createElement(
              'span',
              {
                className: prefixCls + '-selection__choice__remove',
                onClick: _this2.removeSelected.bind(_this2, singleValue, index)
              },
              _react2['default'].createElement('i', { className: 'icon icon-cancel' })
            )
          );
          return _react2['default'].createElement(
            _ripple2['default'],
            {
              key: singleValue + limitedCountValue.slice(0, index).filter(function (foundValue) {
                return foundValue === singleValue;
              }).length
            },
            choiceRender ? choiceRender(li, singleValue) : li
          );
        });
        if (maxTagPlaceholderEl) {
          selectedValueNodes.push(maxTagPlaceholderEl);
        }
        selectedValueNodes.push(_react2['default'].createElement(
          'li',
          {
            className: prefixCls + '-search ' + prefixCls + '-search--inline',
            key: '__input'
          },
          _this2.getInputElement()
        ));
      } else {
        selectedValueNodes.push(_react2['default'].createElement(
          'div',
          {
            className: prefixCls + '-search ' + prefixCls + '-search--inline',
            key: '__input',
            style: { display: 'inline-block' }
          },
          _this2.getInputElement()
        ));
      }

      if ((0, _util.isMultipleOrTags)(props)) {
        innerNode = _react2['default'].createElement(
          'ul',
          null,
          selectedValueNodes
        );
      } else {
        innerNode = selectedValueNodes;
      }
    }
    return _react2['default'].createElement(
      'div',
      { className: className, ref: (0, _util.saveRef)(_this2, 'topCtrlRef') },
      _this2.getPlaceholderElement(),
      innerNode,
      _this2.renderClear(),
      tags || !props.showArrow ? null : _react2['default'].createElement(
        'span',
        (0, _extends3['default'])({
          key: 'arrow',
          className: prefixCls + '-arrow',
          style: _util.UNSELECTABLE_STYLE
        }, _util.UNSELECTABLE_ATTRIBUTE, {
          onClick: _this2.onArrowClick
        }),
        _react2['default'].createElement('i', { className: 'icon icon-arrow_drop_down' }),
        _react2['default'].createElement('b', null)
      )
    );
  };

  this.checkAll = function (event) {
    var name = event.target.getAttribute('name');
    var props = _this2.props;
    var state = _this2.state;
    if (props.disabled) {
      return;
    }

    var newValues = void 0;
    var values = _this2._options.filter(function (option) {
      // 当这个选项为禁用时，全选和无不对这个选项做处理
      return option.props.disabled !== true;
    }).map(function (option) {
      return (0, _util.getValuePropValue)(option);
    });
    if (name === 'check-all') {
      newValues = new _set2['default'](state.value.concat(values));
      _this2.fireChange(Array.from(newValues));
    } else if (name === 'check-none') {
      newValues = state.value.filter(function (e) {
        return values.indexOf(e) < 0;
      });
      _this2.fireChange(newValues);
      _this2.focus();
    }
  };
};

exports['default'] = Select;


Select.displayName = 'Select';
module.exports = exports['default'];