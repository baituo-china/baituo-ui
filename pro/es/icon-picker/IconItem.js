import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';

var IconItem = function (_PureComponent) {
    _inherits(IconItem, _PureComponent);

    function IconItem() {
        _classCallCheck(this, IconItem);

        var _this = _possibleConstructorReturn(this, (IconItem.__proto__ || Object.getPrototypeOf(IconItem)).apply(this, arguments));

        _this.handleClick = function () {
            var _this$props = _this.props,
                onSelect = _this$props.onSelect,
                type = _this$props.type;

            onSelect(type);
        };
        return _this;
    }

    _createClass(IconItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                type = _props.type,
                active = _props.active;

            return React.createElement(
                'li',
                { className: classNames(_defineProperty({}, prefixCls + '-item-selected', active)), onClick: this.handleClick },
                React.createElement(
                    'div',
                    null,
                    React.createElement(Icon, { type: type }),
                    React.createElement(
                        'p',
                        null,
                        type
                    )
                )
            );
        }
    }]);

    return IconItem;
}(PureComponent);

export default IconItem;

IconItem.displayName = 'IconItem';
IconItem.propTypes = {
    prefixCls: PropTypes.string,
    active: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};