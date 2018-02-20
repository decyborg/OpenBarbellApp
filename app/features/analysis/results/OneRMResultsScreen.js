import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMResultsView from './OneRMResultsView';
import * as Actions from './OneRMResultsActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRMCalculator from 'app/math/OneRMCalculator';

const mapStateToProps = (state) => {
    const activeChartData = AnalysisSelectors.getActiveChartData(state);
    const errorChartData = AnalysisSelectors.getErrorChartData(state);
    const unusedChartData = AnalysisSelectors.getUnusedChartData(state);
    const regressionPoints = AnalysisSelectors.getRegressionPoints(state);
    const isR2HighEnough = AnalysisSelectors.getIsR2HighEnough(state);

    // TODO: store regression point and weight values instead of recalculating them every single time for speed
    // otherwise it's slow on launch every time, especially with every action
    if (isR2HighEnough) {
        // there's a regression line, showcase x axis
        var highestWeight = OneRMCalculator.highestWeightPossible(regressionPoints);
        var regLeftPoint = OneRMCalculator.lowestWeightPoint(regressionPoints);
        var regRightPoint = {x: highestWeight, y: 0};
        var e1RM = AnalysisSelectors.getE1RM(state);
    } else {
        // no regression line, just use the largest ACTUAL lift
        var highestWeight = OneRMCalculator.highestWeight(activeChartData);
        var regLeftPoint = null;
        var regRightPoint = null;
        var e1RM = null;
    }

    return {
        velocity: AnalysisSelectors.getAnalysisVelocity(state),
        e1RM: e1RM,    
        metric: SettingsSelectors.getDefaultMetric(state),
        r2: AnalysisSelectors.getR2(state),
        isR2HighEnough: isR2HighEnough,

        activeChartData: activeChartData,
        errorChartData: errorChartData,
        unusedChartData: unusedChartData,
        // highestWeight: highestWeight,
        // lowestWeight: OneRMCalculator.lowestWeight(activeChartData),
        // highestVel: OneRMCalculator.highestVelocity(activeChartData),
        regLeftPoint: regLeftPoint,
        regRightPoint: regRightPoint,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapPoint: Actions.tapPoint,
    }, dispatch);
};

const OneRMChartScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMResultsView);

export default OneRMChartScreen;
