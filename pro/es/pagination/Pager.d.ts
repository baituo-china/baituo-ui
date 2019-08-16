import { PureComponent, ReactNode } from 'react';
import { PagerType } from './Pagination';
export interface PagerProps {
    page: number;
    active: boolean;
    disabled?: boolean;
    type: PagerType;
    className?: string;
    renderer: (page: number, type: PagerType) => ReactNode;
    onClick?: (page: number) => void;
}
export default class Pager extends PureComponent<PagerProps> {
    static displayName: string;
    handleClick: () => void;
    render(): JSX.Element;
}
