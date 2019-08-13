import { NOTIFY_CONFIG_VALIDITY } from './actions';
import Notifier from '../components/Notifier';
import { isParsedJsonValid } from './selectors';

const notifyUserParseResult = store => next => action => {
    if (action.type === NOTIFY_CONFIG_VALIDITY) {
        if (isParsedJsonValid(store.getState()) === true) {
            Notifier.notifySuccess('JSON config has been successfully parsed');
        } else {
            Notifier.notifyError('Error on parsing JSON config');
        }
    }

    return next(action);
};

export default [notifyUserParseResult];
