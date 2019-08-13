import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormData } from '../../store/selectors';
import { setJsonConfigData, validateAndParseJsonConfigData, notifyConfigValidity } from '../../store/actions';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const DEBOUNCE_TIME = 500;

class ConfigPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            input$: new Subject(),
            inputChangeSubscription: null
        };

        this.setData = this.setData.bind(this);
    }

    componentDidMount() {
        this.setState({
            inputChangeSubscription: this.state.input$
                .pipe(
                    debounceTime(DEBOUNCE_TIME),
                    distinctUntilChanged()
                )
                .subscribe(val => {
                    this.props.dispatch(setJsonConfigData(this.state.data));
                })
        });
    }

    componentWillUnmount() {
        if (this.state.inputChangeSubscription) {
            this.state.inputChangeSubscription.unsubscribe();
        }
    }

    setData(val) {
        this.setState({ data: val });
        this.state.input$.next(val);
    }

    render() {
        return (
            <div>
                <textarea
                    value={this.state.data}
                    onChange={e => {
                        this.setData(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        this.props.dispatch(validateAndParseJsonConfigData(this.state.data));
                        this.props.dispatch(notifyConfigValidity());
                    }}
                >
                    test
                </button>{' '}
                Config panel{' '}
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
