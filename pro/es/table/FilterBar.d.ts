import { PureComponent } from 'react';
import DataSet from '../data-set/DataSet';
export interface FilterBarProps {
    prefixCls?: string;
    placeholder?: string;
    dataSet: DataSet;
    paramName: string;
}
export default class FilterBar extends PureComponent<FilterBarProps, any> {
    handleChange: () => void;
    renderSuffix(): JSX.Element;
    render(): JSX.Element;
}
