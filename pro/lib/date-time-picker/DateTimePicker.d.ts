import DatePicker from '../date-picker/DatePicker';
import { ViewMode } from '../date-picker/enum';
export default class DateTimePicker extends DatePicker {
    static displayName: string;
    static defaultProps: {
        mode: ViewMode;
        suffixCls: string;
        clearButton: boolean;
        trigger: string[];
        triggerShowDelay: number;
        triggerHiddenDelay: number;
        autoComplete: string;
        multiple: boolean;
        readOnly: boolean;
        noValidate: boolean;
        showHelp: string;
    };
}
