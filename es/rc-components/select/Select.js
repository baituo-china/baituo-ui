import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* eslint func-names: 1 */
import Set from 'core-js/library/fn/set';
import React, { Children, cloneElement, Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import classnames from 'classnames';
import classes from 'component-classes';
import warning from '../../_util/warning';
import noop from 'lodash/noop';
import KeyCode from '../../_util/KeyCode';
import childrenToArray from '../util/Children/toArray';
import { Item as MenuItem, ItemGroup as MenuItemGroup } from '../menu';
import Option from './Option';
import Button from '../../button';
import Ripple from '../../ripple';

import { defaultFilterFn, findFirstMenuItem, findIndexInValueBySingleValue, getLabelFromPropsValue, getMapKey, getPropValue, getValuePropValue, includesSeparators, isCombobox, isMultiple, isMultipleOrTags, isMultipleOrTagsOrCombobox, isSingleMode, isTags, preventDefaultEvent, saveRef, splitBySeparators, toArray, UNSELECTABLE_ATTRIBUTE, UNSELECTABLE_STYLE, validateOptionValue } from './util';
import SelectTrigger from './SelectTrigger';
import { SelectPropTypes } from './PropTypes';

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
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

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

  _createClass(Select, [{
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
      if (isMultipleOrTags(this.props)) {
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
        unmountComponentAtNode(this.dropdownContainer);
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
      if (!isTags(this.props) && !isCombobox(this.props)) {
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

      var clear = React.createElement(Button, _extends({
        key: 'clear',
        className: prefixCls + '-clear',
        style: UNSELECTABLE_STYLE
      }, UNSELECTABLE_ATTRIBUTE, {
        shape: 'circle',
        icon: 'close',
        size: 'small',
        onClick: this.onClearSelection,
        onMouseDown: preventDefaultEvent
      }));
      if (!allowClear) {
        return null;
      }
      if (isCombobox(this.props)) {
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
        return React.createElement(
          'div',
          { className: prefixCls + '-label-wrapper' },
          React.createElement(
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

      var multiple = isMultipleOrTags(props);
      var ctrlNode = this.renderTopControlNode();
      var extraSelectionProps = {};
      var options = this._options;
      if (!isMultipleOrTagsOrCombobox(props)) {
        extraSelectionProps = _extends({}, extraSelectionProps, {
          onKeyDown: this.onKeyDown,
          tabIndex: disabled ? -1 : 0
        });
      }

      var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, prefixCls + '-open', open), _defineProperty(_rootCls, prefixCls + '-focused', !isMultiple(props) && this._focused), _defineProperty(_rootCls, prefixCls + '-has-value', this.hasValue()), _defineProperty(_rootCls, prefixCls + '-has-label', label), _defineProperty(_rootCls, prefixCls + '-combobox', isCombobox(props)), _defineProperty(_rootCls, prefixCls + '-disabled', disabled), _defineProperty(_rootCls, prefixCls + '-enabled', !disabled), _defineProperty(_rootCls, prefixCls + '-allow-clear', !!props.allowClear), _defineProperty(_rootCls, prefixCls + '-tags', isTags(props)), _defineProperty(_rootCls, prefixCls + '-multiple', isMultiple(props)), _defineProperty(_rootCls, prefixCls + '-has-border', border), _rootCls);
      return React.createElement(
        SelectTrigger,
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
          ref: saveRef(this, 'selectTriggerRef')
        },
        React.createElement(
          'div',
          {
            style: props.style,
            ref: saveRef(this, 'rootRef'),
            onBlur: this.onOuterBlur,
            onFocus: this.onOuterFocus,
            className: classnames(rootCls)
          },
          React.createElement(
            'div',
            _extends({
              ref: saveRef(this, 'selectionRef'),
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
}(Component);

Select.propTypes = SelectPropTypes;
Select.defaultProps = {
  blurChange: true,
  prefixCls: 'rc-select',
  defaultOpen: false,
  labelInValue: false,
  defaultActiveFirstOption: true,
  showSearch: true,
  allowClear: false,
  onInput: noop,
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  onSelect: noop,
  onSearch: noop,
  onDeselect: noop,
  onInputKeyDown: noop,
  onChoiceItemClick: noop,
  onClear: noop,
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
    if (isMultipleOrTags(_this2.props) && tokenSeparators.length && includesSeparators(val, tokenSeparators)) {
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
    if (isCombobox(_this2.props)) {
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
    } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
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
    if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
      event.preventDefault();
      var value = state.value;

      if (value.length) {
        _this2.removeSelected(value[value.length - 1], value.length - 1);
      }
      return;
    }
    if (keyCode === KeyCode.DOWN) {
      if (!state.open) {
        _this2.openIfHasChildren();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } else if (keyCode === KeyCode.ESC) {
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
    var selectedValue = getValuePropValue(item);
    var lastValue = value[value.length - 1];
    if (_this2.fireSelect(selectedValue) === false) {
      return;
    }
    if (isMultipleOrTags(props)) {
      if (findIndexInValueBySingleValue(value, selectedValue) !== -1) {
        return;
      }
      value = value.concat([selectedValue]);
    } else {
      if (isCombobox(props)) {
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
    if (isCombobox(props)) {
      inputValue = getPropValue(item, props.optionLabelProp);
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

    if (domEvent.type === 'keydown' && domEvent.keyCode === KeyCode.ENTER) {
      _this2.removeSelected(getValuePropValue(item), null);
      return;
    }
    if (domEvent.type === 'click') {
      _this2.removeSelected(getValuePropValue(item), null);
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
    if (!isMultipleOrTagsOrCombobox(_this2.props) && e.target === _this2.getInputDOMNode()) {
      return;
    }
    if (_this2._focused) {
      return;
    }
    _this2._focused = true;
    _this2.updateFocusClassName();
    // only effect multiple or tag mode
    if (!isMultipleOrTags(_this2.props) || !_this2._mouseDown) {
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

      if (isSingleMode(props) && props.showSearch && inputValue && props.defaultActiveFirstOption) {
        var options = _this2._options || [];
        if (options.length) {
          var firstOption = findFirstMenuItem(options);
          if (firstOption) {
            value = [firstOption.key];
            _this2.fireChange(value);
          }
        }
      } else if (isMultipleOrTags(props) && inputValue) {
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
      value = toArray(props.value);
    } else {
      value = toArray(props.defaultValue);
    }
    if (props.labelInValue) {
      value = value.map(function (v) {
        return v.key;
      });
    }
    if (isMultiple(props)) {
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
      var singleValue = getValuePropValue(option);
      optionsInfo[getMapKey(singleValue)] = {
        option: option,
        value: singleValue,
        label: _this2.getLabelFromOption(option),
        title: option.props.title
      };
    });
    value.forEach(function (v) {
      var key = getMapKey(v);
      if (!optionsInfo[key]) {
        optionsInfo[key] = oldOptionsInfo[key];
      }
    });
    return optionsInfo;
  };

  this.getOptionInfoBySingleValue = function (value, optionsInfo) {
    var info = void 0;
    optionsInfo = optionsInfo || _this2.state.optionsInfo;
    if (optionsInfo[getMapKey(value)]) {
      info = optionsInfo[getMapKey(value)];
    }
    if (info) {
      return info;
    }
    var defaultLabel = value;
    if (_this2.props.labelInValue) {
      var label = getLabelFromPropsValue(_this2.props.value, value);
      if (label !== undefined) {
        defaultLabel = label;
      }
    }
    var defaultInfo = {
      option: React.createElement(
        Option,
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

    Children.forEach(children, function (child) {
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
      if (toArray(info.label).join('') === label) {
        value = info.value;
      }
    });
    return value;
  };

  this.getLabelFromOption = function (option) {
    return getPropValue(option, _this2.props.optionLabelProp);
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
      return isMultipleOrTags(_this2.props) ? vls : vls[0];
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
      return React.createElement(
        'div',
        { className: prefixCls + '-selection__placeholder' },
        placeholder
      );
    }
    return null;
  };

  this.getInputElement = function () {
    var props = _this2.props;
    var inputElement = props.getInputElement ? props.getInputElement() : React.createElement('input', { id: props.id, autoComplete: 'off' });
    var inputCls = classnames(inputElement.props.className, _defineProperty({}, props.prefixCls + '-search__field', true));
    // Add space to the end of the inputValue as the width measurement tolerance
    return React.createElement(
      'div',
      { className: props.prefixCls + '-search__field__wrap' },
      cloneElement(inputElement, {
        ref: saveRef(_this2, 'inputRef'),
        onChange: _this2.onInputChange,
        onKeyDown: chaining(_this2.onInputKeyDown, inputElement.props.onKeyDown, _this2.props.onInputKeyDown),
        value: _this2.state.inputValue,
        disabled: props.disabled,
        className: inputCls
      }),
      React.createElement(
        'span',
        {
          ref: saveRef(_this2, 'inputMirrorRef'),
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
    if (!open && isSingleMode(props) && props.showSearch) {
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
    splitBySeparators(string, tokenSeparators).forEach(function (label) {
      var selectedValue = [label];
      if (multiple) {
        var value = _this2.getValueByLabel(label);
        if (value && findIndexInValueBySingleValue(nextValue, value) === -1) {
          nextValue = nextValue.concat(value);
          hasNewValue = true;
          _this2.fireSelect(value);
        }
      } else {
        // tag
        if (findIndexInValueBySingleValue(nextValue, label) === -1) {
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
    if (isMultipleOrTagsOrCombobox(_this2.props) || !_this2.props.showSearch) {
      if (open && !options.length) {
        open = false;
      }
    }
    return open;
  };

  this.focus = function () {
    if (isSingleMode(_this2.props)) {
      _this2.selectionRef.focus();
    } else {
      _this2.getInputDOMNode().focus();
    }
  };

  this.blur = function () {
    if (isSingleMode(_this2.props)) {
      _this2.selectionRef.blur();
    } else {
      _this2.getInputDOMNode().blur();
    }
  };

  this.handleBackfill = function (item) {
    if (!_this2.props.backfill || !(isSingleMode(_this2.props) || isCombobox(_this2.props))) {
      return;
    }

    var key = getValuePropValue(item);

    if (isCombobox(_this2.props)) {
      _this2.setInputValue(key, false);
    }

    _this2.setState({
      value: [key],
      backfillValue: key
    });
  };

  this.filterOption = function (input, child) {
    var defaultFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultFilterFn;
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
      classes(rootRef).add(props.prefixCls + '-focused');
    } else {
      classes(rootRef).remove(props.prefixCls + '-focused');
    }
  };

  this.maybeFocus = function (open, needFocus) {
    if (needFocus || open) {
      var input = _this2.getInputDOMNode();
      var _document = document,
          activeElement = _document.activeElement;

      if (input && (open || isMultipleOrTagsOrCombobox(_this2.props))) {
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
    var canMultiple = isMultipleOrTags(props);

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
    if (Children.count(props.children) || isSingleMode(props)) {
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
    props.onChange(vls, isMultipleOrTags(_this2.props) ? options : options[0]);
  };

  this.isChildDisabled = function (key) {
    return childrenToArray(_this2.props.children).some(function (child) {
      var childValue = getValuePropValue(child);
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

    if (isMultipleOrTagsOrCombobox(_this2.props) || !_this2.props.showSearch) {
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
          var menuItem = React.createElement(
            MenuItem,
            {
              style: UNSELECTABLE_STYLE,
              attribute: UNSELECTABLE_ATTRIBUTE,
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
            return getValuePropValue(option) === inputValue;
          };
          if (filterOption !== false) {
            return !_this2.filterOption.call(_this2, inputValue, option, filterFn);
          }
          return !filterFn();
        });
        if (notFindInputItem) {
          options.unshift(React.createElement(
            MenuItem,
            {
              style: UNSELECTABLE_STYLE,
              attribute: UNSELECTABLE_ATTRIBUTE,
              value: inputValue,
              onMouseDown: preventDefaultEvent,
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
      options = [React.createElement(
        MenuItem,
        {
          style: UNSELECTABLE_STYLE,
          attribute: UNSELECTABLE_ATTRIBUTE,
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
    Children.forEach(children, function (child) {
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
          sel.push(React.createElement(
            MenuItemGroup,
            { key: key, title: label },
            innerItems
          ));
        }
        return;
      }

      warning(child.type.isSelectOption, 'the children of `Select` should be `Select.Option` or `Select.OptGroup`, ' + ('instead of `' + (child.type.name || child.type.displayName || child.type) + '`.'));

      var childValue = getValuePropValue(child);

      validateOptionValue(childValue, _this2.props);

      if (_this2.filterOption(inputValue, child)) {
        var menuItem = React.createElement(MenuItem, _extends({
          style: UNSELECTABLE_STYLE,
          attribute: UNSELECTABLE_ATTRIBUTE,
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
    var tags = isTags(props);
    var prefixCls = props.prefixCls,
        maxTagTextLength = props.maxTagTextLength,
        maxTagCount = props.maxTagCount,
        maxTagPlaceholder = props.maxTagPlaceholder,
        showSearch = props.showSearch,
        choiceRender = props.choiceRender;

    var className = prefixCls + '-selection__rendered';
    // search input is inside topControlNode in single, multiple & combobox. 2016/04/13
    var innerNode = null;
    if (isSingleMode(props)) {
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

      selectedValue = React.createElement(
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
        maxTagPlaceholderEl = React.createElement(
          'li',
          _extends({
            style: UNSELECTABLE_STYLE
          }, UNSELECTABLE_ATTRIBUTE, {
            onMouseDown: preventDefaultEvent,
            className: prefixCls + '-selection__choice ' + prefixCls + '-selection__choice__disabled ' + prefixCls + '-selection__max',
            key: 'maxTagPlaceholder'
            // title={content}
          }),
          React.createElement(
            'div',
            { className: prefixCls + '-selection__choice__content' },
            content
          )
        );
      }
      if (isMultipleOrTags(props)) {
        selectedValueNodes = limitedCountValue.map(function (singleValue, index) {
          var info = _this2.getOptionInfoBySingleValue(singleValue);
          var content = info.label;
          var title = info.title || content;
          if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
            content = content.slice(0, maxTagTextLength) + '...';
          }
          var disabled = _this2.isChildDisabled(singleValue);
          var choiceClassName = disabled ? prefixCls + '-selection__choice ' + prefixCls + '-selection__choice__disabled' : prefixCls + '-selection__choice';
          var li = React.createElement(
            'li',
            _extends({
              style: UNSELECTABLE_STYLE
            }, UNSELECTABLE_ATTRIBUTE, {
              onMouseDown: preventDefaultEvent,
              onClick: _this2.handleChoiceItemClick.bind(_this2, singleValue),
              className: choiceClassName
              // title={title}
            }),
            React.createElement(
              'div',
              { className: prefixCls + '-selection__choice__content' },
              content
            ),
            disabled || !_this2.isChoiceRemove(singleValue) ? null : React.createElement(
              'span',
              {
                className: prefixCls + '-selection__choice__remove',
                onClick: _this2.removeSelected.bind(_this2, singleValue, index)
              },
              React.createElement('i', { className: 'icon icon-cancel' })
            )
          );
          return React.createElement(
            Ripple,
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
        selectedValueNodes.push(React.createElement(
          'li',
          {
            className: prefixCls + '-search ' + prefixCls + '-search--inline',
            key: '__input'
          },
          _this2.getInputElement()
        ));
      } else {
        selectedValueNodes.push(React.createElement(
          'div',
          {
            className: prefixCls + '-search ' + prefixCls + '-search--inline',
            key: '__input',
            style: { display: 'inline-block' }
          },
          _this2.getInputElement()
        ));
      }

      if (isMultipleOrTags(props)) {
        innerNode = React.createElement(
          'ul',
          null,
          selectedValueNodes
        );
      } else {
        innerNode = selectedValueNodes;
      }
    }
    return React.createElement(
      'div',
      { className: className, ref: saveRef(_this2, 'topCtrlRef') },
      _this2.getPlaceholderElement(),
      innerNode,
      _this2.renderClear(),
      tags || !props.showArrow ? null : React.createElement(
        'span',
        _extends({
          key: 'arrow',
          className: prefixCls + '-arrow',
          style: UNSELECTABLE_STYLE
        }, UNSELECTABLE_ATTRIBUTE, {
          onClick: _this2.onArrowClick
        }),
        React.createElement('i', { className: 'icon icon-arrow_drop_down' }),
        React.createElement('b', null)
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
      return getValuePropValue(option);
    });
    if (name === 'check-all') {
      newValues = new Set(state.value.concat(values));
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

export default Select;


Select.displayName = 'Select';