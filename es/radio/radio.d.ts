import { Component } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from './group';
import RadioButton from './radioButton';
import { RadioProps, RadioGroupContext } from './interface';
export default class Radio extends Component<RadioProps, {}> {
    static displayName: string;
    static Group: typeof RadioGroup;
    static Button: typeof RadioButton;
    static defaultProps: {
        type: string;
    };
    static contextTypes: {
        radioGroup: PropTypes.Requireable<any>;
    };
    private rcCheckbox;
    shouldComponentUpdate(nextProps: RadioProps, nextState: {}, nextContext: RadioGroupContext): boolean;
    focus(): void;
    blur(): void;
    saveCheckbox: (node: any) => void;
    render(): JSX.Element;
}
