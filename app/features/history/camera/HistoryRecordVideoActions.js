import {
    START_RECORDING_HISTORY,
    STOP_RECORDING_HISTORY,
    DISMISS_HISTORY_RECORD_VIDEO
} from 'app/ActionTypes';

export const startRecording = (setID) => ({
    type: START_RECORDING_HISTORY,
    setID: setID
});

export const stopRecording = () => ({
    type: STOP_RECORDING_HISTORY
});

export const dismissRecording = () => ({
    type: DISMISS_HISTORY_RECORD_VIDEO
});
