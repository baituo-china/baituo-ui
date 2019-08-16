/// <reference types="react" />
import ViewComponent, { ViewComponentProps } from '../core/ViewComponent';
export default class Mask extends ViewComponent<ViewComponentProps> {
    static displayName: string;
    static defaultProps: {
        suffixCls: string;
    };
    render(): JSX.Element;
}
