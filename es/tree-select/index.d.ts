import { Component } from 'react';
import { TreeSelectProps } from './interface';
import { SelectLocale } from '../select';
export { TreeData, TreeSelectProps } from './interface';
export default class TreeSelect extends Component<TreeSelectProps, any> {
    static displayName: string;
    static TreeNode: any;
    static SHOW_ALL: any;
    static SHOW_PARENT: any;
    static SHOW_CHILD: any;
    static defaultProps: {
        transitionName: string;
        choiceTransitionName: string;
        showSearch: boolean;
    };
    private rcTreeSelect;
    constructor(props: TreeSelectProps);
    focus(): void;
    blur(): void;
    saveTreeSelect: (node: any) => void;
    renderTreeSelect: (locale: SelectLocale) => JSX.Element;
    render(): JSX.Element;
}
