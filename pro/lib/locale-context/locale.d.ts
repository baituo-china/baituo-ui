import { Lang } from './enum';
import zh_CN from './zh_CN';
export interface Locale {
    lang: Lang;
    Table: {
        show_cached_seletion: any;
        hide_cached_seletion: any;
        edit_button: any;
        create_button: any;
        save_button: any;
        cancel_button: any;
        delete_button: any;
        remove_button: any;
        reset_button: any;
        query_button: any;
        expand_button: any;
        collapse_button: any;
        export_button: any;
        advanced_search: any;
        dirty_info: any;
        restore: any;
        empty_data: any;
        choose_export_columns: any;
        column_name: any;
        filter_bar_placeholder: any;
    };
    Pagination: {
        records_per_page: any;
    };
    Upload: {
        file_selection: any;
        click_to_upload: any;
        upload_success: any;
        upload_failure: any;
        no_file: any;
        upload_path_unset: any;
        not_acceptable_prompt: any;
        file_list_max_length: any;
    };
    Modal: {
        ok: any;
        cancel: any;
        confirm_modal_title: any;
        success_modal_title: any;
        error_modal_title: any;
        warning_modal_title: any;
    };
    DataSet: {
        unsaved_data_confirm: any;
        invalid_query_dataset: any;
        delete_selected_row_confirm: any;
        delete_all_row_confirm: any;
        query_failure: any;
        submit_success: any;
        submit_failure: any;
        cannot_add_record_when_head_no_current: any;
    };
    DatePicker: {
        value_missing: any;
        value_missing_with_label: any;
        ok: any;
        today: any;
        now: any;
        this_week: any;
    };
    EmailField: {
        value_missing: any;
        value_missing_with_label: any;
        type_mismatch: any;
    };
    IntlField: {
        modal_title: any;
    };
    NumberField: {
        value_missing: any;
        value_missing_with_label: any;
    };
    Radio: {
        value_missing: any;
        value_missing_with_label: any;
    };
    SelectBox: {
        value_missing: any;
        value_missing_with_label: any;
    };
    Select: {
        value_missing: any;
        value_missing_with_label: any;
    };
    Transfer: {
        items: any;
    };
    UrlField: {
        value_missing: any;
        value_missing_with_label: any;
        type_mismatch: any;
    };
    ColorPicker: {
        value_missing: any;
        value_missing_with_label: any;
        type_mismatch: any;
    };
    Validator: {
        bad_input: any;
        pattern_mismatch: any;
        range_overflow: any;
        range_underflow: any;
        step_mismatch: any;
        too_long: any;
        too_short: any;
        type_mismatch: any;
        value_missing: any;
        value_missing_with_label: any;
        unique: any;
        unknown: any;
    };
    Icon: {
        icons: any;
        whatsNew: any;
        direction: any;
        suggestion: any;
        edit: any;
        data: any;
        other: any;
        series: any;
    };
}
export default zh_CN;
