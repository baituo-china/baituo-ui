/// <reference types="react" />
import { SpinProps as C7NSpinProps } from '../../../es/spin';
import DataSetComponent, { DataSetComponentProps } from '../data-set/DataSetComponent';
export interface SpinProps extends C7NSpinProps, DataSetComponentProps {
}
export default class Spin extends DataSetComponent<SpinProps> {
    static displayName: string;
    render(): JSX.Element;
}
