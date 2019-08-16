import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ElementProps } from '../core/ViewComponent';
export interface TableColProps extends ElementProps {
    width?: number | string;
    minWidth?: number | string;
    onResizeEnd: () => void;
}
export default class TableCol extends PureComponent<TableColProps> {
    static displayName: string;
    static contextType: React.Context<{
        tableStore: import("./TableStore").default;
    }>;
    static propTypes: {
        width: PropTypes.Requireable<string | number>;
        minWidth: PropTypes.Requireable<string | number>;
        onResizeEnd: PropTypes.Validator<(...args: any[]) => any>;
    };
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    handleTransitionEnd: () => void;
    fireResizeEnd(): void;
}
