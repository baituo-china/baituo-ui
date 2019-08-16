import _extends from 'babel-runtime/helpers/extends';
import normalizeLanguage from '../_util/normalizeLanguage';
export var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
export function plus() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
    }

    if (values.length > 2) {
        return plus(values.shift(), plus.apply(undefined, values));
    } else if (values.length < 2) {
        return values[0];
    } else {
        var v1 = values[0];
        var v2 = values[1];
        var precisionFactor = getPrecisionFactor(v1, v2);
        return (precisionFix(v1, precisionFactor) + precisionFix(v2, precisionFactor)) / precisionFactor;
    }
}
export function getNearStepValues(value, step) {
    var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -MAX_SAFE_INTEGER;
    var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : MAX_SAFE_INTEGER;

    var precisionFactor = getPrecisionFactor(value, step);
    var valueFactor = precisionFix(value, precisionFactor);
    var minFactor = precisionFix(min, precisionFactor);
    var minFactorBase = min === -MAX_SAFE_INTEGER ? 0 : minFactor;
    var maxFactor = precisionFix(max, precisionFactor);
    var stepFactor = precisionFix(step, precisionFactor);
    var beforeStepFactor = getBeforeStepValue(valueFactor, minFactorBase, stepFactor);
    if (beforeStepFactor === valueFactor) {
        return void 0;
    }
    if (beforeStepFactor > maxFactor) {
        beforeStepFactor = getBeforeStepValue(maxFactor, minFactorBase, stepFactor);
    } else if (beforeStepFactor < minFactor) {
        beforeStepFactor = minFactor;
    }
    var afterStepFactor = beforeStepFactor + stepFactor;
    var values = [beforeStepFactor / precisionFactor];
    if (afterStepFactor <= maxFactor) {
        values.push(afterStepFactor / precisionFactor);
    }
    return values;
}
function getBeforeStepValue(value, minFactor, stepFactor) {
    return value - (value - minFactor) % stepFactor;
}
function getPrecision(value) {
    var valueString = value.toString();
    if (valueString.indexOf('e-') >= 0) {
        return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    if (valueString.indexOf('.') >= 0) {
        return valueString.length - valueString.indexOf('.') - 1;
    }
    return 0;
}
function getMaxPrecision(value, step) {
    var stepPrecision = getPrecision(step);
    var currentValuePrecision = getPrecision(value);
    if (!value) {
        return stepPrecision;
    }
    return Math.max(currentValuePrecision, stepPrecision);
}
function getPrecisionFactor(value, step) {
    return Math.pow(10, getMaxPrecision(value, step));
}
function precisionFix(value, precisionFactor) {
    return Math.round(value * precisionFactor);
}
var supportsLocales = void 0;
export function toLocaleStringSupportsLocales() {
    if (supportsLocales === void 0) {
        try {
            0 .toLocaleString('i');
            supportsLocales = false;
        } catch (e) {
            supportsLocales = e.name === 'RangeError';
        }
    }
    return supportsLocales;
}
function getNumberFormatOptions(type, options) {
    if (type === "number" /* number */) {
            return { style: 'decimal' };
        } else if (options && options.currency) {
        return { style: 'currency' };
    } else {
        return { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 };
    }
}
function toLocaleStringPolyfill(value, type, options) {
    if (type === "number" /* number */) {
            var fraction = String(value).split('.')[1];
            return value.toLocaleString().split('.')[0] + (fraction ? '.' + fraction : '');
        } else {
        var currency = options && options.currency;
        return '' + (currency ? currency + ' ' : '') + value.toLocaleString();
    }
}
export function formatNumber(value, lang, options) {
    var v = parseFloat(value);
    if (!isNaN(v)) {
        if (toLocaleStringSupportsLocales()) {
            return v.toLocaleString(normalizeLanguage(lang), _extends({}, getNumberFormatOptions("number" /* number */, options), options));
        } else {
            return toLocaleStringPolyfill(v, "number" /* number */, options);
        }
    }
    return value;
}
export function formatCurrency(value, lang, options) {
    var v = parseFloat(value);
    if (!isNaN(v)) {
        if (toLocaleStringSupportsLocales()) {
            return v.toLocaleString(normalizeLanguage(lang), _extends({}, getNumberFormatOptions("currency" /* currency */, options), options));
        } else {
            return toLocaleStringPolyfill(v, "currency" /* currency */, options);
        }
    }
    return value;
}