import { Component, ReactElement } from 'react';
import IDialogPropTypes from './IDialogPropTypes';
declare class DialogWrap extends Component<IDialogPropTypes, any> {
    static defaultProps: {
        visible: boolean;
    };
    _component: ReactElement<any>;
    renderComponent: (props: any) => void;
    removeContainer: () => void;
    shouldComponentUpdate({ visible }: {
        visible: boolean;
    }): boolean;
    componentWillUnmount(): void;
    saveDialog: (node: any) => void;
    getComponent: (extra?: {}) => JSX.Element;
    getContainer: () => HTMLElement;
    render(): any;
}
export default DialogWrap;
