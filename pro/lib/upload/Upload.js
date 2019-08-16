'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _FormField2 = require('../field/FormField');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _message = require('../message');

var _message2 = _interopRequireDefault(_message);

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _UploadList = require('./UploadList');

var _UploadList2 = _interopRequireDefault(_UploadList);

var _Tooltip = require('../tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Upload = function (_FormField) {
    (0, _inherits3['default'])(Upload, _FormField);

    function Upload(props, context) {
        (0, _classCallCheck3['default'])(this, Upload);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props, context));

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
            var fileList = [].concat((0, _toConsumableArray3['default'])(_this.fileList));
            if (fileList.length) {
                // <-- 当有文件时才上传
                _this.uploadFiles(fileList);
                _this.nativeInputElement.value = '';
            } else {
                _modal2['default'].error((0, _localeContext.$l)('Upload', 'no_file'));
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

            var fileList = [].concat((0, _toConsumableArray3['default'])(_this.fileList));
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
            (0, _mobx.runInAction)(function () {
                _this.fileList = _this.removeFileItem(file, _this.fileList);
            });
        };
        (0, _mobx.runInAction)(function () {
            _this.fileList = [];
        });
        return _this;
    }

    (0, _createClass3['default'])(Upload, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get3['default'])(Upload.prototype.__proto__ || Object.getPrototypeOf(Upload.prototype), 'getOtherProps', this).call(this), ['accept', 'action', 'data', 'header', 'multiple', 'onChange', 'ref', 'uploadImmediately', 'fileListMaxLength', 'showPreviewImage', 'previewImageWidth', 'showUploadBtn', 'onUploadSuccess', 'onUploadError', 'onFileChange']);
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

            var uploadProps = (0, _extends3['default'])({
                multiple: multiple,
                accept: accept ? accept.join(',') : undefined,
                action: formAction,
                name: name,
                type: 'file',
                ref: this.saveNativeInputElement,
                onChange: this.handleChange
            }, this.getOtherProps());
            var inputWrapperBtn = [_react2['default'].createElement(
                _Button2['default'],
                { key: 'upload-btn', onClick: this.handleWrapperBtnClick },
                _react2['default'].createElement(_icon2['default'], { type: 'insert_drive_file' }),
                _react2['default'].createElement(
                    'span',
                    null,
                    children || (0, _localeContext.$l)('Upload', 'file_selection')
                )
            ), _react2['default'].createElement('input', (0, _extends3['default'])({ key: 'upload' }, uploadProps, { hidden: true }))];
            var uploadBtn = _react2['default'].createElement(
                _Tooltip2['default'],
                { title: (0, _localeContext.$l)('Upload', 'click_to_upload'), placement: 'right' },
                _react2['default'].createElement(
                    _Button2['default'],
                    { color: "blue" /* blue */, onClick: this.handleUploadBtnClick },
                    _react2['default'].createElement(_icon2['default'], { type: 'file_upload' })
                )
            );
            return _react2['default'].createElement(
                'div',
                { className: '' + prefixCls },
                _react2['default'].createElement(
                    'div',
                    { className: 'flex-wrapper' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-select' },
                        inputWrapperBtn,
                        !uploadImmediately && showUploadBtn ? uploadBtn : null
                    ),
                    _react2['default'].createElement(
                        'div',
                        null,
                        extra
                    )
                ),
                _react2['default'].createElement(_UploadList2['default'], { previewImageWidth: previewImageWidth, showPreviewImage: showPreviewImage, items: [].concat((0, _toConsumableArray3['default'])(this.fileList)), remove: this.handleRemove })
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
                _modal2['default'].error((0, _localeContext.$l)('Upload', 'upload_path_unset'));
                return;
            }
            if (!this.isAcceptFiles(fileList)) {
                _modal2['default'].error((0, _localeContext.$l)('Upload', 'not_acceptable_prompt') + accept.join(','));
                return;
            }
            if (fileListMaxLength !== 0 && this.fileList.length > fileListMaxLength) {
                _modal2['default'].error((0, _localeContext.$l)('Upload', 'file_list_max_length') + ': ' + fileListMaxLength);
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
                var timeoutMsg = 'The request post for ' + _mobx.action + ' timed out';
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
}(_FormField2.FormField);
Upload.displayName = 'Upload';
Upload.propTypes = (0, _extends3['default'])({
    /**
     * 可接受的上传文件类型
     * 可选值: MIME类型字符串组成的数组
     */
    accept: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 上传文件路径
     */
    action: _propTypes2['default'].string,
    /**
     * 上传所需参数或者返回上传参数的方法
     * @default
     * {}
     */
    data: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
    /**
     * 设置上传的请求头部
     * @default
     * {}
     */
    headers: _propTypes2['default'].object,
    /**
     * 是否支持多选文件
     * @default
     * false
     */
    multiple: _propTypes2['default'].bool,
    uploadImmediately: _propTypes2['default'].bool,
    fileListMaxLength: _propTypes2['default'].number,
    showPreviewImage: _propTypes2['default'].bool,
    previewImageWidth: _propTypes2['default'].number,
    extra: _propTypes2['default'].any,
    onFileChange: _propTypes2['default'].func,
    onUploadProgress: _propTypes2['default'].func,
    onUploadSuccess: _propTypes2['default'].func,
    onUploadError: _propTypes2['default'].func,
    showUploadBtn: _propTypes2['default'].bool
}, _FormField2.FormField.propTypes);
Upload.defaultProps = (0, _extends3['default'])({}, _FormField2.FormField.defaultProps, {
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
        return _message2['default'].success((0, _localeContext.$l)('Upload', 'upload_success'));
    },
    onUploadError: function onUploadError() {
        return _message2['default'].error((0, _localeContext.$l)('Upload', 'upload_failure'));
    }
});
tslib_1.__decorate([_mobx.observable], Upload.prototype, "fileList", void 0);
tslib_1.__decorate([_autobind2['default'], _mobx.action], Upload.prototype, "handleChange", null);
tslib_1.__decorate([_autobind2['default']], Upload.prototype, "uploadFiles", null);
tslib_1.__decorate([_autobind2['default']], Upload.prototype, "upload", null);
tslib_1.__decorate([_mobx.action], Upload.prototype, "handleSuccess", void 0);
tslib_1.__decorate([_mobx.action], Upload.prototype, "handleProgress", void 0);
tslib_1.__decorate([_mobx.action], Upload.prototype, "handleError", void 0);
Upload = tslib_1.__decorate([_mobxReact.observer], Upload);
exports['default'] = Upload;
module.exports = exports['default'];