import { SET_JSON_CONFIG_DATA, VALIDATE_AND_PARSE_JSON_CONFIG_DATA } from './actions';
import FormData from '../models/form-data';

const initialFormData = Object.freeze(new FormData());

const initialState = Object.freeze({
    configString: '',
    validJson: false,
    formData: initialFormData,
    error: '',
    invalidCharPos: 0
});

const errorMessageContainsPositionText = 'at position';

const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JSON_CONFIG_DATA:
            return { ...state, configString: action.payload };
        case VALIDATE_AND_PARSE_JSON_CONFIG_DATA: {
            let validJson = true;
            let formData = initialFormData;
            let { error, invalidCharPos } = initialState;
            try {
                formData = { ...formData, ...JSON.parse(state.configString.replace(/\n/g, '').trim()) };
            } catch (ex) {
                error = ex.message;

                // if the error message is 'Unexpected string in JSON at position 28' this will set '28' to invalidCharPos
                if (error.indexOf(errorMessageContainsPositionText) >= 0) {
                    const invalidCharNum = Number(error.split(' ').pop());
                    invalidCharPos = !isNaN(invalidCharNum) ? invalidCharNum : initialState.invalidCharPos;
                }

                validJson = false;
            }
            return { ...state, validJson, formData, error, invalidCharPos };
        }
        default:
            return { ...state };
    }
};

export default configReducer;
