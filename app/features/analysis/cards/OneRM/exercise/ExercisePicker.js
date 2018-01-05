import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './ExercisePickerActions';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: AnalysisSelectors.getisEditingExercise(state),
    items: [{label: 'Bench', value: 'Bench'}],
    selectedValue: AnalysisSelectors.getAnalysisExercise(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveSelectedExercise,
        closeModal: Actions.dismissSelectExercise
    }, dispatch);
};

const ExercisePicker = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default ExercisePicker;
