import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import { TextField } from '../text-field/TextField';
import PropTypes from 'prop-types';
var TextArea = function (_TextField) {
    _inherits(TextArea, _TextField);

    function TextArea() {
        _classCallCheck(this, TextArea);

        return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));
    }

    _createClass(TextArea, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var resize = this.props.resize;

            var otherProps = omit(_get(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), 'getOtherProps', this).call(this), ['resize']);
            var _otherProps$style = otherProps.style,
                style = _otherProps$style === undefined ? {} : _otherProps$style;

            style.resize = resize;
            if (resize !== "none" /* none */) {
                    style.transition = 'none';
                }
            otherProps.style = style;
            return otherProps;
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            return React.createElement(
                'div',
                _extends({ key: 'wrapper' }, this.getWrapperProps()),
                React.createElement(
                    'label',
                    null,
                    React.createElement('textarea', _extends({}, this.getOtherProps(), { readOnly: !this.editable, value: this.getText() })),
                    this.renderFloatLabel()
                )
            );
        }
    }, {
        key: 'handleEnterDown',
        value: function handleEnterDown() {}
    }]);

    return TextArea;
}(TextField);
TextArea.displayName = 'TextArea';
TextArea.propTypes = _extends({
    cols: PropTypes.number,
    rows: PropTypes.number,
    resize: PropTypes.oneOf(["vertical" /* vertical */, "horizontal" /* horizontal */, "none" /* none */, "both" /* both */])
}, TextField.propTypes);
TextArea.defaultProps = _extends({}, TextField.defaultProps, {
    suffixCls: 'textarea',
    resize: "none" /* none */
    , rows: 4
});
TextArea = tslib_1.__decorate([observer], TextArea);
export default TextArea;