import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var TreeNode = function (_Component) {
  _inherits(TreeNode, _Component);

  function TreeNode() {
    _classCallCheck(this, TreeNode);

    return _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).apply(this, arguments));
  }

  return TreeNode;
}(Component);

TreeNode.propTypes = {
  value: PropTypes.string
};
export default TreeNode;