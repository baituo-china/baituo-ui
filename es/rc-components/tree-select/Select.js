import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Children, Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import classnames from 'classnames';
import noop from 'lodash/noop';
import KeyCode from '../../_util/KeyCode';
import Animate from '../../animate';
import { filterAllCheckedData, filterParentPosition, flatToHierarchy, getPropValue, getTreeNodesStates, getValuePropValue, isMultiple, isPositionPrefix, labelCompatible, loopAllChildren, preventDefaultEvent, processSimpleTreeData, saveRef, toArray, UNSELECTABLE_ATTRIBUTE, UNSELECTABLE_STYLE } from './util';
import SelectTrigger from './SelectTrigger';
import _TreeNode from './TreeNode';
import { SHOW_ALL, SHOW_CHILD, SHOW_PARENT } from './strategies';
import { SelectPropTypes } from './PropTypes';
import Button from '../../button/Button';
import { getLabelFromPropsValue, getMapKey } from '../select/util';

function filterFn(input, child) {
  return String(getPropValue(child, labelCompatible(this.props.treeNodeFilterProp))).indexOf(input) > -1;
}

function loopTreeData(data) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var treeCheckable = arguments[2];

  return data.map(function (item, index) {
    var pos = level + '-' + index;

    var label = item.label,
        value = item.value,
        disabled = item.disabled,
        key = item.key,
        hasOwnProperty = item.hasOwnProperty,
        selectable = item.selectable,
        children = item.children,
        isLeaf = item.isLeaf,
        otherProps = _objectWithoutProperties(item, ['label', 'value', 'disabled', 'key', 'hasOwnProperty', 'selectable', 'children', 'isLeaf']);

    var props = _extends({
      value: value,
      title: label,
      // value: value || String(key || label), // cause onChange callback error
      key: key || value || pos,
      disabled: disabled || false,
      selectable: selectable === false ? selectable : !treeCheckable
    }, otherProps);
    var ret = void 0;
    if (children && children.length) {
      ret = React.createElement(
        _TreeNode,
        props,
        loopTreeData(children, pos, treeCheckable)
      );
    } else {
      ret = React.createElement(_TreeNode, _extends({}, props, { isLeaf: isLeaf }));
    }
    return ret;
  });
}

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _initialiseProps.call(_this);

    var value = [];
    if ('value' in props) {
      value = toArray(props.value);
    } else {
      value = toArray(props.defaultValue);
    }
    // save parsed treeData, for performance (treeData may be very big)
    _this.renderedTreeData = _this.renderTreeData();
    value = _this.addLabelToValue(props, value);
    value = _this.getValue(props, value, props.inputValue ? '__strict' : true);
    var inputValue = props.inputValue || '';
    // if (props.combobox) {
    //   inputValue = value.length ? String(value[0].value) : '';
    // }
    _this.state = {
      value: value,
      inputValue: inputValue,
      open: props.open || props.defaultOpen,
      focused: false
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          autoFocus = _props2.autoFocus,
          disabled = _props2.disabled;

      if (isMultiple(this.props)) {
        var inputNode = this.getInputDOMNode();
        if (inputNode.value) {
          inputNode.style.width = '';
          inputNode.style.width = this.inputMirrorInstance.clientWidth + 'px';
        } else {
          inputNode.style.width = '';
        }
      }
      if (autoFocus && !disabled) {
        this.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // save parsed treeData, for performance (treeData may be very big)
      this.renderedTreeData = this.renderTreeData(nextProps);
      // Detecting whether the object of `onChange`'s argument  is old ref.
      // Better to do a deep equal later.
      this._cacheTreeNodesStates = this._cacheTreeNodesStates !== 'no' && this._savedValue && nextProps.value === this._savedValue;
      if (this.props.treeData !== nextProps.treeData || this.props.children !== nextProps.children) {
        // refresh this._treeNodesStates cache
        this._treeNodesStates = getTreeNodesStates(this.renderedTreeData || nextProps.children, this.state.value.map(function (item) {
          return item.value;
        }));
      }
      if ('value' in nextProps) {
        var value = toArray(nextProps.value);
        value = this.addLabelToValue(nextProps, value);
        value = this.getValue(nextProps, value);
        this.setState({
          value: value
        });
        // if (nextProps.combobox) {
        //   this.setState({
        //     inputValue: value.length ? String(value[0].key) : '',
        //   });
        // }
      }
      if (nextProps.inputValue !== this.props.inputValue) {
        this.setState({
          inputValue: nextProps.inputValue
        });
      }
      if ('open' in nextProps) {
        this.setState({
          open: nextProps.open
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (this._savedValue && nextProps.value && nextProps.value !== this._savedValue && nextProps.value === this.props.value) {
        this._cacheTreeNodesStates = false;
        this.getValue(nextProps, this.addLabelToValue(nextProps, toArray(nextProps.value)));
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var state = this.state;
      var props = this.props;
      if (state.open && isMultiple(props)) {
        var inputNode = this.getInputDOMNode();
        if (inputNode.value) {
          inputNode.style.width = '';
          inputNode.style.width = this.inputMirrorInstance.clientWidth + 'px';
        } else {
          inputNode.style.width = '';
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearDelayTimer();
      if (this.dropdownContainer) {
        unmountComponentAtNode(this.dropdownContainer);
        document.body.removeChild(this.dropdownContainer);
        this.dropdownContainer = null;
      }
    }

    // combobox ignore

  }, {
    key: 'getLabelFromNode',
    value: function getLabelFromNode(child) {
      return getPropValue(child, this.props.treeNodeLabelProp);
    }
  }, {
    key: 'getLabelFromProps',
    value: function getLabelFromProps(props, value) {
      var _this2 = this;

      if (value === undefined) {
        return null;
      }
      var label = null;
      loopAllChildren(this.renderedTreeData || props.children, function (item) {
        if (getValuePropValue(item) === value) {
          label = _this2.getLabelFromNode(item);
        }
      });
      if (label === null) {
        return value;
      }
      return label;
    }
  }, {
    key: 'getDropdownContainer',
    value: function getDropdownContainer() {
      if (!this.dropdownContainer) {
        this.dropdownContainer = document.createElement('div');
        document.body.appendChild(this.dropdownContainer);
      }
      return this.dropdownContainer;
    }
  }, {
    key: 'getSearchPlaceholderElement',
    value: function getSearchPlaceholderElement(hidden) {
      var props = this.props;
      var placeholder = void 0;
      if (isMultiple(props)) {
        placeholder = props.placeholder || props.searchPlaceholder;
      } else {
        placeholder = props.searchPlaceholder;
      }
      if (placeholder) {
        return React.createElement(
          'span',
          {
            style: { display: hidden ? 'none' : 'block' },
            onClick: this.onPlaceholderClick,
            className: props.prefixCls + '-search__field__placeholder'
          },
          placeholder
        );
      }
      return null;
    }
  }, {
    key: 'getInputElement',
    value: function getInputElement() {
      var inputValue = this.state.inputValue;
      var _props3 = this.props,
          prefixCls = _props3.prefixCls,
          disabled = _props3.disabled;

      return React.createElement(
        'span',
        { className: prefixCls + '-search__field__wrap' },
        React.createElement('input', {
          ref: saveRef(this, 'inputInstance'),
          onChange: this.onInputChange,
          onKeyDown: this.onInputKeyDown,
          value: inputValue,
          disabled: disabled,
          className: prefixCls + '-search__field',
          role: 'textbox'
        }),
        React.createElement(
          'span',
          {
            ref: saveRef(this, 'inputMirrorInstance'),
            className: prefixCls + '-search__field__mirror'
          },
          inputValue,
          '\xA0'
        ),
        isMultiple(this.props) ? null : this.getSearchPlaceholderElement(!!inputValue)
      );
    }
  }, {
    key: 'getInputDOMNode',
    value: function getInputDOMNode() {
      return this.inputInstance;
    }
  }, {
    key: 'getPopupDOMNode',
    value: function getPopupDOMNode() {
      return this.trigger.getPopupDOMNode();
    }
  }, {
    key: 'getPopupComponentRefs',
    value: function getPopupComponentRefs() {
      return this.trigger.getPopupEleRefs();
    }
  }, {
    key: 'getValue',
    value: function getValue(_props, val) {
      var _this3 = this;

      var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var value = val;
      // if inputValue existing, tree is checkStrictly
      var _strict = init === '__strict' || init && (this.state && this.state.inputValue || this.props.inputValue !== _props.inputValue);
      if (_props.treeCheckable && (_props.treeCheckStrictly || _strict)) {
        this.halfCheckedValues = [];
        value = [];
        val.forEach(function (i) {
          if (!i.halfChecked) {
            value.push(i);
          } else {
            _this3.halfCheckedValues.push(i);
          }
        });
      }
      // if (!(_props.treeCheckable && !_props.treeCheckStrictly)) {
      if (!!!_props.treeCheckable || _props.treeCheckable && (_props.treeCheckStrictly || _strict)) {
        return value;
      }
      var checkedTreeNodes = void 0;
      if (this._cachetreeData && this._cacheTreeNodesStates && this._checkedNodes && this.state && !this.state.inputValue) {
        this.checkedTreeNodes = checkedTreeNodes = this._checkedNodes;
      } else {
        /**
         * Note: `this._treeNodesStates`'s treeNodesStates must correspond to nodes of the
         * final tree (`processTreeNode` function from SelectTrigger.jsx produce the final tree).
         *
         * And, `this._treeNodesStates` from `onSelect` is previous value,
         * so it perhaps only have a few nodes, but the newly filtered tree can have many nodes,
         * thus, you cannot use previous _treeNodesStates.
         */
        // getTreeNodesStates is not effective.
        this._treeNodesStates = getTreeNodesStates(this.renderedTreeData || _props.children, value.map(function (item) {
          return item.value;
        }));
        this.checkedTreeNodes = checkedTreeNodes = this._treeNodesStates.checkedNodes;
      }
      var mapLabVal = function mapLabVal(arr) {
        return arr.map(function (itemObj) {
          return {
            value: getValuePropValue(itemObj.node),
            label: getPropValue(itemObj.node, _props.treeNodeLabelProp)
          };
        });
      };
      var props = this.props;
      var checkedValues = [];
      if (props.showCheckedStrategy === SHOW_ALL) {
        checkedValues = mapLabVal(checkedTreeNodes);
      } else if (props.showCheckedStrategy === SHOW_PARENT) {
        var posArr = filterParentPosition(checkedTreeNodes.map(function (itemObj) {
          return itemObj.pos;
        }));
        checkedValues = mapLabVal(checkedTreeNodes.filter(function (itemObj) {
          return posArr.indexOf(itemObj.pos) !== -1;
        }));
      } else {
        checkedValues = mapLabVal(checkedTreeNodes.filter(function (itemObj) {
          return !itemObj.node.props.children;
        }));
      }
      return checkedValues;
    }
  }, {
    key: 'getCheckedNodes',
    value: function getCheckedNodes(info, props) {
      // TODO treeCheckable does not support tags/dynamic
      var checkedNodes = info.checkedNodes;
      // if inputValue existing, tree is checkStrictly

      if (props.treeCheckStrictly || this.state.inputValue) {
        return checkedNodes;
      }
      var checkedNodesPositions = info.checkedNodesPositions;
      if (props.showCheckedStrategy === SHOW_ALL) {
        checkedNodes = checkedNodes;
      } else if (props.showCheckedStrategy === SHOW_PARENT) {
        var posArr = filterParentPosition(checkedNodesPositions.map(function (itemObj) {
          return itemObj.pos;
        }));
        checkedNodes = checkedNodesPositions.filter(function (itemObj) {
          return posArr.indexOf(itemObj.pos) !== -1;
        }).map(function (itemObj) {
          return itemObj.node;
        });
      } else {
        checkedNodes = checkedNodes.filter(function (n) {
          return !n.props.children;
        });
      }
      return checkedNodes;
    }
  }, {
    key: 'getDeselectedValue',
    value: function getDeselectedValue(selectedValue) {
      var checkedTreeNodes = this.checkedTreeNodes;
      var unCheckPos = void 0;
      checkedTreeNodes.forEach(function (itemObj) {
        if (itemObj.node.props.value === selectedValue) {
          unCheckPos = itemObj.pos;
        }
      });
      var newVals = [];
      var newCkTns = [];
      checkedTreeNodes.forEach(function (itemObj) {
        if (isPositionPrefix(itemObj.pos, unCheckPos) || isPositionPrefix(unCheckPos, itemObj.pos)) {
          // Filter ancestral and children nodes when uncheck a node.
          return;
        }
        newCkTns.push(itemObj);
        newVals.push(itemObj.node.props.value);
      });
      this.checkedTreeNodes = this._checkedNodes = newCkTns;
      var nv = this.state.value.filter(function (val) {
        return newVals.indexOf(val.value) !== -1;
      });
      this.fireChange(nv, { triggerValue: selectedValue, clear: true });
    }
  }, {
    key: 'setOpenState',
    value: function setOpenState(open, needFocus) {
      var _this4 = this;

      var documentClickClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.clearDelayTimer();
      var props = this.props;
      // can not optimize, if children is empty
      // if (this.state.open === open) {
      //   return;
      // }

      if (!this.props.onDropdownVisibleChange(open, { documentClickClose: documentClickClose })) {
        return;
      }
      this.setState({
        open: open
      }, function () {
        if (needFocus || open) {
          // Input dom init after first time component render
          // Add delay for this to get focus
          Promise.resolve().then(function () {
            if (open || isMultiple(props)) {
              var input = _this4.getInputDOMNode();
              if (input && document.activeElement !== input) {
                input.focus();
              }
            } else if (_this4.selection) {
              _this4.selection.focus();
            }
          });
        }
      });
    }
  }, {
    key: 'clearSearchInput',
    value: function clearSearchInput() {
      this.getInputDOMNode().focus();
      if (!('inputValue' in this.props)) {
        this.setState({ inputValue: '' });
      }
    }
  }, {
    key: 'addLabelToValue',
    value: function addLabelToValue(props, value_) {
      var _this5 = this;

      var value = value_;
      if (this.isLabelInValue()) {
        value.forEach(function (v, i) {
          if (Object.prototype.toString.call(value[i]) !== '[object Object]') {
            value[i] = {
              value: '',
              label: ''
            };
            return;
          }
          v.label = v.label || _this5.getLabelFromProps(props, v.value);
        });
      } else {
        value = value.map(function (v) {
          return {
            value: v,
            label: _this5.getLabelFromProps(props, v)
          };
        });
      }
      return value;
    }
  }, {
    key: 'clearDelayTimer',
    value: function clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    }
  }, {
    key: 'removeSelected',
    value: function removeSelected(selectedVal) {
      var props = this.props;
      if (props.disabled) {
        return;
      }
      this._cacheTreeNodesStates = 'no';
      if (props.treeCheckable && (props.showCheckedStrategy === SHOW_ALL || props.showCheckedStrategy === SHOW_PARENT) && !(props.treeCheckStrictly || this.state.inputValue)) {
        this.getDeselectedValue(selectedVal);
        return;
      }
      // click the node's `x`(in select box), likely trigger the TreeNode's `unCheck` event,
      // cautiously, they are completely different, think about it, the tree may not render at first,
      // but the nodes in select box are ready.
      var label = void 0;
      var value = this.state.value.filter(function (singleValue) {
        if (singleValue.value === selectedVal) {
          label = singleValue.label;
        }
        return singleValue.value !== selectedVal;
      });
      var canMultiple = isMultiple(props);

      if (canMultiple) {
        var event = selectedVal;
        if (this.isLabelInValue()) {
          event = {
            value: selectedVal,
            label: label
          };
        }
        props.onDeselect(event);
      }
      if (props.treeCheckable) {
        if (this.checkedTreeNodes && this.checkedTreeNodes.length) {
          this.checkedTreeNodes = this._checkedNodes = this.checkedTreeNodes.filter(function (item) {
            return value.some(function (i) {
              return i.value === item.node.props.value;
            });
          });
        }
      }
      this.fireChange(value, { triggerValue: selectedVal, clear: true });
    }
  }, {
    key: 'openIfHasChildren',
    value: function openIfHasChildren() {
      var props = this.props;
      if (Children.count(props.children) || !isMultiple(props)) {
        this.setOpenState(true);
      }
    }
  }, {
    key: 'fireChange',
    value: function fireChange(value) {
      var _this6 = this;

      var extraInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var props = this.props;
      var vals = value.map(function (i) {
        return i.value;
      });
      var sv = this.state.value.map(function (i) {
        return i.value;
      });
      if (vals.length !== sv.length || !vals.every(function (val, index) {
        return sv[index] === val;
      })) {
        var ex = _extends({
          preValue: [].concat(_toConsumableArray(this.state.value))
        }, extraInfo);
        var labs = null;
        var vls = value;
        if (!this.isLabelInValue()) {
          labs = value.map(function (i) {
            return i.label;
          });
          vls = vls.map(function (v) {
            return v.value;
          });
        } else if (this.halfCheckedValues && this.halfCheckedValues.length) {
          this.halfCheckedValues.forEach(function (i) {
            if (!vls.some(function (v) {
              return v.value === i.value;
            })) {
              vls.push(i);
            }
          });
        }
        if (props.treeCheckable && ex.clear) {
          var treeData = this.renderedTreeData || props.children;
          ex.allCheckedNodes = flatToHierarchy(filterAllCheckedData(vals, treeData));
        }
        if (props.treeCheckable && this.state.inputValue) {
          var _vls = [].concat(_toConsumableArray(this.state.value));
          if (ex.checked) {
            value.forEach(function (i) {
              if (_vls.every(function (ii) {
                return ii.value !== i.value;
              })) {
                _vls.push(_extends({}, i));
              }
            });
          } else {
            var index = void 0;
            var includeVal = _vls.some(function (i, ind) {
              if (i.value === ex.triggerValue) {
                index = ind;
                return true;
              }
            });
            if (includeVal) {
              _vls.splice(index, 1);
            }
          }
          vls = _vls;
          if (!this.isLabelInValue()) {
            labs = _vls.map(function (v) {
              return v.label;
            });
            vls = _vls.map(function (v) {
              return v.value;
            });
          }
        }
        this._savedValue = isMultiple(props) ? vls : vls[0];
        props.onChange(this._savedValue, labs, ex);
        if (!('value' in props)) {
          this._cacheTreeNodesStates = false;
          this.setState({
            value: this.getValue(props, toArray(this._savedValue).map(function (v, i) {
              return _this6.isLabelInValue() ? v : {
                value: v,
                label: labs && labs[i]
              };
            }))
          });
        }
      }
    }
  }, {
    key: 'isLabelInValue',
    value: function isLabelInValue() {
      var _props4 = this.props,
          treeCheckable = _props4.treeCheckable,
          treeCheckStrictly = _props4.treeCheckStrictly,
          labelInValue = _props4.labelInValue;

      if (treeCheckable && treeCheckStrictly) {
        return true;
      }
      return labelInValue || false;
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!isMultiple(this.props)) {
        this.selection.focus();
      } else {
        this.getInputDOMNode().focus();
      }
    }
  }, {
    key: 'blur',
    value: function blur() {
      if (!isMultiple(this.props)) {
        this.selection.blur();
      } else {
        this.getInputDOMNode().blur();
      }
    }
  }, {
    key: 'renderClear',
    value: function renderClear() {
      var _props5 = this.props,
          prefixCls = _props5.prefixCls,
          allowClear = _props5.allowClear;
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
      if (inputValue || value.length) {
        return clear;
      }
      return null;
    }
  }, {
    key: 'renderTopControlNode',
    value: function renderTopControlNode() {
      var _this7 = this;

      var value = this.state.value;

      var props = this.props;
      var choiceTransitionName = props.choiceTransitionName,
          prefixCls = props.prefixCls,
          maxTagTextLength = props.maxTagTextLength,
          choiceRender = props.choiceRender;

      var multiple = isMultiple(props);

      // single and not combobox, input is inside dropdown
      if (!multiple) {
        var singleValue = value && value[0];

        var _ref = singleValue || {},
            label = _ref.label;

        var innerNode = React.createElement(
          'span',
          {
            key: 'value',
            title: label,
            className: prefixCls + '-selection-selected-value'
          },
          choiceRender ? choiceRender(label) : label
        );
        return React.createElement(
          'div',
          { className: prefixCls + '-selection__rendered' },
          this.getPlaceholderElement(),
          innerNode,
          this.renderClear(),
          multiple || !props.showArrow ? null : React.createElement(
            'span',
            _extends({
              key: 'arrow',
              className: prefixCls + '-arrow',
              style: UNSELECTABLE_STYLE
            }, UNSELECTABLE_ATTRIBUTE, {
              onClick: this.onArrowClick
            }),
            React.createElement('i', { className: 'icon icon-arrow_drop_down' }),
            React.createElement('b', null)
          )
        );
      }

      var selectedValueNodes = value.map(function (singleValue) {
        var content = singleValue.label;
        var title = content;
        if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
          content = content.slice(0, maxTagTextLength) + '...';
        }
        return React.createElement(
          'li',
          _extends({
            style: UNSELECTABLE_STYLE
          }, UNSELECTABLE_ATTRIBUTE, {
            onMouseDown: preventDefaultEvent,
            className: prefixCls + '-selection__choice',
            key: singleValue.value,
            title: title
          }),
          React.createElement('span', {
            className: prefixCls + '-selection__choice__remove',
            onClick: _this7.removeSelected.bind(_this7, singleValue.value)
          }),
          React.createElement(
            'span',
            { className: prefixCls + '-selection__choice__content' },
            content
          )
        );
      });

      selectedValueNodes.push(React.createElement(
        'li',
        {
          className: prefixCls + '-search ' + prefixCls + '-search--inline',
          key: '__input'
        },
        this.getInputElement()
      ));
      var className = prefixCls + '-selection__rendered';
      if (choiceTransitionName) {
        return React.createElement(
          Animate,
          {
            className: className,
            component: 'ul',
            transitionName: choiceTransitionName,
            onLeave: this.onChoiceAnimationLeave
          },
          selectedValueNodes
        );
      }
      return React.createElement(
        'ul',
        { className: className },
        selectedValueNodes
      );
    }
  }, {
    key: 'renderTreeData',
    value: function renderTreeData(props) {
      var validProps = props || this.props;
      if (validProps.treeData) {
        if (props && props.treeData === this.props.treeData && this.renderedTreeData) {
          // cache and use pre data.
          this._cachetreeData = true;
          return this.renderedTreeData;
        }
        this._cachetreeData = false;
        var treeData = [].concat(_toConsumableArray(validProps.treeData));
        // process treeDataSimpleMode
        if (validProps.treeDataSimpleMode) {
          var simpleFormat = {
            id: 'id',
            pId: 'pId',
            rootPId: null
          };
          if (Object.prototype.toString.call(validProps.treeDataSimpleMode) === '[object Object]') {
            simpleFormat = _extends({}, simpleFormat, validProps.treeDataSimpleMode);
          }
          treeData = processSimpleTreeData(treeData, simpleFormat);
        }
        return loopTreeData(treeData, undefined, this.props.treeCheckable);
      }
    }
  }, {
    key: 'getUnderLine',
    value: function getUnderLine() {
      var _props6 = this.props,
          prefixCls = _props6.prefixCls,
          className = _props6.className;


      if (className && className.includes(prefixCls + '-auto-complete')) {
        return null;
      }

      return React.createElement(
        'div',
        { className: prefixCls + '-underline' },
        React.createElement('span', { className: prefixCls + '-ripple' })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _rootCls;

      var props = this.props;
      var multiple = isMultiple(props);
      var _state2 = this.state,
          open = _state2.open,
          focused = _state2.focused,
          inputValue = _state2.inputValue,
          value = _state2.value;
      var className = props.className,
          disabled = props.disabled,
          label = props.label,
          prefixCls = props.prefixCls;

      var ctrlNode = this.renderTopControlNode();
      var extraSelectionProps = {};
      if (!multiple) {
        extraSelectionProps = {
          onKeyDown: this.onKeyDown,
          tabIndex: 0
        };
      }
      var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, prefixCls + '-open', open), _defineProperty(_rootCls, prefixCls + '-focused', open || focused), _defineProperty(_rootCls, prefixCls + '-has-value', inputValue || value.length && value[0]), _defineProperty(_rootCls, prefixCls + '-has-label', label), _defineProperty(_rootCls, prefixCls + '-disabled', disabled), _defineProperty(_rootCls, prefixCls + '-enabled', !disabled), _defineProperty(_rootCls, prefixCls + '-allow-clear', !!props.allowClear), _rootCls);

      return React.createElement(
        SelectTrigger,
        _extends({}, props, {
          treeNodes: props.children,
          treeData: this.renderedTreeData,
          _cachetreeData: this._cachetreeData,
          _treeNodesStates: this._treeNodesStates,
          halfCheckedValues: this.halfCheckedValues,
          multiple: multiple,
          disabled: disabled,
          visible: open,
          inputValue: inputValue,
          inputElement: this.getInputElement(),
          value: value,
          onDropdownVisibleChange: this.onDropdownVisibleChange,
          getPopupContainer: props.getPopupContainer,
          onSelect: this.onSelect,
          ref: saveRef(this, 'trigger')
        }),
        React.createElement(
          'div',
          {
            style: props.style,
            onClick: props.onClick,
            className: classnames(rootCls),
            onBlur: props.onBlur,
            onFocus: props.onFocus
          },
          React.createElement(
            'div',
            _extends({
              ref: saveRef(this, 'selection'),
              key: 'selection',
              className: prefixCls + '-selection\n            ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
              role: 'combobox',
              'aria-autocomplete': 'list',
              'aria-haspopup': 'true',
              'aria-expanded': open
            }, extraSelectionProps),
            ctrlNode,
            multiple ? this.getSearchPlaceholderElement(!!inputValue || value.length) : null
          ),
          this.getUnderLine()
        )
      );
    }
  }]);

  return Select;
}(Component);

