import {
    COLLAPSE_WORKOUT_SET,
    EXPAND_WORKOUT_SET,
    DELETE_WORKOUT_SET,
    RESTORE_WORKOUT_SET,
} from 'app/configs+constants/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Analytics from 'app/services/Analytics';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';

export const tappedLoginBanner = () => (dispatch, getState) => {
    const state = getState();
    logLoginBannerAnalytics(state);

    dispatch(AuthActionCreators.requestLogin());
};

export const collapseSet = (setID) => (dispatch, getState) => {
    dispatch({
        type: COLLAPSE_WORKOUT_SET,
        setID: setID,
    });
};

export const expandSet = (setID) => (dispatch, getState) => {
    dispatch({
        type: EXPAND_WORKOUT_SET,
        setID: setID,
    });
};

export const deleteSet = (setID) => SetsActionCreators.deleteWorkoutSet(setID);

export const restoreSet = (setID) => SetsActionCreators.restoreWorkoutSet(setID);

export const removeRep = (setID, repIndex) => SetsActionCreators.removeWorkoutRep(setID, repIndex);

export const restoreRep = (setID, repIndex) => SetsActionCreators.restoreWorkoutRep(setID, repIndex);

export const endSet = () => {
    return SetsActionCreators.endSet(true, false);
};

// ANALYTICS

const logLoginBannerAnalytics = (state) => {
    Analytics.logEventWithAppState('workout_login_banner', {
    }, state);
};
