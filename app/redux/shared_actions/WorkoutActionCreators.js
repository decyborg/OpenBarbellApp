// This exists in shared actions because the timer can also end the workout

import * as ApiActionCreators from './ApiActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import { END_WORKOUT } from 'app/ActionTypes';

export const endWorkout = () => (dispatch, getState) => {
    var state = getState();
    var workoutData = SetsSelectors.getWorkoutSets(state);

    if (workoutData.length > 0 && workoutData[0].reps.length > 0) {
        dispatch({ type: END_WORKOUT });
    }
};
