'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _configure = require('../configure');

var _mediaQueryListPolyfill = require('../_util/mediaQueryListPolyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    // const matchMediaPolyfill = (mediaQuery: string): MediaQueryList => {
    //   return {
    //     media: mediaQuery,
    //     matches: false,
    //     addListener() {
    //     },
    //     removeListener() {
    //     },
    //   };
    // };
    window.matchMedia = window.matchMedia || _mediaQueryListPolyfill.matchMediaPolifill;
}
// Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
var SlickCarousel = require('react-slick')['default'];

var Carousel = function (_Component) {
    (0, _inherits3['default'])(Carousel, _Component);

    function Carousel() {
        (0, _classCallCheck3['default'])(this, Carousel);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).apply(this, arguments));

        _this.onWindowResized = (0, _debounce2['default'])(function () {
            var autoplay = _this.props.autoplay;

            if (autoplay && _this.slick && _this.slick.innerSlider && _this.slick.innerSlider.autoPlay) {
                _this.slick.innerSlider.autoPlay();
            }
        }, 500, {
            leading: false
        });
        _this.saveSlick = function (node) {
            _this.slick = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Carousel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var autoplay = this.props.autoplay;

            if (autoplay) {
                window.addEventListener('resize', this.onWindowResized);
            }
            this.innerSlider = this.slick && this.slick.innerSlider;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var autoplay = this.props.autoplay;

            if (autoplay) {
                window.removeEventListener('resize', this.onWindowResized);
                this.onWindowResized.cancel();
            }
        }
    }, {
        key: 'next',
        value: function next() {
            this.slick.slickNext();
        }
    }, {
        key: 'prev',
        value: function prev() {
            this.slick.slickPrev();
        }
    }, {
        key: 'goTo',
        value: function goTo(slide) {
            this.slick.slickGoTo(slide);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = (0, _extends3['default'])({}, this.props);
            if (props.effect === 'fade') {
                props.fade = true;
            }
            var prefixCls = (0, _configure.getPrefixCls)('carousel', props.prefixCls);
            var className = (0, _classnames2['default'])(prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-vertical', props.vertical));
            return _react2['default'].createElement(
                'div',
                { className: className },
                _react2['default'].createElement(SlickCarousel, (0, _extends3['default'])({ ref: this.saveSlick }, props))
            );
        }
    }]);
    return Carousel;
}(_react.Component);

exports['default'] = Carousel;

Carousel.displayName = 'Carousel';
Carousel.defaultProps = {
    dots: true,
    arrows: false,
    draggable: false
};
module.exports = exports['default'];