import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormField } from '../field/FormField';
import Icon from '../icon';
import Progress from '../progress';

var UploadList = function (_FormField) {
    _inherits(UploadList, _FormField);

    function UploadList() {
        _classCallCheck(this, UploadList);

        return _possibleConstructorReturn(this, (UploadList.__proto__ || Object.getPrototypeOf(UploadList)).apply(this, arguments));
    }

    _createClass(UploadList, [{
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
                    previewImg = React.createElement('img', { width: previewImageWidth, alt: file.filename, src: file.url });
                }
                if (file.status === 'uploading') {
                    progress = React.createElement(
                        'div',
                        { className: prefixCls + '-item-progress' },
                        React.createElement(Progress, progressProps)
                    );
                } else {
                    var rmProps = {
                        className: classnames(prefixCls + '-item-icon', _defineProperty({}, prefixCls + '-item-remove', true)),
                        type: 'close',
                        onClick: function onClick() {
                            remove(file);
                        }
                    };
                    removeIcon = React.createElement(Icon, rmProps);
                }
                var listProps = {
                    className: classnames(prefixCls + '-item', (_classnames2 = {}, _defineProperty(_classnames2, prefixCls + '-item-error', file.status === 'error'), _defineProperty(_classnames2, prefixCls + '-item-success', file.status === 'success'), _classnames2))
                };
                return React.createElement(
                    'div',
                    _extends({}, listProps, { key: file.uid }),
                    previewImg,
                    React.createElement(
                        'span',
                        { className: prefixCls + '-item-name' },
                        file.name
                    ),
                    progress,
                    removeIcon
                );
            });
            var listWrapperCls = items.length ? '' + prefixCls : prefixCls + '-empty';
            return React.createElement(
                'div',
                { className: listWrapperCls },
                list
            );
        }
    }]);

    return UploadList;
}(FormField);

export default UploadList;

UploadList.displayName = 'UploadList';
UploadList.propTypes = _extends({
    items: PropTypes.array,
    remove: PropTypes.func
}, FormField.propTypes);
UploadList.defaultProps = _extends({}, FormField.defaultProps, {
    suffixCls: 'upload-list',
    items: []
});