import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInvalidCharPos } from '../../store/selectors';
import { setJsonConfigData, validateAndParseJsonConfigData, notifyConfigValidity } from '../../store/actions';
import DEFAULT_CONFIG from './default-config';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const ConfigPanelContainer = styled.div`
    overflow: hidden;
`;

const WideTextField = styled(TextField)`
    width: 100%;
`;

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
        this.onApplyButtonClickAction = this.onApplyButtonClickAction.bind(this);
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

        this.setFormConfigValue(DEFAULT_CONFIG);
    }

    componentWillUnmount() {
        if (this.state.inputChangeSubscription) {
            this.state.inputChangeSubscription.unsubscribe();
        }
    }

    setFormConfigValue(value) {
        this.setState({ formConfigValue: value }, () => {
            this.state.input$.next(value);
        });
    }

    onApplyButtonClickAction() {
        this.props.dispatch(validateAndParseJsonConfigData(this.state.formConfigValue));
        this.props.dispatch(notifyConfigValidity());
    }

    render() {
        return (
            <ConfigPanelContainer>
                <WideTextField
                    label="Form configuration"
                    multiline
                    size="small"
                    rowsMax="15"
                    value={this.state.formConfigValue}
                    onChange={e => {
                        this.setFormConfigValue(e.target.value);
                    }}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={this.onApplyButtonClickAction}>
                    Apply
                </Button>
            </ConfigPanelContainer>
        );
    }
}

ConfigPanel.propTypes = {
    invalidCharPos: PropTypes.number
};

const mapStateToProps = state => {
    return {
        invalidCharPos: getInvalidCharPos(state)
    };
};

export default connect(mapStateToProps)(ConfigPanel);
