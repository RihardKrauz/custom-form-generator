import FormFieldType from './form-field-type';

export default class FormField {
    // fieldType: FormFieldType;
    // values: string[];

    constructor() {
        this.fieldType = FormFieldType.TextField;
        this.caption = 'DefaultCaption';
        this.values = [];
    }

    hasMultipleValues() {
        return this.fieldType === FormFieldType.RadioButtons;
    }
}