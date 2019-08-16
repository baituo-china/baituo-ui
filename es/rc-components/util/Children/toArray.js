import { Children } from 'react';

export default function toArray(children) {
  var ret = [];
  Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}