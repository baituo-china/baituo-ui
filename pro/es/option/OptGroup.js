import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';

var OptGroup = function (_Component) {
    _inherits(OptGroup, _Component);

    function OptGroup() {
        _classCallCheck(this, OptGroup);

        return _possibleConstructorReturn(this, (OptGroup.__proto__ || Object.getPrototypeOf(OptGroup)).apply(this, arguments));
    }

    return OptGroup;
}(Component);

export default OptGroup;

OptGroup.propTypes = {
    label: PropTypes.string
};