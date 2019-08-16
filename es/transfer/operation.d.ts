import { Component, FormEventHandler } from 'react';
export interface TransferOperationProps {
    className?: string;
    leftArrowText?: string;
    rightArrowText?: string;
    moveToLeft?: FormEventHandler<any>;
    moveToRight?: FormEventHandler<any>;
    leftActive?: boolean;
    rightActive?: boolean;
}
export default class Operation extends Component<TransferOperationProps, any> {
    render(): JSX.Element;
}
