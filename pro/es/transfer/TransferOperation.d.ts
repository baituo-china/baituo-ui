import { Component, FormEventHandler } from 'react';
export interface TransferOperationProps {
    className?: string;
    moveToLeft?: FormEventHandler<any>;
    moveToRight?: FormEventHandler<any>;
    leftActive?: boolean;
    rightActive?: boolean;
    multiple?: boolean;
}
export default class TransferOperation extends Component<TransferOperationProps, any> {
    render(): JSX.Element | null;
}
