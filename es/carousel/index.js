import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { getPrefixCls } from '../configure';
import { matchMediaPolifill } from '../_util/mediaQueryListPolyfill';
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
    window.matchMedia = window.matchMedia || matchMediaPolifill;
}
// Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
var SlickCarousel = require('react-slick')['default'];

var Carousel = function (_Component) {
    _inherits(Carousel, _Component);

    function Carousel() {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).apply(this, arguments));

        _this.onWindowResized = debounce(function () {
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

    _createClass(Carousel, [{
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
            var props = _extends({}, this.props);
            if (props.effect === 'fade') {
                props.fade = true;
            }
            var prefixCls = getPrefixCls('carousel', props.prefixCls);
            var className = classNames(prefixCls, _defineProperty({}, prefixCls + '-vertical', props.vertical));
            return React.createElement(
                'div',
                { className: className },
                React.createElement(SlickCarousel, _extends({ ref: this.saveSlick }, props))
            );
        }
    }]);

    return Carousel;
}(Component);

export default Carousel;

Carousel.displayName = 'Carousel';
Carousel.defaultProps = {
    dots: true,
    arrows: false,
    draggable: false
};