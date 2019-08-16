import React, { Component, CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ColProps } from '../grid/col';
import { FormItemValidateStatus } from './enum';
export interface FormItemProps {
    prefixCls?: string;
    className?: string;
    id?: string;
    label?: ReactNode;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    help?: ReactNode;
    extra?: ReactNode;
    validateStatus?: FormItemValidateStatus;
    hasFeedback?: boolean;
    required?: boolean;
    style?: CSSProperties;
    colon?: boolean;
}
export interface FormItemContext {
    vertical: boolean;
}
export default class FormItem extends Component<FormItemProps, any> {
    static displayName: string;
    static defaultProps: {
        hasFeedback: boolean;
        colon: boolean;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        labelCol: PropTypes.Requireable<object>;
        help: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        validateStatus: PropTypes.Requireable<FormItemValidateStatus>;
        hasFeedback: PropTypes.Requireable<boolean>;
        wrapperCol: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        id: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        colon: PropTypes.Requireable<boolean>;
    };
    static contextTypes: {
        vertical: PropTypes.Requireable<boolean>;
    };
    context: FormItemContext;
    state: {
        helpShow: boolean;
    };
    componentDidMount(): void;
    shouldComponentUpdate(...args: any[]): any;
    getHelpMsg(): any;
    getControls(children: ReactNode, recursively: boolean): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    getOnlyControl(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
    getChildProp(prop: string): any;
    getId(): any;
    getMeta(): any;
    getField(): any;
    getPrefixCls(): string;
    onHelpAnimEnd: (_key: string, helpShow: boolean) => void;
    renderHelp(): JSX.Element;
    renderExtra(): JSX.Element | null;
    getValidateStatus(): FormItemValidateStatus | undefined;
    renderValidateWrapper(c1: ReactNode, c2: ReactNode, c3: ReactNode): JSX.Element;
    renderWrapper(children: ReactNode): JSX.Element;
    isRequired(): any;
    onLabelClick: (e: any) => void;
    renderChildren(): JSX.Element[];
    renderFormItem(children: ReactNode): JSX.Element;
    render(): JSX.Element;
}
