import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { categories, icons } from 'choerodon-ui-font';

var Icon = function (_Component) {
    _inherits(Icon, _Component);

    function Icon() {
        _classCallCheck(this, Icon);

        return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
    }

    _createClass(Icon, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                type = _props.type,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className;

            var classString = classNames('icon', 'icon-' + type, className);
            return React.createElement('i', _extends({}, omit(this.props, ['type', 'spin']), { className: classString }));
        }
    }]);

    return Icon;
}(Component);

export default Icon;

Icon.displayName = 'Icon';
Icon.icons = icons;
Icon.categories = categories;