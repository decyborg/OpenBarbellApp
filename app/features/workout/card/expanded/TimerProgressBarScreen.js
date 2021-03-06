import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TimerProgressBar from 'app/shared_features/set_card/expanded/TimerProgressBar';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';

const mapStateToProps = (state) => ({
    projectedEndSetTime: WorkoutSelectors.getProjectedEndSetTime(state),
    timerDuration: WorkoutSelectors.getTimerDuration(state),
    timerRemaining: WorkoutSelectors.getTimerRemaining(state),
    timerStatus: WorkoutSelectors.getTimerStatus(state),    
});

const TimerProgressBarScreen = connect(
    mapStateToProps,
)(TimerProgressBar);

export default TimerProgressBarScreen;
