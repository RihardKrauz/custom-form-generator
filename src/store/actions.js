export const SET_JSON_CONFIG_DATA = 'SET_JSON_CONFIG_DATA';
export const VALIDATE_AND_PARSE_JSON_CONFIG_DATA = 'VALIDATE_AND_PARSE_JSON_CONFIG_DATA';
export const NOTIFY_CONFIG_VALIDITY = 'NOTIFY_CONFIG_VALIDITY';

export const setJsonConfigData = payload => ({ type: SET_JSON_CONFIG_DATA, payload });
export const validateAndParseJsonConfigData = payload => ({ type: VALIDATE_AND_PARSE_JSON_CONFIG_DATA });
export const notifyConfigValidity = payload => ({ type: NOTIFY_CONFIG_VALIDITY });
