import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';

var LazyRenderBox = function (_Component) {
    _inherits(LazyRenderBox, _Component);

    function LazyRenderBox() {
        _classCallCheck(this, LazyRenderBox);

        return _possibleConstructorReturn(this, (LazyRenderBox.__proto__ || Object.getPrototypeOf(LazyRenderBox)).apply(this, arguments));
    }

    _createClass(LazyRenderBox, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return !!nextProps.hiddenClassName || !nextProps.hidden;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                hiddenClassName = _props.hiddenClassName,
                hidden = _props.hidden,
                className = _props.className,
                otherProps = _objectWithoutProperties(_props, ['hiddenClassName', 'hidden', 'className']);

            var classString = classNames(className, _defineProperty({}, hiddenClassName, hiddenClassName && hidden));
            return React.createElement('div', _extends({ className: classString }, otherProps));
        }
    }]);

    return LazyRenderBox;
}(Component);

export default LazyRenderBox;