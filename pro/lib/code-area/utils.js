'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUnprintableChar = removeUnprintableChar;
/**
 * 去除字符串中所有不可打印字符并返回结果
 *
 * @param {string} text 可能含有不可打印字符的字符串
 * @returns {string} 不含不可打印字符的字符串
 */
function removeUnprintableChar(text) {
  return text.replace(/\s*\n\s*/g, '');
}