import { Component, CSSProperties } from 'react';
export interface ILazyRenderBoxPropTypes {
    className?: string;
    hidden?: boolean;
    hiddenClassName?: string;
    role?: string;
    style?: CSSProperties;
}
export default class LazyRenderBox extends Component<ILazyRenderBoxPropTypes, any> {
    shouldComponentUpdate(nextProps: ILazyRenderBoxPropTypes): boolean;
    render(): JSX.Element;
}
