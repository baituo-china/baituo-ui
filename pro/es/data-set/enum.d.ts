export declare const enum DataSetEvents {
    query = "query",
    beforeLoad = "beforeLoad",
    load = "load",
    loadFailed = "loadFailed",
    submit = "submit",
    submitSuccess = "submitSuccess",
    submitFailed = "submitFailed",
    select = "select",
    unSelect = "unSelect",
    selectAll = "selectAll",
    unSelectAll = "unSelectAll",
    indexChange = "indexChange",
    update = "update",
    fieldChange = "fieldChange",
    export = "export",
    create = "create"
}
export declare const enum DataSetSelection {
    single = "single",
    multiple = "multiple"
}
export declare const enum DataSetStatus {
    loading = "loading",
    submitting = "submitting",
    ready = "ready"
}
export declare const enum RecordStatus {
    delete = "delete",
    update = "update",
    add = "add",
    sync = "sync"
}
export declare const enum FieldType {
    auto = "auto",
    boolean = "boolean",
    number = "number",
    currency = "currency",
    string = "string",
    date = "date",
    dateTime = "dateTime",
    week = "week",
    month = "month",
    year = "year",
    time = "time",
    object = "object",
    intl = "intl",
    email = "email",
    url = "url",
    color = "color",
    reactNode = "reactNode"
}
export declare const enum SortOrder {
    asc = "asc",
    desc = "desc"
}
export declare const enum BooleanValue {
    trueValue = "trueValue",
    falseValue = "falseValue"
}
export declare const enum FieldIgnore {
    always = "always",
    clean = "clean",
    never = "never"
}
