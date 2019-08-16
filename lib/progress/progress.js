'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _progress = require('../rc-components/progress');

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Progress = function (_Component) {
    (0, _inherits3['default'])(Progress, _Component);

    function Progress() {
        (0, _classCallCheck3['default'])(this, Progress);
        return (0, _possibleConstructorReturn3['default'])(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Progress, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var props = this.props;
            var customizePrefixCls = props.prefixCls,
                className = props.className,
                _props$percent = props.percent,
                percent = _props$percent === undefined ? 0 : _props$percent,
                status = props.status,
                format = props.format,
                trailColor = props.trailColor,
                size = props.size,
                successPercent = props.successPercent,
                type = props.type,
                strokeWidth = props.strokeWidth,
                width = props.width,
                showInfo = props.showInfo,
                _props$gapDegree = props.gapDegree,
                gapDegree = _props$gapDegree === undefined ? 0 : _props$gapDegree,
                gapPosition = props.gapPosition,
                restProps = (0, _objectWithoutProperties3['default'])(props, ['prefixCls', 'className', 'percent', 'status', 'format', 'trailColor', 'size', 'successPercent', 'type', 'strokeWidth', 'width', 'showInfo', 'gapDegree', 'gapPosition']);

            var prefixCls = (0, _configure.getPrefixCls)('progress', customizePrefixCls);
            var progressStatus = parseInt(successPercent ? successPercent.toString() : percent.toString(), 10) >= 100 && !('status' in props) ? "success" /* success */ : status || "normal" /* normal */;
            var progressInfo = void 0;
            var progress = void 0;
            var textFormatter = format || function (percentNumber) {
                return percentNumber + '%';
            };
            if (showInfo) {
                var text = void 0;
                var circleType = type === "circle" /* circle */ || type === "dashboard" /* dashboard */;
                if (progressStatus === "exception" /* exception */) {
                        text = format ? textFormatter(percent) : _react2['default'].createElement(_icon2['default'], { type: circleType ? 'close' : 'cancel' });
                    } else if (progressStatus === "success" /* success */) {
                        text = format ? textFormatter(percent) : _react2['default'].createElement(_icon2['default'], { type: circleType ? 'check' : 'check_circle' });
                    } else {
                    text = textFormatter(percent);
                }
                progressInfo = _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-text' },
                    text
                );
            }
            if (type === "line" /* line */) {
                    var percentStyle = {
                        width: percent + '%',
                        height: strokeWidth || (size === "small" /* small */ ? 6 : 8)
                    };
                    var successPercentStyle = {
                        width: successPercent + '%',
                        height: strokeWidth || (size === "small" /* small */ ? 6 : 8)
                    };
                    var successSegment = successPercent !== undefined ? _react2['default'].createElement('div', { className: prefixCls + '-success-bg', style: successPercentStyle }) : null;
                    progress = _react2['default'].createElement(
                        'div',
                        null,
                        _react2['default'].createElement(
                            'div',
                            { className: prefixCls + '-outer' },
                            _react2['default'].createElement(
                                'div',
                                { className: prefixCls + '-inner' },
                                _react2['default'].createElement('div', { className: prefixCls + '-bg', style: percentStyle }),
                                successSegment
                            )
                        ),
                        progressInfo
                    );
                } else if (type === "circle" /* circle */ || type === "dashboard" /* dashboard */) {
                    var circleSize = width || 120;
                    var circleStyle = {
                        width: circleSize,
                        height: circleSize,
                        fontSize: circleSize * 0.15 + 6
                    };
                    var circleWidth = strokeWidth || 6;
                    var gapPos = gapPosition || type === "dashboard" /* dashboard */ && "bottom" /* bottom */ || "top" /* top */;
                    var gapDeg = gapDegree || type === "dashboard" /* dashboard */ && 75;
                    progress = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-inner', style: circleStyle },
                        _react2['default'].createElement(_progress.Circle, { percent: percent, strokeWidth: circleWidth, trailWidth: circleWidth, trailColor: trailColor, prefixCls: prefixCls, gapDegree: gapDeg, gapPosition: gapPos }),
                        progressInfo
                    );
                } else if (type === "loading" /* loading */) {
                    progress = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-inner' },
                        _react2['default'].createElement(_Loading2['default'], null)
                    );
                }
            var classString = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + (type === "dashboard" /* dashboard */ && "circle" /* circle */ || type), true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-status-' + progressStatus, true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-show-info', showInfo), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + size, size), _classNames), className);
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({}, restProps, { className: classString }),
                progress
            );
        }
    }]);
    return Progress;
}(_react.Component);

exports['default'] = Progress;

Progress.displayName = 'Progress';
Progress.defaultProps = {
    type: "line" /* line */
    , percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    size: "default" /* default */
};
Progress.propTypes = {
    status: _propTypes2['default'].oneOf(["normal" /* normal */, "exception" /* exception */, "active" /* active */, "success" /* success */]),
    type: _propTypes2['default'].oneOf(["line" /* line */, "circle" /* circle */, "dashboard" /* dashboard */, "loading" /* loading */]),
    showInfo: _propTypes2['default'].bool,
    percent: _propTypes2['default'].number,
    width: _propTypes2['default'].number,
    strokeWidth: _propTypes2['default'].number,
    trailColor: _propTypes2['default'].string,
    format: _propTypes2['default'].func,
    gapDegree: _propTypes2['default'].number,
    'default': _propTypes2['default'].oneOf(["default" /* default */, "small" /* small */, "large" /* large */])
};
module.exports = exports['default'];