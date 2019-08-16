import _extends from 'babel-runtime/helpers/extends';
import Modal from './Modal';
import confirm from './confirm';
import Sidebar from './Sidebar';
Modal.info = function (props) {
    var config = _extends({
        type: 'info',
        okCancel: false
    }, props);
    return confirm(config);
};
Modal.success = function (props) {
    var config = _extends({
        type: 'success',
        iconType: 'check_circle',
        okCancel: false
    }, props);
    return confirm(config);
};
Modal.error = function (props) {
    var config = _extends({
        type: 'error',
        iconType: 'error',
        okCancel: false
    }, props);
    return confirm(config);
};
Modal.warning = Modal.warn = function (props) {
    var config = _extends({
        type: 'warning',
        iconType: 'warning',
        okCancel: false
    }, props);
    return confirm(config);
};
Modal.confirm = function (props) {
    var config = _extends({
        type: 'confirm',
        okCancel: true
    }, props);
    return confirm(config);
};
Modal.Sidebar = Sidebar;
export default Modal;