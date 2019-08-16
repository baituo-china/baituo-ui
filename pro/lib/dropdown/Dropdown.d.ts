import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Action } from '../trigger/enum';
import { Placements } from './enum';
export interface DropDownProps {
    trigger?: Action[];
    overlay: React.ReactNode;
    onHiddenChange?: (hidden?: boolean) => void;
    onVisibleChange?: (visible?: boolean) => void;
    onOverlayClick?: (e: any) => void;
    hidden?: boolean;
    visible?: boolean;
    defaultHidden?: boolean;
    defaultVisible?: boolean;
    disabled?: boolean;
    align?: Object;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    suffixCls?: string;
    prefixCls?: string;
    className?: string;
    transitionName?: string;
    placement?: Placements;
    forceRender?: boolean;
}
export interface DropdownState {
    hidden?: boolean;
}
export default class Dropdown extends PureComponent<DropDownProps> {
    static displayName: string;
    static propTypes: {
        trigger: PropTypes.Requireable<(Action | null)[]>;
        overlay: PropTypes.Requireable<any>;
        placement: PropTypes.Requireable<Placements>;
        hidden: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        onHiddenChange: PropTypes.Requireable<(...args: any[]) => any>;
        onVisibleChange: PropTypes.Requireable<(...args: any[]) => any>;
        onOverlayClick: PropTypes.Requireable<(...args: any[]) => any>;
        suffixCls: PropTypes.Requireable<string>;
        prefixCls: PropTypes.Requireable<string>;
        defaultHidden: PropTypes.Requireable<boolean>;
        defaultVisible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        suffixCls: string;
        placement: Placements;
        trigger: Action[];
        defaultHidden: boolean;
    };
    readonly triggerAction: Action[];
    readonly transitionName: string;
    readonly prefixCls: string;
    state: DropdownState;
    constructor(props: any);
    /**
     * 调用传入的onHiddenChange方法
     *
     * @param {boolean} hidden
     */
    handlePopupHiddenChange: (hidden: boolean) => void;
    handleClick: (e: any) => void;
    getMenuElement(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    componentWillReceiveProps({ hidden, visible }: DropDownProps): void;
    render(): JSX.Element;
}
