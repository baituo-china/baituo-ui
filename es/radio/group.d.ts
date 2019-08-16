import { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioChangeEvent, RadioGroupProps, RadioGroupState } from './interface';
export default class RadioGroup extends Component<RadioGroupProps, RadioGroupState> {
    static displayName: string;
    static defaultProps: {
        disabled: boolean;
    };
    static childContextTypes: {
        radioGroup: PropTypes.Requireable<any>;
    };
    constructor(props: RadioGroupProps);
    getChildContext(): {
        radioGroup: {
            onChange: (ev: RadioChangeEvent) => void;
            value: any;
            disabled: boolean | undefined;
            name: string | undefined;
        };
    };
    componentWillReceiveProps(nextProps: RadioGroupProps): void;
    shouldComponentUpdate(nextProps: RadioGroupProps, nextState: RadioGroupState): boolean;
    onRadioChange: (ev: RadioChangeEvent) => void;
    render(): JSX.Element;
}
