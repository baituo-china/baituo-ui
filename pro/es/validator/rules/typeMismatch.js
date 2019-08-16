import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';

var _types;

import isEmpty from '../../_util/isEmpty';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
/* tslint:disable */
var emailReg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
var urlReg = /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,5})?(?:[\/?#]\S*)?$/;
var colorRgbaReg = /^[rR][gG][Bb][Aa]?\((\s*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\s*,){2}\s*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\s*,?\s*(0?\.\d{1,2}|1|0)?\s*\){1}$/;
var colorHexReg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
/* tslint:enable */
var types = (_types = {}, _defineProperty(_types, "email" /* email */, [function (value) {
    return !emailReg.test(value);
}, 'EmailField']), _defineProperty(_types, "url" /* url */, [function (value) {
    return !urlReg.test(value);
}, 'UrlField']), _defineProperty(_types, "color" /* color */, [function (value) {
    return !(colorRgbaReg.test(value) || colorHexReg.test(value));
}, 'ColorPicker']), _types);
export default function typeMismatch(value, _ref) {
    var type = _ref.type;

    if (!isEmpty(value)) {
        var validateType = types[type];
        if (validateType) {
            var _validateType = _slicedToArray(validateType, 2),
                validate = _validateType[0],
                component = _validateType[1];

            if (validate(value)) {
                return new ValidationResult({
                    validationMessage: $l(component, 'type_mismatch'),
                    value: value,
                    ruleName: 'typeMismatch'
                });
            }
        }
    }
    return true;
}