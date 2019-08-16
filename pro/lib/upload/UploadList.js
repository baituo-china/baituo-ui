'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _FormField2 = require('../field/FormField');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _progress = require('../progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var UploadList = function (_FormField) {
    (0, _inherits3['default'])(UploadList, _FormField);

    function UploadList() {
        (0, _classCallCheck3['default'])(this, UploadList);
        return (0, _possibleConstructorReturn3['default'])(this, (UploadList.__proto__ || Object.getPrototypeOf(UploadList)).apply(this, arguments));
    }

    (0, _createClass3['default'])(UploadList, [{
        key: 'render',
        value: function render() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                items = _props.items,
                remove = _props.remove,
                showPreviewImage = _props.showPreviewImage,
                previewImageWidth = _props.previewImageWidth;

            var list = items.map(function (file) {
                var _classnames2;

                var previewImg = void 0;
                var progress = void 0;
                var removeIcon = void 0;
                var progressProps = {
                    value: file.percent,
                    size: "small" /* small */
                    , showInfo: false
                };
                if (showPreviewImage && file.type.startsWith('image')) {
                    // temporarily set img[width] to 100
                    previewImg = _react2['default'].createElement('img', { width: previewImageWidth, alt: file.filename, src: file.url });
                }
                if (file.status === 'uploading') {
                    progress = _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-item-progress' },
                        _react2['default'].createElement(_progress2['default'], progressProps)
                    );
                } else {
                    var rmProps = {
                        className: (0, _classnames4['default'])(prefixCls + '-item-icon', (0, _defineProperty3['default'])({}, prefixCls + '-item-remove', true)),
                        type: 'close',
                        onClick: function onClick() {
                            remove(file);
                        }
                    };
                    removeIcon = _react2['default'].createElement(_icon2['default'], rmProps);
                }
                var listProps = {
                    className: (0, _classnames4['default'])(prefixCls + '-item', (_classnames2 = {}, (0, _defineProperty3['default'])(_classnames2, prefixCls + '-item-error', file.status === 'error'), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-item-success', file.status === 'success'), _classnames2))
                };
                return _react2['default'].createElement(
                    'div',
                    (0, _extends3['default'])({}, listProps, { key: file.uid }),
                    previewImg,
                    _react2['default'].createElement(
                        'span',
                        { className: prefixCls + '-item-name' },
                        file.name
                    ),
                    progress,
                    removeIcon
                );
            });
            var listWrapperCls = items.length ? '' + prefixCls : prefixCls + '-empty';
            return _react2['default'].createElement(
                'div',
                { className: listWrapperCls },
                list
            );
        }
    }]);
    return UploadList;
}(_FormField2.FormField);

exports['default'] = UploadList;

UploadList.displayName = 'UploadList';
UploadList.propTypes = (0, _extends3['default'])({
    items: _propTypes2['default'].array,
    remove: _propTypes2['default'].func
}, _FormField2.FormField.propTypes);
UploadList.defaultProps = (0, _extends3['default'])({}, _FormField2.FormField.defaultProps, {
    suffixCls: 'upload-list',
    items: []
});
module.exports = exports['default'];