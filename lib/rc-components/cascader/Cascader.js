'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _arrayTreeFilter = require('array-tree-filter');

var _arrayTreeFilter2 = _interopRequireDefault(_arrayTreeFilter);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _trigger = require('../trigger');

var _trigger2 = _interopRequireDefault(_trigger);

var _Menus = require('./Menus');

var _Menus2 = _interopRequireDefault(_Menus);

var _KeyCode = require('../../_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
  (0, _inherits3['default'])(Cascader, _Component);

  function Cascader(props) {
    (0, _classCallCheck3['default'])(this, Cascader);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Cascader.__proto__ || Object.getPrototypeOf(Cascader)).call(this, props));

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
      if (e.type !== 'keydown' || e.keyCode === _KeyCode2['default'].ENTER) {
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
      if ('value' in _this.props || e.type === 'keydown' && e.keyCode !== _KeyCode2['default'].ENTER) {
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
      var activeValue = [].concat((0, _toConsumableArray3['default'])(_this.state.activeValue));
      var currentLevel = activeValue.length - 1 < 0 ? 0 : activeValue.length - 1;
      var currentOptions = _this.getCurrentLevelOptions();
      var currentIndex = currentOptions.map(function (o) {
        return o.value;
      }).indexOf(activeValue[currentLevel]);
      if (e.keyCode !== _KeyCode2['default'].DOWN && e.keyCode !== _KeyCode2['default'].UP && e.keyCode !== _KeyCode2['default'].LEFT && e.keyCode !== _KeyCode2['default'].RIGHT && e.keyCode !== _KeyCode2['default'].ENTER && e.keyCode !== _KeyCode2['default'].BACKSPACE && e.keyCode !== _KeyCode2['default'].ESC) {
        return;
      }
      // Press any keys above to reopen menu
      if (!_this.state.popupVisible && e.keyCode !== _KeyCode2['default'].BACKSPACE && e.keyCode !== _KeyCode2['default'].LEFT && e.keyCode !== _KeyCode2['default'].RIGHT && e.keyCode !== _KeyCode2['default'].ESC) {
        _this.setPopupVisible(true);
        return;
      }
      if (e.keyCode === _KeyCode2['default'].DOWN || e.keyCode === _KeyCode2['default'].UP) {
        var nextIndex = currentIndex;
        if (nextIndex !== -1) {
          if (e.keyCode === _KeyCode2['default'].DOWN) {
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
      } else if (e.keyCode === _KeyCode2['default'].LEFT || e.keyCode === _KeyCode2['default'].BACKSPACE) {
        activeValue.splice(activeValue.length - 1, 1);
      } else if (e.keyCode === _KeyCode2['default'].RIGHT) {
        if (currentOptions[currentIndex] && currentOptions[currentIndex].children) {
          activeValue.push(currentOptions[currentIndex].children[0].value);
        }
      } else if (e.keyCode === _KeyCode2['default'].ESC) {
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

  (0, _createClass3['default'])(Cascader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && !(0, _isEqual2['default'])(this.props.value, nextProps.value)) {
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

      var result = (0, _arrayTreeFilter2['default'])(options, function (o, level) {
        return o.value === activeValue[level];
      });
      if (result[result.length - 2]) {
        return result[result.length - 2].children;
      }
      return [].concat((0, _toConsumableArray3['default'])(options)).filter(function (o) {
        return !o.disabled;
      });
    }
  }, {
    key: 'getActiveOptions',
    value: function getActiveOptions(activeValue) {
      return (0, _arrayTreeFilter2['default'])(this.props.options, function (o, level) {
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
          restProps = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'transitionName', 'popupClassName', 'options', 'disabled', 'builtinPlacements', 'popupPlacement', 'children']);
      // Did not show popup when there is no options

      var menus = _react2['default'].createElement('div', null);
      var emptyMenuClassName = '';
      if (options && options.length > 0) {
        menus = _react2['default'].createElement(_Menus2['default'], (0, _extends3['default'])({}, this.props, {
          value: this.state.value,
          activeValue: this.state.activeValue,
          onSelect: this.handleMenuSelect,
          visible: this.state.popupVisible
        }));
      } else {
        emptyMenuClassName = ' ' + prefixCls + '-menus-empty';
      }
      return _react2['default'].createElement(
        _trigger2['default'],
        (0, _extends3['default'])({
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
        (0, _react.cloneElement)(children, {
          onKeyDown: this.handleKeyDown,
          tabIndex: disabled ? undefined : 0
        })
      );
    }
  }]);
  return Cascader;
}(_react.Component);

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
  value: _propTypes2['default'].array,
  defaultValue: _propTypes2['default'].array,
  options: _propTypes2['default'].array.isRequired,
  onChange: _propTypes2['default'].func,
  onPopupVisibleChange: _propTypes2['default'].func,
  popupVisible: _propTypes2['default'].bool,
  disabled: _propTypes2['default'].bool,
  transitionName: _propTypes2['default'].string,
  popupClassName: _propTypes2['default'].string,
  popupPlacement: _propTypes2['default'].string,
  prefixCls: _propTypes2['default'].string,
  dropdownMenuColumnStyle: _propTypes2['default'].object,
  builtinPlacements: _propTypes2['default'].object,
  loadData: _propTypes2['default'].func,
  changeOnSelect: _propTypes2['default'].bool,
  children: _propTypes2['default'].node,
  onKeyDown: _propTypes2['default'].func,
  expandTrigger: _propTypes2['default'].string
};
exports['default'] = Cascader;
module.exports = exports['default'];