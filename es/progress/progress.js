import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import { Circle } from '../rc-components/progress';
import Loading from './Loading';
import { getPrefixCls } from '../configure';

var Progress = function (_Component) {
    _inherits(Progress, _Component);

    function Progress() {
        _classCallCheck(this, Progress);

        return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    _createClass(Progress, [{
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
                restProps = _objectWithoutProperties(props, ['prefixCls', 'className', 'percent', 'status', 'format', 'trailColor', 'size', 'successPercent', 'type', 'strokeWidth', 'width', 'showInfo', 'gapDegree', 'gapPosition']);

            var prefixCls = getPrefixCls('progress', customizePrefixCls);
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
                        text = format ? textFormatter(percent) : React.createElement(Icon, { type: circleType ? 'close' : 'cancel' });
                    } else if (progressStatus === "success" /* success */) {
                        text = format ? textFormatter(percent) : React.createElement(Icon, { type: circleType ? 'check' : 'check_circle' });
                    } else {
                    text = textFormatter(percent);
                }
                progressInfo = React.createElement(
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
                    var successSegment = successPercent !== undefined ? React.createElement('div', { className: prefixCls + '-success-bg', style: successPercentStyle }) : null;
                    progress = React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { className: prefixCls + '-outer' },
                            React.createElement(
                                'div',
                                { className: prefixCls + '-inner' },
                                React.createElement('div', { className: prefixCls + '-bg', style: percentStyle }),
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
                    progress = React.createElement(
                        'div',
                        { className: prefixCls + '-inner', style: circleStyle },
                        React.createElement(Circle, { percent: percent, strokeWidth: circleWidth, trailWidth: circleWidth, trailColor: trailColor, prefixCls: prefixCls, gapDegree: gapDeg, gapPosition: gapPos }),
                        progressInfo
                    );
                } else if (type === "loading" /* loading */) {
                    progress = React.createElement(
                        'div',
                        { className: prefixCls + '-inner' },
                        React.createElement(Loading, null)
                    );
                }
            var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + (type === "dashboard" /* dashboard */ && "circle" /* circle */ || type), true), _defineProperty(_classNames, prefixCls + '-status-' + progressStatus, true), _defineProperty(_classNames, prefixCls + '-show-info', showInfo), _defineProperty(_classNames, prefixCls + '-' + size, size), _classNames), className);
            return React.createElement(
                'div',
                _extends({}, restProps, { className: classString }),
                progress
            );
        }
    }]);

    return Progress;
}(Component);

export default Progress;

Progress.displayName = 'Progress';
Progress.defaultProps = {
    type: "line" /* line */
    , percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    size: "default" /* default */
};
Progress.propTypes = {
    status: PropTypes.oneOf(["normal" /* normal */, "exception" /* exception */, "active" /* active */, "success" /* success */]),
    type: PropTypes.oneOf(["line" /* line */, "circle" /* circle */, "dashboard" /* dashboard */, "loading" /* loading */]),
    showInfo: PropTypes.bool,
    percent: PropTypes.number,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    trailColor: PropTypes.string,
    format: PropTypes.func,
    gapDegree: PropTypes.number,
    'default': PropTypes.oneOf(["default" /* default */, "small" /* small */, "large" /* large */])
};