import _extends from 'babel-runtime/helpers/extends';
import Modal from './Modal';
import { getKey, open } from '../modal-container/ModalContainer';
import confirm from './confirm';
import { $l } from '../locale-context';
import { normalizeProps } from './utils';
Modal.key = getKey;
Modal.open = open;
Modal.confirm = confirm;
Modal.info = function (props) {
    return confirm(_extends({
        type: 'info',
        iconType: 'info',
        okCancel: false
    }, normalizeProps(props)));
};
Modal.success = function (props) {
    return confirm(_extends({
        type: 'success',
        title: $l('Modal', 'success_modal_title'),
        iconType: 'check_circle',
        okCancel: false
    }, normalizeProps(props)));
};
Modal.error = function (props) {
    return confirm(_extends({
        type: 'error',
        title: $l('Modal', 'error_modal_title'),
        iconType: 'cancel',
        okCancel: false
    }, normalizeProps(props)));
};
Modal.warning = function (props) {
    return confirm(_extends({
        type: 'warning',
        title: $l('Modal', 'warning_modal_title'),
        iconType: 'warning',
        okCancel: false
    }, normalizeProps(props)));
};
export default Modal;