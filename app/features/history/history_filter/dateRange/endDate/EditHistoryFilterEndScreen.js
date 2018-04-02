import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DatePickerModal from 'app/shared_features/date_picker/DatePickerModal';
import * as Actions from './EditHistoryFilterEndDateActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

const mapStateToProps = (state) => ({
    isModalShowing: HistorySelectors.getIsEditingHistoryFilterEndingDate(state),
    date: HistorySelectors.getEditingHistoryFilterEndingDate(state),
    placeholder: 'to',
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeDate: Actions.changeDate,
    }, dispatch);
};

const EditHistoryFilterEndDateScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatePickerModal);

export default EditHistoryFilterEndDateScreen;
