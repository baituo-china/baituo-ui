import { Component, ReactElement } from 'react';
export interface InputElementProps {
    children: ReactElement<any>;
}
export default class InputElement extends Component<InputElementProps, any> {
    private ele;
    focus: () => void;
    blur: () => void;
    saveRef: (ele: HTMLInputElement) => void;
    render(): ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)>;
}
