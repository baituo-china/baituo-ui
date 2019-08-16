import { ReactNode } from 'react';
import { CheckBox, CheckBoxProps } from '../check-box/CheckBox';
export default class Switch extends CheckBox<CheckBoxProps> {
    static displayName: string;
    static defaultProps: {
        suffixCls: string;
        indeterminate: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
    handleKeyDown(e: any): void;
    getText(): JSX.Element;
    renderInner(): ReactNode;
}
