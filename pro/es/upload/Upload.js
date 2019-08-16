import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import Button from '../button/Button';
import autobind from '../_util/autobind';
import { FormField } from '../field/FormField';
import Icon from '../icon';
import message from '../message';
import Modal from '../modal';
import UploadList from './UploadList';
import Tooltip from '../tooltip/Tooltip';
import { $l } from '../locale-context';
var Upload = function (_FormField) {
    _inherits(Upload, _FormField);

    function Upload(props, context) {
        _classCallCheck(this, Upload);

        var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props, context));

        _this.saveNativeInputElement = function (elem) {
            return _this.nativeInputElement = elem;
        };
        /**
         * 传递包装按钮的点击事件
         *
         */
        _this.handleWrapperBtnClick = function () {
            _this.nativeInputElement.click();
        };
        _this.handleUploadBtnClick = function () {
            _this.startUpload();
        };
        _this.startUpload = function () {
            var fileList = [].concat(_toConsumableArray(_this.fileList));
            if (fileList.length) {
                // <-- 当有文件时才上传
                _this.uploadFiles(fileList);
                _this.nativeInputElement.value = '';
            } else {
                Modal.error($l('Upload', 'no_file'));
            }
        };
        /**
         * 处理上传成功的函数，根据结果设置文件对象的状态，
         * 用于在UploadList中的展示
         *
         * @param {number} status HTTP状态码
         * @param {string} response 响应对象
         * @param {UploadFile} file 文件对象
         * @returns
         */
        _this.handleSuccess = function (status, response, file) {
            var fileList = _this.fileList.slice();
            var targetItem = _this.getFileItem(file, fileList);
            var onUploadSuccess = _this.props.onUploadSuccess;

            if (!targetItem) {
                return;
            }
            targetItem.status = status === 200 ? 'success' : 'done';
            targetItem.response = response;
            _this.fileList = fileList;
            if (onUploadSuccess) {
                onUploadSuccess(response, file);
            }
        };
        /**
         * 处理上传进度变化的函数，更新文件对象中的percent值，
         * 用于在UploadList中展示
         *
         * @param {number} percent 上传百分比
         * @param {UploadFile} file 文件对象
         * @returns
         */
        _this.handleProgress = function (percent, file) {
            var onUploadProgress = _this.props.onUploadProgress;

            var fileList = [].concat(_toConsumableArray(_this.fileList));
            var targetItem = _this.getFileItem(file, fileList);
            if (!targetItem) {
                return;
            }
            targetItem.percent = percent;
            _this.fileList = fileList;
            if (onUploadProgress) {
                onUploadProgress(percent, file);
            }
        };
        /**
         * 处理上传出错的函数，用于设置文件对象的status值，
         *
         * @param {Error} error 错误对象
         * @param {string} responseText 处理成字符串的响应对象
         * @param {UploadFile} file 文件对象
         * @returns
         */
        _this.handleError = function (error, responseText, response, file) {
            var onUploadError = _this.props.onUploadError;

            var fileList = _this.fileList.slice();
            var targetItem = _this.getFileItem(file, fileList);
            if (!targetItem) {
                return;
            }
            if (onUploadError) {
                onUploadError(error, response, file);
            }
            targetItem.status = 'error';
            targetItem.error = error;
            targetItem.response = responseText;
            _this.fileList = fileList;
        };
        _this.handleRemove = function (file) {
            runInAction(function () {
                _this.fileList = _this.removeFileItem(file, _this.fileList);
            });
        };
        runInAction(function () {
            _this.fileList = [];
        });
        return _this;
    }

    _createClass(Upload, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(Upload.prototype.__proto__ || Object.getPrototypeOf(Upload.prototype), 'getOtherProps', this).call(this), ['accept', 'action', 'data', 'header', 'multiple', 'onChange', 'ref', 'uploadImmediately', 'fileListMaxLength', 'showPreviewImage', 'previewImageWidth', 'showUploadBtn', 'onUploadSuccess', 'onUploadError', 'onFileChange']);
            return otherProps;
        }
    }, {
        key: 'render',
        value: function render() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                formAction = _props.action,
                children = _props.children,
                multiple = _props.multiple,
                accept = _props.accept,
                _props$name = _props.name,
                name = _props$name === undefined ? 'file' : _props$name,
                uploadImmediately = _props.uploadImmediately,
                showPreviewImage = _props.showPreviewImage,
                previewImageWidth = _props.previewImageWidth,
                showUploadBtn = _props.showUploadBtn,
                extra = _props.extra;

            var uploadProps = _extends({
                multiple: multiple,
                accept: accept ? accept.join(',') : undefined,
                action: formAction,
                name: name,
                type: 'file',
                ref: this.saveNativeInputElement,
                onChange: this.handleChange
            }, this.getOtherProps());
            var inputWrapperBtn = [React.createElement(
                Button,
                { key: 'upload-btn', onClick: this.handleWrapperBtnClick },
                React.createElement(Icon, { type: 'insert_drive_file' }),
                React.createElement(
                    'span',
                    null,
                    children || $l('Upload', 'file_selection')
                )
            ), React.createElement('input', _extends({ key: 'upload' }, uploadProps, { hidden: true }))];
            var uploadBtn = React.createElement(
                Tooltip,
                { title: $l('Upload', 'click_to_upload'), placement: 'right' },
                React.createElement(
                    Button,
                    { color: "blue" /* blue */, onClick: this.handleUploadBtnClick },
                    React.createElement(Icon, { type: 'file_upload' })
                )
            );
            return React.createElement(
                'div',
                { className: '' + prefixCls },
                React.createElement(
                    'div',
                    { className: 'flex-wrapper' },
                    React.createElement(
                        'div',
                        { className: prefixCls + '-select' },
                        inputWrapperBtn,
                        !uploadImmediately && showUploadBtn ? uploadBtn : null
                    ),
                    React.createElement(
                        'div',
                        null,
                        extra
                    )
                ),
                React.createElement(UploadList, { previewImageWidth: previewImageWidth, showPreviewImage: showPreviewImage, items: [].concat(_toConsumableArray(this.fileList)), remove: this.handleRemove })
            );
        }
        /**
         * 处理<input type="file">元素的change事件，
         * 主要是取出事件对象中的files对象并传递给uploadFiles方法
         *
         * @param {*} e <input>元素的change事件对象
         * @memberof Upload
         */

    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _this2 = this;

            var fileList = e.target.files;
            var files = Array.from(fileList).slice(0);
            this.fileList = [];
            var fileBuffer = [];
            files.forEach(function (file, index) {
                file.uid = _this2.getUid(index);
                file.url = URL.createObjectURL(file);
                fileBuffer.push(file);
            });
            this.fileList = fileBuffer;
            e.target.value = '';
            var _props2 = this.props,
                uploadImmediately = _props2.uploadImmediately,
                onFileChange = _props2.onFileChange;

            if (uploadImmediately) {
                this.uploadFiles(this.fileList);
            }
            if (onFileChange) {
                onFileChange(this.fileList.slice());
            }
        }
        /**
         * 分别上传fileList中的每个文件对象
         *
         * @param {UploadFile[]} fileList 文件对象数组
         * @returns {void}
         * @memberof Upload
         */

    }, {
        key: 'uploadFiles',
        value: function uploadFiles(fileList) {
            var _this3 = this;

            var _props3 = this.props,
                formAction = _props3.action,
                accept = _props3.accept,
                _props3$fileListMaxLe = _props3.fileListMaxLength,
                fileListMaxLength = _props3$fileListMaxLe === undefined ? 0 : _props3$fileListMaxLe;

            if (!formAction) {
                Modal.error($l('Upload', 'upload_path_unset'));
                return;
            }
            if (!this.isAcceptFiles(fileList)) {
                Modal.error($l('Upload', 'not_acceptable_prompt') + accept.join(','));
                return;
            }
            if (fileListMaxLength !== 0 && this.fileList.length > fileListMaxLength) {
                Modal.error($l('Upload', 'file_list_max_length') + ': ' + fileListMaxLength);
                return;
            }
            var files = Array.from(fileList).slice(0);
            var that = this;
            files.forEach(function (file, index) {
                file.uid = _this3.getUid(index);
                setTimeout(function () {
                    // that.handleStart(file);
                    that.upload(file);
                }, 0);
            });
        }
        /**
         * 上传每个文件对象
         *
         * @param {*} file
         * @returns {void}
         * @memberof Upload
         */

    }, {
        key: 'upload',
        value: function upload(file) {
            var _this4 = this;

            var _props4 = this.props,
                data = _props4.data,
                formAction = _props4.action,
                headers = _props4.headers,
                filename = _props4.name;

            if (typeof XMLHttpRequest === 'undefined') {
                return;
            }
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            // 修改文件状态，方便UploadList判断是否展示进度条
            file.status = 'uploading';
            if (xhr.upload) {
                xhr.upload.onprogress = function (e) {
                    var percent = 0;
                    if (e.total > 0) {
                        percent = e.loaded / e.total * 100;
                    }
                    _this4.handleProgress(percent, file);
                };
            }
            if (data) {
                var newData = typeof data === 'function' ? data(file) : data;
                Object.keys(newData).forEach(function (key) {
                    return formData.append(key, newData[key]);
                });
            }
            // TODO: `filename` default value needs better implementation
            formData.append(filename || 'file', file);
            var errorMsg = 'cannot post ' + formAction + ' ' + xhr.status;
            xhr.open('post', formAction, true);
            xhr.onload = function () {
                // 以二开头的状态码都认为是成功，暂定？
                var isSuccessful = xhr.status.toString().startsWith('2');
                if (isSuccessful) {
                    _this4.handleSuccess(xhr.status, xhr.response, file);
                } else {
                    _this4.handleError(new Error(errorMsg), _this4.getResponse(xhr), xhr.response, file);
                }
            };
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            if (headers !== undefined) {
                Object.keys(headers).forEach(function (key) {
                    if (headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                });
            }
            xhr.send(formData);
            xhr.onerror = function () {
                _this4.handleError(new Error(errorMsg), _this4.getResponse(xhr), xhr.response, file);
            };
            xhr.ontimeout = function () {
                var timeoutMsg = 'The request post for ' + action + ' timed out';
                _this4.handleError(new Error(timeoutMsg), _this4.getResponse(xhr), xhr.response, file);
            };
        }
        /**
         * 判断文件后缀名是否合格
         * this.props.accept值为falsy时返回true，否则正常判断
         *
         * @param {UploadFile[]} fileList 文件对象数组
         * @returns {boolean}
         * @memberof Upload
         */

    }, {
        key: 'isAcceptFiles',
        value: function isAcceptFiles(fileList) {
            var accept = this.props.accept;

            if (!accept) {
                return true;
            }
            var acceptTypes = accept.map(function (type) {
                type = type.replace(/\./g, '\\.');
                type = type.replace(/\*/g, '.*');
                return new RegExp(type);
            });
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = fileList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var file = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = acceptTypes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var type = _step2.value;

                            if (type.test(file.name) || type.test(file.type)) {
                                return true;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                _iterator2['return']();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return false;
        }
        /**
         * 把XMLHttpRequest对象的返回信息转化为字符串
         *
         * @param {XMLHttpRequest} xhr
         * @returns {string}
         * @memberof Upload
         */

    }, {
        key: 'getResponse',
        value: function getResponse(xhr) {
            var res = xhr.responseText || xhr.response;
            if (!res) {
                return res;
            }
            try {
                return JSON.parse(res).message;
            } catch (e) {
                return '';
            }
        }
        /**
         * 使用日期获取一个uid
         *
         * @param {number} index 索引
         * @returns {string}
         * @memberof Upload
         */

    }, {
        key: 'getUid',
        value: function getUid(index) {
            var prefixCls = this.prefixCls;

            var now = new Date();
            return prefixCls + '-' + now + '-' + index;
        }
        /**
         * 从文件对象数组中获取一个文件对象的引用，
         * 首先尝试通过uid属性匹配文件对象，若失败则尝试name
         *
         * @param {UploadFile} file
         * @param {UploadFile[]} fileList 文件对象数组
         * @returns {UploadFile}
         * @memberof Upload
         */

    }, {
        key: 'getFileItem',
        value: function getFileItem(file, fileList) {
            var matchKey = file.uid !== undefined ? 'uid' : 'name';
            return fileList.filter(function (item) {
                return item[matchKey] === file[matchKey];
            })[0];
        }
        /**
         * 从文件对象数组中移除一个文件对象，
         * 首先尝试通过uid属性匹配文件对象，若失败则尝试name
         *
         * @param {UploadFile} file
         * @param {UploadFile[]} fileList
         * @returns {UploadFile[]}
         * @memberof Upload
         */

    }, {
        key: 'removeFileItem',
        value: function removeFileItem(file, fileList) {
            var matchKey = file.uid !== undefined ? 'uid' : 'name';
            var removed = fileList.filter(function (item) {
                return item[matchKey] !== file[matchKey];
            });
            if (removed.length === fileList.length) {
                return [];
            }
            return removed;
        }
    }]);

    return Upload;
}(FormField);
Upload.displayName = 'Upload';
Upload.propTypes = _extends({
    /**
     * 可接受的上传文件类型
     * 可选值: MIME类型字符串组成的数组
     */
    accept: PropTypes.arrayOf(PropTypes.string),
    /**
     * 上传文件路径
     */
    action: PropTypes.string,
    /**
     * 上传所需参数或者返回上传参数的方法
     * @default
     * {}
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /**
     * 设置上传的请求头部
     * @default
     * {}
     */
    headers: PropTypes.object,
    /**
     * 是否支持多选文件
     * @default
     * false
     */
    multiple: PropTypes.bool,
    uploadImmediately: PropTypes.bool,
    fileListMaxLength: PropTypes.number,
    showPreviewImage: PropTypes.bool,
    previewImageWidth: PropTypes.number,
    extra: PropTypes.any,
    onFileChange: PropTypes.func,
    onUploadProgress: PropTypes.func,
    onUploadSuccess: PropTypes.func,
    onUploadError: PropTypes.func,
    showUploadBtn: PropTypes.bool
}, FormField.propTypes);
Upload.defaultProps = _extends({}, FormField.defaultProps, {
    suffixCls: 'upload',
    multiple: false,
    headers: {},
    data: {},
    action: '',
    name: 'file',
    uploadImmediately: true,
    fileListMaxLength: 0,
    showPreviewImage: true,
    previewImageWidth: 100,
    showUploadBtn: true,
    onUploadSuccess: function onUploadSuccess() {
        return message.success($l('Upload', 'upload_success'));
    },
    onUploadError: function onUploadError() {
        return message.error($l('Upload', 'upload_failure'));
    }
});
tslib_1.__decorate([observable], Upload.prototype, "fileList", void 0);
tslib_1.__decorate([autobind, action], Upload.prototype, "handleChange", null);
tslib_1.__decorate([autobind], Upload.prototype, "uploadFiles", null);
tslib_1.__decorate([autobind], Upload.prototype, "upload", null);
tslib_1.__decorate([action], Upload.prototype, "handleSuccess", void 0);
tslib_1.__decorate([action], Upload.prototype, "handleProgress", void 0);
tslib_1.__decorate([action], Upload.prototype, "handleError", void 0);
Upload = tslib_1.__decorate([observer], Upload);
export default Upload;