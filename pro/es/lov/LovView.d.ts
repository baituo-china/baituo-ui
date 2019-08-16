import { Component } from 'react';
import PropTypes from 'prop-types';
import DataSet from '../data-set/DataSet';
import { DataSetSelection } from '../data-set/enum';
import { LovConfig } from './Lov';
import { ColumnProps } from '../table/Column';
export interface LovViewProps {
    dataSet: DataSet;
    config: LovConfig;
    multiple: boolean;
    values: any[];
    onDoubleClick: () => void;
    onEnterDown: () => void;
}
export default class LovView extends Component<LovViewProps> {
    static propTypes: {
        dataSet: PropTypes.Validator<object>;
        config: PropTypes.Validator<object>;
        onDoubleClick: PropTypes.Validator<(...args: any[]) => any>;
        onEnterDown: PropTypes.Validator<(...args: any[]) => any>;
    };
    selection: DataSetSelection | false;
    componentWillMount(): void;
    componentWillUnmount(): void;
    getColumns(): ColumnProps[] | undefined;
    handleKeyDown: (e: any) => void;
    handleRow: () => {
        onDoubleClick: () => void;
    };
    render(): JSX.Element;
}
