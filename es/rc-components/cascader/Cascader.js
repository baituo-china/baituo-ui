import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import arrayTreeFilter from 'array-tree-filter';
import isEqual from 'lodash/isEqual';
import Trigger from '../trigger';
import Menus from './Menus';
import KeyCode from '../../_util/KeyCode';

var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  }
};

var Cascader = function (_Component) {
  _inherits(Cascader, _Component);

  function Cascader(props) {
    _classCallCheck(this, Cascader);

    var _this = _possibleConstructorReturn(this, (Cascader.__proto__ || Object.getPrototypeOf(Cascader)).call(this, props));

    _this.setPopupVisible = function (popupVisible) {
      if (!('popupVisible' in _this.props)) {
        _this.setState({ popupVisible: popupVisible });
      }
      // sync activeValue with value when panel open
      if (popupVisible && !_this.state.visible) {
        _this.setState({
          activeValue: _this.state.value
        });
      }
      _this.props.onPopupVisibleChange(popupVisible);
    };

    _this.handleChange = function (options, setProps, e) {
      if (e.type !== 'keydown' || e.keyCode === KeyCode.ENTER) {
        _this.props.onChange(options.map(function (o) {
          return o.value;
        }), options);
        _this.setPopupVisible(setProps.visible);
      }
    };

    _this.handlePopupVisibleChange = function (popupVisible) {
      _this.setPopupVisible(popupVisible);
    };

    _this.handleMenuSelect = function (targetOption, menuIndex, e) {
      // Keep focused state for keyboard support
      var triggerNode = _this.trigger.getRootDomNode();
      if (triggerNode && triggerNode.focus) {
        triggerNode.focus();
      }
      var _this$props = _this.props,
          changeOnSelect = _this$props.changeOnSelect,
          loadData = _this$props.loadData,
          expandTrigger = _this$props.expandTrigger;

      if (!targetOption || targetOption.disabled) {
        return;
      }
      var activeValue = _this.state.activeValue;

      activeValue = activeValue.slice(0, menuIndex + 1);
      activeValue[menuIndex] = targetOption.value;
      var activeOptions = _this.getActiveOptions(activeValue);
      if (targetOption.isLeaf === false && !targetOption.children && loadData) {
        if (changeOnSelect) {
          _this.handleChange(activeOptions, { visible: true }, e);
        }
        _this.setState({ activeValue: activeValue });
        loadData(activeOptions);
        return;
      }
      var newState = {};
      if (!targetOption.children || !targetOption.children.length) {
        _this.handleChange(activeOptions, { visible: false }, e);
        // set value to activeValue when select leaf option
        newState.value = activeValue;
        // add e.type judgement to prevent `onChange` being triggered by mouseEnter
      } else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
        if (expandTrigger === 'hover') {
          _this.handleChange(activeOptions, { visible: false }, e);
        } else {
          _this.handleChange(activeOptions, { visible: true }, e);
        }
        // set value to activeValue on every select
        newState.value = activeValue;
      }
      newState.activeValue = activeValue;
      //  not change the value by keyboard
      if ('value' in _this.props || e.type === 'keydown' && e.keyCode !== KeyCode.ENTER) {
        delete newState.value;
      }
      _this.setState(newState);
    };

    _this.handleKeyDown = function (e) {
      var children = _this.props.children;
      // Don't bind keyboard support when children specify the onKeyDown

      if (children && children.props.onKeyDown) {
        children.props.onKeyDown(e);
        return;
      }
      var activeValue = [].concat(_toConsumableArray(_this.state.activeValue));
      var currentLevel = activeValue.length - 1 < 0 ? 0 : activeValue.length - 1;
      var currentOptions = _this.getCurrentLevelOptions();
      var currentIndex = currentOptions.map(function (o) {
        return o.value;
      }).indexOf(activeValue[currentLevel]);
      if (e.keyCode !== KeyCode.DOWN && e.keyCode !== KeyCode.UP && e.keyCode !== KeyCode.LEFT && e.keyCode !== KeyCode.RIGHT && e.keyCode !== KeyCode.ENTER && e.keyCode !== KeyCode.BACKSPACE && e.keyCode !== KeyCode.ESC) {
        return;
      }
      // Press any keys above to reopen menu
      if (!_this.state.popupVisible && e.keyCode !== KeyCode.BACKSPACE && e.keyCode !== KeyCode.LEFT && e.keyCode !== KeyCode.RIGHT && e.keyCode !== KeyCode.ESC) {
        _this.setPopupVisible(true);
        return;
      }
      if (e.keyCode === KeyCode.DOWN || e.keyCode === KeyCode.UP) {
        var nextIndex = currentIndex;
        if (nextIndex !== -1) {
          if (e.keyCode === KeyCode.DOWN) {
            nextIndex += 1;
            nextIndex = nextIndex >= currentOptions.length ? 0 : nextIndex;
          } else {
            nextIndex -= 1;
            nextIndex = nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
          }
        } else {
          nextIndex = 0;
        }
        activeValue[currentLevel] = currentOptions[nextIndex].value;
      } else if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.BACKSPACE) {
        activeValue.splice(activeValue.length - 1, 1);
      } else if (e.keyCode === KeyCode.RIGHT) {
        if (currentOptions[currentIndex] && currentOptions[currentIndex].children) {
          activeValue.push(currentOptions[currentIndex].children[0].value);
        }
      } else if (e.keyCode === KeyCode.ESC) {
        _this.setPopupVisible(false);
        return;
      }
      if (!activeValue || activeValue.length === 0) {
        _this.setPopupVisible(false);
      }
      var activeOptions = _this.getActiveOptions(activeValue);
      var targetOption = activeOptions[activeOptions.length - 1];
      _this.handleMenuSelect(targetOption, activeOptions.length - 1, e);

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    };

    _this.saveTrigger = function (node) {
      _this.trigger = node;
    };

    var initialValue = [];
    if ('value' in props) {
      initialValue = props.value || [];
    } else if ('defaultValue' in props) {
      initialValue = props.defaultValue || [];
    }

    _this.state = {
      popupVisible: props.popupVisible,
      activeValue: initialValue,
      value: initialValue
    };
    return _this;
  }

  _createClass(Cascader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && !isEqual(this.props.value, nextProps.value)) {
        var newValues = {
          value: nextProps.value || [],
          activeValue: nextProps.value || []
        };
        // allow activeValue diff from value
        if ('loadData' in nextProps) {
          delete newValues.activeValue;
        }
        this.setState(newValues);
      }
      if ('popupVisible' in nextProps) {
        this.setState({
          popupVisible: nextProps.popupVisible
        });
      }
    }
  }, {
    key: 'getPopupDOMNode',
    value: function getPopupDOMNode() {
      return this.trigger.getPopupDomNode();
    }
  }, {
    key: 'getCurrentLevelOptions',
    value: function getCurrentLevelOptions() {
      var options = this.props.options;
      var _state$activeValue = this.state.activeValue,
          activeValue = _state$activeValue === undefined ? [] : _state$activeValue;

      var result = arrayTreeFilter(options, function (o, level) {
        return o.value === activeValue[level];
      });
      if (result[result.length - 2]) {
        return result[result.length - 2].children;
      }
      return [].concat(_toConsumableArray(options)).filter(function (o) {
        return !o.disabled;
      });
    }
  }, {
    key: 'getActiveOptions',
    value: function getActiveOptions(activeValue) {
      return arrayTreeFilter(this.props.options, function (o, level) {
        return o.value === activeValue[level];
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          transitionName = _props.transitionName,
          popupClassName = _props.popupClassName,
          options = _props.options,
          disabled = _props.disabled,
          builtinPlacements = _props.builtinPlacements,
          popupPlacement = _props.popupPlacement,
          children = _props.children,
          restProps = _objectWithoutProperties(_props, ['prefixCls', 'transitionName', 'popupClassName', 'options', 'disabled', 'builtinPlacements', 'popupPlacement', 'children']);
      // Did not show popup when there is no options


      var menus = React.createElement('div', null);
      var emptyMenuClassName = '';
      if (options && options.length > 0) {
        menus = React.createElement(Menus, _extends({}, this.props, {
          value: this.state.value,
          activeValue: this.state.activeValue,
          onSelect: this.handleMenuSelect,
          visible: this.state.popupVisible
        }));
      } else {
        emptyMenuClassName = ' ' + prefixCls + '-menus-empty';
      }
      return React.createElement(
        Trigger,
        _extends({
          ref: this.saveTrigger
        }, restProps, {
          options: options,
          disabled: disabled,
          popupPlacement: popupPlacement,
          builtinPlacements: builtinPlacements,
          popupTransitionName: transitionName,
          action: disabled ? [] : ['click'],
          popupVisible: disabled ? false : this.state.popupVisible,
          onPopupVisibleChange: this.handlePopupVisibleChange,
          prefixCls: prefixCls + '-menus',
          popupClassName: popupClassName + emptyMenuClassName,
          popup: menus
        }),
        cloneElement(children, {
          onKeyDown: this.handleKeyDown,
          tabIndex: disabled ? undefined : 0
        })
      );
    }
  }]);

  return Cascader;
}(Component);

Cascader.defaultProps = {
  options: [],
  onChange: function onChange() {},
  onPopupVisibleChange: function onPopupVisibleChange() {},

  disabled: false,
  transitionName: '',
  prefixCls: 'rc-cascader',
  popupClassName: '',
  popupPlacement: 'bottomLeft',
  builtinPlacements: BUILT_IN_PLACEMENTS,
  expandTrigger: 'click'
};
Cascader.propTypes = {
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onPopupVisibleChange: PropTypes.func,
  popupVisible: PropTypes.bool,
  disabled: PropTypes.bool,
  transitionName: PropTypes.string,
  popupClassName: PropTypes.string,
  popupPlacement: PropTypes.string,
  prefixCls: PropTypes.string,
  dropdownMenuColumnStyle: PropTypes.object,
  builtinPlacements: PropTypes.object,
  loadData: PropTypes.func,
  changeOnSelect: PropTypes.bool,
  children: PropTypes.node,
  onKeyDown: PropTypes.func,
  expandTrigger: PropTypes.string
};
export default Cascader;