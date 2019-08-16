import { Component } from 'react';
import PropTypes from 'prop-types';
import DataSet from '../data-set/DataSet';
import { Lang } from '../locale-context/enum';
export interface IntlListProps {
    dataSet: DataSet;
    name?: string;
    lang: Lang;
}
export default class IntlList extends Component<IntlListProps> {
    static propTypes: {
        dataSet: PropTypes.Requireable<object>;
        name: PropTypes.Requireable<string>;
        lang: PropTypes.Requireable<string>;
    };
    renderOptions(): JSX.Element[];
    render(): JSX.Element;
}
