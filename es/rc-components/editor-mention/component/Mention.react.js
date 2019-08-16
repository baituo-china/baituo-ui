import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { EditorCore } from 'rc-editor-core';
import { CompositeDecorator, ContentState, EditorState, SelectionState } from 'draft-js';

import createMention from '../utils/createMention';
import exportContent from '../utils/exportContent';

var Mention = function (_Component) {
  _inherits(Mention, _Component);

  function Mention(props) {
    _classCallCheck(this, Mention);

    var _this = _possibleConstructorReturn(this, (Mention.__proto__ || Object.getPrototypeOf(Mention)).call(this, props));

    _this.onEditorChange = function (editorState) {
      var selection = editorState.getSelection();
      _this._decorator = editorState.getDecorator();
      var content = editorState.getCurrentContent();

      if (_this.props.onChange) {
        _this.setState({
          selection: selection
        }, function () {
          _this.props.onChange(content, exportContent(content));
        });
      } else {
        _this.setState({
          editorState: editorState,
          selection: selection
        });
      }
    };

    _this.onFocus = function (e) {
      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }
      _this.setState({ focused: true });
    };

    _this.onBlur = function (e) {
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
      _this.setState({ focused: false });
    };

    _this.reset = function () {
      /*eslint-disable*/
      _this._editor.Reset();
      /*eslint-enable*/
    };

    _this.mention = createMention({
      prefix: _this.getPrefix(props),
      tag: props.tag,
      mode: props.mode,
      mentionStyle: props.mentionStyle
    });

    _this.Suggestions = _this.mention.Suggestions;
    _this.plugins = [_this.mention];

    _this.state = {
      suggestions: props.suggestions,
      value: props.value && EditorState.createWithContent(props.value, new CompositeDecorator(_this.mention.decorators)),
      selection: SelectionState.createEmpty(),
      focused: false
    };

    if (typeof props.defaultValue === 'string') {
      // eslint-disable-next-line
      console.warn('The property `defaultValue` now allow `EditorState` only, see http://react-component.github.io/editor-mention/examples/defaultValue.html ');
    }
    if (props.value !== undefined) {
      _this.controlledMode = true;
    }
    return _this;
  }

  _createClass(Mention, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var suggestions = nextProps.suggestions;
      var selection = this.state.selection;

      var value = nextProps.value;
      if (value && selection) {
        value = EditorState.acceptSelection(EditorState.createWithContent(value, this._decorator), selection);
      }
      this.setState({
        suggestions: suggestions,
        value: value
      });
    }
  }, {
    key: 'getPrefix',
    value: function getPrefix() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return Array.isArray(props.prefix) ? props.prefix : [props.prefix];
    }
  }, {
    key: 'getUnderLine',
    value: function getUnderLine() {
      var prefixCls = this.props.prefixCls;

      return React.createElement(
        'div',
        { className: prefixCls + '-editor-underline' },
        React.createElement('span', { className: prefixCls + '-editor-ripple' })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          prefixCls = _props.prefixCls,
          style = _props.style,
          tag = _props.tag,
          multiLines = _props.multiLines,
          suggestionStyle = _props.suggestionStyle,
          placeholder = _props.placeholder,
          defaultValue = _props.defaultValue,
          className = _props.className,
          notFoundContent = _props.notFoundContent,
          getSuggestionContainer = _props.getSuggestionContainer,
          readOnly = _props.readOnly,
          disabled = _props.disabled,
          placement = _props.placement;
      var _state = this.state,
          suggestions = _state.suggestions,
          focused = _state.focused;
      var Suggestions = this.Suggestions;

      var editorClass = classnames(className, (_classnames = {}, _defineProperty(_classnames, prefixCls + '-wrapper', true), _defineProperty(_classnames, prefixCls + '-editor-focus', focused), _defineProperty(_classnames, 'readonly', readOnly), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, 'multilines', multiLines), _classnames));
      var editorProps = this.controlledMode ? { value: this.state.value } : {};
      var defaultValueState = defaultValue && EditorState.createWithContent(typeof defaultValue === 'string' ? ContentState.createFromText(defaultValue) : defaultValue, this._decorator);
      return React.createElement(
        'div',
        { className: editorClass, style: style, ref: function ref(wrapper) {
            return _this2._wrapper = wrapper;
          } },
        React.createElement(
          EditorCore,
          _extends({
            ref: function ref(editor) {
              return _this2._editor = editor;
            },
            prefixCls: prefixCls,
            style: style,
            multiLines: multiLines,
            plugins: this.plugins,
            defaultValue: defaultValueState,
            placeholder: placeholder,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onEditorChange
          }, editorProps, {
            readOnly: readOnly || disabled
          }),
          React.createElement(Suggestions, {
            mode: tag ? 'immutable' : 'mutable',
            prefix: this.getPrefix(),
            prefixCls: prefixCls,
            style: suggestionStyle,
            placement: placement,
            notFoundContent: notFoundContent,
            suggestions: suggestions,
            getSuggestionContainer: getSuggestionContainer ? function () {
              return getSuggestionContainer(_this2._wrapper);
            } : null,
            onSearchChange: this.props.onSearchChange,
            onSelect: this.props.onSelect,
            noRedup: this.props.noRedup
          })
        ),
        this.getUnderLine()
      );
    }
  }]);

  return Mention;
}(Component);

Mention.propTypes = {
  value: PropTypes.object,
  suggestions: PropTypes.array,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  prefixCls: PropTypes.string,
  tag: PropTypes.element,
  style: PropTypes.object,
  className: PropTypes.string,
  onSearchChange: PropTypes.func,
  onChange: PropTypes.func,
  mode: PropTypes.string,
  multiLines: PropTypes.bool,
  suggestionStyle: PropTypes.object,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.object,
  notFoundContent: PropTypes.any,
  position: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSelect: PropTypes.func,
  getSuggestionContainer: PropTypes.func,
  noRedup: PropTypes.bool,
  mentionStyle: PropTypes.object,
  placement: PropTypes.string
};
Mention.controlledMode = false;


Mention.defaultProps = {
  prefixCls: 'rc-editor-mention',
  prefix: '@',
  mode: 'immutable',
  suggestions: [],
  multiLines: false,
  className: '',
  suggestionStyle: {},
  notFoundContent: '无法找到',
  position: 'absolute',
  placement: 'bottom', // top, bottom
  mentionStyle: {}
};

export default Mention;