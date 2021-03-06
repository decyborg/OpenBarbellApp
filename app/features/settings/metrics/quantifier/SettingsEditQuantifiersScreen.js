import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Platform } from 'react-native';

import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
    EMPTY_QUANTIFIER,
    FIRST_REP_QUANTIFIER,
    LAST_REP_QUANTIFIER,
    MIN_QUANTIFIER,
    MAX_QUANTIFIER,
    AVG_QUANTIFIER,
    ABS_LOSS_QUANTIFIER,
    PERCENT_LOSS_QUANTIFIER,
    FASTEST_EVER_QUANTIFIER,
    SLOWEST_EVER_QUANTIFIER,
    SET_LOSS_QUANTIFIER,
    PEAK_END_QUANTIFIER,
} from 'app/configs+constants/CollapsedMetricTypes';
import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsEditQuantifiersActions';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as CollapsedMetricsUtility from 'app/math/CollapsedMetrics';

const pickerItem = (quantifier) => ({
    label: CollapsedMetricsUtility.quantifierString(quantifier),
    value: quantifier,
});

const mapStateToProps = (state, ownProps) => {
    const items = [
        pickerItem(EMPTY_QUANTIFIER),
        pickerItem(AVG_QUANTIFIER), // vel, pkv, dur
        pickerItem(FASTEST_EVER_QUANTIFIER), // vel, pkv, dur
        pickerItem(SLOWEST_EVER_QUANTIFIER), // vel, pkv, dur
        pickerItem(ABS_LOSS_QUANTIFIER), // vel, pkv, dur, rom
        pickerItem(PERCENT_LOSS_QUANTIFIER), // vel, pkv, dur, rom
        pickerItem(SET_LOSS_QUANTIFIER), // vel, pkv, dur, rom
        pickerItem(PEAK_END_QUANTIFIER), // vel, pkv, dur, rom
        pickerItem(FIRST_REP_QUANTIFIER), // all
        pickerItem(LAST_REP_QUANTIFIER), // all
        pickerItem(MIN_QUANTIFIER), // all
        pickerItem(MAX_QUANTIFIER), // all
    ];

    if (Platform.OS === 'ios') {
        return {
            isModalShowing: CollapsedSettingsSelectors.getIsEditingQuantifier(state),
            items: items,
            selectedValue: CollapsedSettingsSelectors.getCurrentQuantifier(state),
        };
    } else {
        switch(ownProps.rank) {
            case 1:
                return {
                    items: items,
                    selectedValue: CollapsedSettingsSelectors.getQuantifier1(state),
                };
            case 2:
                return {
                    items: items,
                    selectedValue: CollapsedSettingsSelectors.getQuantifier2(state),
                };
            case 3:
                return {
                    items: items,
                    selectedValue: CollapsedSettingsSelectors.getQuantifier3(state),
                };
            case 4:
                return {
                    items: items,
                    selectedValue: CollapsedSettingsSelectors.getQuantifier4(state),
                };
            case 5:
                return {
                    items: items,
                    selectedValue: CollapsedSettingsSelectors.getQuantifier5(state),
                };
            default:
                return {};
        }
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    if (Platform.OS === 'ios') {
        return bindActionCreators({
            selectValue: Actions.saveQuantifierSetting,
            closeModal: Actions.dismissQuantifierSetter
        }, dispatch);
    } else {
        switch(ownProps.rank) {
            case 1:
                return bindActionCreators({
                    selectValue: Actions.saveQuantifier1Setting,
                }, dispatch);
            case 2:
                return bindActionCreators({
                    selectValue: Actions.saveQuantifier2Setting,
                }, dispatch);
            case 3:
                return bindActionCreators({
                    selectValue: Actions.saveQuantifier3Setting,
                }, dispatch);
            case 4:
                return bindActionCreators({
                    selectValue: Actions.saveQuantifier4Setting,
                }, dispatch);
            case 5:
                return bindActionCreators({
                    selectValue: Actions.saveQuantifier5Setting,
                }, dispatch);
            default:
                return {};
        }
    }
};

const SettingsEditQuantifiersScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsEditQuantifiersScreen;
