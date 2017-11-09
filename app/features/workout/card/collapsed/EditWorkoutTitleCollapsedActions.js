import {
    EXPAND_WORKOUT_SET,
    PRESENT_WORKOUT_VIDEO_PLAYER,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const expandCard = (setID) => (dispatch, getState) => {
    // TODO: analytics

    dispatch({
        type: EXPAND_WORKOUT_SET,
        setID: setID,
    });
};

export const presentWatchVideo = (setID, videoFileURL) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('workout_watch_video');
    logWatchVideoAnalytics(setID, state);
    
    dispatch({
        type: PRESENT_WORKOUT_VIDEO_PLAYER,
        setID: setID,
        videoFileURL: videoFileURL
    });
};

const logWatchVideoAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('watch_video', {
        is_working_set: is_working_set
    }, state);
};