import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormData } from '../../store/selectors';
import { setJsonConfigData, validateAndParseJsonConfigData, notifyConfigValidity } from '../../store/actions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const DEBOUNCE_TIME = 500;

class ConfigPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formConfigValue: '',
            input$: new Subject(),
            inputChangeSubscription: null
        };

        this.setFormConfigValue = this.setFormConfigValue.bind(this);
    }

    componentDidMount() {
        this.setState({
            inputChangeSubscription: this.state.input$
                .pipe(
                    debounceTime(DEBOUNCE_TIME),
                    distinctUntilChanged()
                )
                .subscribe(val => {
                    this.props.dispatch(setJsonConfigData(this.state.formConfigValue));
                })
        });
    }

    componentWillUnmount() {
        if (this.state.inputChangeSubscription) {
            this.state.inputChangeSubscription.unsubscribe();
        }
    }

    setFormConfigValue(value) {
        this.setState({ formConfigValue: value });
        this.state.input$.next(value);
    }

    render() {
        return (
            <div className="config-panel">
                <TextField
                    label="Form configuration"
                    multiline
                    rowsMax="15"
                    value={this.state.formConfigValue}
                    onChange={e => {
                        this.setFormConfigValue(e.target.value);
                    }}
                    className="config-panel__form-field"
                    margin="normal"
                />
                <Button variant="contained" color="primary" className="config-panel__action"
                    onClick={() => {
                        this.props.dispatch(validateAndParseJsonConfigData(this.state.formConfigValue));
                        this.props.dispatch(notifyConfigValidity());
                    }}
                >
                    Apply
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        formData: getFormData(state)
    };
};

export default connect(mapStateToProps)(ConfigPanel);
