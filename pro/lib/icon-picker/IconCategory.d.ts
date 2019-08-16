import { Component } from 'react';
import PropTypes from 'prop-types';
export interface IconItemProps {
    prefixCls?: string;
    icons: string[];
    category?: string;
    value?: string;
    paging?: boolean;
    page?: number;
    pageSize?: number;
    onSelect: (type: string) => void;
    onPageChange?: (page: number, category?: string) => void;
}
export default class IconCategory extends Component<IconItemProps> {
    static displayName: string;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        icons: PropTypes.Validator<(string | null)[]>;
        value: PropTypes.Requireable<string>;
        onSelect: PropTypes.Validator<(...args: any[]) => any>;
        onPageChange: PropTypes.Requireable<(...args: any[]) => any>;
        pageSize: PropTypes.Requireable<number>;
        page: PropTypes.Requireable<number>;
        paging: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        paging: boolean;
    };
    page: number;
    ul?: HTMLUListElement | null;
    constructor(props: any);
    saveRef: (node: any) => any;
    handlePageChange: (page: number) => void;
    handleItemSelect: (icon: any) => void;
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    syncItemPosition(): void;
    setPage(page?: number): void;
    renderPagination(): JSX.Element | undefined;
    renderIcons(): JSX.Element[];
    getIcons(): string[];
    render(): JSX.Element;
}