Select.propTypes = SelectPropTypes;
Select.defaultProps = {
  prefixCls: 'rc-tree-select',
  filterTreeNode: filterFn,
  showSearch: true,
  allowClear: false,
  placeholder: '',
  searchPlaceholder: '',
  labelInValue: false,
  onClick: noop,
  onChange: noop,
  onSelect: noop,
  onDeselect: noop,
  onSearch: noop,
  showArrow: true,
  dropdownMatchSelectWidth: true,
  dropdownStyle: {},
  onDropdownVisibleChange: function onDropdownVisibleChange() {
    return true;
  },
  optionLabelProp: 'value',
  notFoundContent: 'Not Found',
  showCheckedStrategy: SHOW_CHILD,
  // skipHandleInitValue: false, // Deprecated (use treeCheckStrictly)
  treeCheckStrictly: false,
  treeIcon: false,
  treeLine: false,
  treeDataSimpleMode: false,
  treeDefaultExpandAll: false,
  treeCheckable: false,
  treeNodeFilterProp: 'value',
  treeNodeLabelProp: 'title'
};
Select.SHOW_ALL = SHOW_ALL;
Select.SHOW_PARENT = SHOW_PARENT;
Select.SHOW_CHILD = SHOW_CHILD;

var _initialiseProps = function _initialiseProps() {
  var _this8 = this;

  this.onInputChange = function (event) {
    var val = event.target.value;
    var props = _this8.props;

    _this8.setState({
      inputValue: val,
      open: true
    });
    if (props.treeCheckable && !val) {
      _this8.setState({
        value: _this8.getValue(props, [].concat(_toConsumableArray(_this8.state.value)), false)
      });
    }
    props.onSearch(val);
  };

  this.onDropdownVisibleChange = function (open) {
    // selection inside combobox cause click
    if (!open && document.activeElement === _this8.getInputDOMNode()) {}
    // return;

    // this.setOpenState(open);
    // setTimeout, then have animation. why?
    setTimeout(function () {
      _this8.setOpenState(open, undefined, !open);
    }, 10);
  };

  this.onKeyDown = function (event) {
    var props = _this8.props;
    if (props.disabled) {
      return;
    }
    var keyCode = event.keyCode;
    if (_this8.state.open && !_this8.getInputDOMNode()) {
      _this8.onInputKeyDown(event);
    } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
      _this8.setOpenState(true);
      event.preventDefault();
    }
  };

  this.onInputKeyDown = function (event) {
    var props = _this8.props;
    if (props.disabled) {
      return;
    }
    var state = _this8.state;
    var keyCode = event.keyCode;
    if (isMultiple(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
      var value = state.value.concat();
      if (value.length) {
        var popValue = value.pop();
        _this8.removeSelected(_this8.isLabelInValue() ? popValue : popValue.value);
      }
      return;
    }
    if (keyCode === KeyCode.DOWN) {
      if (!state.open) {
        _this8.openIfHasChildren();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } else if (keyCode === KeyCode.ESC) {
      if (state.open) {
        _this8.setOpenState(false);
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
  };

  this.onSelect = function (selectedKeys, info) {
    var item = info.node;
    var value = _this8.state.value;
    var props = _this8.props;
    var selectedValue = getValuePropValue(item);
    var selectedLabel = _this8.getLabelFromNode(item);
    var checkableSelect = props.treeCheckable && info.event === 'select';
    var event = selectedValue;
    if (_this8.isLabelInValue()) {
      event = {
        value: event,
        label: selectedLabel
      };
    }
    if (info.selected === false) {
      _this8.onDeselect(info);
      if (!checkableSelect) return;
    }
    props.onSelect(event, item, info);

    var checkEvt = info.event === 'check';
    if (isMultiple(props)) {
      _this8.clearSearchInput();
      if (checkEvt) {
        value = _this8.getCheckedNodes(info, props).map(function (n) {
          return {
            value: getValuePropValue(n),
            label: _this8.getLabelFromNode(n)
          };
        });
      } else {
        if (value.some(function (i) {
          return i.value === selectedValue;
        })) {
          return;
        }
        value = value.concat([{
          value: selectedValue,
          label: selectedLabel
        }]);
      }
    } else {
      if (value.length && value[0].value === selectedValue) {
        _this8.setOpenState(false);
        return;
      }
      value = [{
        value: selectedValue,
        label: selectedLabel
      }];
      _this8.setOpenState(false);
    }

    var extraInfo = {
      triggerValue: selectedValue,
      triggerNode: item
    };
    if (checkEvt) {
      extraInfo.checked = info.checked;
      // if inputValue existing, tree is checkStrictly
      extraInfo.allCheckedNodes = props.treeCheckStrictly || _this8.state.inputValue ? info.checkedNodes : flatToHierarchy(info.checkedNodesPositions);
      _this8._checkedNodes = info.checkedNodesPositions;
      var _tree = _this8.trigger.popupEle;
      _this8._treeNodesStates = _tree.checkKeys;
    } else {
      extraInfo.selected = info.selected;
    }

    _this8.fireChange(value, extraInfo);
    if (props.inputValue === null) {
      _this8.setState({
        inputValue: ''
      });
    }
  };

  this.onDeselect = function (info) {
    _this8.removeSelected(getValuePropValue(info.node));
    if (!isMultiple(_this8.props)) {
      _this8.setOpenState(false);
    } else {
      _this8.clearSearchInput();
    }
  };

  this.onPlaceholderClick = function () {
    _this8.getInputDOMNode().focus();
  };

  this.onClearSelection = function (event) {
    var props = _this8.props;
    var state = _this8.state;
    if (props.disabled) {
      return;
    }
    event.stopPropagation();
    _this8._cacheTreeNodesStates = 'no';
    _this8._checkedNodes = [];
    if (state.inputValue || state.value.length) {
      _this8.setOpenState(false);
      if (typeof props.inputValue === 'undefined') {
        _this8.setState({
          inputValue: ''
        }, function () {
          _this8.fireChange([]);
        });
      } else {
        _this8.fireChange([]);
      }
    }
  };

  this.onChoiceAnimationLeave = function () {
    _this8.trigger.trigger.forcePopupAlign();
  };

  this.onArrowClick = function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (!_this8.props.disabled) {
      _this8.onDropdownVisibleChange(!_this8.state.open);
    }
  };

  this.getPlaceholderElement = function () {
    var props = _this8.props,
        state = _this8.state;

    var placeholder = props.placeholder;
    if (placeholder) {
      return React.createElement(
        'div',
        { className: props.prefixCls + '-selection__placeholder' },
        placeholder
      );
    }
    return null;
  };
};

export default Select;