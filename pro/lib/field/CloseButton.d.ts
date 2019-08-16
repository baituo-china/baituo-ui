import { PureComponent } from 'react';
export interface CloseButtonProps {
    value: any;
    index: number;
    onClose: (e: any, value: any, index: number) => void;
}
export default class CloseButton extends PureComponent<CloseButtonProps> {
    handleClick: (e: any) => void;
    render(): JSX.Element;
}
