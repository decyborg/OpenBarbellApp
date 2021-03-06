// These exist as a shared action creator because saving values can be done from all over the app

import { 
	SAVE_END_SET_TIMER, 
    SAVE_DEFAULT_METRIC,
    UPDATE_SYNC_DATE,
} from 'app/configs+constants/ActionTypes';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

export const saveDefaultMetric = (metric = 'kgs') => ({
    type: SAVE_DEFAULT_METRIC,
    defaultMetric: metric,
});

export const saveEndSetTimer = (duration = 30) => ({
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});

export const updateSyncDate = (syncDate=new Date()) => ({
    type: UPDATE_SYNC_DATE,
    syncDate: syncDate
});
