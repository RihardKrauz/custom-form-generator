import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { getFormData } from '../../store/selectors';
import FormFieldType from '../../models/form-field-type';

const FieldContainer = styled.div`
    margin-top: 1em;
`;

const WideTextField = styled(TextField)`
    width: 12em;
`;

const RadioGroupWithMargin = styled(RadioGroup)`
    margin-left: 4em;
`;

const FormHeader = styled.span`
    font-size: 22px;
`;

const GetFieldByType = field => {
    let value;
    let cbValue;

    switch (field.fieldType) {
        case FormFieldType.NumberField:
            return <WideTextField label={field.caption} value={value} type="number" margin="normal" />;
        case FormFieldType.TextField:
            return <WideTextField label={field.caption} value={value} margin="normal" />;
        case FormFieldType.TextArea:
            return <WideTextField label={field.caption} value={value} rowsMax="7" multiline margin="normal" />;
        case FormFieldType.DateField:
            return (
                <WideTextField
                    label={field.caption}
                    value={value}
                    type="date"
                    defaultValue={dayjs().format('YYYY-MM-DD')}
                    margin="normal"
                />
            );
        case FormFieldType.Checkbox:
            return (
                <FormControlLabel
                    control={<Checkbox checked={cbValue} value={field.caption} color="primary" />}
                    label={field.caption}
                />
            );
        case FormFieldType.RadioButtons:
            return (
                <div>
                    <FormLabel component="legend">{field.caption}</FormLabel>
                    <RadioGroupWithMargin name={field.caption} value={value}>
                        {field.values &&
                            field.values.map(rd => (
                                <FormControlLabel
                                    key={`${field.caption}${rd}`}
                                    value={rd}
                                    control={<Radio />}
                                    label={rd}
                                />
                            ))}
                    </RadioGroupWithMargin>
                </div>
            );
        default:
            return <span>Unknown field type</span>;
    }
};

const FormFieldContainer = ({ fields }) => {
    return (
        fields &&
        fields.map((field, index) => (
            <FieldContainer key={`${field.caption}${index}`}>{GetFieldByType(field)}</FieldContainer>
        ))
    );
};

const FormActionContainer = ({ actions }) => {
    return (
        actions &&
        actions.map((action, index) => (
            <Button key={`${action.textValue}${index}`} color={action.style} size="small">
                {action.textValue}
            </Button>
        ))
    );
};

const ResultFormPanel = ({ formData }) => {
    return (
        <Card>
            <FormHeader>{formData.title}</FormHeader>
            <CardContent>
                <FormFieldContainer fields={formData.fields} />
            </CardContent>
            <CardActions>
                <FormActionContainer actions={formData.actions} />
            </CardActions>
        </Card>
    );
};

ResultFormPanel.propTypes = {
    formData: PropTypes.exact({ title: PropTypes.string, fields: PropTypes.array, actions: PropTypes.array })
};

const mapStateToProps = state => {
    return {
        formData: getFormData(state)
    };
};

export default connect(mapStateToProps)(ResultFormPanel);
