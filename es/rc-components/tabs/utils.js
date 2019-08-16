import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { Children } from 'react';
import isNil from 'lodash/isNil';

export function toArray(children) {
  var c = [];
  Children.forEach(children, function (child) {
    if (child) {
      c.push(child);
    }
  });
  return c;
}

export function generateKey(key, index) {
  return String(isNil(key) ? index : key);
}

export function getActiveIndex(children, activeKey) {
  var c = toArray(children);
  return c.findIndex(function (child, index) {
    return generateKey(child.key, index) === activeKey;
  });
}

export function getActiveKey(children, index) {
  var c = toArray(children);
  return generateKey(c[index].key, index);
}

export function setTransform(style, v) {
  style.transform = v;
  style.webkitTransform = v;
  style.mozTransform = v;
}

export function isTransformSupported(style) {
  return 'transform' in style || 'webkitTransform' in style || 'MozTransform' in style;
}

export function setTransition(style, v) {
  style.transition = v;
  style.webkitTransition = v;
  style.MozTransition = v;
}

export function getTransformPropValue(v) {
  return {
    transform: v,
    WebkitTransform: v,
    MozTransform: v
  };
}

export function isVertical(tabBarPosition) {
  return tabBarPosition === 'left' || tabBarPosition === 'right';
}

export function getTransformByIndex(index, tabBarPosition) {
  var translate = isVertical(tabBarPosition) ? 'translateY' : 'translateX';
  return translate + '(' + -index * 100 + '%) translateZ(0)';
}

export function getMarginStyle(index, tabBarPosition) {
  var marginDirection = isVertical(tabBarPosition) ? 'marginTop' : 'marginLeft';
  return _defineProperty({}, marginDirection, -index * 100 + '%');
}

export function getStyle(el, property) {
  return +getComputedStyle(el).getPropertyValue(property).replace('px', '');
}

export function setPxStyle(el, value, vertical) {
  value = vertical ? '0px, ' + value + 'px, 0px' : value + 'px, 0px, 0px';
  setTransform(el.style, 'translate3d(' + value + ')');
}

export function getDataAttr(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}