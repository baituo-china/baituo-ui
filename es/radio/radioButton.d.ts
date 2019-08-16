import { Component } from 'react';
import PropTypes from 'prop-types';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';
import { RadioChangeEvent } from './interface';
export declare type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;
export default class RadioButton extends Component<RadioButtonProps, any> {
    static displayName: string;
    static contextTypes: {
        radioGroup: PropTypes.Requireable<any>;
    };
    render(): JSX.Element;
}
