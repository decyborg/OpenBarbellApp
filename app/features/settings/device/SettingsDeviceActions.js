import {
    NativeModules,
    Linking,
} from 'react-native';

import {
    STOP_RECONNECT,
    TROUBLESHOOTING_TIPS,
} from 'app/configs+constants/ActionTypes';
import * as DeviceActionCreators from 'app/redux/shared_actions/DeviceActionCreators';
import * as Analytics from 'app/services/Analytics';

export const startDeviceScan = (isManual=false) => {
    return DeviceActionCreators.startDeviceScan(isManual);
};

export const stopDeviceScan = () => {
    return DeviceActionCreators.stopDeviceScan();
};

export const connectDevice = (device, deviceIdentifier) => {
    return DeviceActionCreators.connectDevice(device, deviceIdentifier);
};

export const disconnectDevice = () => (dispatch, getState) => {
    const state = getState();
    logAttemptDisconnectDeviceAnalytics(state);
    dispatch(DeviceActionCreators.disconnectDevice());
};

export const stopReconnect = () => (dispatch, getState) => {
    const state = getState();
    logCancelReconnectAnalytics(state);

    dispatch({
        type: STOP_RECONNECT
    });
}

export const presentTroubleshootingTips = () => (dispatch, getState) => {
    Linking.openURL("http://www.squatsandscience.com/troubleshoot/");

    const state = getState();
    logTroubleshootingTipsAnalytics(state);

    dispatch({
        type: TROUBLESHOOTING_TIPS
    });
};

const logAttemptDisconnectDeviceAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_disconnect_device', {
    }, state);
};

const logCancelReconnectAnalytics = (state) => {
    Analytics.logEventWithAppState('cancel_reconnect', {

    }, state);
};

const logTroubleshootingTipsAnalytics = (state) => {
    Analytics.logEventWithAppState('troubleshooting_tips', {
    }, state);
};
