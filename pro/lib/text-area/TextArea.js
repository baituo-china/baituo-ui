'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _TextField2 = require('../text-field/TextField');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TextArea = function (_TextField) {
    (0, _inherits3['default'])(TextArea, _TextField);

    function TextArea() {
        (0, _classCallCheck3['default'])(this, TextArea);
        return (0, _possibleConstructorReturn3['default'])(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));
    }

    (0, _createClass3['default'])(TextArea, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var resize = this.props.resize;

            var otherProps = (0, _omit2['default'])((0, _get3['default'])(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), 'getOtherProps', this).call(this), ['resize']);
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
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({ key: 'wrapper' }, this.getWrapperProps()),
                _react2['default'].createElement(
                    'label',
                    null,
                    _react2['default'].createElement('textarea', (0, _extends3['default'])({}, this.getOtherProps(), { readOnly: !this.editable, value: this.getText() })),
                    this.renderFloatLabel()
                )
            );
        }
    }, {
        key: 'handleEnterDown',
        value: function handleEnterDown() {}
    }]);
    return TextArea;
}(_TextField2.TextField);
TextArea.displayName = 'TextArea';
TextArea.propTypes = (0, _extends3['default'])({
    cols: _propTypes2['default'].number,
    rows: _propTypes2['default'].number,
    resize: _propTypes2['default'].oneOf(["vertical" /* vertical */, "horizontal" /* horizontal */, "none" /* none */, "both" /* both */])
}, _TextField2.TextField.propTypes);
TextArea.defaultProps = (0, _extends3['default'])({}, _TextField2.TextField.defaultProps, {
    suffixCls: 'textarea',
    resize: "none" /* none */
    , rows: 4
});
TextArea = tslib_1.__decorate([_mobxReact.observer], TextArea);
exports['default'] = TextArea;
module.exports = exports['default'];