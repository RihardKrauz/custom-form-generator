import { NOTIFY_CONFIG_VALIDITY } from './actions';
import Notifier from '../components/Notifier';
import { isParsedJsonValid, getConfigError } from './selectors';

const notifyUserParseResult = store => next => action => {
    if (action.type === NOTIFY_CONFIG_VALIDITY) {
        const state = store.getState();
        if (isParsedJsonValid(state) === true) {
            Notifier.notifySuccess('Form has been successfully created');
        } else {
            const errorMessage = getConfigError(state);
            Notifier.notifyError(`Error on parsing config: ${errorMessage}`);
        }
    }

    return next(action);
};

export default [notifyUserParseResult];
