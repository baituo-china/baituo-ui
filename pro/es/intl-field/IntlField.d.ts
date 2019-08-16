import { ReactNode } from 'react';
import { TextField, TextFieldProps } from '../text-field/TextField';
import { ModalProps } from '../modal/Modal';
import DataSet from '../data-set/DataSet';
export interface IntlFieldProps extends TextFieldProps {
    modalProps?: ModalProps;
}
export default class IntlField extends TextField<IntlFieldProps> {
    static displayName: string;
    modal: any;
    locales?: object;
    tlsDataSet: DataSet;
    loading?: boolean;
    openModal: () => Promise<void>;
    handleIntlListClose: () => Promise<void>;
    handleIntlListOk: () => Promise<false | undefined>;
    handleIntlListCancel: () => Promise<void>;
    handleTlsLoad: () => void;
    handleKeyDown(e: any): void;
    handleBlur(e: any): void;
    storeLocales(data: any): void;
    setValue(value: any): void;
    getSuffix(): ReactNode;
    componentWillUnmount(): void;
}
