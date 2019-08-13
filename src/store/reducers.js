import { SET_JSON_CONFIG_DATA, VALIDATE_AND_PARSE_JSON_CONFIG_DATA } from './actions';
import FormData from '../models/form-data';

const initialFormData = Object.freeze(new FormData());

const initialState = Object.freeze({
    configString: '',
    validJson: false,
    formData: initialFormData
});

const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JSON_CONFIG_DATA:
            return { ...state, configString: action.payload };
        case VALIDATE_AND_PARSE_JSON_CONFIG_DATA: {
            let validJson = true;
            let formData = initialFormData;
            try {
                formData = JSON.parse(state.configString);
            } catch (ex) {
                validJson = false;
            }
            return { ...state, validJson, formData };
        }
        default:
            return { ...state };
    }
};

export default configReducer;
